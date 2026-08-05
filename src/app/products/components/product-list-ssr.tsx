import { PaginationLinks } from "@/components/common";
import EmptyState from "@/app/services/components/empty-state";
import { ProductCard, type ProductCardItem } from "./product-card";

interface ProductListSSRProps {
  products: ProductCardItem[];
  error?: unknown;
  currentPage: number;
  totalPages: number;
  hasFilters: boolean;
}

export default function ProductListSSR({
  products,
  error,
  currentPage,
  totalPages,
  hasFilters,
}: ProductListSSRProps) {
  if (error) {
    return (
      <div className="rounded-[--radius-md] border border-line bg-white p-8 text-center">
        <p className="text-[14px] text-gray-700">
          Unable to load products. Please try again later.
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        hasFilters={hasFilters}
        hasDateFilter={false}
        hasCategoryFilter={hasFilters}
        onClearDateFilter={() => { }}
        onClearCategoryFilter={() => { }}
        title="No products found"
        messageWithFilter="No products match your filters. Try adjusting or clearing filters to see more results."
        messageWithoutFilter="No products are available yet."
      />
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-[13px] text-gray-600">
        {products.length} {products.length === 1 ? "product" : "products"} available
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <PaginationLinks currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
