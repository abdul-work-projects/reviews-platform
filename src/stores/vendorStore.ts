import { create } from 'zustand';
import { Vendor, VendorFilters, PaginatedResponse } from '@/types';
import { getVendorsApi, getVendorByIdApi, searchVendorsApi } from '@/lib/mockApi';

interface VendorState {
  vendors: Vendor[];
  currentVendor: Vendor | null;
  searchResults: Vendor[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  filters: VendorFilters;
  isLoading: boolean;
  isSearching: boolean;
  error: string | null;

  // Actions
  fetchVendors: (page?: number, filters?: VendorFilters) => Promise<void>;
  fetchVendorById: (id: string) => Promise<void>;
  searchVendors: (query: string) => Promise<void>;
  setFilters: (filters: VendorFilters) => void;
  clearSearch: () => void;
  clearError: () => void;
}

export const useVendorStore = create<VendorState>((set, get) => ({
  vendors: [],
  currentVendor: null,
  searchResults: [],
  pagination: {
    page: 1,
    pageSize: 9,
    total: 0,
    totalPages: 0,
  },
  filters: {},
  isLoading: false,
  isSearching: false,
  error: null,

  fetchVendors: async (page = 1, filters?: VendorFilters) => {
    set({ isLoading: true, error: null });
    try {
      const currentFilters = filters || get().filters;
      const response = await getVendorsApi(page, 9, currentFilters);
      set({
        vendors: response.data,
        pagination: {
          page: response.page,
          pageSize: response.pageSize,
          total: response.total,
          totalPages: response.totalPages,
        },
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch vendors'
      });
    }
  },

  fetchVendorById: async (id: string) => {
    set({ isLoading: true, error: null, currentVendor: null });
    try {
      const vendor = await getVendorByIdApi(id);
      set({ currentVendor: vendor, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch vendor'
      });
    }
  },

  searchVendors: async (query: string) => {
    if (!query.trim()) {
      set({ searchResults: [] });
      return;
    }

    set({ isSearching: true });
    try {
      const results = await searchVendorsApi(query);
      set({ searchResults: results, isSearching: false });
    } catch (error) {
      set({ isSearching: false, searchResults: [] });
    }
  },

  setFilters: (filters: VendorFilters) => {
    set({ filters });
  },

  clearSearch: () => {
    set({ searchResults: [] });
  },

  clearError: () => {
    set({ error: null });
  },
}));
