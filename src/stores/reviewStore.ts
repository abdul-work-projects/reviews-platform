import { create } from 'zustand';
import { Review, ReviewFormData } from '@/types';
import {
  getReviewsByVendorIdApi,
  submitReviewApi,
  getPendingReviewsApi,
  getFlaggedReviewsApi,
  approveReviewApi,
  rejectReviewApi,
  flagReviewApi,
  checkRateLimitApi,
} from '@/lib/mockApi';

interface ReviewState {
  reviews: Review[];
  pendingReviews: Review[];
  flaggedReviews: Review[];
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;

  // Actions
  fetchReviewsByVendor: (vendorId: string) => Promise<void>;
  fetchPendingReviews: () => Promise<void>;
  fetchFlaggedReviews: () => Promise<void>;
  submitReview: (vendorId: string, userId: string, userName: string, data: ReviewFormData) => Promise<Review>;
  approveReview: (reviewId: string) => Promise<void>;
  rejectReview: (reviewId: string) => Promise<void>;
  flagReview: (reviewId: string) => Promise<void>;
  checkRateLimit: (userId: string) => Promise<{ allowed: boolean; waitTime?: number }>;
  clearError: () => void;
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  reviews: [],
  pendingReviews: [],
  flaggedReviews: [],
  isLoading: false,
  isSubmitting: false,
  error: null,

  fetchReviewsByVendor: async (vendorId: string) => {
    set({ isLoading: true, error: null });
    try {
      const reviews = await getReviewsByVendorIdApi(vendorId);
      set({ reviews, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch reviews'
      });
    }
  },

  fetchPendingReviews: async () => {
    set({ isLoading: true, error: null });
    try {
      const pendingReviews = await getPendingReviewsApi();
      set({ pendingReviews, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch pending reviews'
      });
    }
  },

  fetchFlaggedReviews: async () => {
    set({ isLoading: true, error: null });
    try {
      const flaggedReviews = await getFlaggedReviewsApi();
      set({ flaggedReviews, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch flagged reviews'
      });
    }
  },

  submitReview: async (vendorId: string, userId: string, userName: string, data: ReviewFormData) => {
    set({ isSubmitting: true, error: null });
    try {
      const review = await submitReviewApi(vendorId, userId, userName, data);
      set((state) => ({
        pendingReviews: [...state.pendingReviews, review],
        isSubmitting: false,
      }));
      return review;
    } catch (error) {
      set({
        isSubmitting: false,
        error: error instanceof Error ? error.message : 'Failed to submit review'
      });
      throw error;
    }
  },

  approveReview: async (reviewId: string) => {
    try {
      const updatedReview = await approveReviewApi(reviewId);
      set((state) => ({
        pendingReviews: state.pendingReviews.filter(r => r.id !== reviewId),
        reviews: [...state.reviews, updatedReview],
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to approve review' });
      throw error;
    }
  },

  rejectReview: async (reviewId: string) => {
    try {
      await rejectReviewApi(reviewId);
      set((state) => ({
        pendingReviews: state.pendingReviews.filter(r => r.id !== reviewId),
        flaggedReviews: state.flaggedReviews.filter(r => r.id !== reviewId),
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to reject review' });
      throw error;
    }
  },

  flagReview: async (reviewId: string) => {
    try {
      const flaggedReview = await flagReviewApi(reviewId);
      set((state) => ({
        pendingReviews: state.pendingReviews.filter(r => r.id !== reviewId),
        flaggedReviews: [...state.flaggedReviews, flaggedReview],
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to flag review' });
      throw error;
    }
  },

  checkRateLimit: async (userId: string) => {
    return checkRateLimitApi(userId);
  },

  clearError: () => {
    set({ error: null });
  },
}));
