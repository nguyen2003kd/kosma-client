import { ProductCard, type ProductCardItem } from "@/components/common";
import { getPrimaryProductImage, type ProductImageRow } from "@/lib/product-image";

export type ProductRow = {
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

export function toNumber(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
}

export function transformToMaterialProduct(item: ProductRow): ProductCardItem {
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

interface MaterialsMarketplaceProps {
  products: ProductCardItem[];
  error?: unknown;
}

export function MaterialsMarketplace({
  products,
  error,
}: MaterialsMarketplaceProps) {
  if (error) {
    return (
      <div className="rounded-[--radius-md] border border-line bg-white p-8 text-center">
        <p className="text-[14px] text-red-600">Failed to load products</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-[--radius-md] border border-line bg-white p-8 text-center">
        <p className="text-[14px] text-gray-700">
          No products match your search. Try a different keyword or category.
        </p>
      </div>
    );
  }

  return (
    <>
      <p className="text-[13px] text-gray-600">
        {products.length} {products.length === 1 ? "product" : "products"} available
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
