"use client";

import { useMemo, useState } from "react";
import { MaterialCard, type MaterialProduct } from "./material-card";

const MATERIAL_CATEGORIES = [
  { id: "all", label: "All Products" },
  { id: "toilet", label: "Toilets" },
  { id: "sink", label: "Sinks & Basins" },
  { id: "lighting", label: "Lighting" },
  { id: "hardware", label: "Hardware" },
  { id: "materials", label: "Building Materials" },
] as const;

// Mock data — replace with API call when product endpoint is available
const PRODUCTS: MaterialProduct[] = [
  {
    id: "p1",
    name: "One-Piece Elongated Toilet with Soft-Close Seat",
    price: 289.0,
    originalPrice: 349.0,
    image: "/images/material-toilet.jpg",
    category: "toilet",
    rating: 4.6,
    reviews: 128,
    inStock: true,
    brand: "Kosmo Bath",
  },
  {
    id: "p2",
    name: "Wall-Mounted Compact Toilet Concealed Cistern",
    price: 459.0,
    image: "/images/material-toilet-2.jpg",
    category: "toilet",
    rating: 4.8,
    reviews: 64,
    inStock: true,
    brand: "Kosmo Bath",
  },
  {
    id: "p3",
    name: "Undermount Ceramic Bathroom Sink",
    price: 129.0,
    originalPrice: 169.0,
    image: "/images/material-sink.jpg",
    category: "sink",
    rating: 4.4,
    reviews: 92,
    inStock: true,
    brand: "Kosmo Bath",
  },
  {
    id: "p4",
    name: "Vessel Rectangular Basin with Faucet Hole",
    price: 189.0,
    image: "/images/material-sink-2.jpg",
    category: "sink",
    rating: 4.5,
    reviews: 47,
    inStock: true,
    brand: "Kosmo Bath",
  },
  {
    id: "p5",
    name: "LED Recessed Downlight 12W Dimmable",
    price: 24.99,
    image: "/images/material-lighting.jpg",
    category: "lighting",
    rating: 4.7,
    reviews: 312,
    inStock: true,
    brand: "Kosmo Light",
  },
  {
    id: "p6",
    name: "Modern Pendant Light Brushed Nickel",
    price: 149.0,
    originalPrice: 199.0,
    image: "/images/material-lighting-2.jpg",
    category: "lighting",
    rating: 4.3,
    reviews: 56,
    inStock: true,
    brand: "Kosmo Light",
  },
  {
    id: "p7",
    name: "Stainless Steel Door Hinges Set (10 pcs)",
    price: 39.99,
    image: "/images/material-hardware.jpg",
    category: "hardware",
    rating: 4.5,
    reviews: 184,
    inStock: true,
    brand: "Kosmo Build",
  },
  {
    id: "p8",
    name: "Brushed Nickel Cabinet Pulls Handle (Pack of 20)",
    price: 59.0,
    image: "/images/material-hardware-2.jpg",
    category: "hardware",
    rating: 4.6,
    reviews: 73,
    inStock: false,
    brand: "Kosmo Build",
  },
  {
    id: "p9",
    name: "Premium Porcelain Floor Tile 24x24 (per box)",
    price: 89.0,
    originalPrice: 109.0,
    image: "/images/material-tile.jpg",
    category: "materials",
    rating: 4.7,
    reviews: 221,
    inStock: true,
    brand: "Kosmo Build",
  },
  {
    id: "p10",
    name: "Waterproof Cement Board 1/2 in. 3x5 ft",
    price: 19.99,
    image: "/images/material-board.jpg",
    category: "materials",
    rating: 4.4,
    reviews: 98,
    inStock: true,
    brand: "Kosmo Build",
  },
  {
    id: "p11",
    name: "Two-Piece Dual Flush Toilet WaterSense",
    price: 199.0,
    image: "/images/material-toilet-3.jpg",
    category: "toilet",
    rating: 4.2,
    reviews: 156,
    inStock: true,
    brand: "Kosmo Bath",
  },
  {
    id: "p12",
    name: "Track Light Kit 4-Head Adjustable LED",
    price: 79.0,
    originalPrice: 99.0,
    image: "/images/material-lighting-3.jpg",
    category: "lighting",
    rating: 4.5,
    reviews: 41,
    inStock: true,
    brand: "Kosmo Light",
  },
];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
] as const;

export function MaterialsMarketplace() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<(typeof SORT_OPTIONS)[number]["value"]>("featured");
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;

    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q),
      );
    }

    const sorted = [...result];
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
    }
    return sorted;
  }, [activeCategory, sortBy, search]);

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
              className={`px-3.5 sm:px-4 py-2 rounded-full text-[12px] sm:text-[13px] font-bold transition-all ${
                isActive
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
            onChange={(e) =>
              setSortBy(e.target.value as (typeof SORT_OPTIONS)[number]["value"])
            }
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
      <p className="text-[13px] text-gray-600">
        {filteredProducts.length}{" "}
        {filteredProducts.length === 1 ? "product" : "products"} available
      </p>

      {/* Product grid */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-[--radius-md] border border-line bg-white p-8 text-center">
          <p className="text-[14px] text-gray-700">
            No products match your search. Try a different keyword or category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {filteredProducts.map((product) => (
            <MaterialCard key={product.id} product={product} />
          ))}
        </div>
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
