"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, ReactNode } from "react";
import { ProductSidebar } from "../product-sidebar";

interface ProductsControlsProps {
  basePath: string;
  children: ReactNode;
}

export function ProductsControls({ basePath, children }: ProductsControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") ?? "";
  const currentSort = searchParams.get("sort") ?? "featured";
  const currentCategory = searchParams.get("category") ?? "all";
  const currentType = searchParams.get("type") ?? "all";

  const pushParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === "" || value === "all") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }

      params.delete("page");
      const qs = params.toString();
      router.push(qs ? `${basePath}?${qs}` : basePath, { scroll: false });
    },
    [router, searchParams, basePath],
  );

  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-6 lg:gap-8 items-start">
      <ProductSidebar
        activeCategory={currentCategory}
        activeProductType={currentType}
        onCategoryChange={(cat) => pushParams({ category: cat })}
        onProductTypeChange={(pt) => pushParams({ type: pt })}
      />

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <div className="flex-1">
            <input
              type="text"
              defaultValue={currentSearch}
              onChange={(e) => pushParams({ search: e.target.value })}
              placeholder="Search products, brands..."
              className="w-full rounded-lg border border-mutedLine bg-white px-4 py-2.5 text-[13px] sm:text-[14px] text-ink placeholder:text-gray-400 focus:outline-none focus:border-ink/60 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-[12px] sm:text-[13px] font-bold text-gray-600 whitespace-nowrap">
              Sort by
            </label>
            <select
              value={currentSort}
              onChange={(e) => pushParams({ sort: e.target.value })}
              className="rounded-lg border border-mutedLine bg-white px-3 py-2.5 text-[13px] sm:text-[14px] text-ink focus:outline-none focus:border-ink/60 transition-colors"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
