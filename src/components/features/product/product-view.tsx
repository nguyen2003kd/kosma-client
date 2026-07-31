"use client";

import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui";
import { Button } from "@/components/ui";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
}

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch product");
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

export function ProductView({ id }: { id: string }) {
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square w-full rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="font-serif text-2xl text-ink mb-2">Product Not Found</h2>
        <p className="text-gray-700 mb-6">
          The product you are looking for could not be found.
        </p>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-50">
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="font-serif text-3xl md:text-4xl text-ink leading-tight">
            {product.name}
          </h1>
          <p className="text-2xl font-bold text-black-800">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
          <div className="pt-4">
            <Button size="lg">Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
