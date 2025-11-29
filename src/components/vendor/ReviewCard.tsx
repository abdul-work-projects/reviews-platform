'use client';

import React from 'react';
import Image from 'next/image';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { Review } from '@/types';
import { StarRating } from '@/components/ui';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = React.memo(function ReviewCard({ review }: ReviewCardProps) {
  const formattedDate = new Date(review.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <UserCircleIcon className="h-12 w-12 text-gray-300" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-semibold text-gray-900">{review.userName}</h3>
              <p className="text-sm text-gray-500">{formattedDate}</p>
            </div>
            <StarRating rating={review.rating} size="sm" />
          </div>

          {/* Review text */}
          <p className="mt-3 text-gray-700 leading-relaxed">{review.text}</p>

          {/* Photo if exists */}
          {review.photoUrl && (
            <div className="mt-4">
              <div className="relative w-48 h-32 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={review.photoUrl}
                  alt="Review photo"
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
});
