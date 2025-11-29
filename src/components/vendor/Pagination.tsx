'use client';

import React, { useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const Pagination = React.memo(function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, onPageChange]);

  if (totalPages <= 1) return null;

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5;

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <nav
      className="flex items-center justify-center gap-2 mt-8"
      aria-label="Pagination"
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={handlePrevious}
        disabled={currentPage === 1 || isLoading}
        aria-label="Previous page"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </Button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-gray-500">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                disabled={isLoading}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleNext}
        disabled={currentPage === totalPages || isLoading}
        aria-label="Next page"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </Button>
    </nav>
  );
});
