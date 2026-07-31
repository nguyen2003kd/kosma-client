'use client';

import { QueryClientProvider, HydrationBoundary, type DehydratedState } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { getQueryClient } from '@/lib/get-query-client';
import { AbilityProvider } from './ability-provider';

interface ProvidersProps {
  children: React.ReactNode;
  dehydratedState?: DehydratedState;
}

export default function Providers({ children, dehydratedState }: ProvidersProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <AbilityProvider>{children}</AbilityProvider>
      </HydrationBoundary>
      <Toaster
        richColors
        closeButton
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          className: 'p-3 gap-2',
          classNames: {
            closeButton: 'left-auto right-0 top-0 -translate-y-2.5 translate-x-0',
          },
        }}
      />
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
      )}
    </QueryClientProvider>
  );
}
