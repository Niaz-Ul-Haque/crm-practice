// src/components/dashboard/BestOpportunityAlert.tsx
import React from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { formatCurrency } from '@/lib/formatters';

export interface ClientOpportunity {
  clientName: string;
  clientId: string;
  policyType: string;
  expiryDate: string;
  opportunity: string;
  opportunityId: string;
  potentialRevenue: number;
  potentialSavings?: number;
  priority: string;
}

interface BestOpportunityAlertProps {
  opportunities: ClientOpportunity[];
  delay?: number;
}

const formatDate = (dateString: string) => {
  if (!dateString || dateString.trim() === '') {
    return 'N/A';
  }

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'N/A';
    }
    return format(date, 'MMM d, yyyy');
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'N/A';
  }
};

const BestOpportunityAlert: React.FC<BestOpportunityAlertProps> = ({
  opportunities,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">
          High Priority Opportunities
        </h3>
        <div className="space-y-4">
          {opportunities.map((opportunity) => (
            <div
              key={opportunity.opportunityId}
              className="bg-white p-4 rounded-lg border border-gray-100 hover:border-primary hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">
                    {opportunity.clientName}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {opportunity.policyType}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-primary">
                    {formatCurrency(opportunity.potentialRevenue)}
                  </span>
                  {opportunity.potentialSavings &&
                    opportunity.potentialSavings > 0 && (
                      <span className="text-xs text-green-600 mt-1">
                        Save: {formatCurrency(opportunity.potentialSavings)}
                      </span>
                    )}
                </div>
              </div>
              <div className="mt-3 flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-xs text-gray-500">
                    {opportunity.opportunity}
                  </span>
                </div>

                {opportunity.expiryDate && (
                  <span className="text-xs bg-amber-50 text-amber-800 py-1 px-2 rounded">
                    Expires: {formatDate(opportunity.expiryDate)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default BestOpportunityAlert;
