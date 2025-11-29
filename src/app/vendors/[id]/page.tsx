'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { useVendorStore } from '@/stores/vendorStore';
import { useReviewStore } from '@/stores/reviewStore';
import { useAuthStore } from '@/stores/authStore';
import { VendorDetail } from '@/components/vendor/VendorDetail';
import { ReviewCard } from '@/components/vendor/ReviewCard';
import { ReviewForm } from '@/components/vendor/ReviewForm';
import { PageLoader, Button } from '@/components/ui';

export default function VendorPage() {
  const params = useParams();
  const router = useRouter();
  const vendorId = params.id as string;

  const { currentVendor, isLoading: isLoadingVendor, fetchVendorById } = useVendorStore();
  const { reviews, isLoading: isLoadingReviews, fetchReviewsByVendor } = useReviewStore();
  const { isAuthenticated } = useAuthStore();

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    if (vendorId) {
      fetchVendorById(vendorId);
      fetchReviewsByVendor(vendorId);
    }
  }, [vendorId, fetchVendorById, fetchReviewsByVendor]);

  const handleWriteReview = useCallback(() => {
    if (!isAuthenticated) {
      toast.error('Please login to write a review');
      router.push('/login');
      return;
    }
    setIsReviewModalOpen(true);
  }, [isAuthenticated, router]);

  const handleReviewSuccess = useCallback(() => {
    fetchReviewsByVendor(vendorId);
  }, [fetchReviewsByVendor, vendorId]);

  if (isLoadingVendor) {
    return <PageLoader text="Loading vendor..." />;
  }

  if (!currentVendor) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Vendor Not Found</h1>
        <p className="text-gray-600 mb-6">
          The vendor you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/vendors">
          <Button>Browse Vendors</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <Link
        href="/vendors"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span>Back to Vendors</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Vendor Details */}
        <div className="lg:col-span-2">
          <VendorDetail
            vendor={currentVendor}
            onWriteReview={handleWriteReview}
            isAuthenticated={isAuthenticated}
          />
        </div>

        {/* Reviews Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Reviews ({reviews.length})
            </h2>

            {isLoadingReviews ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full" />
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                        <div className="h-3 bg-gray-200 rounded w-1/4 mb-3" />
                        <div className="h-4 bg-gray-200 rounded w-full mb-1" />
                        <div className="h-4 bg-gray-200 rounded w-2/3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No reviews yet</p>
                <Button size="sm" onClick={handleWriteReview}>
                  Be the first to review
                </Button>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <ReviewForm
        vendorId={vendorId}
        vendorName={currentVendor.name}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSuccess={handleReviewSuccess}
      />
    </div>
  );
}
