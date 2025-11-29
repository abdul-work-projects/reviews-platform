'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import { useVendorStore } from '@/stores/vendorStore';
import { VendorFilters } from '@/components/vendor/VendorFilters';
import { VendorGrid } from '@/components/vendor/VendorGrid';
import { Pagination } from '@/components/vendor/Pagination';
import { VendorFilters as VendorFiltersType } from '@/types';

export default function VendorsPage() {
  const { vendors, pagination, filters, isLoading, fetchVendors, setFilters } = useVendorStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch vendors on mount and when filters/search change
  useEffect(() => {
    const newFilters: VendorFiltersType = {
      ...filters,
      search: debouncedSearch || undefined,
    };
    fetchVendors(1, newFilters);
  }, [debouncedSearch, fetchVendors, filters]);

  const handleFilterChange = useCallback((newFilters: VendorFiltersType) => {
    setFilters(newFilters);
  }, [setFilters]);

  const handlePageChange = useCallback((page: number) => {
    fetchVendors(page, { ...filters, search: debouncedSearch || undefined });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [fetchVendors, filters, debouncedSearch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <BuildingStorefrontIcon className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Browse Vendors
            </h1>
            <p className="text-gray-600 mt-1">
              Discover and review the best vendors in your area
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <VendorFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        {!isLoading && (
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{vendors.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{pagination.total}</span> vendors
          </p>
        )}
      </div>

      {/* Vendor Grid */}
      <VendorGrid vendors={vendors} isLoading={isLoading} />

      {/* Pagination */}
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
    </div>
  );
}
