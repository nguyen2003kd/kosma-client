import { QueryClient, dehydrate } from '@tanstack/react-query';

export function createServerQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 30,
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  });
}

export async function prefetchQuery<T>(
  queryKey: string[],
  queryFn: () => Promise<T>
): Promise<{ 
  queryClient: QueryClient; 
  dehydratedState: unknown;
}> {
  const queryClient = createServerQueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey,
      queryFn,
    });
  } catch (error) {
    console.error('Prefetch error:', error);
  }

  return {
    queryClient,
    dehydratedState: dehydrate(queryClient),
  };
}

export async function prefetchQueries(
  queries: Array<{
    queryKey: string[];
    queryFn: () => Promise<unknown>;
  }>
): Promise<{ 
  queryClient: QueryClient; 
  dehydratedState: unknown;
}> {
  const queryClient = createServerQueryClient();

  try {
    await Promise.allSettled(
      queries.map(({ queryKey, queryFn }) =>
        queryClient.prefetchQuery({
          queryKey,
          queryFn,
        })
      )
    );
  } catch (error) {
    console.error('Multiple prefetch error:', error);
  }

  return {
    queryClient,
    dehydratedState: dehydrate(queryClient),
  };
}

