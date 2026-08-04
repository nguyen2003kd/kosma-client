import { Category } from "@/api/models/category";
import CategoryTab from "../category-tab";

interface SolutionFiltersProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  categories: Category[];
  isLoading: boolean;
  onNavigate: (path: string) => void;
}

export default function SolutionFilters({
  selectedCategory,
  onCategoryChange,
  categories,
  isLoading,
  onNavigate,
}: SolutionFiltersProps) {
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
