// src/app/(auth)/clients/page.tsx (updated)
'use client';

import React, { useState, useEffect } from 'react';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import ClientsTable from '@/components/clients/ClientsTable';
import ClientsGrid from '@/components/clients/ClientsGrid';
import ClientFilters from '@/components/clients/ClientFilters';
import AddClientDialog from '@/components/clients/AddClientDialog';
import { clientsData, Client } from '@/data/clientsData';
import { LayoutGrid, LayoutList } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(clientsData);
  const [filteredClients, setFilteredClients] = useState<Client[]>(clientsData);
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [filters, setFilters] = useState({
    searchTerm: '',
    status: [] as string[],
    policies: [] as string[],
  });

  useEffect(() => {
    let result = [...clients];

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(
        (client) =>
          `${client.firstName} ${client.lastName}`
            .toLowerCase()
            .includes(searchLower) ||
          client.email.toLowerCase().includes(searchLower)
      );
    }

    if (filters.status.length > 0) {
      result = result.filter((client) =>
        filters.status.includes(client.status)
      );
    }

    if (filters.policies.length > 0) {
    }

    setFilteredClients(result);
  }, [clients, filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleAddClient = (newClient: Client) => {
    setClients((prev) => [newClient, ...prev]);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle
          title="Clients"
          subtitle={`${filteredClients.length} clients found`}
        />
        <Button onClick={() => setIsAddClientOpen(true)}>Add New Client</Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center">
          <ClientFilters onFilterChange={handleFilterChange} />

          <div className="flex space-x-2 ml-4">
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              <LayoutList className="h-4 w-4 mr-2" />
              List
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Grid
            </Button>
          </div>
        </div>

        <div className="mt-6">
          {viewMode === 'table' ? (
            <ClientsTable clients={filteredClients} />
          ) : (
            <ClientsGrid clients={filteredClients} />
          )}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border mt-6">
            <h3 className="text-lg font-medium mb-2">No clients found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        )}

        <AddClientDialog
          isOpen={isAddClientOpen}
          onClose={() => setIsAddClientOpen(false)}
          onSave={handleAddClient}
        />
      </motion.div>
    </>
  );
}

const clearFilters = () => {
  window.location.reload();
};
