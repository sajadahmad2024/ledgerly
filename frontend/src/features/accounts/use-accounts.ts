'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Account } from '@/types/api';

export const ACCOUNTS_QUERY_KEY = ['accounts'] as const;

export function useAccounts() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ACCOUNTS_QUERY_KEY,
    queryFn: () => apiClient<Account[]>('/accounts'),
  });

  const createMutation = useMutation({
    mutationFn: (data: { name: string; type: Account['type']; currency?: string }) =>
      apiClient<Account>('/accounts', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACCOUNTS_QUERY_KEY });
    },
  });

  const archiveMutation = useMutation({
    mutationFn: (id: string) =>
      apiClient<Account>(`/accounts/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACCOUNTS_QUERY_KEY });
    },
  });

  return {
    ...query,
    accounts: query.data || [],
    createAccount: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    archiveAccount: archiveMutation.mutateAsync,
    isArchiving: archiveMutation.isPending,
  };
}
