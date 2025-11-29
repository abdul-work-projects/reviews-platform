'use client';

import React, { useEffect } from 'react';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { useReviewStore } from '@/stores/reviewStore';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ReviewModerationCard } from '@/components/admin/ReviewModerationCard';
import { PageLoader } from '@/components/ui';

export default function AdminReviewsPage() {
  const { pendingReviews, isLoading, fetchPendingReviews } = useReviewStore();

  useEffect(() => {
    fetchPendingReviews();
  }, [fetchPendingReviews]);

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center gap-3 mb-6">
          <ClipboardDocumentListIcon className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Moderation Queue
            </h1>
            <p className="text-gray-600">
              Review and moderate pending reviews
            </p>
          </div>
        </div>

        {isLoading ? (
          <PageLoader text="Loading pending reviews..." />
        ) : pendingReviews.length === 0 ? (
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
              All caught up!
            </h2>
            <p className="text-gray-600">
              There are no pending reviews to moderate.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-sm text-gray-600 mb-4">
              {pendingReviews.length} review{pendingReviews.length !== 1 ? 's' : ''} pending moderation
            </div>
            {pendingReviews.map((review) => (
              <ReviewModerationCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
