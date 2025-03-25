// src/components/policies/PolicyFilters.tsx
'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, Filter, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PolicyType, PolicyStatus } from '@/data/policiesData';
import { formatPolicyType, formatPolicyStatus } from '@/lib/formatters';

interface PolicyFiltersProps {
  onFilterChange: (filters: any) => void;
}

const PolicyFilters: React.FC<PolicyFiltersProps> = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    types: [] as PolicyType[],
    statuses: [] as PolicyStatus[],
  });

  const policyTypes: PolicyType[] = [
    'home',
    'auto',
    'life',
    'health',
    'business',
    'renters',
    'umbrella',
  ];
  const policyStatuses: PolicyStatus[] = [
    'active',
    'pending',
    'expired',
    'cancelled',
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ ...filters, searchTerm });
  };

  const handleTypeChange = (type: PolicyType) => {
    const updatedTypes = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type];

    const updatedFilters = {
      ...filters,
      types: updatedTypes,
    };

    setFilters(updatedFilters);
    onFilterChange({ ...updatedFilters, searchTerm });
  };

  const handleStatusChange = (status: PolicyStatus) => {
    const updatedStatuses = filters.statuses.includes(status)
      ? filters.statuses.filter((s) => s !== status)
      : [...filters.statuses, status];

    const updatedFilters = {
      ...filters,
      statuses: updatedStatuses,
    };

    setFilters(updatedFilters);
    onFilterChange({ ...updatedFilters, searchTerm });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      types: [],
      statuses: [],
    });
    onFilterChange({
      searchTerm: '',
      types: [],
      statuses: [],
    });
  };

  const hasActiveFilters =
    searchTerm || filters.types.length > 0 || filters.statuses.length > 0;

  return (
    <div className="mb-6 space-y-2">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <form onSubmit={handleSearch}>
            <Input
              placeholder="Search by policy number or client name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  onFilterChange({ ...filters, searchTerm: '' });
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filters
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <div className="px-2 py-1.5 text-sm font-medium">Policy Type</div>
            {policyTypes.map((type) => (
              <DropdownMenuCheckboxItem
                key={type}
                checked={filters.types.includes(type)}
                onCheckedChange={() => handleTypeChange(type)}
              >
                {formatPolicyType(type)}
              </DropdownMenuCheckboxItem>
            ))}

            <DropdownMenuSeparator />

            <div className="px-2 py-1.5 text-sm font-medium">Status</div>
            {policyStatuses.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={filters.statuses.includes(status)}
                onCheckedChange={() => handleStatusChange(status)}
              >
                {formatPolicyStatus(status).text}
              </DropdownMenuCheckboxItem>
            ))}

            <DropdownMenuSeparator />

            <div className="px-2 py-1.5">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                disabled={!hasActiveFilters}
                onClick={clearFilters}
              >
                Clear All Filters
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <Button>Add New Policy</Button> */}
      </div>

      {hasActiveFilters && (
        <div className="flex items-center text-sm flex-wrap">
          <span className="text-gray-500 mr-2">Active filters:</span>
          {searchTerm && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-purple-800 mr-2 mb-1">
              Search: {searchTerm}
            </span>
          )}
          {filters.types.map((type) => (
            <span
              key={type}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mr-2 mb-1"
            >
              Type: {formatPolicyType(type)}
            </span>
          ))}
          {filters.statuses.map((status) => (
            <span
              key={status}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2 mb-1"
            >
              Status: {formatPolicyStatus(status).text}
            </span>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="text-xs h-6 px-2 text-gray-500"
            onClick={clearFilters}
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default PolicyFilters;
