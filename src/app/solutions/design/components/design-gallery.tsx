import { PaginationLinks } from "@/components/common";
import type { PostExtended as PostWithImage } from "@/types/post";
import { DesignCard } from "./design-card";

interface DesignGalleryProps {
  posts: PostWithImage[];
  error?: unknown;
  currentPage: number;
  totalPages: number;
  search: string;
  categoryLink?: string;
}

export function DesignGallery({
  posts,
  error,
  currentPage,
  totalPages,
  search,
  categoryLink,
}: DesignGalleryProps) {
  if (error) {
    return (
      <div className="rounded-[--radius-md] border border-line bg-white p-8 text-center">
        <p className="text-[14px] text-gray-700">
          Unable to load design drawings. Please try again later.
        </p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="rounded-[--radius-md] border border-line bg-white py-16 px-6 text-center">
        <p className="text-gray-600">
          {search.trim()
            ? `No designs match "${search}". Try a different keyword.`
            : "No design drawings have been published yet."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {posts.map((post) => (
          <DesignCard
            key={post.id}
            post={post}
            categoryLink={categoryLink}
          />
        ))}
      </div>

      {!search.trim() && (
        <PaginationLinks currentPage={currentPage} totalPages={totalPages} />
      )}
    </>
  );
}
