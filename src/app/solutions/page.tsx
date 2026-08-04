"use client";

import { useGetApiV10PostCategoryByUrl } from "@/api/endpoints/post-category";
import type { PostCategory } from "@/api/models/postCategory";
import { PageHero, SectionHeading, ConsultationForm } from "@/components/common";
import QuotationPopupDialog from "@/components/common/quotation-popup/quotation-popup-dialog";
import { Loading } from "@/components/common/loading";
import type { PostExtended as PostWithImage } from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HardHat, Ruler } from "lucide-react";
import { Suspense, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import SolutionList from "./components/solution-list";
import SolutionSidebar from "./components/solution-sidebar";

const PAGE_SIZE = 12;

type SolutionType = "design" | "construction";

interface SolutionTypeDef {
  id: SolutionType;
  label: string;
  categoryUrl: string;
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  icon: typeof Ruler;
}

const SOLUTION_TYPES: SolutionTypeDef[] = [
  {
    id: "design",
    label: "Design",
    categoryUrl: "/solutions/design",
    href: "/solutions/design",
    eyebrow: "Design Gallery",
    title: "Browse Design Drawings",
    description:
      "A curated gallery of design drawings for you to browse and reference — find inspiration and the right look for your space.",
    image: "/images/living.jpg",
    icon: Ruler,
  },
  {
    id: "construction",
    label: "Construction",
    categoryUrl: "/solutions/construction",
    href: "/solutions/construction",
    eyebrow: "Craftsmanship & Technology",
    title: "Built by Skilled Hands",
    description:
      "Design-build construction combining licensed trades crews with modern technology — BIM, laser layout, and precision quality control on every project.",
    image: "/images/living.jpg",
    icon: HardHat,
  },
];

interface PostCategoryWithPost extends PostCategory {
  post?: PostWithImage;
  category?: {
    id?: string;
    name?: string;
    description?: string | null;
    link?: string | null;
  };
}

export default function SolutionsPage() {
  const { t } = useTranslation("pages/solutions");

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <Loading text={t("title")} size="lg" className="text-ink" />
        </div>
      }
    >
      <SolutionsContent />
    </Suspense>
  );
}

function SolutionsContent() {
  const { t, i18n } = useTranslation("pages/solutions");
  const locale = i18n.language?.startsWith("en") ? "en-US" : "vi-VN";

  const [activeType, setActiveType] = useState<SolutionType>("design");
  const [currentPage, setCurrentPage] = useState(1);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const activeTypeDef = SOLUTION_TYPES.find((s) => s.id === activeType)!;

  const { data, isLoading, error } = useGetApiV10PostCategoryByUrl({
    categoryUrl: activeTypeDef.categoryUrl,
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

  const currentCategoryName = category?.name || activeTypeDef.label;
  const categoryLink = category?.link || activeTypeDef.categoryUrl;

  const handleTabChange = (type: SolutionType) => {
    setActiveType(type);
    setCurrentPage(1);
  };

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle="Two ways we bring your space to life — interior design and construction. Choose a path below to explore our work."
        breadcrumbs={[
          { label: "Home", href: "/home" },
          { label: t("title") },
        ]}
        backgroundImage="/images/living.jpg"
      />

      {/* Solution Type Cards — Design & Construction */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading
            eyebrow="Our Solutions"
            title="Design & Construction"
            subtitle="We cover the full journey from concept to completion — pick the solution that fits your project."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
            {SOLUTION_TYPES.map((type) => {
              const Icon = type.icon;
              const isActive = activeType === type.id;
              return (
                <Link
                  key={type.id}
                  href={type.href}
                  className="group relative flex flex-col rounded-[--radius-md] overflow-hidden bg-white border-2 transition-all hover:shadow-strong"
                  style={{
                    borderColor: isActive ? "var(--color-ink, #0b2f27)" : "var(--color-mutedLine, #e5e1d8)",
                  }}
                >
                  <div className="relative h-48 sm:h-56 overflow-hidden bg-cream">
                    <Image
                      src={type.image}
                      alt={type.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black-950/30" />
                    <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-5.5 h-5.5 text-ink" />
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 md:p-7 flex flex-col flex-grow">
                    <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.12em] text-gold mb-2">
                      {type.eyebrow}
                    </span>
                    <h3 className="font-serif text-[22px] sm:text-[26px] text-ink mb-2 leading-tight group-hover:text-gold transition-colors">
                      {type.title}
                    </h3>
                    <p className="text-[13px] sm:text-[14px] text-gray-700 leading-relaxed flex-grow">
                      {type.description}
                    </p>
                    <span className="mt-4 inline-flex items-center text-ink font-bold text-[13px] group-hover:text-gold transition-colors">
                      Explore {type.label}
                      <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Posts Section — tabbed by Design / Construction */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container-kosmo">
          <SectionHeading
            eyebrow={t("categoryTitle")}
            title={`${currentCategoryName} Projects`}
            subtitle={`Browse our latest ${currentCategoryName.toLowerCase()} work.`}
          />

          {/* Tab switcher — only 2 types */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8">
            {SOLUTION_TYPES.map((type) => {
              const isActive = activeType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => handleTabChange(type.id)}
                  className={`inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-[13px] sm:text-[14px] font-bold transition-all ${isActive
                    ? "bg-ink text-white shadow-soft"
                    : "bg-white text-gray-700 border border-mutedLine hover:border-ink/40 hover:text-ink"
                    }`}
                >
                  {type.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <SolutionList
                posts={posts}
                isLoading={isLoading}
                error={error}
                currentCategoryName={currentCategoryName}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                hasFilters={false}
                hasDateFilter={false}
                hasCategoryFilter={false}
                onClearDateFilter={() => setCurrentPage(1)}
                onClearCategoryFilter={() => setCurrentPage(1)}
                locale={locale}
                categoryLink={categoryLink}
              />
            </div>

            <div className="lg:col-span-1">
              <SolutionSidebar onQuoteClick={() => setIsQuoteModalOpen(true)} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading
            eyebrow={t("needSupport")}
            title={t("requestQuote")}
            subtitle={t("contactForQuote")}
          />
          <div className="max-w-4xl mx-auto">
            <ConsultationForm />
          </div>
        </div>
      </section>

      <QuotationPopupDialog
        open={isQuoteModalOpen}
        onOpenChange={setIsQuoteModalOpen}
      />
    </>
  );
}
