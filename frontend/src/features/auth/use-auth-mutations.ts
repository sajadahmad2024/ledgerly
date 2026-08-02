'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { User } from '@/types/api';
import { CURRENT_USER_QUERY_KEY } from './use-current-user';

export function useAuthMutations() {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      apiClient<{ user: User; accessToken: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      document.cookie = `token=${data.accessToken}; path=/; max-age=604800; SameSite=Lax`;
      queryClient.setQueryData(CURRENT_USER_QUERY_KEY, data.user);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: { name: string; email: string; password: string }) =>
      apiClient<{ user: User; accessToken: string }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      document.cookie = `token=${data.accessToken}; path=/; max-age=604800; SameSite=Lax`;
      queryClient.setQueryData(CURRENT_USER_QUERY_KEY, data.user);
    },
  });

  return {
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
  };
}
