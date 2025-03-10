// src/components/reports/SummaryCards.tsx
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  FileText,
  Users,
  Percent,
} from "lucide-react";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/formatters";

interface SummaryCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeDirection?: "up" | "down";
  icon: React.ReactNode;
  delay?: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  change,
  changeDirection,
  icon,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay * 0.1 }}
    >
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">{title}</p>
              <p className="text-2xl font-bold mt-1">{value}</p>
              {change && (
                <div className="flex items-center mt-1 text-xs">
                  {changeDirection === "up" ? (
                    <ArrowUp className="text-green-600 w-3 h-3 mr-1" />
                  ) : (
                    <ArrowDown className="text-red-600 w-3 h-3 mr-1" />
                  )}
                  <span
                    className={
                      changeDirection === "up"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {change}
                  </span>
                </div>
              )}
            </div>
            <div className="p-2 rounded-md bg-blue-50 text-blue-600">
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface SummaryCardsProps {
  revenueTotal: number;
  revenueChange: string;
  revenueDirection: "up" | "down";
  policiesSold: number;
  policiesChange: string;
  policiesDirection: "up" | "down";
  newClients: number;
  clientsChange: string;
  clientsDirection: "up" | "down";
  renewalRate: number;
  renewalChange: string;
  renewalDirection: "up" | "down";
}

const SummaryCards: React.FC<SummaryCardsProps> = ({
  revenueTotal,
  revenueChange,
  revenueDirection,
  policiesSold,
  policiesChange,
  policiesDirection,
  newClients,
  clientsChange,
  clientsDirection,
  renewalRate,
  renewalChange,
  renewalDirection,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <SummaryCard
        title="Revenue"
        value={formatCurrency(revenueTotal)}
        change={revenueChange}
        changeDirection={revenueDirection}
        icon={<DollarSign className="w-5 h-5" />}
        delay={0}
      />
      <SummaryCard
        title="Policies Sold"
        value={policiesSold}
        change={policiesChange}
        changeDirection={policiesDirection}
        icon={<FileText className="w-5 h-5" />}
        delay={1}
      />
      <SummaryCard
        title="New Clients"
        value={newClients}
        change={clientsChange}
        changeDirection={clientsDirection}
        icon={<Users className="w-5 h-5" />}
        delay={2}
      />
      <SummaryCard
        title="Renewal Rate"
        value={`${(renewalRate * 100).toFixed(1)}%`}
        change={renewalChange}
        changeDirection={renewalDirection}
        icon={<Percent className="w-5 h-5" />}
        delay={3}
      />
    </div>
  );
};

export default SummaryCards;
