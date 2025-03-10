// src/components/clients/ClientTimeline.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageSquare,
  FileText,
  Phone,
  Mail,
  RefreshCw,
  Edit,
  Plus,
  DollarSign,
} from "lucide-react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

type ActivityType =
  | "message"
  | "document"
  | "call"
  | "email"
  | "policy_renewal"
  | "policy_update"
  | "policy_added"
  | "payment";

interface TimelineItem {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  date: string;
}

interface ClientTimelineProps {
  activities: TimelineItem[];
}

const ClientTimeline: React.FC<ClientTimelineProps> = ({ activities }) => {
  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      case "document":
        return <FileText className="h-4 w-4 text-purple-500" />;
      case "call":
        return <Phone className="h-4 w-4 text-green-500" />;
      case "email":
        return <Mail className="h-4 w-4 text-amber-500" />;
      case "policy_renewal":
        return <RefreshCw className="h-4 w-4 text-indigo-500" />;
      case "policy_update":
        return <Edit className="h-4 w-4 text-pink-500" />;
      case "policy_added":
        return <Plus className="h-4 w-4 text-teal-500" />;
      case "payment":
        return <DollarSign className="h-4 w-4 text-emerald-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200"></div>

          <div className="space-y-6">
            {activities.map((activity, index) => (
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
      </CardContent>
    </Card>
  );
};

export default ClientTimeline;
