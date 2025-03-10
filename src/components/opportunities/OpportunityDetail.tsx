// src/components/opportunities/OpportunityDetail.tsx
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Opportunity } from "@/data/opportunitiesData";
import { Client } from "@/data/clientsData";
import { Policy } from "@/data/policiesData";
import { formatDate } from "@/lib/utils";
import { formatCurrency, formatPolicyType } from "@/lib/formatters";
import {
  Calendar,
  CheckSquare,
  Mail,
  Phone,
  Shield,
  Star,
  User,
} from "lucide-react";
import ClientAvatar from "@/components/clients/ClientAvatar";
import Link from "next/link";
import { motion } from "framer-motion";

interface OpportunityDetailProps {
  opportunity: Opportunity;
  client: Client;
  policy?: Policy | null;
  onClose: () => void;
}

const OpportunityDetail: React.FC<OpportunityDetailProps> = ({
  opportunity,
  client,
  policy,
  onClose,
}) => {
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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Opportunity Details</CardTitle>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(
                opportunity.status
              )}`}
            >
              {formatStatus(opportunity.status)}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Client Information</h3>
              <div className="flex items-center mb-4">
                <ClientAvatar
                  firstName={client.firstName}
                  lastName={client.lastName}
                  size="md"
                />
                <div className="ml-3">
                  <h4 className="font-medium">
                    {client.firstName} {client.lastName}
                  </h4>
                  <p className="text-sm text-gray-500">{client.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p>{client.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Policies</p>
                  <p>{client.activePolicies}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Link href={`/clients/${client.id}`}>
                  <Button variant="outline" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    View Client
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </div>
            </div>

            {policy && (
              <div>
                <h3 className="text-lg font-medium mb-4">Related Policy</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Policy Number</p>
                    <p className="font-medium">{policy.policyNumber}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Type</p>
                      <p>{formatPolicyType(policy.type)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Expiration</p>
                      <p>{formatDate(new Date(policy.endDate))}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Premium</p>
                      <p>
                        {formatCurrency(policy.premium)}/
                        {policy.paymentFrequency}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Coverage</p>
                      <p>{formatCurrency(policy.coverageAmount)}</p>
                    </div>
                  </div>
                  <Link href={`/policies/${policy.id}`}>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      <Shield className="w-4 h-4 mr-2" />
                      View Full Policy
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 border-t pt-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium">Opportunity</h3>
              <div
                className={`flex items-center px-2.5 py-1 rounded-md text-sm font-medium ${getPriorityStyles(
                  opportunity.priority
                )}`}
              >
                <Star className="w-4 h-4 mr-1" />
                {opportunity.priority.charAt(0).toUpperCase() +
                  opportunity.priority.slice(1)}{" "}
                Priority
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium">
                  {opportunity.type
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p>{formatDate(new Date(opportunity.createdAt))}</p>
              </div>

              {opportunity.potentialSavings && (
                <div>
                  <p className="text-sm text-gray-500">
                    Potential Client Savings
                  </p>
                  <p className="font-medium text-green-600">
                    {formatCurrency(opportunity.potentialSavings)}/year
                  </p>
                </div>
              )}

              {opportunity.potentialRevenue && (
                <div>
                  <p className="text-sm text-gray-500">Potential Revenue</p>
                  <p className="font-medium">
                    {formatCurrency(opportunity.potentialRevenue)}
                  </p>
                </div>
              )}

              {opportunity.expiresAt && (
                <div>
                  <p className="text-sm text-gray-500">Expires</p>
                  <p>{formatDate(new Date(opportunity.expiresAt))}</p>
                </div>
              )}
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-500">Description</p>
              <p className="mt-1">{opportunity.description}</p>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-500">Recommended Action</p>
              <p className="mt-1">{opportunity.recommendedAction}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline">
              <CheckSquare className="w-4 h-4 mr-2" />
              Mark as Reviewed
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Call
            </Button>
            <Button>Take Action</Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default OpportunityDetail;
