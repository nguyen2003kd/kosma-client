import { Category } from "@/api/models/category";
import DatePicker from "@/components/common/components/date-picker";
import { Card, CardContent } from "@/components/ui/card";
import { LayoutGrid } from "lucide-react";
import { useTranslation } from "react-i18next";
import CategoryTab from "./category-tab";

interface ServiceFiltersProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  categories: Category[];
  isLoading: boolean;
  onNavigate: (path: string) => void;
  date?: Date;
  onDateChange: (date: Date | undefined) => void;
  showDatePicker?: boolean;
}

export default function ServiceFilters({
  selectedCategory,
  onCategoryChange,
  categories,
  isLoading,
  onNavigate,
  date,
  onDateChange,
  showDatePicker = true,
}: ServiceFiltersProps) {
  const { t } = useTranslation("pages/services");
  return (
    <Card className="relative z-10 shadow-lg border-gray-200">
      <CardContent className="px-4 md:px-6 pt-4 md:pt-6 pb-2 md:pb-3">
        <div className="flex items-center justify-between gap-3 md:gap-6 mb-4 md:mb-6">
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
              <LayoutGrid className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
            </div>
            <h2 className="text-base md:text-xl font-bold text-gray-800 truncate">
              {t("categoryTitle")}
            </h2>
          </div>

          {/* Date Filter on Right */}
          {showDatePicker && (
            <DatePicker
              date={date}
              onDateChange={(newDate) => {
                onDateChange(newDate);
              }}
            />
          )}
        </div>

        <CategoryTab
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          categories={categories}
          isLoading={isLoading}
          onNavigate={onNavigate}
        />
      </CardContent>
    </Card>
  );
}
