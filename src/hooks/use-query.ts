import { 
  useQuery, 
  useMutation, 
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
  QueryFilters,
} from '@tanstack/react-query';
import type { ApiError } from '@/types';

export function useApiQuery<TData = unknown, TError = ApiError>(
  queryKey: string[],
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
}

export function useApiMutation<TData = unknown, TError = ApiError, TVariables = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, TError, TVariables>
) {
  return useMutation({
    mutationFn,
    ...options,
  });
}

interface OptimisticMutationContext {
  previousData?: unknown;
}

export function useOptimisticMutation<TData, TError = ApiError, TVariables = unknown>(
  queryKey: string[],
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    onOptimisticUpdate?: (variables: TVariables, previousData: TData | undefined) => TData;
    onMutate?: (variables: TVariables) => Promise<OptimisticMutationContext> | OptimisticMutationContext;
    onError?: (error: TError, variables: TVariables, context: OptimisticMutationContext | undefined) => void;
    onSuccess?: (data: TData, variables: TVariables, context: OptimisticMutationContext | undefined) => void;
    onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables, context: OptimisticMutationContext | undefined) => void;
  }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<TData>(queryKey);

      if (options?.onOptimisticUpdate && previousData) {
        queryClient.setQueryData(queryKey, options.onOptimisticUpdate(variables, previousData));
      }

      const context = options?.onMutate ? await options.onMutate(variables) : { previousData };
      return context;
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      options?.onError?.(err as TError, variables, context);
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey });
      options?.onSettled?.(data, error as TError | null, variables, context);
    },
  });
}

interface PageData<T> {
  data: T[];
  nextPage?: number;
  hasNextPage: boolean;
}

export function useInfiniteApiQuery<TData = unknown>(
  queryKey: string[],
  queryFn: ({ pageParam }: { pageParam: number }) => Promise<PageData<TData>>,
  options?: {
    initialPageParam?: number;
    getNextPageParam?: (lastPage: PageData<TData>, allPages: PageData<TData>[], lastPageParam: number) => number | undefined;
  }
) {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const pages: PageData<TData>[] = [];
      let currentPage = options?.initialPageParam || 1;
      let hasNextPage = true;

      while (hasNextPage) {
        const pageData = await queryFn({ pageParam: currentPage });
        pages.push(pageData);
        
        hasNextPage = pageData.hasNextPage;
        if (hasNextPage && pageData.nextPage) {
          currentPage = pageData.nextPage;
        } else {
          hasNextPage = false;
        }
      }

      return {
        pages,
        pageParams: Array.from({ length: pages.length }, (_, i) => (options?.initialPageParam || 1) + i),
      };
    },
  });
}

export function useInvalidateQueries() {
  const queryClient = useQueryClient();

  return {
    invalidateAll: () => queryClient.invalidateQueries(),
    invalidateByKey: (queryKey: string[]) => queryClient.invalidateQueries({ queryKey }),
    invalidateByPrefix: (prefix: string) => queryClient.invalidateQueries({ 
      predicate: (query) => query.queryKey[0] === prefix 
    }),
    refetchByKey: (queryKey: string[]) => queryClient.refetchQueries({ queryKey }),
    removeByKey: (queryKey: string[]) => queryClient.removeQueries({ queryKey }),
    resetByKey: (queryKey: string[]) => queryClient.resetQueries({ queryKey }),
  };
}

export function useCacheManager() {
  const queryClient = useQueryClient();

  return {
    setData: <T>(queryKey: string[], data: T) => queryClient.setQueryData(queryKey, data),
    getData: <T>(queryKey: string[]) => queryClient.getQueryData<T>(queryKey),
    prefetch: async <T>(queryKey: string[], queryFn: () => Promise<T>) => {
      await queryClient.prefetchQuery({ queryKey, queryFn });
    },
    ensureData: async <T>(queryKey: string[], queryFn: () => Promise<T>) => {
      await queryClient.ensureQueryData({ queryKey, queryFn });
    },
    clear: () => queryClient.clear(),
    getQueriesData: (filters?: QueryFilters) => queryClient.getQueriesData(filters ?? {}),
    setQueriesData: <T>(filters: QueryFilters, updater: (data: T | undefined) => T) => {
      queryClient.setQueriesData(filters, updater);
    },
  };
}

export function useQueriesLoadingState(queries: Array<{ isLoading: boolean; isFetching: boolean }>) {
  const isAnyLoading = queries.some(q => q.isLoading);
  const isAnyFetching = queries.some(q => q.isFetching);
  
  return {
    isLoading: isAnyLoading,
    isFetching: isAnyFetching,
    isIdle: !isAnyLoading && !isAnyFetching,
  };
}

interface QueryWithError {
  error: Error | null;
  isError: boolean;
}

export function useQueriesErrorState(queries: QueryWithError[]) {
  const errors = queries.filter(q => q.isError).map(q => q.error);
  
  return {
    hasErrors: errors.length > 0,
    errors,
    firstError: errors[0] || null,
  };
}