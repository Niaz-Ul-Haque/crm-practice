// src/components/opportunities/OpportunitiesTable.tsx
"use client";

import React from "react";
import { Opportunity, getClientForOpportunity } from "@/data/opportunitiesData";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  CheckSquare,
  X,
  Clock,
  Calendar,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

interface OpportunitiesTableProps {
  opportunities: Opportunity[];
  sortField?: string;
  sortDirection?: "asc" | "desc";
  onSort?: (field: string) => void;
  onViewDetails?: (id: string) => void;
}

const OpportunitiesTable: React.FC<OpportunitiesTableProps> = ({
  opportunities,
  sortField = "priority",
  sortDirection = "asc",
  onSort,
  onViewDetails,
}) => {
  console.log(sortDirection);
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

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "eligible":
        return "bg-blue-100 text-blue-800";
      case "pending_review":
        return "bg-amber-100 text-amber-800";
      case "in_progress":
        return "bg-purple-100 text-purple-800";
      case "recommended":
        return "bg-indigo-100 text-indigo-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatStatus = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-amber-600";
      case "low":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <div className="grid grid-cols-7 font-medium text-sm text-gray-500">
          <div>
            <SortableHeader field="client">Client</SortableHeader>
          </div>
          <div>
            <SortableHeader field="type">Opportunity</SortableHeader>
          </div>
          <div className="col-span-2">
            <SortableHeader field="description">Description</SortableHeader>
          </div>
          <div>
            <SortableHeader field="priority">Priority</SortableHeader>
          </div>
          <div>
            <SortableHeader field="status">Status</SortableHeader>
          </div>
          <div>Actions</div>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {opportunities.length > 0 ? (
          opportunities.map((opportunity, index) => {
            const client = getClientForOpportunity(opportunity.id);

            return (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className="px-6 py-4 hover:bg-gray-50"
              >
                <div className="grid grid-cols-7 items-center">
                  <div className="text-sm font-medium">
                    {client
                      ? `${client.firstName} ${client.lastName}`
                      : "Unknown Client"}
                  </div>
                  <div className="text-sm">
                    {opportunity.type.split("_").join(" ")}
                  </div>
                  <div className="col-span-2 text-sm">
                    <p className="line-clamp-2">{opportunity.description}</p>
                  </div>
                  <div
                    className={`text-sm font-medium ${getPriorityStyles(
                      opportunity.priority
                    )}`}
                  >
                    {opportunity.priority.charAt(0).toUpperCase() +
                      opportunity.priority.slice(1)}
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(
                        opportunity.status
                      )}`}
                    >
                      {formatStatus(opportunity.status)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        onViewDetails && onViewDetails(opportunity.id)
                      }
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule Call
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CheckSquare className="w-4 h-4 mr-2" />
                          Mark as Reviewed
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Clock className="w-4 h-4 mr-2" />
                          Postpone
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <X className="w-4 h-4 mr-2" />
                          Dismiss
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="px-6 py-10 text-center text-gray-500">
            No opportunities found.
          </div>
        )}
      </div>
    </div>
  );
};

export default OpportunitiesTable;
