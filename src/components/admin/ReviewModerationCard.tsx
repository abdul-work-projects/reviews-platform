'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import {
  CheckCircleIcon,
  XCircleIcon,
  FlagIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { Review } from '@/types';
import { StarRating, Badge, Button } from '@/components/ui';
import { useReviewStore } from '@/stores/reviewStore';
import { getVendorNameApi } from '@/lib/mockApi';

interface ReviewModerationCardProps {
  review: Review;
  showActions?: boolean;
}

export const ReviewModerationCard = React.memo(function ReviewModerationCard({
  review,
  showActions = true,
}: ReviewModerationCardProps) {
  const { approveReview, rejectReview, flagReview } = useReviewStore();
  const [vendorName, setVendorName] = useState<string>('Loading...');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    getVendorNameApi(review.vendorId).then(setVendorName);
  }, [review.vendorId]);

  const formattedDate = new Date(review.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleApprove = useCallback(async () => {
    setIsProcessing(true);
    try {
      await approveReview(review.id);
      toast.success('Review approved');
    } catch {
      toast.error('Failed to approve review');
    } finally {
      setIsProcessing(false);
    }
  }, [approveReview, review.id]);

  const handleReject = useCallback(async () => {
    setIsProcessing(true);
    try {
      await rejectReview(review.id);
      toast.success('Review rejected');
    } catch {
      toast.error('Failed to reject review');
    } finally {
      setIsProcessing(false);
    }
  }, [rejectReview, review.id]);

  const handleFlag = useCallback(async () => {
    setIsProcessing(true);
    try {
      await flagReview(review.id);
      toast.success('Review flagged for further review');
    } catch {
      toast.error('Failed to flag review');
    } finally {
      setIsProcessing(false);
    }
  }, [flagReview, review.id]);

  const statusBadgeVariant = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger',
    flagged: 'danger',
  } as const;

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <UserCircleIcon className="h-10 w-10 text-gray-300" />
          <div>
            <h3 className="font-semibold text-gray-900">{review.userName}</h3>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
        </div>
        <Badge variant={statusBadgeVariant[review.status]}>
          {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
        </Badge>
      </div>

      {/* Vendor Info */}
      <div className="mb-3">
        <span className="text-sm text-gray-500">Reviewing: </span>
        <span className="text-sm font-medium text-gray-900">{vendorName}</span>
      </div>

      {/* Rating */}
      <div className="mb-3">
        <StarRating rating={review.rating} size="sm" />
      </div>

      {/* Review Text */}
      <p className="text-gray-700 mb-4">{review.text}</p>

      {/* Photo */}
      {review.photoUrl && (
        <div className="mb-4">
          <img
            src={review.photoUrl}
            alt="Review attachment"
            className="w-32 h-24 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Actions */}
      {showActions && review.status === 'pending' && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
          <Button
            size="sm"
            onClick={handleApprove}
            disabled={isProcessing}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircleIcon className="h-4 w-4 mr-1" />
            Approve
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={handleReject}
            disabled={isProcessing}
          >
            <XCircleIcon className="h-4 w-4 mr-1" />
            Reject
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleFlag}
            disabled={isProcessing}
          >
            <FlagIcon className="h-4 w-4 mr-1" />
            Flag
          </Button>
        </div>
      )}

      {showActions && review.status === 'flagged' && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
          <Button
            size="sm"
            onClick={handleApprove}
            disabled={isProcessing}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircleIcon className="h-4 w-4 mr-1" />
            Approve Anyway
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={handleReject}
            disabled={isProcessing}
          >
            <XCircleIcon className="h-4 w-4 mr-1" />
            Reject
          </Button>
        </div>
      )}
    </article>
  );
});
