import { GridCardSkeleton } from "@/components/common";
import CommonPagination from "@/components/common/pagination";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import type { PostExtended as PostWithImage } from "@/types/post";
import { Archive } from "lucide-react";
import { useTranslation } from "react-i18next";
import EmptyState from "../empty-state";
import ServiceCard from "../service-card";

interface ServiceListProps {
  posts: PostWithImage[];
  isLoading: boolean;
  error: unknown;
  currentCategoryName: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasFilters: boolean;
  hasDateFilter: boolean;
  hasCategoryFilter: boolean;
  onClearDateFilter: () => void;
  onClearCategoryFilter: () => void;
}

export default function ServiceList({
  posts,
  isLoading,
  error,
  currentCategoryName,
  currentPage,
  totalPages,
  onPageChange,
  hasFilters,
  hasDateFilter,
  hasCategoryFilter,
  onClearDateFilter,
  onClearCategoryFilter,
}: ServiceListProps) {
  const { t } = useTranslation("pages/services");
  return (
    <div className="space-y-6">
      {/* Category Title */}
      <Card className="bg-gradient-to-r from-white to-blue-50 border-blue-100">
        <CardContent className="p-3 px-6">
          <div className="flex items-center gap-4">
            <Archive className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-700">{currentCategoryName}</h2>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {isLoading ? (
        <GridCardSkeleton count={6} />
      ) : error ? (
        <Alert variant="destructive">
          <AlertDescription className="text-center">{t("loadError")}</AlertDescription>
        </Alert>
      ) : posts.length === 0 ? (
        <EmptyState
          hasFilters={hasFilters}
          hasDateFilter={hasDateFilter}
          hasCategoryFilter={hasCategoryFilter}
          onClearDateFilter={onClearDateFilter}
          onClearCategoryFilter={onClearCategoryFilter}
          title={t("noResults")}
          messageWithFilter={t("noResultsWithFilter")}
          messageWithoutFilter={t("noResultsWithoutFilter")}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {posts.map((post) => (
              <ServiceCard
                key={post.id}
                post={post}
                categoryName={currentCategoryName}
              />
            ))}
          </div>

          {posts.length > 0 && (
            <div className="mt-8">
              <CommonPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
