export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    statusCode: number;
    message: string | string[];
    error: string;
  };
  timestamp: string;
}

export interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginatedResult<T> {
  items: T[];
  meta: PaginationMeta;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Account {
  id: string;
  userId: string;
  name: string;
  type: 'CASH' | 'BANK' | 'CREDIT_CARD' | 'WALLET';
  currency: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  userId: string | null;
  name: string;
  type: 'INCOME' | 'EXPENSE';
  icon?: string | null;
  color?: string | null;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  accountId: string;
  categoryId?: string | null;
  type: 'INCOME' | 'EXPENSE';
  amount: string;
  description?: string | null;
  notes?: string | null;
  transactionDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface AccountBalance {
  accountId: string;
  accountName: string;
  currency: string;
  balance: number;
}
