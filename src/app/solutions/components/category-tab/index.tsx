import { CategorySkeleton } from "@/components/common";
import { DynamicIcon } from "@/components/shared/lucide-icon-picker";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { slugify } from "@/lib/slugify";
import { LayoutGrid } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Category {
  id?: string;
  name?: string;
  icon_url?: string | null;
}

interface CategoryTabProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  categories: Category[];
  isLoading?: boolean;
  onNavigate: (path: string) => void;
}

export default function CategoryTab({
  selectedCategory,
  onCategoryChange,
  categories,
  isLoading,
  onNavigate,
}: CategoryTabProps) {
  const { t } = useTranslation("pages/solutions");

  const renderItem = (category: Category) => {
    const isActive = selectedCategory === category.id;
    return (
      <button
        onClick={() => {
          onCategoryChange(category.id || "");
          const categorySlug = slugify(category.name || "") || category.id;
          onNavigate(`/solutions?category=${categorySlug}`);
        }}
        className={`group flex flex-col items-center justify-center p-2.5 md:p-3.5 rounded-lg md:rounded-xl border-2 transition-all duration-300 w-[110px] h-[100px] sm:w-[130px] sm:h-[115px] md:w-[150px] md:h-[130px] ${isActive
          ? "bg-black-800 border-black-800 shadow-strong"
          : "bg-white border-black-800/15 hover:border-black-800/40 hover:shadow-soft"
          }`}
        title={category.name}
      >
        <div
          className={`w-9 h-9 md:w-11 md:h-11 rounded-lg md:rounded-xl flex items-center justify-center mb-2 md:mb-2.5 ${isActive ? "bg-white/15" : "bg-cream group-hover:bg-white/70"
            }`}
        >
          <DynamicIcon
            name={category.icon_url || "LayoutGrid"}
            className={`w-4.5 h-4.5 md:w-5.5 md:h-5.5 ${isActive ? "text-white" : "text-ink"
              }`}
          />
        </div>
        <span
          className={`text-[11px] md:text-[13px] font-semibold text-center leading-tight ${isActive ? "text-white" : "text-gray-700"
            }`}
        >
          {category.name}
        </span>
      </button>
    );
  };

  return (
    <div className="relative">
      <Carousel
        opts={{ align: "start", loop: false }}
        className="w-full px-4 md:px-7"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {/* All Category */}
          <CarouselItem className="pl-2 md:pl-4 basis-auto">
            <button
              onClick={() => {
                onCategoryChange("");
                onNavigate("/solutions");
              }}
              className={`group flex flex-col items-center justify-center p-2.5 md:p-3.5 rounded-lg md:rounded-xl border-2 transition-all duration-300 w-[110px] h-[100px] sm:w-[130px] sm:h-[115px] md:w-[150px] md:h-[130px] ${!selectedCategory
                ? "bg-black-800 border-black-800 shadow-strong"
                : "bg-white border-black-800/15 hover:border-black-800/40 hover:shadow-soft"
                }`}
            >
              <div
                className={`w-9 h-9 md:w-11 md:h-11 rounded-lg md:rounded-xl flex items-center justify-center mb-2 md:mb-2.5 ${!selectedCategory ? "bg-white/15" : "bg-cream group-hover:bg-white/70"
                  }`}
              >
                <LayoutGrid
                  className={`w-4.5 h-4.5 md:w-5.5 md:h-5.5 ${!selectedCategory ? "text-white" : "text-ink"
                    }`}
                />
              </div>
              <span
                className={`text-[11px] md:text-[13px] font-semibold text-center ${!selectedCategory ? "text-white" : "text-gray-700"
                  }`}
              >
                {t("allCategories")}
              </span>
            </button>
          </CarouselItem>

          {isLoading ? (
            <CategorySkeleton count={6} />
          ) : (
            categories.map((category) => (
              <CarouselItem
                key={category.id}
                className="pl-2 md:pl-4 basis-auto"
              >
                {renderItem(category)}
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious className="-left-2 md:-left-4 z-20" />
        <CarouselNext className="-right-2 md:-right-4 z-20" />
      </Carousel>
    </div>
  );
}
