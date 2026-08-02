import {
  type DefaultOptions,
  MutationCache,
  QueryCache,
  QueryClient,
} from '@tanstack/react-query';
import { ApiError } from '@/lib/api-client';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: ApiError;
  }
}

const queryConfig: DefaultOptions = {
  queries: {
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  },
  mutations: {
    retry: 0,
  },
};

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: queryConfig,
    mutationCache: new MutationCache({
      onError: () => {},
    }),
    queryCache: new QueryCache({
      onError: () => {},
    }),
  });
};

export { queryConfig };
