'use client';

import React from 'react';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
  children: React.ReactNode;
  className?: string;
}

export const Badge = React.memo(function Badge({
  variant = 'default',
  children,
  className = '',
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-gray-100 text-gray-700 ring-gray-200',
    success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    warning: 'bg-amber-50 text-amber-700 ring-amber-200',
    danger: 'bg-red-50 text-red-700 ring-red-200',
    info: 'bg-sky-50 text-sky-700 ring-sky-200',
    purple: 'bg-purple-50 text-purple-700 ring-purple-200',
  };

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full
        text-xs font-semibold ring-1 ring-inset
        ${variantStyles[variant]} ${className}
      `}
    >
      {children}
    </span>
  );
});
