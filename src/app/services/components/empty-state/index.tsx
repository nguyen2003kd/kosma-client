import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="border-blue-100">
      <CardContent className="py-16 px-6">
        <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-4">
          {/* Icon */}
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
            <Archive className="w-10 h-10 text-blue-300" />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-800">{displayTitle}</h3>
            <p className="text-gray-500 text-sm">
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
                  className="gap-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <X className="w-4 h-4" />
                  {t("clearDateFilter")}
                </Button>
              )}
              {hasCategoryFilter && onClearCategoryFilter && (
                <Button
                  onClick={onClearCategoryFilter}
                  variant="outline"
                  className="gap-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <X className="w-4 h-4" />
                  {t("clearCategoryFilter")}
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
