// src/components/clients/ClientsTable.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Client } from '@/data/clientsData';
import { formatDate } from '@/lib/utils';
import { formatCurrency } from '@/lib/formatters';
import Link from 'next/link';
import { Eye, MoreHorizontal, Edit, Trash, Mail, Phone } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';

interface ClientsTableProps {
  clients: Client[];
}

const ClientsTable: React.FC<ClientsTableProps> = ({ clients }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <div className="grid grid-cols-6 font-medium text-sm text-gray-500">
          <div>Name</div>
          <div>Contact</div>
          <div>Policies</div>
          <div>Last Contact</div>
          <div>Total Premium</div>
          <div>Actions</div>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {clients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="px-6 py-4 hover:bg-gray-50"
          >
            <div className="grid grid-cols-6">
              <div className="font-medium">
                {client.firstName} {client.lastName}
              </div>
              <div>
                <div className="flex items-center text-sm text-gray-500">
                  <Mail className="w-3 h-3 mr-1" />
                  {client.email}
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Phone className="w-3 h-3 mr-1" />
                  {client.phone}
                </div>
              </div>
              <div className="flex items-center">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    client.activePolicies > 0
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {client.activePolicies} Active
                </span>
              </div>
              <div>{formatDate(new Date(client.lastContactDate))}</div>
              <div>{formatCurrency(client.totalPremium)}</div>
              <div className="flex items-center space-x-2">
                <Link href={`/clients/${client.id}`}>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link href={`/clients/${client.id}/edit`}>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ClientsTable;
