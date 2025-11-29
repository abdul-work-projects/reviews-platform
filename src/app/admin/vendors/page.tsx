'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { BuildingStorefrontIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useVendorStore } from '@/stores/vendorStore';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { StarRating, Badge, Button, PageLoader } from '@/components/ui';

export default function AdminVendorsPage() {
  const { vendors, isLoading, fetchVendors } = useVendorStore();

  useEffect(() => {
    fetchVendors(1, {});
  }, [fetchVendors]);

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center gap-3 mb-6">
          <BuildingStorefrontIcon className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Manage Vendors
            </h1>
            <p className="text-gray-600">
              View and manage vendor listings
            </p>
          </div>
        </div>

        {isLoading ? (
          <PageLoader text="Loading vendors..." />
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vendor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reviews
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vendors.map((vendor) => (
                    <tr key={vendor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-lg object-cover"
                              src={vendor.images[0]}
                              alt={vendor.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {vendor.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="info">{vendor.category}</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <StarRating rating={vendor.rating} size="sm" />
                          <span className="text-sm text-gray-600">
                            {vendor.rating.toFixed(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {vendor.reviewCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {vendor.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/vendors/${vendor.id}`}>
                          <Button size="sm" variant="ghost">
                            <EyeIcon className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
