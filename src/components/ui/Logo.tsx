'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  textColor?: 'light' | 'dark' | 'gradient';
  className?: string;
}

export const Logo = React.memo(function Logo({
  size = 'md',
  showText = true,
  textColor = 'gradient',
  className = '',
}: LogoProps) {
  const sizeStyles = {
    sm: { icon: 'w-8 h-8', text: 'text-lg' },
    md: { icon: 'w-10 h-10', text: 'text-xl' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl' },
  };

  const textStyles = {
    light: 'text-white',
    dark: 'text-gray-900',
    gradient: 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent',
  };

  return (
    <Link href="/" className={`flex items-center gap-2.5 group ${className}`}>
      {/* Logo Icon */}
      <div className={`${sizeStyles[size].icon} relative`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Background shape */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#6366f1" floodOpacity="0.3"/>
            </filter>
          </defs>

          {/* Main rounded square background */}
          <rect
            x="2"
            y="2"
            width="36"
            height="36"
            rx="10"
            fill="url(#logoGradient)"
            filter="url(#logoShadow)"
            className="transition-transform duration-300 group-hover:scale-105 origin-center"
          />

          {/* Stylized "R" letter */}
          <path
            d="M12 10h8c3.314 0 6 2.686 6 6s-2.686 6-6 6h-2l6 8h-5l-5-7v7h-4V10h2zm4 8h4c1.105 0 2-.895 2-2s-.895-2-2-2h-4v4z"
            fill="white"
            fillOpacity="0.95"
          />

          {/* Small star accent */}
          <path
            d="M30 8l1.2 2.4 2.8.4-2 2 .5 2.8-2.5-1.3-2.5 1.3.5-2.8-2-2 2.8-.4L30 8z"
            fill="url(#starGradient)"
            className="transition-transform duration-300 group-hover:rotate-12 origin-center"
          />
        </svg>
      </div>

      {/* Logo Text */}
      {showText && (
        <span className={`${sizeStyles[size].text} font-bold tracking-tight ${textStyles[textColor]}`}>
          ReviewHub
        </span>
      )}
    </Link>
  );
});

// Alternative minimal logo for small spaces
export const LogoMark = React.memo(function LogoMark({
  size = 'md',
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`${sizeStyles[size]} ${className}`}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="logoMarkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="starMarkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        <rect
          x="2"
          y="2"
          width="36"
          height="36"
          rx="10"
          fill="url(#logoMarkGradient)"
        />

        <path
          d="M12 10h8c3.314 0 6 2.686 6 6s-2.686 6-6 6h-2l6 8h-5l-5-7v7h-4V10h2zm4 8h4c1.105 0 2-.895 2-2s-.895-2-2-2h-4v4z"
          fill="white"
          fillOpacity="0.95"
        />

        <path
          d="M30 8l1.2 2.4 2.8.4-2 2 .5 2.8-2.5-1.3-2.5 1.3.5-2.8-2-2 2.8-.4L30 8z"
          fill="url(#starMarkGradient)"
        />
      </svg>
    </div>
  );
});
