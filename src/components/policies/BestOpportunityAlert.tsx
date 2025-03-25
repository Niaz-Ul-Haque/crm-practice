// src/components/policies/BestOpportunityAlert.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarClock, ArrowRight, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Policy, getClientNameById } from '@/data/policiesData';
import { formatCurrency, formatPolicyType } from '@/lib/formatters';
import { formatDate } from '@/lib/utils';
import { motion } from 'framer-motion';

interface BestOpportunityAlertProps {
  policy: Policy;
  opportunity: {
    type: string;
    description: string;
    potentialSavings?: number;
  };
}

const BestOpportunityAlert: React.FC<BestOpportunityAlertProps> = ({
  policy,
  opportunity,
}) => {
  const clientName = getClientNameById(policy.clientId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-blue-50 border border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-700">
            <CalendarClock className="mr-2" size={20} />
            Best Opportunity Alert
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            <span className="font-medium">{formatPolicyType(policy.type)}</span>{' '}
            policy for {clientName} has been identified as an opportunity for{' '}
            {opportunity.type}.
          </p>

          <div className="bg-white rounded-md p-3 border mb-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Policy Type</p>
                <p className="font-medium">{formatPolicyType(policy.type)}</p>
              </div>
              <div>
                <p className="text-gray-500">Expiration Date</p>
                <p className="font-medium">
                  {formatDate(new Date(policy.endDate))}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Current Premium</p>
                <p className="font-medium">
                  {formatCurrency(policy.premium)}/year
                </p>
              </div>
              {opportunity.potentialSavings && (
                <div>
                  <p className="text-gray-500">Potential Savings</p>
                  <p className="font-medium text-green-600">
                    {formatCurrency(opportunity.potentialSavings)}/year
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-purple-700 font-medium">
              Opportunity Details:
            </p>
            <p className="text-sm text-purple-600">{opportunity.description}</p>
          </div>

          <div className="flex justify-between mt-4">
            <Button variant="outline" className="bg-white">
              Contact Client
            </Button>
            <Button>
              View Opportunity
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BestOpportunityAlert;
