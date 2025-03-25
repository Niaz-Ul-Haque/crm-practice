// src/components/clients/ClientTimeline.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  MessageSquare,
  FileText,
  Phone,
  Mail,
  RefreshCw,
  Edit,
  Plus,
  DollarSign,
  Calendar,
  Clipboard,
  Target,
  Users,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

type ActivityType =
  | 'video'
  | 'document'
  | 'note'
  | 'email'
  | 'message'
  | 'call'
  | 'policy_renewal'
  | 'policy_update'
  | 'policy_added'
  | 'payment'
  | 'meeting'
  | 'opportunity'
  | 'task'
  | 'claim'
  | 'client_added'
  | 'sms';

interface TimelineItem {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  date: string;
  clientId: string;
  policyId?: string;
  opportunityId?: string;
  taskId?: string;
  communicationId?: string;
  tags?: string[];
  amount?: number;
  status?: string;
  assignedTo?: string;
  attachments?: string[];
  location?: string;
}

interface ClientTimelineProps {
  activities: TimelineItem[];
}

const ClientTimeline: React.FC<ClientTimelineProps> = ({ activities }) => {
  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      case 'document':
        return <FileText className="h-4 w-4 text-purple-500" />;
      case 'call':
        return <Phone className="h-4 w-4 text-green-500" />;
      case 'email':
        return <Mail className="h-4 w-4 text-amber-500" />;
      case 'policy_renewal':
        return <RefreshCw className="h-4 w-4 text-indigo-500" />;
      case 'policy_update':
        return <Edit className="h-4 w-4 text-pink-500" />;
      case 'policy_added':
        return <Plus className="h-4 w-4 text-teal-500" />;
      case 'payment':
        return <DollarSign className="h-4 w-4 text-emerald-500" />;
      case 'meeting':
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case 'note':
        return <Clipboard className="h-4 w-4 text-yellow-500" />;
      case 'opportunity':
        return <Target className="h-4 w-4 text-red-500" />;
      case 'task':
        return <Clipboard className="h-4 w-4 text-orange-500" />;
      case 'claim':
        return <FileText className="h-4 w-4 text-red-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };

  const validActivities = Array.isArray(activities) ? activities : [];

  const sortedActivities = [...validActivities].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        {sortedActivities.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">
            No activity records found
          </p>
        ) : (
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200"></div>

            <div className="space-y-6">
              {sortedActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="relative pl-10"
                >
                  <div className="absolute left-0 p-2 rounded-full bg-white border border-gray-200">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{activity.title}</h4>
                    {activity.description && (
                      <p className="text-sm text-gray-500 mt-1">
                        {activity.description}
                      </p>
                    )}
                    {activity.tags && activity.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {activity.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDistanceToNow(new Date(activity.date), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientTimeline;
