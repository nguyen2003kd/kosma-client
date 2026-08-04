"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useGetApiV10Post } from "@/api/endpoints/post";
import type { GetApiV10Category200 } from "@/api/models";
import type { CategoryWithChildren } from "@/api/models/categoryWithChildren";
import type { Category } from "@/api/models/category";
import { getThumbnailSrc } from "@/lib/responsive-image";
import type { PostExtended } from "@/types/post";

const FALLBACK_IMAGE = "/images/living.jpg";
const CLOSE_DELAY = 120;

function ServiceImage({ post }: { post: PostExtended }) {
  const src = getThumbnailSrc(
    post.thumbnail_compress_info,
    post.thumbnail_path,
    FALLBACK_IMAGE,
  );
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <Image
      src={currentSrc}
      alt={post.title || ""}
      fill
      sizes="(max-width: 1280px) 0px, 240px"
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      onError={() => {
        if (currentSrc !== FALLBACK_IMAGE) setCurrentSrc(FALLBACK_IMAGE);
      }}
    />
  );
}

export function MegaMenu({ categoriesData }: { categoriesData: GetApiV10Category200 }) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [hoveredChildIndex, setHoveredChildIndex] = useState(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const rootCategories = (categoriesData?.responseData as CategoryWithChildren[]) || [];

  const activeRoot = rootCategories.find((cat) => cat.id === activeMenu) || null;
  const subCategories: Category[] = activeRoot?.categories || [];
  const hoveredSubCategory = subCategories[hoveredChildIndex];

  const { data: postsData, isLoading: isLoadingPosts } = useGetApiV10Post(
    {
      filters: "is_hidden==false",
      sortField: "created_at",
      sortOrder: "desc",
      pageSize: 8,
      filterBy: "CLIENT",
      category_id: hoveredSubCategory?.id,
    },
    {
      query: { enabled: !!hoveredSubCategory?.id },
    },
  );

  const posts = (postsData?.responseData?.rows as PostExtended[]) || [];

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setActiveMenu(null), CLOSE_DELAY);
  }, [cancelClose]);

  const handleRootEnter = (cat: CategoryWithChildren) => {
    cancelClose();
    setActiveMenu(cat.id || null);
    setHoveredChildIndex(0);
  };

  const handleRootLeave = useCallback(() => {
    cancelClose();
    setActiveMenu(null);
  }, [cancelClose]);

  const activeRootHasChildren = (activeRoot?.categories?.length ?? 0) > 0;

  return (
    <div
      className="hidden xl:flex items-center gap-7"
      onMouseLeave={scheduleClose}
    >
      {rootCategories.length === 0 ? (
        <span className="text-sm text-gray-400">Loading...</span>
      ) : (
        rootCategories.map((cat) => {
          const hasChildren = (cat.categories?.length ?? 0) > 0;
          const isActive = activeMenu === cat.id;

          return (
            <Link
              key={cat.id || cat.name}
              href={cat.link || "#"}
              onMouseEnter={() => (hasChildren ? handleRootEnter(cat) : handleRootLeave())}
            >
              {hasChildren ? (
                <button className="flex items-center gap-1 h-[78px] text-[14px] font-semibold text-ink hover:text-black-800 transition-colors">
                  <span className="relative">
                    {cat.name}
                    <span
                      className={`absolute -bottom-1 left-0 w-full h-[1px] bg-ink transition-transform duration-200 origin-left ${isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                    />
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isActive ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link
                  href={cat.link || "#"}
                  className="flex items-center h-[78px] text-[14px] font-semibold text-ink hover:text-black-800 transition-colors"
                >
                  <span className="relative">
                    {cat.name}
                    <span
                      className={`absolute -bottom-1 left-0 w-full h-[1px] bg-ink transition-transform duration-200 origin-left ${isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                    />
                  </span>
                </Link>
              )}
            </Link>
          );
        })
      )}

      {activeMenu && activeRootHasChildren && (
        <div
          className="absolute left-0 right-0 top-full z-50 animate-fade-in"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="w-full bg-white shadow-mega rounded-b-2xl p-8">
            <div className="container-kosmo">
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-3">
                  <ul className="space-y-1">
                    {subCategories.map((item, index) => (
                      <li
                        key={item.id || item.name}
                        onMouseEnter={() => setHoveredChildIndex(index)}
                      >
                        <Link
                          href={item.link || "#"}
                          className={`block px-3 py-2.5 text-[14px] rounded-lg transition-colors ${hoveredChildIndex === index
                            ? "bg-cream text-ink font-semibold"
                            : "text-ink hover:bg-cream"
                            }`}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-9">
                  {isLoadingPosts ? (
                    <div className="h-[240px] flex items-center justify-center text-gray-400 text-sm">
                      Loading...
                    </div>
                  ) : posts.length > 0 ? (
                    <div className="grid grid-cols-4 gap-5">
                      {posts.map((post) => (
                        <Link
                          key={post.id}
                          href={`${hoveredSubCategory?.link}/${post.slug || ""}`}
                          className="group block"
                        >
                          <div className="relative aspect-[4/3] rounded overflow-hidden bg-cream">
                            <ServiceImage post={post} />
                          </div>
                          <p className="mt-3 text-[14px] font-semibold text-center text-ink group-hover:text-black-800 transition-colors">
                            {post.title}
                          </p>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="h-[240px] flex items-center justify-center text-gray-400 text-sm">
                      No posts available for this category.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
