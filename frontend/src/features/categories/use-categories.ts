'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Category } from '@/types/api';

export const CATEGORIES_QUERY_KEY = ['categories'] as const;

export function useCategories() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: () => apiClient<Category[]>('/categories'),
  });

  const createMutation = useMutation({
    mutationFn: (data: {
      name: string;
      type: Category['type'];
      icon?: string;
      color?: string;
    }) =>
      apiClient<Category>('/categories', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiClient(`/categories/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
    },
  });

  return {
    ...query,
    categories: query.data || [],
    createCategory: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    deleteCategory: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}
