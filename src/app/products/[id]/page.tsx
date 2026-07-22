import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/get-query-client';
import { constructMetadata } from '@/lib/seo';
import ProductView from '@/components/product-view';
import type { Metadata } from 'next';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
}

async function getProduct(id: string): Promise<Product> {
  // Mock API call - replace with real API
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 60 },
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  
  const data = await res.json();
  
  return {
    id: data.id.toString(),
    name: data.title,
    price: data.price,
    description: data.description,
    image: data.image,
  };
}

// SEO Metadata (Dynamic)
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const product = await getProduct(params.id);
    
    return constructMetadata({
      title: product.name,
      description: product.description,
      image: product.image,
      url: `/products/${params.id}`,
      type: 'product',
      keywords: ['product', 'shop', product.name],
    });
  } catch {
    return constructMetadata({
      title: 'Product Not Found',
      description: 'The product you are looking for could not be found.',
    });
  }
}

// Server Component with SSR Data Prefetching
export default async function ProductPage({ params }: { params: { id: string } }) {
  const queryClient: QueryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['product', params.id],
    queryFn: () => getProduct(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductView id={params.id} />
    </HydrationBoundary>
  );
}