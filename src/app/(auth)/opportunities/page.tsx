// src/app/(auth)/opportunities/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import PageTitle from '@/components/shared/PageTitle';
import OpportunitiesTable from '@/components/opportunities/OpportunitiesTable';
import OpportunityFilters from '@/components/opportunities/OpportunityFilters';
import OpportunityDetail from '@/components/opportunities/OpportunityDetail';
import {
  opportunitiesData,
  Opportunity,
  getClientForOpportunity,
  getPolicyForOpportunity,
} from '@/data/opportunitiesData';
import { motion, AnimatePresence } from 'framer-motion';
import OpportunitySummary from '@/components/opportunities/OpportunitySummary';
import OpportunityRecommendations from '@/components/opportunities/OpportunityRecommendations';
import { Button } from '@/components/ui/button';

export default function OpportunitiesPage() {
  const [opportunities] = useState<Opportunity[]>(opportunitiesData);
  const [filteredOpportunities, setFilteredOpportunities] =
    useState<Opportunity[]>(opportunitiesData);
  const [selectedOpportunity, setSelectedOpportunity] = useState<string | null>(
    null
  );
  const [sortField, setSortField] = useState<string>('priority');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState({
    searchTerm: '',
    types: [] as string[],
    statuses: [] as string[],
    priorities: [] as string[],
  });

  const handleSort = (field: string) => {
    setSortField(field);
    setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
  };

  const handleViewDetails = (id: string) => {
    setSelectedOpportunity(id);
  };

  const handleCloseDetails = () => {
    setSelectedOpportunity(null);
  };

  useEffect(() => {
    let result = [...opportunities];

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(
        (opportunity) =>
          opportunity.description.toLowerCase().includes(searchLower) ||
          opportunity.type.toLowerCase().includes(searchLower)
      );
    }

    if (filters.types.length > 0) {
      result = result.filter((opportunity) =>
        filters.types.includes(opportunity.type)
      );
    }

    if (filters.statuses.length > 0) {
      result = result.filter((opportunity) =>
        filters.statuses.includes(opportunity.status)
      );
    }

    if (filters.priorities.length > 0) {
      result = result.filter((opportunity) =>
        filters.priorities.includes(opportunity.priority)
      );
    }

    result.sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case 'client':
          comparison = a.clientId.localeCompare(b.clientId);
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        case 'description':
          comparison = a.description.localeCompare(b.description);
          break;
        case 'priority':
          const priorityMap: Record<string, number> = {
            high: 3,
            medium: 2,
            low: 1,
          };
          comparison = priorityMap[a.priority] - priorityMap[b.priority];
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        default:
          comparison = 0;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    setFilteredOpportunities(result);
  }, [opportunities, filters, sortField, sortDirection]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const getOpportunityDetails = () => {
    if (!selectedOpportunity) return null;

    const opportunity = opportunitiesData.find(
      (o) => o.id === selectedOpportunity
    );
    if (!opportunity) return null;

    const client = getClientForOpportunity(selectedOpportunity);
    const policy = getPolicyForOpportunity(selectedOpportunity);

    if (!client) return null;

    return { opportunity, client, policy };
  };

  const details = selectedOpportunity ? getOpportunityDetails() : null;

  return (
    <>
      <PageTitle
        title="Best Opportunities"
        subtitle="Identify and act on high-value opportunities"
      />

      <OpportunitySummary opportunities={opportunities} />

      <OpportunityRecommendations
        opportunities={opportunities}
        onViewDetails={handleViewDetails}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <OpportunityFilters onFilterChange={handleFilterChange} />

        <OpportunitiesTable
          opportunities={filteredOpportunities}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onViewDetails={handleViewDetails}
        />

        {filteredOpportunities.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border mt-6">
            <h3 className="text-lg font-medium mb-2">No opportunities found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        )}

        {/* Opportunity detail modal */}
        <AnimatePresence>
          {selectedOpportunity && details && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
              <OpportunityDetail
                opportunity={details.opportunity}
                client={details.client}
                policy={details.policy}
                onClose={handleCloseDetails}
              />
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

const clearFilters = () => {
  window.location.reload();
};
