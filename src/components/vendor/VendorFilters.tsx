'use client';

import React, { useCallback } from 'react';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Select, Badge } from '@/components/ui';
import { VendorFilters as VendorFiltersType } from '@/types';
import { categories } from '@/mocks/vendors';

interface VendorFiltersProps {
  filters: VendorFiltersType;
  onFilterChange: (filters: VendorFiltersType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const VendorFilters = React.memo(function VendorFilters({
  filters,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: VendorFiltersProps) {
  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...categories.map((cat) => ({ value: cat, label: cat })),
  ];

  const ratingOptions = [
    { value: '', label: 'Any Rating' },
    { value: '4.5', label: '4.5+ Stars' },
    { value: '4', label: '4+ Stars' },
    { value: '3', label: '3+ Stars' },
  ];

  const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, category: e.target.value || undefined });
  }, [filters, onFilterChange]);

  const handleRatingChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onFilterChange({ ...filters, minRating: value ? parseFloat(value) : undefined });
  }, [filters, onFilterChange]);

  const handleClearFilters = useCallback(() => {
    onFilterChange({});
    onSearchChange('');
  }, [onFilterChange, onSearchChange]);

  const hasActiveFilters = filters.category || filters.minRating || searchQuery;
  const activeFilterCount = [filters.category, filters.minRating, searchQuery].filter(Boolean).length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
            <AdjustmentsHorizontalIcon className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Filters</h2>
            <p className="text-sm text-gray-500">Refine your search</p>
          </div>
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-4 h-4" />
            Clear all
            <Badge variant="default" className="ml-1">{activeFilterCount}</Badge>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search vendors..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          />
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        {/* Category Filter */}
        <Select
          options={categoryOptions}
          value={filters.category || ''}
          onChange={handleCategoryChange}
          placeholder="All Categories"
        />

        {/* Rating Filter */}
        <Select
          options={ratingOptions}
          value={filters.minRating?.toString() || ''}
          onChange={handleRatingChange}
          placeholder="Any Rating"
        />
      </div>
    </div>
  );
});
