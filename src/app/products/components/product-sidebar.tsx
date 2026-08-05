"use client";

import { Boxes, Check, SlidersHorizontal, Tag, X } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "toilets", label: "Toilets" },
  { id: "sinks", label: "Sinks & Basins" },
  { id: "lighting", label: "Lighting" },
  { id: "hardware", label: "Hardware" },
  { id: "materials", label: "Building Materials" },
] as const;

const PRODUCT_TYPES = [
  { id: "furniture", label: "Furniture" },
  { id: "material", label: "Materials" },
] as const;

interface ProductSidebarProps {
  activeCategory: string;
  activeProductType: string;
  onCategoryChange: (category: string) => void;
  onProductTypeChange: (productType: string) => void;
  className?: string;
}

export function ProductSidebar({
  activeCategory,
  activeProductType,
  onCategoryChange,
  onProductTypeChange,
  className,
}: ProductSidebarProps) {
  const hasActiveFilter =
    activeCategory !== "all" || activeProductType !== "all";

  const handleClearAll = () => {
    onCategoryChange("all");
    onProductTypeChange("all");
  };

  return (
    <aside className={cn("w-full", className)}>
      <div className="rounded-[--radius-md] border border-line bg-white overflow-hidden lg:sticky lg:top-6">
        {/* Header */}
        <div className="px-5 py-4 border-b border-line flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gold" />
            <h2 className="font-serif text-[18px] sm:text-[20px] text-ink">
              Filters
            </h2>
          </div>
          {hasActiveFilter && (
            <button
              type="button"
              onClick={handleClearAll}
              className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.08em] text-gray-500 hover:text-red-600 transition-colors"
            >
              <X className="w-3 h-3" />
              Clear
            </button>
          )}
        </div>

        <div className="p-4 space-y-6">
          {/* Product Type group */}
          <FilterGroup
            label="Product Type"
            icon={<Boxes className="w-3.5 h-3.5" />}
          >
            <FilterOption
              label="All Types"
              isActive={activeProductType === "all"}
              onClick={() => onProductTypeChange("all")}
            />
            {PRODUCT_TYPES.map((pt) => (
              <FilterOption
                key={pt.id}
                label={pt.label}
                isActive={activeProductType === pt.id}
                onClick={() => onProductTypeChange(pt.id)}
              />
            ))}
          </FilterGroup>

          {/* Category group */}
          <FilterGroup
            label="Category"
            icon={<Tag className="w-3.5 h-3.5" />}
          >
            <FilterOption
              label="All Categories"
              isActive={activeCategory === "all"}
              onClick={() => onCategoryChange("all")}
            />
            {CATEGORIES.map((cat) => (
              <FilterOption
                key={cat.id}
                label={cat.label}
                isActive={activeCategory === cat.id}
                onClick={() => onCategoryChange(cat.id)}
              />
            ))}
          </FilterGroup>
        </div>
      </div>
    </aside>
  );
}

/* ---------- Sub-components ---------- */

function FilterGroup({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-3">
        <span className="text-gray-400">{icon}</span>
        <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-gray-500">
          {label}
        </span>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function FilterOption({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-[13px] sm:text-[14px] font-medium transition-all text-left",
        isActive
          ? "bg-cream text-ink font-semibold"
          : "text-gray-600 hover:bg-cream/60 hover:text-ink",
      )}
    >
      <span className="flex items-center gap-2.5">
        <span
          className={cn(
            "w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-all",
            isActive
              ? "border-gold bg-gold"
              : "border-gray-300 group-hover:border-gray-400",
          )}
        >
          {isActive && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
        </span>
        {label}
      </span>
    </button>
  );
}
