// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Vendor types
export interface Vendor {
  id: string;
  name: string;
  category: string;
  description: string;
  images: string[];
  rating: number;
  reviewCount: number;
  location: string;
  createdAt: string;
}

// Review types
export type ReviewStatus = 'approved' | 'pending' | 'rejected' | 'flagged';

export interface Review {
  id: string;
  vendorId: string;
  userId: string;
  userName: string;
  rating: number;
  text: string;
  photoUrl?: string;
  status: ReviewStatus;
  createdAt: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Filter types
export interface VendorFilters {
  category?: string;
  minRating?: number;
  search?: string;
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ReviewFormData {
  rating: number;
  text: string;
  photoUrl?: string;
}
