// src/components/policies/PoliciesTable.tsx
"use client";

import React from "react";
import { Policy } from "@/data/policiesData";
import { getClientNameById } from "@/data/policiesData";
import {
  formatCurrency,
  formatPolicyType,
  formatPolicyStatus,
} from "@/lib/formatters";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  Edit,
  Trash,
  RefreshCw,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { motion } from "framer-motion";

interface PoliciesTableProps {
  policies: Policy[];
  sortField?: string;
  sortDirection?: "asc" | "desc";
  onSort?: (field: string) => void;
}

const PoliciesTable: React.FC<PoliciesTableProps> = ({
  policies,
  sortField = "endDate",
  sortDirection = "asc",
  onSort,
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
          sortField === field ? "opacity-100" : "opacity-40"
        }`}
      />
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <div className="grid grid-cols-7 font-medium text-sm text-gray-500">
          <div>
            <SortableHeader field="policyNumber">Policy #</SortableHeader>
          </div>
          <div>
            <SortableHeader field="client">Client</SortableHeader>
          </div>
          <div>
            <SortableHeader field="type">Type</SortableHeader>
          </div>
          <div>
            <SortableHeader field="endDate">Expiration</SortableHeader>
          </div>
          <div>
            <SortableHeader field="premium">Premium</SortableHeader>
          </div>
          <div>
            <SortableHeader field="status">Status</SortableHeader>
          </div>
          <div>Actions</div>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {policies.map((policy, index) => (
          <motion.div
            key={policy.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
            className="px-6 py-4 hover:bg-gray-50"
          >
            <div className="grid grid-cols-7 items-center">
              <div className="text-sm font-medium">{policy.policyNumber}</div>
              <div className="text-sm">
                {getClientNameById(policy.clientId)}
              </div>
              <div className="text-sm">{formatPolicyType(policy.type)}</div>
              <div className="text-sm">
                {formatDate(new Date(policy.endDate))}
              </div>
              <div className="text-sm">{formatCurrency(policy.premium)}</div>
              <div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    formatPolicyStatus(policy.status).color
                  }`}
                >
                  {formatPolicyStatus(policy.status).text}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Link href={`/policies/${policy.id}`}>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link href={`/policies/${policy.id}/edit`}>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Renew
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PoliciesTable;
