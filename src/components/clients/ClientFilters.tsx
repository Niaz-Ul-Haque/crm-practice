// src/components/clients/ClientFilters.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Filter, X, Search, ChevronDown } from "lucide-react";
import { Filters } from "@/data/clientsData";

interface ClientFilterProps {
  onFilterChange: (filters: Filters) => void;
}

const ClientFilters: React.FC<ClientFilterProps> = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: [] as string[],
    policies: [] as string[],
  });
  // const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ ...filters, searchTerm });
  };

  const handleStatusChange = (status: string) => {
    const updatedStatuses = filters.status.includes(status)
      ? filters.status.filter((s) => s !== status)
      : [...filters.status, status];

    const updatedFilters = {
      ...filters,
      status: updatedStatuses,
    };

    setFilters(updatedFilters);
    onFilterChange({ ...updatedFilters, searchTerm });
  };

  const handlePolicyChange = (policy: string) => {
    const updatedPolicies = filters.policies.includes(policy)
      ? filters.policies.filter((p) => p !== policy)
      : [...filters.policies, policy];

    const updatedFilters = {
      ...filters,
      policies: updatedPolicies,
    };

    setFilters(updatedFilters);
    onFilterChange({ ...updatedFilters, searchTerm });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({
      status: [],
      policies: [],
    });
    onFilterChange({
      searchTerm: "",
      status: [],
      policies: [],
    });
  };

  const hasActiveFilters =
    searchTerm || filters.status.length > 0 || filters.policies.length > 0;

  return (
    <div className="mb-6 space-y-2">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <form onSubmit={handleSearch}>
            <Input
              placeholder="Search clients by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  onFilterChange({ ...filters, searchTerm: "" });
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filters
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <div className="px-2 py-1.5 text-sm font-medium">Status</div>
            <DropdownMenuCheckboxItem
              checked={filters.status.includes("active")}
              onCheckedChange={() => handleStatusChange("active")}
            >
              Active
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.status.includes("inactive")}
              onCheckedChange={() => handleStatusChange("inactive")}
            >
              Inactive
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.status.includes("pending")}
              onCheckedChange={() => handleStatusChange("pending")}
            >
              Pending
            </DropdownMenuCheckboxItem>

            <DropdownMenuSeparator />

            <div className="px-2 py-1.5 text-sm font-medium">Policy Type</div>
            <DropdownMenuCheckboxItem
              checked={filters.policies.includes("home")}
              onCheckedChange={() => handlePolicyChange("home")}
            >
              Home Insurance
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.policies.includes("auto")}
              onCheckedChange={() => handlePolicyChange("auto")}
            >
              Auto Insurance
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.policies.includes("life")}
              onCheckedChange={() => handlePolicyChange("life")}
            >
              Life Insurance
            </DropdownMenuCheckboxItem>

            <DropdownMenuSeparator />

            <div className="px-2 py-1.5">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                disabled={!hasActiveFilters}
                onClick={clearFilters}
              >
                Clear All Filters
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <Button>Add New Client</Button> */}
      </div>

      {hasActiveFilters && (
        <div className="flex items-center text-sm">
          <span className="text-gray-500 mr-2">Active filters:</span>
          {searchTerm && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-purple-800 mr-2">
              Search: {searchTerm}
            </span>
          )}
          {filters.status.map((status) => (
            <span
              key={status}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mr-2"
            >
              Status: {status}
            </span>
          ))}
          {filters.policies.map((policy) => (
            <span
              key={policy}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2"
            >
              Policy: {policy}
            </span>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="text-xs h-6 px-2 text-gray-500"
            onClick={clearFilters}
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClientFilters;
