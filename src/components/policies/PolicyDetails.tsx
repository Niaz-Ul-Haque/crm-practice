// src/components/policies/PolicyDetails.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  formatCurrency,
  formatPolicyType,
  formatPolicyStatus,
} from "@/lib/formatters";
import { formatDate } from "@/lib/utils";
import { Policy } from "@/data/policiesData";
import { getClientNameById } from "@/data/policiesData";
import {
  Edit,
  Calendar,
  DollarSign,
  Shield,
  FileText,
  User,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface PolicyDetailsProps {
  policy: Policy;
}

const PolicyDetails: React.FC<PolicyDetailsProps> = ({ policy }) => {
  const { color } = formatPolicyStatus(policy.status);
  const clientName = getClientNameById(policy.clientId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Policy Details</CardTitle>
          <Link href={`/policies/${policy.id}/edit`}>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit Policy
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500 flex items-center">
                <FileText className="w-4 h-4 mr-1 text-gray-400" />
                Policy Number
              </p>
              <p className="font-medium">{policy.policyNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 flex items-center">
                <User className="w-4 h-4 mr-1 text-gray-400" />
                Client
              </p>
              <p className="font-medium">{clientName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 flex items-center">
                <Shield className="w-4 h-4 mr-1 text-gray-400" />
                Insurance Type
              </p>
              <p className="font-medium">{formatPolicyType(policy.type)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 flex items-center">
                Status
              </p>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color} mt-1`}
              >
                {formatPolicyStatus(policy.status).text}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                Start Date
              </p>
              <p className="font-medium">
                {formatDate(new Date(policy.startDate))}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                Expiration Date
              </p>
              <p className="font-medium">
                {formatDate(new Date(policy.endDate))}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 flex items-center">
                <DollarSign className="w-4 h-4 mr-1 text-gray-400" />
                Premium
              </p>
              <p className="font-medium">
                {formatCurrency(policy.premium)}/{policy.paymentFrequency}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Coverage Amount
              </p>
              <p className="font-medium">
                {formatCurrency(policy.coverageAmount)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Provider</p>
              <p className="font-medium">{policy.provider}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Last Updated</p>
              <p className="font-medium">
                {formatDate(new Date(policy.lastUpdated))}
              </p>
            </div>
            {policy.description && (
              <div className="col-span-full">
                <p className="text-sm font-medium text-gray-500">Description</p>
                <p className="text-sm">{policy.description}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PolicyDetails;
