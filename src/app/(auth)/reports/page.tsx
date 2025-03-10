// src/app/(auth)/reports/page.tsx
"use client";

import React, { useState } from "react";
import PageTitle from "@/components/shared/PageTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReportFilters from "@/components/reports/ReportFilters";
import SummaryCards from "@/components/reports/SummaryCard";
import MonthlySalesChart from "@/components/reports/MonthlySalesChart";
import PolicyDistributionChart from "@/components/reports/PolicyDistributionChart";
import TopPerformingPolicies from "@/components/reports/TopPerformingPolicies";
import {
  monthlyPerformanceData,
  policyDistributionData,
  topPerformingPoliciesData,
  renewalRateData,
  clientAcquisitionData,
} from "@/data/reportsData";
import { motion } from "framer-motion";

export default function ReportsPage() {
  const [filters, setFilters] = useState({
    dateRange: "last30Days",
    policyType: "all",
  });

  const [distributionView, setDistributionView] = useState<"count" | "revenue">(
    "count"
  );

  const [sortField, setSortField] = useState("revenue");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleSort = (field: string) => {
    setSortField(field);
    setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
  };

  const calculateTotals = () => {
    const totalRevenue = monthlyPerformanceData.reduce(
      (sum, month) => sum + month.revenue,
      0
    );
    const totalPolicies = monthlyPerformanceData.reduce(
      (sum, month) => sum + month.policies,
      0
    );

    const totalNewClients = clientAcquisitionData.reduce(
      (sum, month) => sum + month.newClients,
      0
    );

    const avgRenewalRate =
      renewalRateData.reduce((sum, month) => sum + month.rate, 0) /
      renewalRateData.length;

    return {
      revenue: totalRevenue,
      policies: totalPolicies,
      clients: totalNewClients,
      renewalRate: avgRenewalRate,
    };
  };

  const totals = calculateTotals();

  const sortedPolicies = [...topPerformingPoliciesData].sort((a, b) => {
    let comparison = 0;

    switch (sortField) {
      case "policyType":
        comparison = a.policyType.localeCompare(b.policyType);
        break;
      case "totalSold":
        comparison = a.totalSold - b.totalSold;
        break;
      case "revenue":
        comparison = a.revenue - b.revenue;
        break;
      case "avgPremium":
        comparison = a.avgPremium - b.avgPremium;
        break;
      case "conversionRate":
        comparison = a.conversionRate - b.conversionRate;
        break;
      default:
        comparison = 0;
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  return (
    <>
      <PageTitle
        title="Reports & Analytics"
        subtitle="Track and analyze your business performance"
      />

      <ReportFilters onFilterChange={handleFilterChange} />

      <SummaryCards
        revenueTotal={totals.revenue}
        revenueChange="+15%"
        revenueDirection="up"
        policiesSold={totals.policies}
        policiesChange="+12%"
        policiesDirection="up"
        newClients={totals.clients}
        clientsChange="+8%"
        clientsDirection="up"
        renewalRate={totals.renewalRate}
        renewalChange="+2%"
        renewalDirection="up"
      />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Monthly Sales Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <MonthlySalesChart data={monthlyPerformanceData} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Policy Distribution</CardTitle>
              <div className="flex items-center space-x-2">
                <button
                  className={`px-3 py-1 text-sm rounded-md ${
                    distributionView === "count"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                  onClick={() => setDistributionView("count")}
                >
                  By Count
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-md ${
                    distributionView === "revenue"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                  onClick={() => setDistributionView("revenue")}
                >
                  By Revenue
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <PolicyDistributionChart
                data={policyDistributionData}
                dataKey={distributionView}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Data Table */}
      <TopPerformingPolicies
        data={sortedPolicies}
        onSort={handleSort}
        sortField={sortField}
        sortDirection={sortDirection}
      />
    </>
  );
}
