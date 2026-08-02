'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { User } from '@/types/api';

export const CURRENT_USER_QUERY_KEY = ['current-user'] as const;

export function useCurrentUser() {
  const query = useQuery({
    queryKey: CURRENT_USER_QUERY_KEY,
    queryFn: () => apiClient<User>('/auth/me'),
    staleTime: 5 * 60 * 1000,
  });

  const user = query.data;
  const userInitials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'U';

  return {
    ...query,
    user,
    userInitials,
  };
}
