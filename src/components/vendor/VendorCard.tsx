'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPinIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { Vendor } from '@/types';
import { StarRating, Badge } from '@/components/ui';

interface VendorCardProps {
  vendor: Vendor;
}

export const VendorCard = React.memo(function VendorCard({ vendor }: VendorCardProps) {
  return (
    <Link href={`/vendors/${vendor.id}`} className="group block">
      <article className="relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 border border-gray-100">
        {/* Image Container */}
        <div className="relative h-52 overflow-hidden bg-gray-100">
          <Image
            src={vendor.images[0]}
            alt={vendor.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge variant="purple" className="bg-white/90 backdrop-blur-sm text-gray-800 shadow-sm">
              {vendor.category}
            </Badge>
          </div>

          {/* Rating pill */}
          <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
            <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-semibold text-gray-900">{vendor.rating.toFixed(1)}</span>
          </div>

          {/* Hover arrow */}
          <div className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
            <ArrowUpRightIcon className="w-5 h-5 text-indigo-600" />
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">
            {vendor.name}
          </h3>

          <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
            <MapPinIcon className="h-4 w-4 flex-shrink-0" />
            <span className="line-clamp-1">{vendor.location}</span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {vendor.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <StarRating rating={vendor.rating} size="sm" />
            </div>
            <span className="text-sm text-gray-500 font-medium">
              {vendor.reviewCount} reviews
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
});
