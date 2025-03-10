// src/components/dashboard/SummaryCard.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";

interface SummaryCardProps {
  title: string;
  value: number | string;
  change?: string;
  timeFrame?: string;
  delay?: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  change,
  timeFrame,
  delay = 0,
}) => {
  const isPositive = change?.startsWith("+");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay * 0.1 }}
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{value}</div>
          {change && (
            <div className="flex items-center mt-2 text-sm">
              {isPositive ? (
                <ArrowUpRight className="text-green-500 mr-1" size={16} />
              ) : (
                <ArrowDownRight className="text-red-500 mr-1" size={16} />
              )}
              <span className={isPositive ? "text-green-600" : "text-red-600"}>
                {change}
              </span>
              {timeFrame && (
                <span className="text-gray-500 ml-1">{timeFrame}</span>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SummaryCard;
