'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = React.memo(function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = `
    relative inline-flex items-center justify-center font-semibold
    rounded-xl transition-all duration-200 ease-out
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    active:scale-[0.98]
  `;

  const variantStyles = {
    primary: `
      bg-gradient-to-r from-indigo-600 to-purple-600
      hover:from-indigo-500 hover:to-purple-500
      text-white shadow-lg shadow-indigo-500/25
      hover:shadow-xl hover:shadow-indigo-500/30
      focus-visible:ring-indigo-500
    `,
    secondary: `
      bg-gray-100 text-gray-900
      hover:bg-gray-200
      focus-visible:ring-gray-500
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-rose-500
      hover:from-red-400 hover:to-rose-400
      text-white shadow-lg shadow-red-500/25
      hover:shadow-xl hover:shadow-red-500/30
      focus-visible:ring-red-500
    `,
    ghost: `
      bg-transparent text-gray-700
      hover:bg-gray-100
      focus-visible:ring-gray-500
    `,
    outline: `
      bg-transparent border-2 border-gray-200
      text-gray-700 hover:border-indigo-500 hover:text-indigo-600
      focus-visible:ring-indigo-500
    `,
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
});
