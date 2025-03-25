// src/components/clients/ClientQuickActions.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  Calendar,
  Plus,
  FileText,
  MessageSquare,
  PenSquare,
  Clock,
} from 'lucide-react';

interface ClientQuickActionsProps {
  clientName: string;
}

const ClientQuickActions: React.FC<ClientQuickActionsProps> = ({
  clientName,
}) => {
  const actions = [
    {
      icon: <Mail size={16} />,
      label: 'Send Email',
      action: () => console.log('Send Email'),
    },
    {
      icon: <Phone size={16} />,
      label: 'Call Client',
      action: () => console.log('Call Client'),
    },
    {
      icon: <Calendar size={16} />,
      label: 'Schedule Meeting',
      action: () => console.log('Schedule Meeting'),
    },
    {
      icon: <Plus size={16} />,
      label: 'Add Policy',
      action: () => console.log('Add Policy'),
    },
    {
      icon: <FileText size={16} />,
      label: 'Upload Document',
      action: () => console.log('Upload Document'),
    },
    {
      icon: <MessageSquare size={16} />,
      label: 'Send Message',
      action: () => console.log('Send Message'),
    },
    {
      icon: <PenSquare size={16} />,
      label: 'Add Note',
      action: () => console.log('Add Note'),
    },
    {
      icon: <Clock size={16} />,
      label: 'Set Reminder',
      action: () => console.log('Set Reminder'),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        {actions.map((action, index) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <Button
              variant="outline"
              className="w-full justify-start"
              size="sm"
              onClick={action.action}
            >
              <span className="mr-2">{action.icon}</span>
              {action.label}
            </Button>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ClientQuickActions;
