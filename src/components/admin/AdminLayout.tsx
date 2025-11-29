'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ClipboardDocumentListIcon,
  BuildingStorefrontIcon,
  FlagIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { useAuthStore } from '@/stores/authStore';
import { PageLoader } from '@/components/ui';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const adminNavItems = [
  {
    href: '/admin/reviews',
    label: 'Moderation Queue',
    icon: ClipboardDocumentListIcon,
  },
  {
    href: '/admin/vendors',
    label: 'Manage Vendors',
    icon: BuildingStorefrontIcon,
  },
  {
    href: '/admin/flags',
    label: 'Flagged Reviews',
    icon: FlagIcon,
  },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'admin')) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading) {
    return <PageLoader fullScreen text="Checking access..." />;
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 px-3">
              Admin Dashboard
            </h2>
            <nav className="space-y-1">
              {adminNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Quick Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3">
                Quick Stats
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between px-3 py-2 bg-yellow-50 rounded-lg">
                  <span className="text-sm text-yellow-800">Pending</span>
                  <span className="text-sm font-bold text-yellow-800">4</span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 bg-red-50 rounded-lg">
                  <span className="text-sm text-red-800">Flagged</span>
                  <span className="text-sm font-bold text-red-800">1</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
