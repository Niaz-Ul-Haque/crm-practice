// src/components/dashboard/RecentActivity.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  RefreshCw,
  UserPlus,
  CheckSquare,
  FileEdit,
  MessageSquare,
  Calendar,
  DollarSign,
  Target,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

export type ActivityType =
  | 'policy_renewal'
  | 'client_added'
  | 'task_completed'
  | 'policy_change'
  | 'message_sent'
  | 'meeting_scheduled'
  | 'opportunity_created'
  | 'premium_payment';

export interface ActivityItem {
  type: ActivityType;
  client?: string;
  clientId?: string;
  policyType?: string;
  policyId?: string;
  task?: string;
  taskId?: string;
  change?: string;
  date: string;
  opportunity?: string;
  opportunityId?: string;
  amount?: number;
  subject?: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
  delay?: number;
}

const RecentActivity: React.FC<RecentActivityProps> = ({
  activities,
  delay = 0,
}) => {
  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'policy_renewal':
        return <RefreshCw size={18} className="text-purple-500" />;
      case 'client_added':
        return <UserPlus size={18} className="text-green-500" />;
      case 'task_completed':
        return <CheckSquare size={18} className="text-purple-500" />;
      case 'policy_change':
        return <FileEdit size={18} className="text-amber-500" />;
      case 'message_sent':
        return <MessageSquare size={18} className="text-blue-500" />;
      case 'meeting_scheduled':
        return <Calendar size={18} className="text-indigo-500" />;
      case 'opportunity_created':
        return <Target size={18} className="text-red-500" />;
      case 'premium_payment':
        return <DollarSign size={18} className="text-green-500" />;
      default:
        return <MessageSquare size={18} className="text-gray-500" />;
    }
  };

  const getActivityText = (activity: ActivityItem): string => {
    switch (activity.type) {
      case 'policy_renewal':
        return `${activity.client}'s ${activity.policyType || 'policy'} was renewed`;
      case 'client_added':
        return `${activity.client} was added as a new client`;
      case 'task_completed':
        return `Task "${activity.task}" ${activity.client ? `with ${activity.client}` : ''} was completed`;
      case 'policy_change':
        return `${activity.client}'s ${activity.policyType || 'policy'} had a change: ${activity.change || 'updated'}`;
      case 'message_sent':
        return `Message sent to ${activity.client}`;
      case 'meeting_scheduled':
        return `Meeting scheduled with ${activity.client}${activity.subject ? `: ${activity.subject}` : ''}`;
      case 'opportunity_created':
        return `New opportunity: ${activity.opportunity || ''}${activity.client ? ` for ${activity.client}` : ''}`;
      case 'premium_payment':
        return `Premium payment of ${activity.amount ? `$${activity.amount.toLocaleString()}` : ''} received from ${activity.client}${activity.policyType ? ` for ${activity.policyType}` : ''}`;
      default:
        return `Activity with ${activity.client || 'client'}`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay * 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.2,
                  delay: delay * 0.1 + index * 0.05,
                }}
                className="flex items-start space-x-3"
              >
                <div className="mt-0.5 p-1.5 rounded-full bg-gray-100">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{getActivityText(activity)}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(activity.date), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecentActivity;
