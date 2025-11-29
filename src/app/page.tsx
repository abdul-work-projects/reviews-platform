'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRightIcon,
  StarIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  SparklesIcon,
  CheckCircleIcon,
  BuildingStorefrontIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import {
  StarIcon as StarIconSolid,
} from '@heroicons/react/24/solid';
import { Button } from '@/components/ui';
import { useVendorStore } from '@/stores/vendorStore';
import { VendorCard } from '@/components/vendor/VendorCard';

export default function HomePage() {
  const { vendors, isLoading, fetchVendors } = useVendorStore();

  useEffect(() => {
    fetchVendors(1, {});
  }, [fetchVendors]);

  const featuredVendors = vendors.slice(0, 3);

  const features = [
    {
      icon: StarIcon,
      title: 'Honest Reviews',
      description: 'Read genuine reviews from real customers to make informed decisions about vendors.',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Verified Vendors',
      description: 'All vendors are verified and moderated to ensure quality and authenticity.',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50',
    },
    {
      icon: UserGroupIcon,
      title: 'Community Driven',
      description: 'Join our community of reviewers helping others find the best services.',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
    },
  ];

  const stats = [
    {
      value: '10K+',
      label: 'Reviews',
      icon: ChatBubbleLeftRightIcon,
      color: 'from-amber-400 to-orange-500',
    },
    {
      value: '500+',
      label: 'Vendors',
      icon: BuildingStorefrontIcon,
      color: 'from-emerald-400 to-teal-500',
    },
    {
      value: '25K+',
      label: 'Users',
      icon: UserGroupIcon,
      color: 'from-blue-400 to-indigo-500',
    },
    {
      value: '4.8',
      label: 'Avg. Rating',
      icon: StarIconSolid,
      color: 'from-purple-400 to-pink-500',
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl" />
          <div className="absolute top-20 -left-40 w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-6 animate-fade-in">
                <SparklesIcon className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-700">
                  Trusted by 25,000+ users
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Find & Review
                <span className="block mt-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  the Best Vendors
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Your trusted source for honest vendor reviews. Discover top-rated
                services and share your experiences with the community.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link href="/vendors">
                  <Button size="lg" className="w-full sm:w-auto">
                    Browse Vendors
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Join Community
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-gray-500">
                {['Free to join', 'No credit card required', 'Cancel anytime'].map((badge) => (
                  <div key={badge} className="flex items-center gap-1.5">
                    <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right content - Stats cards */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl transform rotate-3" />
              <div className="relative bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div
                      key={stat.label}
                      className={`p-6 rounded-2xl ${index % 2 === 0 ? 'bg-gray-50' : 'bg-indigo-50'}`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-lg`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-3 shadow-lg shadow-gray-200/50 flex items-center gap-2 animate-float">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <StarIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Top Rated</p>
                  <p className="text-xs text-gray-500">Platform 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ReviewHub?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make it easy to find trustworthy vendors and share your experiences
              with a community that cares.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative p-8 rounded-3xl bg-white border border-gray-100 hover:border-transparent hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover gradient */}
                <div className={`absolute inset-0 ${feature.bgColor} opacity-0 group-hover:opacity-50 rounded-3xl transition-opacity -z-10`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vendors Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Featured Vendors
              </h2>
              <p className="text-gray-600 mt-2">
                Discover our highest-rated vendors this month
              </p>
            </div>
            <Link href="/vendors">
              <Button variant="outline" className="group">
                View All Vendors
                <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-52 bg-gray-200" />
                  <div className="p-5">
                    <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-3" />
                    <div className="h-4 bg-gray-200 rounded-lg w-1/2 mb-4" />
                    <div className="h-4 bg-gray-200 rounded-lg w-full mb-2" />
                    <div className="h-4 bg-gray-200 rounded-lg w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredVendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to share your experience?
          </h2>
          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join thousands of reviewers helping others find the best vendors.
            Sign up today and start making a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-indigo-600 hover:bg-gray-100 shadow-xl shadow-black/10"
              >
                Get Started Free
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/vendors">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10"
              >
                Browse Vendors
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by thousands
            </h2>
            <p className="text-gray-600">
              Join our growing community of reviewers and vendors
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-indigo-50 transition-colors group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-4xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {stat.value}
                </p>
                <p className="text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
