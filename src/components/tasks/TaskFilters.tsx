// src/components/tasks/TaskFilters.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, X, Filter, ChevronDown, Calendar, List } from "lucide-react";

interface TaskFiltersProps {
  onFilterChange: (filters: any) => void;
  onViewModeChange: (mode: "list" | "calendar") => void;
  currentViewMode: "list" | "calendar";
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  onFilterChange,
  onViewModeChange,
  currentViewMode,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    types: [] as string[],
    statuses: [] as string[],
    priorities: [] as string[],
    dateRange: "all" as "all" | "today" | "week" | "month" | "overdue",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ ...filters, searchTerm });
  };

  const handleTypeChange = (type: string) => {
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

  const handleStatusChange = (status: string) => {
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

  const handlePriorityChange = (priority: string) => {
    const updatedPriorities = filters.priorities.includes(priority)
      ? filters.priorities.filter((p) => p !== priority)
      : [...filters.priorities, priority];

    const updatedFilters = {
      ...filters,
      priorities: updatedPriorities,
    };

    setFilters(updatedFilters);
    onFilterChange({ ...updatedFilters, searchTerm });
  };

  const handleDateRangeChange = (range: typeof filters.dateRange) => {
    const updatedFilters = {
      ...filters,
      dateRange: range,
    };

    setFilters(updatedFilters);
    onFilterChange({ ...updatedFilters, searchTerm });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({
      types: [],
      statuses: [],
      priorities: [],
      dateRange: "all",
    });
    onFilterChange({
      searchTerm: "",
      types: [],
      statuses: [],
      priorities: [],
      dateRange: "all",
    });
  };

  const hasActiveFilters =
    searchTerm ||
    filters.types.length > 0 ||
    filters.statuses.length > 0 ||
    filters.priorities.length > 0 ||
    filters.dateRange !== "all";

  const formatLabel = (text: string) => {
    return text
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="mb-6 space-y-2">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <form onSubmit={handleSearch}>
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  onFilterChange({ ...filters, searchTerm: "" });
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
            <div className="px-2 py-1.5 text-sm font-medium">Task Type</div>
            {["call", "meeting", "email", "follow_up", "review", "other"].map(
              (type) => (
                <DropdownMenuCheckboxItem
                  key={type}
                  checked={filters.types.includes(type)}
                  onCheckedChange={() => handleTypeChange(type)}
                >
                  {formatLabel(type)}
                </DropdownMenuCheckboxItem>
              )
            )}

            <DropdownMenuSeparator />

            <div className="px-2 py-1.5 text-sm font-medium">Status</div>
            {["pending", "in_progress", "completed", "cancelled"].map(
              (status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={filters.statuses.includes(status)}
                  onCheckedChange={() => handleStatusChange(status)}
                >
                  {formatLabel(status)}
                </DropdownMenuCheckboxItem>
              )
            )}

            <DropdownMenuSeparator />

            <div className="px-2 py-1.5 text-sm font-medium">Priority</div>
            {["high", "medium", "low"].map((priority) => (
              <DropdownMenuCheckboxItem
                key={priority}
                checked={filters.priorities.includes(priority)}
                onCheckedChange={() => handlePriorityChange(priority)}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </DropdownMenuCheckboxItem>
            ))}

            <DropdownMenuSeparator />

            <div className="px-2 py-1.5 text-sm font-medium">Date Range</div>
            <DropdownMenuCheckboxItem
              checked={filters.dateRange === "all"}
              onCheckedChange={() => handleDateRangeChange("all")}
            >
              All Tasks
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.dateRange === "today"}
              onCheckedChange={() => handleDateRangeChange("today")}
            >
              Due Today
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.dateRange === "week"}
              onCheckedChange={() => handleDateRangeChange("week")}
            >
              Due This Week
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.dateRange === "month"}
              onCheckedChange={() => handleDateRangeChange("month")}
            >
              Due This Month
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.dateRange === "overdue"}
              onCheckedChange={() => handleDateRangeChange("overdue")}
            >
              Overdue Tasks
            </DropdownMenuCheckboxItem>

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

        <div className="flex space-x-1 border rounded-md overflow-hidden">
          <Button
            variant={currentViewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("list")}
            className="rounded-none"
          >
            <List size={16} className="mr-1" />
            List
          </Button>
          <Button
            variant={currentViewMode === "calendar" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("calendar")}
            className="rounded-none"
          >
            <Calendar size={16} className="mr-1" />
            Calendar
          </Button>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center text-sm flex-wrap">
          <span className="text-gray-500 mr-2">Active filters:</span>
          {searchTerm && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2 mb-1">
              Search: {searchTerm}
            </span>
          )}
          {filters.types.map((type) => (
            <span
              key={type}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mr-2 mb-1"
            >
              Type: {formatLabel(type)}
            </span>
          ))}
          {filters.statuses.map((status) => (
            <span
              key={status}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2 mb-1"
            >
              Status: {formatLabel(status)}
            </span>
          ))}
          {filters.priorities.map((priority) => (
            <span
              key={priority}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 mr-2 mb-1"
            >
              Priority: {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
          ))}
          {filters.dateRange !== "all" && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mr-2 mb-1">
              Range: {formatLabel(filters.dateRange)}
            </span>
          )}
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

export default TaskFilters;
