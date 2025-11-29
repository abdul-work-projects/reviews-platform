'use client';

import React from 'react';
import { MapPinIcon, StarIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { Vendor } from '@/types';
import { StarRating, Badge, Button } from '@/components/ui';
import { ImageCarousel } from './ImageCarousel';

interface VendorDetailProps {
  vendor: Vendor;
  onWriteReview: () => void;
  isAuthenticated: boolean;
}

export const VendorDetail = React.memo(function VendorDetail({
  vendor,
  onWriteReview,
  isAuthenticated,
}: VendorDetailProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Image Carousel */}
      <div className="p-6 pb-0">
        <ImageCarousel images={vendor.images} alt={vendor.name} />
      </div>

      {/* Vendor Info */}
      <div className="p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <Badge variant="info" className="mb-2">
              {vendor.category}
            </Badge>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {vendor.name}
            </h1>
            <div className="flex items-center gap-2 mt-2 text-gray-600">
              <MapPinIcon className="h-5 w-5" />
              <span>{vendor.location}</span>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-2">
              <StarRating rating={vendor.rating} size="md" />
              <span className="text-xl font-bold text-gray-900">
                {vendor.rating.toFixed(1)}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {vendor.reviewCount} reviews
            </p>
          </div>
        </div>

        <p className="mt-6 text-gray-700 leading-relaxed">
          {vendor.description}
        </p>

        {/* Action Button */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <Button onClick={onWriteReview} size="lg" className="w-full sm:w-auto">
            <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
            Write a Review
          </Button>
          {!isAuthenticated && (
            <p className="mt-2 text-sm text-gray-500">
              You need to be logged in to write a review
            </p>
          )}
        </div>
      </div>
    </div>
  );
});
