// src/app/(auth)/policies/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import PageTitle from "@/components/shared/PageTitle";
import { Button } from "@/components/ui/button";
import PoliciesTable from "@/components/policies/PoliciesTable";
import PolicyFilters from "@/components/policies/PolicyFilters";
import {
  policiesData,
  Policy,
  PolicyType,
  PolicyStatus,
} from "@/data/policiesData";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function PoliciesPage() {
  const router = useRouter();
  const [policies] = useState<Policy[]>(policiesData);
  const [filteredPolicies, setFilteredPolicies] =
    useState<Policy[]>(policiesData);
  const [sortField, setSortField] = useState<string>("endDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filters, setFilters] = useState({
    searchTerm: "",
    types: [] as PolicyType[],
    statuses: [] as PolicyStatus[],
  });

  const handleSort = (field: string) => {
    setSortField(field);
    setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
  };

  useEffect(() => {
    let result = [...policies];

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter((policy) =>
        policy.policyNumber.toLowerCase().includes(searchLower)
      );
    }

    if (filters.types.length > 0) {
      result = result.filter((policy) => filters.types.includes(policy.type));
    }

    if (filters.statuses.length > 0) {
      result = result.filter((policy) =>
        filters.statuses.includes(policy.status)
      );
    }

    result.sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "policyNumber":
          comparison = a.policyNumber.localeCompare(b.policyNumber);
          break;
        case "client":
          comparison = a.clientId.localeCompare(b.clientId);
          break;
        case "type":
          comparison = a.type.localeCompare(b.type);
          break;
        case "endDate":
          comparison =
            new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
          break;
        case "premium":
          comparison = a.premium - b.premium;
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
        default:
          comparison = 0;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    setFilteredPolicies(result);
  }, [policies, filters, sortField, sortDirection]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle
          title="Policies"
          subtitle={`${filteredPolicies.length} policies`}
        />
        <Button onClick={() => router.push("/policies/new")}>
          Add New Policy
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <PolicyFilters onFilterChange={handleFilterChange} />

        <PoliciesTable
          policies={filteredPolicies}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
        />

        {filteredPolicies.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border mt-6">
            <h3 className="text-lg font-medium mb-2">No policies found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setFilters({
                  searchTerm: "",
                  types: [],
                  statuses: [],
                });
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </motion.div>
    </>
  );
}
