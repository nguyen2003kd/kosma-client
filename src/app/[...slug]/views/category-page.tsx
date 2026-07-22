"use client";

import { Category } from "@/api/models/category";
import { PostExtended } from "@/types/post";
import CategoryTab from "../components/category-tab";
import NewsGrid from "../components/news-grid";
import RelatedSidebar from "../components/related-sidebar";
import { useTranslation } from "react-i18next";


interface DynamicCategoryPageProps {
  category: Category & { categories?: Category[] };
  categoryEn?: Category & { categories?: Category[] } | null;
  date?: string;
  initialPosts?: PostExtended[];
}

export default function DynamicCategoryPage({
  category,
  categoryEn,
  date,
}: DynamicCategoryPageProps) {
  const { i18n } = useTranslation("pages/post-detail");
  const isEn = i18n.language?.startsWith("en");
  const displayCategory = isEn && categoryEn ? categoryEn : category;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section
        className="relative bg-cover bg-center bg-no-repeat pt-16 pb-24 overflow-hidden"
        style={{ backgroundImage: "url('/images/banner_service_2.png')" }}
      >
        <div className="absolute inset-0 bg-[#1a3a5c]/60"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-4">
            {displayCategory.name}
          </h1>
          {displayCategory.description && (
            <p className="text-blue-100 text-lg max-w-3xl mx-auto">
              {displayCategory.description}
            </p>
          )}
        </div>
      </section>

      {/* Static Content for Nang Luc */}
   

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 mt-10 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Category Tab */}
              <CategoryTab 
                categories={category.categories || []} 
              />

              {/* Related Sidebar */}
              <RelatedSidebar
                categoryId={category.id || ""}
                categoryCode={category.link?.replace(/^\//, "")}
                categoryName={displayCategory.name || ""}
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-3">
            <NewsGrid
              categoryId={category.id || ""}
              categoryName={displayCategory.name || ""}
              categoryCode={category.link?.replace(/^\//, "")}
              date={date}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
