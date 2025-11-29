import { User, Vendor, Review, VendorFilters, PaginatedResponse, ReviewFormData } from '@/types';
import { mockUsers, MockUser } from '@/mocks/users';
import { mockVendors } from '@/mocks/vendors';
import { mockReviews } from '@/mocks/reviews';

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Random delay between min and max
const randomDelay = (min: number = 300, max: number = 800) =>
  delay(Math.floor(Math.random() * (max - min + 1)) + min);

// In-memory state (simulates database)
let users: MockUser[] = [...mockUsers];
let vendors: Vendor[] = [...mockVendors];
let reviews: Review[] = [...mockReviews];

// Generate fake JWT token
const generateToken = (userId: string): string => {
  const payload = { userId, exp: Date.now() + 24 * 60 * 60 * 1000 };
  return btoa(JSON.stringify(payload));
};

// Decode fake JWT token
export const decodeToken = (token: string): { userId: string; exp: number } | null => {
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
};

// ============ AUTH API ============

export const loginApi = async (email: string, password: string): Promise<{ user: User; token: string }> => {
  await randomDelay();

  const user = users.find(u => u.email === email && u.passwordHash === password);

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const { passwordHash, ...userWithoutPassword } = user;
  const token = generateToken(user.id);

  return { user: userWithoutPassword, token };
};

export const signupApi = async (
  name: string,
  email: string,
  password: string
): Promise<{ user: User; token: string }> => {
  await randomDelay();

  if (users.some(u => u.email === email)) {
    throw new Error('Email already exists');
  }

  const newUser: MockUser = {
    id: `user-${Date.now()}`,
    email,
    name,
    passwordHash: password,
    role: 'user',
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  const { passwordHash, ...userWithoutPassword } = newUser;
  const token = generateToken(newUser.id);

  return { user: userWithoutPassword, token };
};

export const getCurrentUserApi = async (token: string): Promise<User | null> => {
  await delay(200);

  const decoded = decodeToken(token);
  if (!decoded || decoded.exp < Date.now()) {
    return null;
  }

  const user = users.find(u => u.id === decoded.userId);
  if (!user) return null;

  const { passwordHash, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// ============ VENDOR API ============

export const getVendorsApi = async (
  page: number = 1,
  pageSize: number = 9,
  filters?: VendorFilters
): Promise<PaginatedResponse<Vendor>> => {
  await randomDelay();

  let filteredVendors = [...vendors];

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filteredVendors = filteredVendors.filter(v =>
      v.name.toLowerCase().includes(searchLower) ||
      v.description.toLowerCase().includes(searchLower)
    );
  }

  if (filters?.category) {
    filteredVendors = filteredVendors.filter(v => v.category === filters.category);
  }

  if (filters?.minRating) {
    filteredVendors = filteredVendors.filter(v => v.rating >= filters.minRating!);
  }

  const total = filteredVendors.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const paginatedVendors = filteredVendors.slice(start, start + pageSize);

  return {
    data: paginatedVendors,
    total,
    page,
    pageSize,
    totalPages,
  };
};

export const getVendorByIdApi = async (id: string): Promise<Vendor | null> => {
  await randomDelay();
  return vendors.find(v => v.id === id) || null;
};

export const searchVendorsApi = async (query: string): Promise<Vendor[]> => {
  await randomDelay(200, 400);

  if (!query.trim()) return [];

  const queryLower = query.toLowerCase();
  return vendors.filter(v =>
    v.name.toLowerCase().includes(queryLower) ||
    v.category.toLowerCase().includes(queryLower)
  ).slice(0, 5);
};

// ============ REVIEW API ============

export const getReviewsByVendorIdApi = async (
  vendorId: string,
  statusFilter: 'approved' | 'all' = 'approved'
): Promise<Review[]> => {
  await randomDelay();

  return reviews.filter(r => {
    if (r.vendorId !== vendorId) return false;
    if (statusFilter === 'approved') return r.status === 'approved';
    return true;
  });
};

export const submitReviewApi = async (
  vendorId: string,
  userId: string,
  userName: string,
  data: ReviewFormData
): Promise<Review> => {
  await randomDelay(600, 1000);

  const newReview: Review = {
    id: `review-${Date.now()}`,
    vendorId,
    userId,
    userName,
    rating: data.rating,
    text: data.text,
    photoUrl: data.photoUrl,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  reviews.push(newReview);
  return newReview;
};

export const getPendingReviewsApi = async (): Promise<Review[]> => {
  await randomDelay();
  return reviews.filter(r => r.status === 'pending');
};

export const getFlaggedReviewsApi = async (): Promise<Review[]> => {
  await randomDelay();
  return reviews.filter(r => r.status === 'flagged');
};

export const getAllReviewsApi = async (): Promise<Review[]> => {
  await randomDelay();
  return [...reviews].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const approveReviewApi = async (reviewId: string): Promise<Review> => {
  await randomDelay(400, 600);

  const reviewIndex = reviews.findIndex(r => r.id === reviewId);
  if (reviewIndex === -1) {
    throw new Error('Review not found');
  }

  reviews[reviewIndex] = { ...reviews[reviewIndex], status: 'approved' };

  // Update vendor rating and review count
  const review = reviews[reviewIndex];
  const vendorReviews = reviews.filter(r => r.vendorId === review.vendorId && r.status === 'approved');
  const vendorIndex = vendors.findIndex(v => v.id === review.vendorId);

  if (vendorIndex !== -1) {
    const avgRating = vendorReviews.reduce((sum, r) => sum + r.rating, 0) / vendorReviews.length;
    vendors[vendorIndex] = {
      ...vendors[vendorIndex],
      rating: Math.round(avgRating * 10) / 10,
      reviewCount: vendorReviews.length,
    };
  }

  return reviews[reviewIndex];
};

export const rejectReviewApi = async (reviewId: string): Promise<Review> => {
  await randomDelay(400, 600);

  const reviewIndex = reviews.findIndex(r => r.id === reviewId);
  if (reviewIndex === -1) {
    throw new Error('Review not found');
  }

  reviews[reviewIndex] = { ...reviews[reviewIndex], status: 'rejected' };
  return reviews[reviewIndex];
};

export const flagReviewApi = async (reviewId: string): Promise<Review> => {
  await randomDelay(400, 600);

  const reviewIndex = reviews.findIndex(r => r.id === reviewId);
  if (reviewIndex === -1) {
    throw new Error('Review not found');
  }

  reviews[reviewIndex] = { ...reviews[reviewIndex], status: 'flagged' };
  return reviews[reviewIndex];
};

// ============ ADMIN VENDOR API ============

export const getAdminVendorsApi = async (): Promise<Vendor[]> => {
  await randomDelay();
  return [...vendors];
};

// ============ UTILITY ============

// Get vendor name by ID (for display purposes)
export const getVendorNameApi = async (vendorId: string): Promise<string> => {
  const vendor = vendors.find(v => v.id === vendorId);
  return vendor?.name || 'Unknown Vendor';
};

// Check rate limiting (mock)
let lastReviewTime: { [userId: string]: number } = {};

export const checkRateLimitApi = async (userId: string): Promise<{ allowed: boolean; waitTime?: number }> => {
  await delay(100);

  const lastTime = lastReviewTime[userId];
  const now = Date.now();
  const cooldown = 60000; // 1 minute cooldown

  if (lastTime && now - lastTime < cooldown) {
    return { allowed: false, waitTime: Math.ceil((cooldown - (now - lastTime)) / 1000) };
  }

  lastReviewTime[userId] = now;
  return { allowed: true };
};

// Reset rate limit (for testing)
export const resetRateLimitApi = (userId: string): void => {
  delete lastReviewTime[userId];
};
