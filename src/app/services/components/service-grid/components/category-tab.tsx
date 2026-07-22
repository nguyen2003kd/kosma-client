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
import {
  AlertTriangle,
  BookOpen,
  Building2,
  FileText,
  FlaskConical,
  Grid3x3,
  LayoutGrid,
} from "lucide-react";
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
  const { t } = useTranslation("pages/services");
  const icons = [
    FileText,
    Grid3x3,
    BookOpen,
    AlertTriangle,
    FlaskConical,
    Building2,
  ];

  return (
    <div className="relative">
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full px-4 md:px-7"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {/* All Category */}
          <CarouselItem className="pl-2 md:pl-4 basis-auto">
            <button
              onClick={() => {
                onCategoryChange("");
                onNavigate("/services");
              }}
              className={`group flex flex-col items-center justify-center p-2.5 md:p-3.5 rounded-lg md:rounded-xl border-2 transition-all duration-300 w-[110px] h-[100px] sm:w-[130px] sm:h-[115px] md:w-[150px] md:h-[130px] ${
                !selectedCategory
                  ? "bg-gradient-to-br from-blue-100 to-blue-200 border-blue-500 shadow-xl  "
                  : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-md"
              }`}
            >
              <div
                className={`w-9 h-9 md:w-11 md:h-11 rounded-lg md:rounded-xl flex items-center justify-center mb-2 md:mb-2.5 ${
                  !selectedCategory
                    ? "bg-blue-600"
                    : "bg-blue-100 group-hover:bg-blue-200"
                }`}
              >
                <LayoutGrid
                  className={`w-4.5 h-4.5 md:w-5.5 md:h-5.5 ${
                    !selectedCategory ? "text-white" : "text-blue-600"
                  }`}
                />
              </div>
              <span
                className={`text-[11px] md:text-[13px] font-semibold text-center ${
                  !selectedCategory ? "text-blue-600" : "text-gray-700"
                }`}
              >
                {t("allCategories")}
              </span>
            </button>
          </CarouselItem>

          {/* Category Items - Show skeletons if loading */}
          {isLoading ? (
            <CategorySkeleton count={6} />
          ) : (
            categories.map((category, index) => {
              return (
                <CarouselItem
                  key={category.id}
                  className="pl-2 md:pl-4 basis-auto"
                >
                  <button
                    onClick={() => {
                      onCategoryChange(category.id || "");
                      const categorySlug =
                        slugify(category.name || "") || category.id;
                      onNavigate(`/services?category=${categorySlug}`);
                    }}
                    className={`group flex flex-col items-center justify-center p-2.5 md:p-3.5 rounded-lg md:rounded-xl border-2 transition-all duration-300 w-[110px] h-[100px] sm:w-[130px] sm:h-[115px] md:w-[150px] md:h-[130px] ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-br from-blue-100 to-blue-200 border-blue-500 shadow-xl"
                        : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-md"
                    }`}
                    title={category.name}
                  >
                    <div
                      className={`w-9 h-9 md:w-11 md:h-11 rounded-lg md:rounded-xl flex items-center justify-center mb-2 md:mb-2.5 ${
                        selectedCategory === category.id
                          ? "bg-blue-600"
                          : "bg-blue-100 group-hover:bg-blue-200"
                      }`}
                    >
                      {category.icon_url ? (
                        <DynamicIcon
                          name={category.icon_url}
                          className={`w-4.5 h-4.5 md:w-5.5 md:h-5.5 ${
                            selectedCategory === category.id
                              ? "text-white"
                              : "text-blue-600"
                          }`}
                        />
                      ) : (
                        (() => {
                          const Icon = icons[index % icons.length];
                          return (
                            <Icon
                              className={`w-4.5 h-4.5 md:w-5.5 md:h-5.5 ${
                                selectedCategory === category.id
                                  ? "text-white"
                                  : "text-blue-600"
                              }`}
                            />
                          );
                        })()
                      )}
                    </div>
                    <span
                      className={`text-[11px] md:text-[13px] font-semibold text-center leading-tight ${
                        selectedCategory === category.id
                          ? "text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      {category.name}
                    </span>
                  </button>
                </CarouselItem>
              );
            })
          )}
        </CarouselContent>
        <CarouselPrevious className="-left-2 md:-left-4 z-20" />
        <CarouselNext className="-right-2 md:-right-4 z-20" />
      </Carousel>
    </div>
  );
}
