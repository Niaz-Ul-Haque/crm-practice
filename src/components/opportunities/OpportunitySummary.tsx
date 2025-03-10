// src/components/opportunities/OpportunitySummary.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Opportunity } from "@/data/opportunitiesData";
import { formatCurrency } from "@/lib/formatters";
import {
  ArrowDown,
  ArrowUp,
  CheckSquare,
  Clock,
  DollarSign,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

interface OpportunitySummaryProps {
  opportunities: Opportunity[];
}

const OpportunitySummary: React.FC<OpportunitySummaryProps> = ({
  opportunities,
}) => {
  const totalSavings = opportunities.reduce(
    (total, opp) => total + (opp.potentialSavings || 0),
    0
  );

  const totalRevenue = opportunities.reduce(
    (total, opp) => total + (opp.potentialRevenue || 0),
    0
  );

  const highPriority = opportunities.filter(
    (opp) => opp.priority === "high"
  ).length;
  const mediumPriority = opportunities.filter(
    (opp) => opp.priority === "medium"
  ).length;
  const lowPriority = opportunities.filter(
    (opp) => opp.priority === "low"
  ).length;

  const pendingReview = opportunities.filter(
    (opp) => opp.status === "eligible" || opp.status === "pending_review"
  ).length;

  const inProgress = opportunities.filter(
    (opp) => opp.status === "in_progress" || opp.status === "recommended"
  ).length;

  const completed = opportunities.filter(
    (opp) => opp.status === "completed" || opp.status === "rejected"
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <DollarSign className="w-4 h-4 mr-1 text-green-500" />
              Potential Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatCurrency(totalRevenue)}
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUp className="text-green-500 mr-1" size={16} />
              <span className="text-green-600">+15%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <Zap className="w-4 h-4 mr-1 text-purple-500" />
              Client Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatCurrency(totalSavings)}
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUp className="text-green-500 mr-1" size={16} />
              <span className="text-green-600">+8%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <Star className="w-4 h-4 mr-1 text-amber-500" />
              Priority Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-red-600 font-semibold">{highPriority}</div>
                <div className="text-xs text-gray-500">High</div>
              </div>
              <div>
                <div className="text-amber-600 font-semibold">
                  {mediumPriority}
                </div>
                <div className="text-xs text-gray-500">Medium</div>
              </div>
              <div>
                <div className="text-purple-600 font-semibold">
                  {lowPriority}
                </div>
                <div className="text-xs text-gray-500">Low</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="md:col-span-3"
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending Review</p>
                  <p className="text-2xl font-bold">{pendingReview}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">In Progress</p>
                  <p className="text-2xl font-bold">{inProgress}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckSquare className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="text-2xl font-bold">{completed}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OpportunitySummary;
