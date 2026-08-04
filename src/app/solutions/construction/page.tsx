"use client";

import { useGetApiV10PostCategoryByUrl } from "@/api/endpoints/post-category";
import type { PostCategory } from "@/api/models/postCategory";
import {
  PageHero,
  SectionHeading,
  SplitContent,
  QuoteSection,
  ConsultationForm,
} from "@/components/common";
import { Loading } from "@/components/common/loading";
import type { PostExtended as PostWithImage } from "@/types/post";
import { Suspense, useMemo, useState } from "react";
import ConstructionList from "./components/construction-list";
import { MaterialsMarketplace } from "./components/materials-marketplace";

const CATEGORY_URL = "/solutions/construction";
const PAGE_SIZE = 12;

interface PostCategoryWithPost extends PostCategory {
  post?: PostWithImage;
  category?: {
    id?: string;
    name?: string;
    description?: string | null;
    link?: string | null;
  };
}

export default function ConstructionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <Loading text="Construction" size="lg" className="text-ink" />
        </div>
      }
    >
      <ConstructionContent />
    </Suspense>
  );
}

function ConstructionContent() {
  const [currentPage, setCurrentPage] = useState(1);

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
      totalPages: count ? Math.ceil(count / (data?.responseData?.pageSize || PAGE_SIZE)) : 1,
    };
  }, [data]);

  const categoryName = category?.name || "Construction";
  const categoryDescription = category?.description?.replace(/<[^>]*>/g, "") || undefined;
  const categoryLink = category?.link || CATEGORY_URL;

  return (
    <>
      <PageHero
        title={categoryName}
        subtitle={
          categoryDescription ||
          "Skilled craftsmanship and modern construction technology — built to last, delivered on schedule."
        }
        breadcrumbs={[
          { label: "Home", href: "/home" },
          { label: "Solutions", href: "/solutions" },
          { label: "Construction" },
        ]}
        backgroundImage="/images/living.jpg"
      />

      {/* Intro Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <SplitContent
            image="/images/living.jpg"
            eyebrow="Craftsmanship & Technology"
            title="Where Skilled Hands Meet Modern Technology"
            description="Our construction crews combine decades of hands-on craft with the latest building technology — from laser-guided layout and BIM coordination to precision joinery and engineered material systems. Every build is executed by licensed tradespeople who take pride in clean, durable, code-compliant workmanship."
            features={[
              {
                title: "Skilled Trades Crews",
                description:
                  "Licensed carpenters, masons, plumbers, and electricians — not subcontracted day labor.",
              },
              {
                title: "Modern Construction Tech",
                description:
                  "BIM coordination, laser layout, drone site surveys, and digital progress tracking.",
              },
              {
                title: "Precision Quality Control",
                description:
                  "Multi-stage inspections and tolerance checks on every structural and finish element.",
              },
            ]}
          />
        </div>
      </section>

      {/* Section 1: Construction Posts */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container-kosmo">
          <SectionHeading
            eyebrow="Build Portfolio"
            title="Construction Techniques & Project Showcases"
            subtitle="See how our crews apply craftsmanship and technology across residential, commercial, and fit-out projects."
          />

          <ConstructionList
            posts={posts}
            isLoading={isLoading}
            error={error}
            currentCategoryName={categoryName}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            hasFilters={false}
            hasDateFilter={false}
            hasCategoryFilter={false}
            onClearDateFilter={() => setCurrentPage(1)}
            onClearCategoryFilter={() => setCurrentPage(1)}
            categoryLink={categoryLink}
          />
        </div>
      </section>

      {/* Section 2: Materials Marketplace */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading
            eyebrow="Shop Materials"
            title="Construction Materials Marketplace"
            subtitle="Buy toilets, sinks, lighting, hardware, and building materials directly — with trade pricing for contractors."
          />
          <MaterialsMarketplace />
        </div>
      </section>

      <QuoteSection
        quote="The crew's craftsmanship was evident in every detail — from the framing to the final finish. They used modern layout tools that kept everything plumb and level. Outstanding build quality."
        author="Property Owner"
        title="Gaithersburg, MD"
      />

      {/* Consultation Form */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container-kosmo">
          <SectionHeading
            eyebrow="Get Started"
            title="Request a Construction Consultation"
            subtitle="Share your project details and material needs — our team will prepare a tailored proposal and contact you within 24 hours."
          />
          <div className="max-w-4xl mx-auto">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </>
  );
}
