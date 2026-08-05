import { getApiV10PostCategoryByUrl } from "@/api/endpoints/post-category";
import type { PostCategory } from "@/api/models/postCategory";
import { PageHero, SectionHeading, ConsultationForm } from "@/components/common";
import type { PostExtended as PostWithImage } from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HardHat, Ruler } from "lucide-react";
import type { Metadata } from "next";
import SolutionList from "./components/solution-list";
import { SolutionsControls } from "./components/solutions-controls";
import { SOLUTION_TYPES, type SolutionType } from "./components/solution-types";

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

export const metadata: Metadata = {
  title: "Solutions | Kosmo DNC",
  description:
    "Two ways we bring your space to life — interior design and construction. Explore our work.",
};

interface SolutionsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SolutionsPage({ searchParams }: SolutionsPageProps) {
  const params = await searchParams;
  const activeType = ((params.type as string) ?? "design") as SolutionType;
  const currentPage = Math.max(1, parseInt((params.page as string) ?? "1") || 1);

  const activeTypeDef = SOLUTION_TYPES.find((s) => s.id === activeType) ?? SOLUTION_TYPES[0];

  let posts: PostWithImage[] = [];
  let category: PostCategoryWithPost["category"];
  let totalPages = 1;
  let hasError = false;

  try {
    const data = await getApiV10PostCategoryByUrl({
      categoryUrl: activeTypeDef.categoryUrl,
      page: currentPage,
      pageSize: PAGE_SIZE,
      sortField: "position",
      sortOrder: "asc",
    });
    const rows = (data?.responseData?.rows as PostCategoryWithPost[]) || [];
    posts = rows
      .map((row) => row.post)
      .filter((post): post is PostWithImage => !!post);
    category = rows[0]?.category;
    const count = data?.responseData?.count || 0;
    totalPages = count
      ? Math.ceil(count / (data?.responseData?.pageSize || PAGE_SIZE))
      : 1;
  } catch {
    hasError = true;
  }

  const currentCategoryName = category?.name || activeTypeDef.label;
  const categoryLink = category?.link || activeTypeDef.categoryUrl;

  return (
    <>
      <PageHero
        title="Solutions"
        subtitle="Two ways we bring your space to life — interior design and construction. Choose a path below to explore our work."
        breadcrumbs={[
          { label: "Home", href: "/home" },
          { label: "Solutions" },
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
                    borderColor: isActive
                      ? "var(--color-ink, #0b2f27)"
                      : "var(--color-mutedLine, #e5e1d8)",
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
            eyebrow="Projects"
            title={`${currentCategoryName} Projects`}
            subtitle={`Browse our latest ${currentCategoryName.toLowerCase()} work.`}
          />

          <SolutionsControls
            basePath="/solutions"
            activeType={activeType}
            currentCategoryName={currentCategoryName}
          >
            <SolutionList
              posts={posts}
              error={hasError ? new Error("Failed to load") : undefined}
              currentCategoryName={currentCategoryName}
              currentPage={currentPage}
              totalPages={totalPages}
              hasFilters={false}
              categoryLink={categoryLink}
            />
          </SolutionsControls>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading
            eyebrow="Need Support?"
            title="Request a Quote"
            subtitle="Contact us for a personalized quote."
          />
          <div className="max-w-4xl mx-auto">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </>
  );
}
