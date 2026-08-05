"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import { MaterialCard, type MaterialProduct } from "./material-card";
import { useGetApiV10Product } from "@/api/endpoints/product";
import type { GetApiV10ProductParams } from "@/api/models";
import { getPrimaryProductImage, type ProductImageRow } from "@/lib/product-image";

type ProductRow = {
  id: string;
  sku?: string;
  name: string;
  slug?: string;
  description?: string | null;
  price?: number | null;
  original_price?: number | null;
  category?: string | null;
  product_type?: string;
  brand?: string | null;
  thumbnail_path?: string | null;
  product_images?: ProductImageRow[] | null;
  stock?: number | null;
  status?: string;
  is_featured?: boolean | null;
  rating?: number;
  reviews?: number;
};

function toNumber(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
}

function transformToMaterialProduct(item: ProductRow): MaterialProduct {
  return {
    id: item.id,
    sku: item.sku,
    name: item.name,
    price: toNumber(item.price),
    originalPrice: item.original_price != null ? toNumber(item.original_price) : undefined,
    image: getPrimaryProductImage(item.product_images, item.thumbnail_path, "/images/living.jpg"),
    category: item.category ?? "materials",
    rating: toNumber(item.rating) || 4.5,
    reviews: toNumber(item.reviews),
    inStock: toNumber(item.stock) > 0 && item.status !== "out_of_stock",
    brand: item.brand ?? undefined,
    slug: item.slug,
  };
}

const SUGGESTION_COUNT = 4;

export function MaterialsSuggestions() {
  const queryParams = useMemo<GetApiV10ProductParams>(
    () => ({
      page: 1,
      pageSize: SUGGESTION_COUNT,
      filters: "status==active",
      sortField: "created_at",
      sortOrder: "desc",
    }),
    [],
  );

  const { data, isLoading, error } = useGetApiV10Product(queryParams);

  const products = useMemo<MaterialProduct[]>(() => {
    const rows =
      ((data as unknown as { responseData?: { rows?: ProductRow[] } })?.responseData?.rows) ?? [];
    return rows.map(transformToMaterialProduct);
  }, [data]);

  // Silent error — suggestions are non-critical
  if (error) return null;

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {Array.from({ length: SUGGESTION_COUNT }).map((_, i) => (
          <div
            key={i}
            className="rounded-[--radius-md] overflow-hidden bg-white border border-mutedLine"
          >
            <div className="h-40 sm:h-44 bg-gray-100 animate-pulse" />
            <div className="p-4 space-y-2.5">
              <div className="h-3 bg-gray-100 rounded animate-pulse w-1/3" />
              <div className="h-5 bg-gray-100 rounded animate-pulse" />
              <div className="h-9 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {products.map((product) => (
          <MaterialCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-lg bg-ink text-white px-5 py-2.5 text-[13px] font-bold hover:bg-black-800 transition-colors"
        >
          <Package className="w-4 h-4" />
          View Full Marketplace
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
