import { User } from '@/types';

export interface MockUser extends User {
  passwordHash: string;
}

export const mockUsers: MockUser[] = [
  {
    id: 'user-1',
    email: 'john@example.com',
    name: 'John Doe',
    passwordHash: 'password123', // In real app, this would be hashed
    role: 'user',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'user-2',
    email: 'jane@example.com',
    name: 'Jane Smith',
    passwordHash: 'password123',
    role: 'user',
    createdAt: '2024-02-20T14:45:00Z',
  },
  {
    id: 'user-3',
    email: 'admin@example.com',
    name: 'Admin User',
    passwordHash: 'admin123',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-4',
    email: 'sarah@example.com',
    name: 'Sarah Johnson',
    passwordHash: 'password123',
    role: 'user',
    createdAt: '2024-03-10T09:15:00Z',
  },
];
