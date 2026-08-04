"use client";

import { useGetApiV10PostCategoryByUrl } from "@/api/endpoints/post-category";
import type { PostCategory } from "@/api/models/postCategory";
import {
  PageHero,
  SectionHeading,
  SplitContent,
  QuoteSection,
} from "@/components/common";
import { Loading } from "@/components/common/loading";
import { Search } from "lucide-react";
import { Suspense, useMemo, useState } from "react";
import type { PostExtended as PostWithImage } from "@/types/post";
import { DesignCard } from "./components/design-card";
import { DesignInquiryForm } from "./components/design-inquiry-form";

const CATEGORY_URL = "/solutions/design";
const PAGE_SIZE = 24;

interface PostCategoryWithPost extends PostCategory {
  post?: PostWithImage;
  category?: {
    id?: string;
    name?: string;
    description?: string | null;
    link?: string | null;
  };
}

const values = [
  {
    title: "Ready-to-Use Designs",
    description:
      "Browse a curated catalog of design drawings ready to reference or adapt for your project.",
  },
  {
    title: "Clear Visualization",
    description:
      "Each design is presented with a clean thumbnail so you can quickly compare styles and layouts.",
  },
  {
    title: "Customizable",
    description:
      "Found something you like? Our team can tailor any design to fit your space and requirements.",
  },
  {
    title: "Browse Freely",
    description:
      "No commitment needed — explore the gallery at your own pace and reach out when you're ready.",
  },
];

export default function DesignPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <Loading text="Design" size="lg" className="text-ink" />
        </div>
      }
    >
      <DesignContent />
    </Suspense>
  );
}

function DesignContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useGetApiV10PostCategoryByUrl({
    categoryUrl: CATEGORY_URL,
    page: currentPage,
    pageSize: PAGE_SIZE,
    sortField: "position",
    sortOrder: "asc",
  });

  const { posts, category, totalPages } = useMemo(() => {
    const rows = (data?.responseData?.rows as PostCategoryWithPost[]) || [];
    const extractedPosts = rows
      .map((row) => row.post)
      .filter((post): post is PostWithImage => !!post);
    const cat = rows[0]?.category;
    const count = data?.responseData?.count || 0;
    return {
      posts: extractedPosts,
      category: cat,
      totalPages: count
        ? Math.ceil(count / (data?.responseData?.pageSize || PAGE_SIZE))
        : 1,
    };
  }, [data]);

  const filteredPosts = useMemo(() => {
    if (!search.trim()) return posts;
    const q = search.trim().toLowerCase();
    return posts.filter((p) => (p.title || "").toLowerCase().includes(q));
  }, [posts, search]);

  const categoryName = category?.name || "Design Drawings";
  const categoryDescription =
    category?.description?.replace(/<[^>]*>/g, "") || undefined;
  const categoryLink = category?.link || CATEGORY_URL;

  return (
    <>
      <PageHero
        title="Design Drawings Gallery"
        subtitle={
          categoryDescription ||
          "Browse our collection of design drawings — reference designs to help you visualize and choose the right look for your space."
        }
        breadcrumbs={[
          { label: "Home", href: "/home" },
          { label: "Solutions", href: "/solutions" },
          { label: "Design" },
        ]}
        backgroundImage="/images/living.jpg"
      />

      {/* Intro Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <SplitContent
            image="/images/living.jpg"
            eyebrow="Design Gallery"
            title="A Curated Collection of Design Drawings"
            description="Our gallery brings together a curated selection of design drawings for you to browse and reference. From furniture layouts to full room concepts, each design is presented clearly so you can compare styles and find inspiration for your own project."
            features={[
              {
                title: "Browse Freely",
                description:
                  "Explore designs at your own pace — no sign-up or commitment required.",
              },
              {
                title: "Clean Thumbnails",
                description:
                  "Every design is shown with a clear preview and title for easy comparison.",
              },
              {
                title: "Talk to Us Anytime",
                description:
                  "See something you like? Reach out and our team will help you adapt it.",
              },
            ]}
          />
        </div>
      </section>

      {/* Design Drawings Gallery */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container-kosmo">
          <SectionHeading
            eyebrow="Gallery"
            title="Design Drawings"
            subtitle="Browse our latest design drawings. Click any design to view details."
          />

          {/* Search bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search designs by title..."
                className="w-full rounded-full border border-mutedLine bg-white pl-10 pr-4 py-2.5 text-[13px] sm:text-[14px] text-ink placeholder:text-gray-400 focus:outline-none focus:border-ink/60 transition-colors"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-[--radius-md] overflow-hidden bg-white border border-mutedLine animate-pulse"
                >
                  <div className="aspect-[4/3] bg-cream" />
                  <div className="p-4 sm:p-5">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-[--radius-md] border border-line bg-white p-8 text-center">
              <p className="text-[14px] text-gray-700">
                Unable to load design drawings. Please try again later.
              </p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="rounded-[--radius-md] border border-line bg-white py-16 px-6 text-center">
              <p className="text-gray-600">
                {search.trim()
                  ? `No designs match "${search}". Try a different keyword.`
                  : "No design drawings have been published yet."}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                {filteredPosts.map((post) => (
                  <DesignCard
                    key={post.id}
                    post={post}
                    categoryLink={categoryLink}
                  />
                ))}
              </div>

              {!search.trim() && totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-9 h-9 rounded-lg text-[13px] font-bold transition-all ${currentPage === i + 1
                        ? "bg-ink text-white"
                        : "bg-white text-gray-700 border border-mutedLine hover:border-ink/40"
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading
            eyebrow="Why Browse Our Gallery"
            title="What You Get From Our Designs"
            subtitle="Every design in our gallery is created to help you make confident decisions."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-5 sm:p-6 md:p-7 rounded-[--radius-md] bg-white shadow-soft"
              >
                <h3 className="font-serif text-[22px] sm:text-[24px] text-ink mb-2 sm:mb-3">
                  {value.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] text-gray-700 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuoteSection
        quote="Browsing the design gallery helped us figure out exactly what we wanted before talking to the team. The drawings made it easy to compare and decide."
        author="Homeowner"
        title="Rockville, MD"
      />

      {/* Inquiry Form Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container-kosmo">
          <SectionHeading
            eyebrow="Get Started"
            title="Request a Custom Design"
            subtitle="Want a design tailored to your space? Share your requirements and our design team will prepare a custom drawing for you."
          />
          <div className="max-w-5xl mx-auto">
            <DesignInquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
