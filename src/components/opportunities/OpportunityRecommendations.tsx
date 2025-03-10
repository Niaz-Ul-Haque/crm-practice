// src/components/opportunities/OpportunityRecommendations.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Opportunity } from "@/data/opportunitiesData";
import { formatCurrency } from "@/lib/formatters";
import { ChevronRight, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface OpportunityRecommendationsProps {
  opportunities: Opportunity[];
  onViewDetails: (id: string) => void;
}

const OpportunityRecommendations: React.FC<OpportunityRecommendationsProps> = ({
  opportunities,
  onViewDetails,
}) => {
  const highPriorityOpportunities = opportunities
    .filter(
      (opp) =>
        opp.priority === "high" &&
        (opp.status === "eligible" || opp.status === "pending_review")
    )
    .slice(0, 3);

  const topRevenueOpportunities = [...opportunities]
    .filter((opp) => opp.potentialRevenue && opp.potentialRevenue > 0)
    .sort((a, b) => (b.potentialRevenue || 0) - (a.potentialRevenue || 0))
    .slice(0, 3);

  const topSavingsOpportunities = [...opportunities]
    .filter((opp) => opp.potentialSavings && opp.potentialSavings > 0)
    .sort((a, b) => (b.potentialSavings || 0) - (a.potentialSavings || 0))
    .slice(0, 3);

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Star className="text-red-500 w-5 h-5 mr-2" />
              High Priority
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {highPriorityOpportunities.length > 0 ? (
                highPriorityOpportunities.map((opp, index) => (
                  <div
                    key={opp.id}
                    className="p-2 border rounded hover:bg-gray-50 cursor-pointer"
                    onClick={() => onViewDetails(opp.id)}
                  >
                    <div className="flex justify-between items-start">
                      <p className="font-medium">
                        {opp.type
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </p>
                      <span
                        className={`flex items-center text-xs ${getPriorityStyles(
                          opp.priority
                        )}`}
                      >
                        <Star className="w-3 h-3 mr-0.5" />
                        {opp.priority.charAt(0).toUpperCase() +
                          opp.priority.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {opp.description}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">
                  No high priority opportunities
                </p>
              )}

              {highPriorityOpportunities.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() =>
                    window.scrollTo({
                      top: document.body.scrollHeight,
                      behavior: "smooth",
                    })
                  }
                >
                  View All <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Zap className="text-green-500 w-5 h-5 mr-2" />
              Top Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topRevenueOpportunities.length > 0 ? (
                topRevenueOpportunities.map((opp, index) => (
                  <div
                    key={opp.id}
                    className="p-2 border rounded hover:bg-gray-50 cursor-pointer"
                    onClick={() => onViewDetails(opp.id)}
                  >
                    <div className="flex justify-between items-start">
                      <p className="font-medium">
                        {opp.type
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </p>
                      <span className="text-green-600 font-medium">
                        {formatCurrency(opp.potentialRevenue || 0)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {opp.description}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">
                  No revenue opportunities
                </p>
              )}

              {topRevenueOpportunities.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() =>
                    window.scrollTo({
                      top: document.body.scrollHeight,
                      behavior: "smooth",
                    })
                  }
                >
                  View All <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Zap className="text-blue-500 w-5 h-5 mr-2" />
              Client Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topSavingsOpportunities.length > 0 ? (
                topSavingsOpportunities.map((opp, index) => (
                  <div
                    key={opp.id}
                    className="p-2 border rounded hover:bg-gray-50 cursor-pointer"
                    onClick={() => onViewDetails(opp.id)}
                  >
                    <div className="flex justify-between items-start">
                      <p className="font-medium">
                        {opp.type
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </p>
                      <span className="text-blue-600 font-medium">
                        {formatCurrency(opp.potentialSavings || 0)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {opp.description}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">
                  No savings opportunities
                </p>
              )}

              {topSavingsOpportunities.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() =>
                    window.scrollTo({
                      top: document.body.scrollHeight,
                      behavior: "smooth",
                    })
                  }
                >
                  View All <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OpportunityRecommendations;
