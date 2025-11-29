'use client';

import React from 'react';
import { Vendor } from '@/types';
import { VendorCard } from './VendorCard';

interface VendorGridProps {
  vendors: Vendor[];
  isLoading?: boolean;
}

export const VendorGrid = React.memo(function VendorGrid({
  vendors,
  isLoading = false,
}: VendorGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse"
          >
            <div className="h-48 bg-gray-200" />
            <div className="p-4">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
              <div className="h-4 bg-gray-200 rounded w-full mb-2" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (vendors.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="text-gray-400 mb-4">
          <svg
            className="mx-auto h-16 w-16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No vendors found
        </h3>
        <p className="text-gray-600">
          Try adjusting your filters or search query.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vendors.map((vendor) => (
        <VendorCard key={vendor.id} vendor={vendor} />
      ))}
    </div>
  );
});
