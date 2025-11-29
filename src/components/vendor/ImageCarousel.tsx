'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export const ImageCarousel = React.memo(function ImageCarousel({
  images,
  alt,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  if (images.length === 0) {
    return (
      <div className="relative h-64 md:h-96 bg-gray-200 rounded-xl flex items-center justify-center">
        <span className="text-gray-400">No images available</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Main image */}
      <div className="relative h-64 md:h-96 rounded-xl overflow-hidden bg-gray-200">
        <Image
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
          priority={currentIndex === 0}
        />

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-800" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
              aria-label="Next image"
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-800" />
            </button>
          </>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail dots */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-blue-600'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
});
