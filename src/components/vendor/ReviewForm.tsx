'use client';

import React, { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { Button, StarRating, Modal } from '@/components/ui';
import { useAuthStore } from '@/stores/authStore';
import { useReviewStore } from '@/stores/reviewStore';
import { ReviewFormData } from '@/types';

interface ReviewFormProps {
  vendorId: string;
  vendorName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const MIN_TEXT_LENGTH = 20;
const MAX_TEXT_LENGTH = 1000;

export const ReviewForm = React.memo(function ReviewForm({
  vendorId,
  vendorName,
  isOpen,
  onClose,
  onSuccess,
}: ReviewFormProps) {
  const { user, isAuthenticated } = useAuthStore();
  const { submitReview, isSubmitting, checkRateLimit } = useReviewStore();

  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 0,
    text: '',
    photoUrl: undefined,
  });
  const [errors, setErrors] = useState<{ rating?: string; text?: string }>({});
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const validateForm = useCallback(() => {
    const newErrors: { rating?: string; text?: string } = {};

    if (formData.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    if (!formData.text.trim()) {
      newErrors.text = 'Review text is required';
    } else if (formData.text.length < MIN_TEXT_LENGTH) {
      newErrors.text = `Review must be at least ${MIN_TEXT_LENGTH} characters`;
    } else if (formData.text.length > MAX_TEXT_LENGTH) {
      newErrors.text = `Review must be less than ${MAX_TEXT_LENGTH} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleRatingChange = useCallback((rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
    setErrors((prev) => ({ ...prev, rating: undefined }));
  }, []);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setFormData((prev) => ({ ...prev, text }));
    setErrors((prev) => ({ ...prev, text: undefined }));
  }, []);

  const handlePhotoSelect = useCallback(() => {
    // Simulate photo selection with a placeholder
    const placeholderUrl = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400';
    setFormData((prev) => ({ ...prev, photoUrl: placeholderUrl }));
    setPhotoPreview(placeholderUrl);
    toast.success('Photo added (simulated)');
  }, []);

  const handleRemovePhoto = useCallback(() => {
    setFormData((prev) => ({ ...prev, photoUrl: undefined }));
    setPhotoPreview(null);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !user) {
      toast.error('Please login to submit a review');
      return;
    }

    if (!validateForm()) return;

    // Check rate limit
    const rateCheck = await checkRateLimit(user.id);
    if (!rateCheck.allowed) {
      toast.error(`You're posting too fast! Please wait ${rateCheck.waitTime} seconds.`);
      return;
    }

    try {
      await submitReview(vendorId, user.id, user.name, formData);
      toast.success('Review submitted! It will be visible after moderation.');

      // Reset form
      setFormData({ rating: 0, text: '', photoUrl: undefined });
      setPhotoPreview(null);

      onClose();
      onSuccess?.();
    } catch {
      toast.error('Failed to submit review. Please try again.');
    }
  }, [
    isAuthenticated,
    user,
    validateForm,
    checkRateLimit,
    submitReview,
    vendorId,
    formData,
    onClose,
    onSuccess,
  ]);

  const handleClose = useCallback(() => {
    setFormData({ rating: 0, text: '', photoUrl: undefined });
    setPhotoPreview(null);
    setErrors({});
    onClose();
  }, [onClose]);

  const textLength = formData.text.length;
  const isTextValid = textLength >= MIN_TEXT_LENGTH && textLength <= MAX_TEXT_LENGTH;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={`Review ${vendorName}`} size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Rating
          </label>
          <StarRating
            rating={formData.rating}
            size="lg"
            interactive
            onChange={handleRatingChange}
          />
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
          )}
        </div>

        {/* Review Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Review
          </label>
          <textarea
            value={formData.text}
            onChange={handleTextChange}
            placeholder="Share your experience with this vendor..."
            rows={5}
            className={`w-full px-4 py-3 border rounded-lg transition-colors resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.text ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <div className="flex items-center justify-between mt-1">
            <div>
              {errors.text && (
                <p className="text-sm text-red-600">{errors.text}</p>
              )}
            </div>
            <p className={`text-sm ${isTextValid ? 'text-gray-500' : 'text-orange-500'}`}>
              {textLength}/{MAX_TEXT_LENGTH}
            </p>
          </div>
        </div>

        {/* Photo Upload (Simulated) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Photo (Optional)
          </label>
          {photoPreview ? (
            <div className="relative inline-block">
              <img
                src={photoPreview}
                alt="Preview"
                className="w-32 h-24 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handlePhotoSelect}
              className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
            >
              <PhotoIcon className="h-5 w-5" />
              <span>Add Photo</span>
            </button>
          )}
          <p className="mt-1 text-xs text-gray-500">
            (Simulated - no actual upload)
          </p>
        </div>

        {/* Confidence Score (Mock) */}
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm font-medium text-green-800">
              Review Confidence Score: High
            </span>
          </div>
          <p className="text-xs text-green-600 mt-1">
            Your review meets our quality guidelines
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={!isAuthenticated}
            className="flex-1"
          >
            Submit Review
          </Button>
        </div>

        {!isAuthenticated && (
          <p className="text-center text-sm text-red-600">
            You must be logged in to submit a review
          </p>
        )}
      </form>
    </Modal>
  );
});
