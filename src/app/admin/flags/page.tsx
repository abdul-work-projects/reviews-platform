'use client';

import React, { useEffect } from 'react';
import { FlagIcon } from '@heroicons/react/24/outline';
import { useReviewStore } from '@/stores/reviewStore';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ReviewModerationCard } from '@/components/admin/ReviewModerationCard';
import { PageLoader } from '@/components/ui';

export default function AdminFlagsPage() {
  const { flaggedReviews, isLoading, fetchFlaggedReviews } = useReviewStore();

  useEffect(() => {
    fetchFlaggedReviews();
  }, [fetchFlaggedReviews]);

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center gap-3 mb-6">
          <FlagIcon className="h-8 w-8 text-red-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Flagged Reviews
            </h1>
            <p className="text-gray-600">
              Reviews that need additional attention
            </p>
          </div>
        </div>

        {isLoading ? (
          <PageLoader text="Loading flagged reviews..." />
        ) : flaggedReviews.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No flagged reviews
            </h2>
            <p className="text-gray-600">
              There are no flagged reviews at the moment.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
              <p className="text-sm text-red-800">
                <strong>Warning:</strong> These reviews have been flagged for potential issues.
                Please review them carefully before taking action.
              </p>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              {flaggedReviews.length} flagged review{flaggedReviews.length !== 1 ? 's' : ''}
            </div>
            {flaggedReviews.map((review) => (
              <ReviewModerationCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
