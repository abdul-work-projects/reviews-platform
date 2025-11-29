'use client';

import React from 'react';

interface PageLoaderProps {
  fullScreen?: boolean;
  text?: string;
}

export const PageLoader = React.memo(function PageLoader({
  fullScreen = false,
  text = 'Loading...',
}: PageLoaderProps) {
  const containerStyles = fullScreen
    ? 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50'
    : 'w-full py-16';

  return (
    <div className={`${containerStyles} flex flex-col items-center justify-center`}>
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 rounded-full border-4 border-gray-200" />
        {/* Spinning gradient ring */}
        <div
          className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-transparent animate-spin"
          style={{
            borderTopColor: '#6366f1',
            borderRightColor: '#8b5cf6',
          }}
        />
        {/* Inner glow */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 animate-pulse" />
      </div>
      <p className="mt-6 text-gray-600 font-medium">{text}</p>
    </div>
  );
});
