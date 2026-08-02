'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Transaction, PaginatedResult } from '@/types/api';
import { ACCOUNTS_QUERY_KEY } from '../accounts/use-accounts';

export const TRANSACTIONS_QUERY_KEY = ['transactions'] as const;

export function useTransactions(page = 1, limit = 10) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [...TRANSACTIONS_QUERY_KEY, page, limit],
    queryFn: () =>
      apiClient<PaginatedResult<Transaction>>(
        `/transactions?page=${page}&limit=${limit}`,
      ),
  });

  const createMutation = useMutation({
    mutationFn: (data: {
      accountId: string;
      categoryId?: string;
      type: Transaction['type'];
      amount: number;
      description?: string;
      notes?: string;
      transactionDate?: string;
    }) =>
      apiClient<Transaction>('/transactions', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSACTIONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ACCOUNTS_QUERY_KEY });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiClient(`/transactions/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSACTIONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ACCOUNTS_QUERY_KEY });
    },
  });

  const transactions = query.data?.items || [];
  const meta = query.data?.meta || {
    totalItems: 0,
    itemCount: 0,
    itemsPerPage: limit,
    totalPages: 1,
    currentPage: page,
  };

  const totalIncome = transactions
    .filter((t) => t.type === 'INCOME')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalBalance = totalIncome - totalExpense;

  return {
    ...query,
    transactions,
    meta,
    totalIncome,
    totalExpense,
    totalBalance,
    createTransaction: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    deleteTransaction: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}
