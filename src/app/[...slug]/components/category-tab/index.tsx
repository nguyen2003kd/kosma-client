"use client";

import { DynamicIcon } from "@/components/shared/lucide-icon-picker";
import { Category } from "@/api/models/category";
import { Card, CardContent } from "@/components/ui/card";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface CategoryTabProps {
  categories: Category[];
  // TẠM THỜI ẨN CERTIFICATION - TODO: uncomment khi cần hiển thị
  // showCertification?: boolean;
  // activeCertification?: boolean;
  // isCertificationPage?: boolean;
}

export default function CategoryTab({ 
  categories,
}: CategoryTabProps) {
  const { t } = useTranslation("pages/post-detail");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const basePathname = pathname === "/certification" ? "/nang-luc" : pathname;
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParam || null
  );

  // Sync with URL
  useEffect(() => {
    setSelectedCategory(categoryParam || null);
  }, [categoryParam]);

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);

    const params = new URLSearchParams(searchParams);
    if (categoryId) {
      params.set("category", categoryId);
    } else {
      params.delete("category");
    }

    router.push(`${basePathname}?${params.toString()}`, { scroll: false });
  };

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
          <h2 className="text-base font-bold text-gray-800">{t("categoryLabel")}</h2>
        </div>

        <div className="space-y-2">
          {/* All Categories Button */}
          <button
            onClick={() => handleCategoryChange(null)}
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
            <span className="flex-1 text-left text-sm">{t("allCategories")}</span>
            {!selectedCategory && <Check className="w-5 h-5 text-blue-600" />}
          </button>

          {/* Subcategories */}
          {categories.map((cat, index) => {
            const hasDynamicIcon = Boolean(cat.icon_url);
            const Icon = icons[index % icons.length];

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id || null)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {hasDynamicIcon ? (
                  <DynamicIcon
                    name={cat.icon_url!}
                    className={`w-5 h-5 ${
                      selectedCategory === cat.id
                        ? "text-blue-600"
                        : "text-gray-400"
                    }`}
                  />
                ) : (
                  <Icon
                    className={`w-5 h-5 ${
                      selectedCategory === cat.id
                        ? "text-blue-600"
                        : "text-gray-400"
                    }`}
                  />
                )}
                <span className="flex-1 text-left text-sm">{cat.name}</span>
                {selectedCategory === cat.id && (
                  <Check className="w-5 h-5 text-blue-600" />
                )}
              </button>
            );
          })}

          {/*
          /* TẠM THỜI ẨN CERTIFICATION - TODO: Uncomment khi cần hiển thị
          showCertification && (
            <button
              onClick={() => router.push("/certification")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeCertification
                  ? "bg-blue-50 text-blue-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="w-5 h-5  rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className={`w-5 h-5 ${activeCertification ? "text-blue-600" : "text-gray-700"}`} />
              </div>
              <span className="flex-1 text-left text-sm">Chứng nhận, công nhận, chỉ định</span>
              {activeCertification && <Check className="w-5 h-5 text-blue-600" />}
            </button>
          )
          */}
        </div>
      </CardContent>
    </Card>
  );
}
