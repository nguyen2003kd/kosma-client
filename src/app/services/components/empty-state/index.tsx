import { Button } from "@/components/ui/button";
import { Archive, X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface EmptyStateProps {
  hasFilters: boolean;
  hasDateFilter?: boolean;
  hasCategoryFilter?: boolean;
  onClearDateFilter?: () => void;
  onClearCategoryFilter?: () => void;
  title?: string;
  messageWithFilter?: string;
  messageWithoutFilter?: string;
}

export default function EmptyState({
  hasFilters,
  hasDateFilter,
  hasCategoryFilter,
  onClearDateFilter,
  onClearCategoryFilter,
  title,
  messageWithFilter,
  messageWithoutFilter,
}: EmptyStateProps) {
  const { t } = useTranslation("pages/services");
  const displayTitle = title || t("noResultsDefault");
  const displayMsgWithFilter = messageWithFilter || t("noResultsWithFilterDefault");
  const displayMsgWithoutFilter = messageWithoutFilter || t("noResultsWithoutFilterDefault");
  return (
    <div className="rounded-[--radius-md] border border-line bg-white py-16 px-6">
      <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-4">
        {/* Icon */}
        <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center">
          <Archive className="w-10 h-10 text-black-700/40" />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h3 className="font-serif text-xl text-ink">{displayTitle}</h3>
          <p className="text-gray-600 text-sm">
            {hasFilters ? displayMsgWithFilter : displayMsgWithoutFilter}
          </p>
        </div>

        {/* Clear Filter Buttons */}
        {hasFilters && (
          <div className="flex items-center gap-3 pt-2 flex-wrap justify-center">
            {hasDateFilter && onClearDateFilter && (
              <Button
                onClick={onClearDateFilter}
                variant="outline"
                className="gap-2 border-black-800/20 text-ink hover:bg-cream hover:border-black-800/40 transition-all duration-200"
              >
                <X className="w-4 h-4" />
                {t("clearDateFilter")}
              </Button>
            )}
            {hasCategoryFilter && onClearCategoryFilter && (
              <Button
                onClick={onClearCategoryFilter}
                variant="outline"
                className="gap-2 border-black-800/20 text-ink hover:bg-cream hover:border-black-800/40 transition-all duration-200"
              >
                <X className="w-4 h-4" />
                {t("clearCategoryFilter")}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
