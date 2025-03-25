// src/components/reports/TopPerformingPolicies.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpDown, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/formatters';

interface TopPerformingPolicy {
  policyType: string;
  totalSold: number;
  revenue: number;
  avgPremium: number;
  conversionRate: number;
  clientSegment?: string;
  growthRate?: number;
}

interface TopPerformingPoliciesProps {
  data: TopPerformingPolicy[];
  onSort?: (field: string) => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}

const TopPerformingPolicies: React.FC<TopPerformingPoliciesProps> = ({
  data,
  onSort,
  sortField = 'revenue',
  sortDirection = 'desc',
}) => {
  const SortableHeader = ({
    field,
    children,
  }: {
    field: string;
    children: React.ReactNode;
  }) => (
    <div
      className="flex items-center cursor-pointer"
      onClick={() => onSort && onSort(field)}
    >
      {children}
      <ArrowUpDown
        className={`ml-2 h-4 w-4 ${
          sortField === field ? 'opacity-100' : 'opacity-40'
        }`}
      />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Policies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-500 border-b">
                  <th className="px-4 py-3">
                    <SortableHeader field="policyType">
                      Policy Type
                    </SortableHeader>
                  </th>
                  <th className="px-4 py-3">
                    <SortableHeader field="totalSold">
                      Total Sold
                    </SortableHeader>
                  </th>
                  <th className="px-4 py-3">
                    <SortableHeader field="revenue">Revenue</SortableHeader>
                  </th>
                  <th className="px-4 py-3">
                    <SortableHeader field="avgPremium">
                      Avg. Premium
                    </SortableHeader>
                  </th>
                  <th className="px-4 py-3">
                    <SortableHeader field="conversionRate">
                      Conversion Rate
                    </SortableHeader>
                  </th>
                  <th className="px-4 py-3">
                    <SortableHeader field="growthRate">Growth</SortableHeader>
                  </th>
                  <th className="px-4 py-3">
                    <SortableHeader field="clientSegment">
                      Primary Segment
                    </SortableHeader>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.map((policy, index) => (
                  <motion.tr
                    key={policy.policyType}
                    className="hover:bg-gray-50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <td className="px-4 py-4 font-medium">
                      {policy.policyType}
                    </td>
                    <td className="px-4 py-4">{policy.totalSold}</td>
                    <td className="px-4 py-4">
                      {formatCurrency(policy.revenue)}
                    </td>
                    <td className="px-4 py-4">
                      {formatCurrency(policy.avgPremium)}
                    </td>
                    <td className="px-4 py-4">{policy.conversionRate}%</td>
                    <td className="px-4 py-4">
                      {policy.growthRate !== undefined ? (
                        <div className="flex items-center">
                          <TrendingUp
                            className={`h-4 w-4 mr-1 ${policy.growthRate > 0 ? 'text-green-500' : 'text-red-500'}`}
                          />
                          <span
                            className={
                              policy.growthRate > 0
                                ? 'text-green-600'
                                : 'text-red-600'
                            }
                          >
                            {(policy.growthRate * 100).toFixed(1)}%
                          </span>
                        </div>
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {policy.clientSegment ? (
                        <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs">
                          {policy.clientSegment}
                        </span>
                      ) : (
                        'Various'
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TopPerformingPolicies;
