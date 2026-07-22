"use client";

import type { CategoryWithChildrenAllOfCategoriesItem } from "@/api/models";
import { DynamicIcon } from "@/components/shared/lucide-icon-picker";
import { Card, CardContent } from "@/components/ui/card";
import { slugify } from "@/lib/slugify";
import {
  AlertTriangle,
  BookOpen,
  Building2,
  Check,
  FileText,
  FlaskConical,
  Grid3x3,
  LayoutGrid,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface CategoryTabProps {
  isLoading: boolean;
  categories: CategoryWithChildrenAllOfCategoriesItem[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryTab({
  isLoading,
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryTabProps) {
  const router = useRouter();

  if (isLoading) {
    return (
      <Card className="relative z-10 shadow-lg border-gray-200">
        <CardContent className="px-4 pt-4 pb-3">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
            <div className="p-2 rounded-full flex-shrink-0">
              <LayoutGrid className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-base font-bold text-gray-800">Danh mục</h2>
          </div>
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 animate-pulse"
              >
                <div className="w-5 h-5 bg-gray-200 rounded" />
                <div className="flex-1 h-4 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const icons = [
    FileText,
    Grid3x3,
    BookOpen,
    AlertTriangle,
    FlaskConical,
    Building2,
  ];

  return (
    <Card className="relative z-10 shadow-lg border-gray-200">
      <CardContent className="px-4 pt-4 pb-3">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
          <div className="p-2 rounded-full flex-shrink-0">
            <LayoutGrid className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-base font-bold text-gray-800">Danh mục</h2>
        </div>

        <div className="space-y-2">
          {/* All Category */}
          <button
            onClick={() => {
              onCategoryChange("");
              router.push("/news", { scroll: false });
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              !selectedCategory
                ? "bg-blue-50 text-blue-700 font-semibold"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <LayoutGrid
              className={`w-5 h-5 ${
                !selectedCategory ? "text-blue-600" : "text-gray-400"
              }`}
            />
            <span className="flex-1 text-left text-sm">Tất cả</span>
            {!selectedCategory && <Check className="w-5 h-5 text-blue-600" />}
          </button>

          {/* Category Items */}
          {categories.map((category, index) => {
            const hasDynamicIcon = Boolean(category.icon_url);
            const Icon = icons[index % icons.length];

            return (
              <button
                key={category.id}
                onClick={() => {
                  onCategoryChange(category.id || "");
                  const categorySlug =
                    slugify(category.name || "") || category.id;
                  router.push(`/news?category=${categorySlug}`, {
                    scroll: false,
                  });
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {hasDynamicIcon ? (
                  <DynamicIcon
                    name={category.icon_url!}
                    className={`w-5 h-5 ${
                      selectedCategory === category.id
                        ? "text-blue-600"
                        : "text-gray-400"
                    }`}
                  />
                ) : (
                  <Icon
                    className={`w-5 h-5 ${
                      selectedCategory === category.id
                        ? "text-blue-600"
                        : "text-gray-400"
                    }`}
                  />
                )}
                <span className="flex-1 text-left text-sm">
                  {category.name}
                </span>
                {selectedCategory === category.id && (
                  <Check className="w-5 h-5 text-blue-600" />
                )}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
