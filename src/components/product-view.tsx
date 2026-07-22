'use client';

import { useQuery } from '@tanstack/react-query';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  
  const data = await res.json();
  
  return {
    id: data.id.toString(),
    name: data.title,
    price: data.price,
    description: data.description,
  };
}

export default function ProductView({ id }: { id: string }) {
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-semibold">Error loading product</h2>
          <p className="text-red-600">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p className="text-gray-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
        
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-4xl font-bold text-blue-600">${product.price}</span>
        </div>
        
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Description</h2>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>
        
        <div className="mt-8 flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Add to Cart
          </button>
          <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors">
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}