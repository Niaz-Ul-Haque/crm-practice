// src/components/clients/ClientsGrid.tsx
"use client";

import React from "react";
import { Client } from "@/data/clientsData";
import { formatDate } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import ClientAvatar from "@/components/clients/ClientAvatar";
import { Mail, Phone, ExternalLink, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ClientsGridProps {
  clients: Client[];
}

const ClientsGrid: React.FC<ClientsGridProps> = ({ clients }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {clients.map((client, index) => (
        <motion.div
          key={client.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
        >
          <Card className="h-full">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <Link
                  href={`/clients/${client.id}`}
                  className="flex items-center group"
                >
                  <ClientAvatar
                    firstName={client.firstName}
                    lastName={client.lastName}
                    size="md"
                  />
                  <div className="ml-3">
                    <h3 className="font-medium group-hover:text-blue-600 transition-colors">
                      {client.firstName} {client.lastName}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 mt-1 rounded text-xs font-medium ${
                        client.status === "active"
                          ? "bg-green-100 text-green-800"
                          : client.status === "inactive"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {client.status.charAt(0).toUpperCase() +
                        client.status.slice(1)}
                    </span>
                  </div>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link href={`/clients/${client.id}`}>
                      <DropdownMenuItem>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Phone className="w-4 h-4 mr-2" />
                      Call Client
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-start">
                  <Mail className="w-4 h-4 text-gray-400 mt-0.5 mr-2" />
                  <span className="text-gray-600 truncate">{client.email}</span>
                </div>
                <div className="flex items-start">
                  <Phone className="w-4 h-4 text-gray-400 mt-0.5 mr-2" />
                  <span className="text-gray-600">{client.phone}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t">
                <div>
                  <p className="text-xs text-gray-500">Active Policies</p>
                  <p className="font-medium">{client.activePolicies}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Annual Premium</p>
                  <p className="font-medium">
                    {formatCurrency(client.totalPremium)}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-500">Last Contact</p>
                  <p className="font-medium">
                    {formatDate(new Date(client.lastContactDate))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ClientsGrid;
