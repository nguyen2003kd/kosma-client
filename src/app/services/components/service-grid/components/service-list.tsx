import { GridCardSkeleton, ListCardSkeleton } from "@/components/common";
import CommonPagination from "@/components/common/pagination";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { PostExtended as PostWithImage } from "@/types/post";
import { Archive, LayoutGrid, List } from "lucide-react";
import { useTranslation } from "react-i18next";
import EmptyState from "./empty-state";
import ServiceCard from "./service-card";

interface ServiceListProps {
  posts: PostWithImage[];
  isLoading: boolean;
  error: unknown;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
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
  viewMode,
  onViewModeChange,
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
      {/* Category Title & View Toggle */}
      <Card className="bg-gradient-to-r from-white to-blue-50 border-blue-100">
        <CardContent className="p-3 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Archive className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-700">
                {currentCategoryName}
              </h2>
            </div>

            {/* View Toggle Buttons */}
            <div className="hidden lg:flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
              <Button
                onClick={() => onViewModeChange("grid")}
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                className={
                  viewMode === "grid"
                    ? "bg-blue-600 hover:bg-blue-700 shadow-sm"
                    : "hover:bg-gray-200 hover:text-blue-600 transition-all duration-200"
                }
                title={t("viewGrid")}
              >
                <LayoutGrid className="w-5 h-5" />
              </Button>
              <Button
                onClick={() => onViewModeChange("list")}
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                className={
                  viewMode === "list"
                    ? "bg-blue-600 hover:bg-blue-700 shadow-sm"
                    : "hover:bg-gray-200 hover:text-blue-600 transition-all duration-200"
                }
                title={t("viewList")}
              >
                <List className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {isLoading ? (
        <>
          <div className={`${viewMode === "list" ? "lg:hidden" : ""}`}>
            <GridCardSkeleton count={3} />
          </div>
          {viewMode === "list" && (
            <div className="hidden lg:block">
              <ListCardSkeleton count={3} />
            </div>
          )}
        </>
      ) : error ? (
        <Alert variant="destructive">
          <AlertDescription className="text-center">
            {t("loadError")}
          </AlertDescription>
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
          {/* Grid View */}
          <div
            className={`${
              viewMode === "list" ? "lg:hidden" : ""
            } grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6`}
          >
            {posts.map((post) => (
              <ServiceCard
                key={post.id}
                post={post}
                viewMode="grid"
                categoryName={currentCategoryName}
              />
            ))}
          </div>

          {/* List View */}
          {viewMode === "list" && (
            <div className="hidden lg:block space-y-4">
              {posts.map((post) => (
                <ServiceCard
                  key={post.id}
                  post={post}
                  viewMode="list"
                  categoryName={currentCategoryName}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
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
