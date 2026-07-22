/**
 * TANSTACK QUERY CONFIGURATION EXAMPLES
 * All 4 configuration options with detailed implementation
 */

// ==========================================
// 1️⃣ BASIC SETUP (Client-only)
// ==========================================

/*
// In your root layout.tsx or _app.tsx
import { QueryProvider } from '@/providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}

// Usage in any client component
'use client';
import { useApiQuery } from '@/hooks';

function UserProfile() {
  const { data: user, isLoading, error } = useApiQuery(
    ['user', 'profile'],
    () => apiGet('/user/profile')
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>Welcome, {user.name}!</div>;
}
*/

// ==========================================
// 2️⃣ SSR SETUP (Recommended for SEO)
// ==========================================

/*
// Page component (Server Component)
import { constructMetadata } from '@/lib/seo';
import { prefetchQuery, ServerHydrationBoundary } from '@/lib/query-client';
import { apiGet } from '@/lib/api';
import ProductView from './components/product-view';

interface PageProps {
  params: { slug: string };
}

// SEO Metadata (Server-side)
export async function generateMetadata({ params }: PageProps) {
  const product = await apiGet(`/products/${params.slug}`);
  
  return constructMetadata({
    title: product.name,
    description: product.description,
    image: product.imageUrl,
    url: `/products/${params.slug}`,
  });
}

// Server Component with prefetched data
export default async function ProductPage({ params }: PageProps) {
  const { dehydratedState } = await prefetchQuery(
    ['product', params.slug],
    () => apiGet(`/products/${params.slug}`)
  );

  return (
    <ServerHydrationBoundary dehydratedState={dehydratedState}>
      <ProductView slug={params.slug} />
    </ServerHydrationBoundary>
  );
}

// Client Component (uses prefetched data)
'use client';
import { useApiQuery } from '@/hooks';

function ProductView({ slug }: { slug: string }) {
  const { data: product, isLoading } = useApiQuery(
    ['product', slug],
    () => apiGet(`/products/${slug}`)
  );

  // Data is already prefetched, so loading is usually false
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
    </div>
  );
}
*/

// ==========================================
// 3️⃣ ADVANCED SETUP (Multi-prefetch + Optimistic)
// ==========================================

/*
// Advanced page with multiple prefetched queries
export default async function DashboardPage() {
  const { dehydratedState } = await prefetchQueries([
    {
      queryKey: ['user', 'profile'],
      queryFn: () => apiGet('/user/profile'),
    },
    {
      queryKey: ['user', 'orders'],
      queryFn: () => apiGet('/user/orders'),
    },
    {
      queryKey: ['stats', 'overview'],
      queryFn: () => apiGet('/stats/overview'),
    },
  ]);

  return (
    <ServerHydrationBoundary dehydratedState={dehydratedState}>
      <DashboardView />
    </ServerHydrationBoundary>
  );
}

// Component with optimistic updates
'use client';
import { useOptimisticMutation, useApiQuery } from '@/hooks';
import { apiPost, apiPut } from '@/lib/api';

function TodoList() {
  const { data: todos, isLoading } = useApiQuery(
    ['todos'],
    () => apiGet('/todos')
  );

  // Optimistic update mutation
  const addTodoMutation = useOptimisticMutation(
    ['todos'],
    (newTodo: { title: string }) => apiPost('/todos', newTodo),
    {
      onOptimisticUpdate: (variables, previousData) => [
        ...(previousData || []),
        { id: 'temp-' + Date.now(), title: variables.title, completed: false }
      ],
    }
  );

  const toggleTodoMutation = useOptimisticMutation(
    ['todos'],
    ({ id, completed }: { id: string; completed: boolean }) => 
      apiPut(`/todos/${id}`, { completed }),
    {
      onOptimisticUpdate: (variables, previousData) =>
        (previousData || []).map(todo =>
          todo.id === variables.id ? { ...todo, completed: variables.completed } : todo
        ),
    }
  );

  return (
    <div>
      {todos?.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={(e) => toggleTodoMutation.mutate({
              id: todo.id,
              completed: e.target.checked
            })}
          />
          {todo.title}
        </div>
      ))}
      <button onClick={() => addTodoMutation.mutate({ title: 'New todo' })}>
        Add Todo
      </button>
    </div>
  );
}
*/

// ==========================================
// 4️⃣ ENTERPRISE SETUP (Advanced Features)
// ==========================================

/*
// Cache management and invalidation
'use client';
import { 
  useInvalidateQueries, 
  useCacheManager,
  useQueriesLoadingState,
  useQueriesErrorState 
} from '@/hooks';

function AdminPanel() {
  const { invalidateAll, invalidateByPrefix } = useInvalidateQueries();
  const { setData, prefetch, clear } = useCacheManager();
  
  // Multiple queries
  const userQuery = useApiQuery(['users'], () => apiGet('/admin/users'));
  const ordersQuery = useApiQuery(['orders'], () => apiGet('/admin/orders'));
  const statsQuery = useApiQuery(['stats'], () => apiGet('/admin/stats'));
  
  // Aggregate loading states
  const { isLoading, isFetching } = useQueriesLoadingState([
    userQuery,
    ordersQuery, 
    statsQuery
  ]);
  
  // Aggregate errors
  const { hasErrors, firstError } = useQueriesErrorState([
    userQuery,
    ordersQuery,
    statsQuery
  ]);

  return (
    <div>
      {isLoading && <div>Loading dashboard...</div>}
      {hasErrors && <div>Error: {firstError?.message}</div>}
      
      <button onClick={() => invalidateAll()}>
        Refresh All Data
      </button>
      
      <button onClick={() => invalidateByPrefix('user')}>
        Refresh User Data
      </button>
      
      <button onClick={() => clear()}>
        Clear Cache
      </button>
    </div>
  );
}

// Background sync pattern
'use client';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

function BackgroundSync() {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Sync data every 30 seconds when tab is active
    const interval = setInterval(() => {
      if (!document.hidden) {
        queryClient.invalidateQueries({ 
          predicate: (query) => query.queryKey[0] === 'realtime' 
        });
      }
    }, 30000);

    // Sync when tab becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        queryClient.invalidateQueries();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [queryClient]);

  return null;
}
*/

export const TANSTACK_QUERY_EXAMPLES = {
  basic: 'Client-side only setup',
  ssr: 'Server-side rendering with prefetch',
  advanced: 'Optimistic updates and multi-prefetch',
  enterprise: 'Cache management and background sync',
};