// src/components/dashboard/BestOpportunityAlert.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarClock } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface Opportunity {
  clientName: string;
  policyType: string;
  expiryDate: string;
  opportunity: string;
  potentialSavings: string;
}

interface BestOpportunityAlertProps {
  opportunities: Opportunity[];
  delay?: number;
}

const BestOpportunityAlert: React.FC<BestOpportunityAlertProps> = ({
  opportunities,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay * 0.1 }}
    >
      <Card className="bg-blue-50 border border-blue-100">
        <CardHeader>
          <CardTitle className="text-blue-700 flex items-center">
            <CalendarClock className="mr-2" size={20} />
            Best Opportunity Alert
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-600 mb-4">
            {opportunities.length} clients have policies expiring soon. These
            represent your best opportunities.
          </p>

          <div className="space-y-3 mb-4">
            {opportunities.slice(0, 2).map((opp, index) => (
              <div
                key={index}
                className="bg-white p-3 rounded-md border border-blue-200 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{opp.clientName}</p>
                  <p className="text-sm text-gray-600">
                    {opp.policyType} • Expires{" "}
                    {formatDate(new Date(opp.expiryDate))}
                  </p>
                  <p className="text-sm mt-1">
                    <span className="text-blue-600 font-medium">
                      Opportunity:
                    </span>{" "}
                    {opp.opportunity}
                    {opp.potentialSavings !== "$0" && (
                      <span className="text-green-600 ml-2">
                        Save {opp.potentialSavings}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link href="/opportunities">
            <Button variant="outline" className="bg-white">
              View All Opportunities
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BestOpportunityAlert;
