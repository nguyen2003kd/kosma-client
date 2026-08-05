import { PaginationLinks } from "@/components/common";
import type { PostExtended as PostWithImage } from "@/types/post";
import EmptyState from "@/app/services/components/empty-state";
import ConstructionCard from "./construction-card";

interface ConstructionListSSRProps {
  posts: PostWithImage[];
  error?: unknown;
  currentCategoryName: string;
  currentPage: number;
  totalPages: number;
  hasFilters: boolean;
  locale?: string;
  categoryLink?: string;
}

/**
 * SSR-friendly construction list. No loading state (SSR waits for data).
 * Uses Link-based pagination (PaginationLinks) instead of onClick.
 */
export default function ConstructionListSSR({
  posts,
  error,
  currentCategoryName,
  currentPage,
  totalPages,
  hasFilters,
  locale,
  categoryLink,
}: ConstructionListSSRProps) {
  if (error) {
    return (
      <div className="rounded-[--radius-md] border border-line bg-white p-8 text-center">
        <p className="text-[14px] text-gray-700">
          Unable to load construction posts. Please try again later.
        </p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <EmptyState
        hasFilters={hasFilters}
        hasDateFilter={false}
        hasCategoryFilter={false}
        onClearDateFilter={() => {}}
        onClearCategoryFilter={() => {}}
        title="No construction posts found"
        messageWithFilter="No construction posts match your filters. Try adjusting or clearing filters to see more results."
        messageWithoutFilter="No construction posts have been posted yet."
      />
    );
  }

  return (
    <div className="space-y-6">
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

      <PaginationLinks currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
