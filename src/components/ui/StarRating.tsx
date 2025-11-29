'use client';

import React, { useState, useCallback } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
  showValue?: boolean;
}

export const StarRating = React.memo(function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onChange,
  showValue = false,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeStyles = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-7 w-7',
  };

  const handleClick = useCallback((index: number) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  }, [interactive, onChange]);

  const handleMouseEnter = useCallback((index: number) => {
    if (interactive) {
      setHoverRating(index + 1);
    }
  }, [interactive]);

  const handleMouseLeave = useCallback(() => {
    if (interactive) {
      setHoverRating(0);
    }
  }, [interactive]);

  const displayRating = hoverRating || rating;

  return (
    <div className="flex items-center gap-1">
      <div
        className="flex gap-0.5"
        onMouseLeave={handleMouseLeave}
        role={interactive ? 'group' : undefined}
        aria-label={interactive ? 'Rate this item' : `Rating: ${rating} out of ${maxRating}`}
      >
        {Array.from({ length: maxRating }, (_, index) => {
          const isFilled = index < displayRating;
          const StarComponent = isFilled ? StarIcon : StarIconOutline;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              disabled={!interactive}
              className={`
                ${interactive ? 'cursor-pointer transition-transform hover:scale-110' : 'cursor-default'}
                focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded
              `}
              aria-label={interactive ? `Rate ${index + 1} stars` : undefined}
            >
              <StarComponent
                className={`
                  ${sizeStyles[size]}
                  ${isFilled
                    ? 'text-amber-400 drop-shadow-sm'
                    : 'text-gray-300'
                  }
                  transition-colors
                `}
              />
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="ml-1.5 text-sm font-semibold text-gray-700">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
});
