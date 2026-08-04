import { GridCardSkeleton } from "@/components/common";
import CommonPagination from "@/components/common/pagination";
import type { PostExtended as PostWithImage } from "@/types/post";
import EmptyState from "@/app/services/components/empty-state";
import ConstructionCard from "./construction-card";

interface ConstructionListProps {
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
  locale?: string;
  categoryLink?: string;
}

export default function ConstructionList({
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
  locale,
  categoryLink,
}: ConstructionListProps) {
  return (
    <div className="space-y-6">
      {isLoading ? (
        <GridCardSkeleton count={6} />
      ) : error ? (
        <div className="rounded-[--radius-md] border border-line bg-white p-8 text-center">
          <p className="text-[14px] text-gray-700">
            Unable to load construction posts. Please try again later.
          </p>
        </div>
      ) : posts.length === 0 ? (
        <EmptyState
          hasFilters={hasFilters}
          hasDateFilter={hasDateFilter}
          hasCategoryFilter={hasCategoryFilter}
          onClearDateFilter={onClearDateFilter}
          onClearCategoryFilter={onClearCategoryFilter}
          title="No construction posts found"
          messageWithFilter="No construction posts match your filters. Try adjusting or clearing filters to see more results."
          messageWithoutFilter="No construction posts have been posted yet."
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {posts.map((post) => (
              <ConstructionCard
                key={post.id}
                post={post}
                categoryName={currentCategoryName}
                locale={locale}
                categoryLink={categoryLink}
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
