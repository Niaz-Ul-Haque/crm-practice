// src/components/reports/ReportFilters.tsx
'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Calendar, Download, Printer } from 'lucide-react';

interface ReportFiltersProps {
  onFilterChange: (filters: any) => void;
}

const ReportFilters: React.FC<ReportFiltersProps> = ({ onFilterChange }) => {
  const [dateRange, setDateRange] = useState('last30Days');
  const [policyType, setPolicyType] = useState('all');

  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
    onFilterChange({ dateRange: value, policyType });
  };

  const handlePolicyTypeChange = (value: string) => {
    setPolicyType(value);
    onFilterChange({ dateRange, policyType: value });
  };

  return (
    <Card className="mb-6">
      <CardContent className="py-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex space-x-4 mb-2 sm:mb-0">
            <div>
              <Label className="text-sm font-medium block mb-1">
                Date Range
              </Label>
              <Select value={dateRange} onValueChange={handleDateRangeChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last30Days">Last 30 Days</SelectItem>
                  <SelectItem value="lastQuarter">This Quarter</SelectItem>
                  <SelectItem value="lastYear">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium block mb-1">
                Policy Type
              </Label>
              <Select value={policyType} onValueChange={handlePolicyTypeChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Policies</SelectItem>
                  <SelectItem value="home">Home Insurance</SelectItem>
                  <SelectItem value="auto">Auto Insurance</SelectItem>
                  <SelectItem value="life">Life Insurance</SelectItem>
                  <SelectItem value="health">Health Insurance</SelectItem>
                  <SelectItem value="business">Business Insurance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportFilters;
