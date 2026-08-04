"use client";

import { useMemo, useState } from "react";
import { MaterialCard, type MaterialProduct } from "./material-card";
import { useGetApiV10Product } from "@/api/endpoints/product";
import type { GetApiV10ProductParams } from "@/api/models";

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
    image: item.thumbnail_path ?? "/images/living.jpg",
    category: item.category ?? "materials",
    rating: toNumber(item.rating) || 4.5,
    reviews: toNumber(item.reviews),
    inStock: toNumber(item.stock) > 0 && item.status !== 'out_of_stock',
    brand: item.brand ?? undefined,
    slug: item.slug,
  };
}

export function MaterialsMarketplace() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [search, setSearch] = useState("");

  // Build query params following the same pattern as other pages
  // (e.g. construction/page.tsx, news/components/news-grid). The product
  // list endpoint uses `responseData.rows` / `responseData.count` and
  // filters via the sequelize-api-paginate `filters` string syntax.
  const queryParams = useMemo<GetApiV10ProductParams>(() => {
    const filters = [
      "status==active",
      activeCategory !== "all" ? `category==${activeCategory}` : "",
    ]
      .filter(Boolean)
      .join(",");

    const params: GetApiV10ProductParams = {
      page: 1,
      pageSize: 50,
      filters,
    };

    if (sortBy === "price-asc") {
      params.sortField = "price";
      params.sortOrder = "asc";
    } else if (sortBy === "price-desc") {
      params.sortField = "price";
      params.sortOrder = "desc";
    }

    return params;
  }, [activeCategory, sortBy]);

  const { data, isLoading: loading, error } = useGetApiV10Product(queryParams);

  const products = useMemo<MaterialProduct[]>(() => {
    const rows =
      ((data as unknown as { responseData?: { rows?: ProductRow[] } })
        ?.responseData?.rows) ?? [];
    return rows.map(transformToMaterialProduct);
  }, [data]);

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.trim().toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.brand?.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q),
    );
  }, [products, search]);

  const errorMessage = error
    ? (error as { message?: string })?.message || "Failed to load products"
    : null;

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {MATERIAL_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
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

      {/* Result count */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-[--radius-md] overflow-hidden bg-white border border-mutedLine">
              <div className="h-44 sm:h-48 bg-gray-100 animate-pulse" />
              <div className="p-4 sm:p-5 space-y-3">
                <div className="h-4 bg-gray-100 rounded animate-pulse w-1/3" />
                <div className="h-6 bg-gray-100 rounded animate-pulse" />
                <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2" />
                <div className="h-10 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : errorMessage ? (
        <div className="rounded-[--radius-md] border border-line bg-white p-8 text-center">
          <p className="text-[14px] text-red-600">{errorMessage}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-[13px] text-ink underline hover:text-gold"
          >
            Try again
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-[--radius-md] border border-line bg-white p-8 text-center">
          <p className="text-[14px] text-gray-700">
            No products match your search. Try a different keyword or category.
          </p>
        </div>
      ) : (
        <>
          <p className="text-[13px] text-gray-600">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"} available
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {filteredProducts.map((product) => (
              <MaterialCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}

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
