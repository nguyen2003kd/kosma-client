"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, ReactNode } from "react";

const MATERIAL_CATEGORIES = [
  { id: "all", label: "All Products" },
  { id: "toilets", label: "Toilets" },
  { id: "sinks", label: "Sinks & Basins" },
  { id: "lighting", label: "Lighting" },
  { id: "hardware", label: "Hardware" },
  { id: "materials", label: "Building Materials" },
] as const;

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;

interface MaterialsMarketplaceControlsProps {
  basePath: string;
  children: ReactNode;
}


export function MaterialsMarketplaceControls({
  basePath,
  children,
}: MaterialsMarketplaceControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("mcat") ?? "all";
  const sortBy = searchParams.get("msort") ?? "featured";
  const search = searchParams.get("msearch") ?? "";

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
      const qs = params.toString();
      router.push(qs ? `${basePath}?${qs}` : basePath, { scroll: false });
    },
    [router, searchParams, basePath],
  );

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {MATERIAL_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => pushParams({ mcat: cat.id })}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-[12px] sm:text-[13px] font-bold transition-all ${isActive
                ? "bg-ink text-white shadow-soft"
                : "bg-white text-gray-700 border border-mutedLine hover:border-ink/40 hover:text-ink"
                }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Toolbar: search + sort */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <div className="flex-1">
          <input
            type="text"
            defaultValue={search}
            onChange={(e) => pushParams({ msearch: e.target.value })}
            placeholder="Search products, brands..."
            className="w-full rounded-lg border border-mutedLine bg-white px-4 py-2.5 text-[13px] sm:text-[14px] text-ink placeholder:text-gray-400 focus:outline-none focus:border-ink/60 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-[12px] sm:text-[13px] font-bold text-gray-600 whitespace-nowrap">
            Sort by
          </label>
          <select
            value={sortBy}
            onChange={(e) => pushParams({ msort: e.target.value })}
            className="rounded-lg border border-mutedLine bg-white px-3 py-2.5 text-[13px] sm:text-[14px] text-ink focus:outline-none focus:border-ink/60 transition-colors"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {children}

      {/* Info banner */}
      <div className="rounded-[--radius-md] bg-cream border border-mutedLine p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-serif text-[18px] sm:text-[20px] text-ink mb-1">
            Bulk Orders & Trade Pricing
          </h4>
          <p className="text-[13px] sm:text-[14px] text-gray-700">
            Contractors and builders get exclusive trade discounts on bulk
            purchases of toilets, sinks, lighting, hardware, and building
            materials.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg bg-ink text-white px-5 py-2.5 text-[13px] font-bold hover:bg-black-800 transition-colors whitespace-nowrap"
        >
          Request Trade Quote
        </button>
      </div>
    </div>
  );
}
