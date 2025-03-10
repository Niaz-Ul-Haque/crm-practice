// src/components/clients/NextPolicyRenewal.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarClock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";

interface NextPolicyRenewalProps {
  client: {
    firstName: string;
    lastName: string;
  };
  policy: {
    id: string;
    type: string;
    expirationDate: string;
    premium: number;
  };
}

const NextPolicyRenewal: React.FC<NextPolicyRenewalProps> = ({
  client,
  policy,
}) => {
  const expirationDate = new Date(policy.expirationDate);
  const today = new Date();
  const daysUntilExpiration = Math.round(
    (expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  const getUrgencyColor = () => {
    if (daysUntilExpiration <= 7) return "bg-red-50 border-red-100";
    if (daysUntilExpiration <= 30) return "bg-amber-50 border-amber-100";
    return "bg-blue-50 border-blue-100";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`${getUrgencyColor()}`}>
        <CardHeader>
          <CardTitle className="flex items-center text-purple-700">
            <CalendarClock className="mr-2" size={20} />
            Next Policy Renewal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            <span className="font-medium">{policy.type}</span> policy for{" "}
            {client.firstName} {client.lastName} is set to expire in{" "}
            <span className="font-medium">{daysUntilExpiration} days</span>.
          </p>

          <div className="bg-white rounded-md p-3 border mb-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Policy Type</p>
                <p className="font-medium">{policy.type}</p>
              </div>
              <div>
                <p className="text-gray-500">Expiration Date</p>
                <p className="font-medium">{formatDate(expirationDate)}</p>
              </div>
              <div>
                <p className="text-gray-500">Premium</p>
                <p className="font-medium">
                  {formatCurrency(policy.premium)}/year
                </p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <p className="font-medium">Active</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline">Contact Client</Button>
            <Button>
              Process Renewal
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NextPolicyRenewal;
