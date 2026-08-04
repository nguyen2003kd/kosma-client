import { Category } from "@/api/models/category";
import CategoryTab from "../category-tab";

interface ServiceFiltersProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  categories: Category[];
  isLoading: boolean;
  onNavigate: (path: string) => void;
}

export default function ServiceFilters({
  selectedCategory,
  onCategoryChange,
  categories,
  isLoading,
  onNavigate,
}: ServiceFiltersProps) {
  return (
    <div className="rounded-[--radius-md] border border-line bg-white shadow-soft py-4 md:py-6">
      <CategoryTab
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        categories={categories}
        isLoading={isLoading}
        onNavigate={onNavigate}
      />
    </div>
  );
}
