import { getApiV10Category } from "@/api/endpoints/category";
import { getApiV10Post } from "@/api/endpoints/post";
import type { GetApiV10PostParams } from "@/api/models";
import { CategoryWithChildren } from "@/api/models/categoryWithChildren";
import { PageHero, SectionHeading, ConsultationForm } from "@/components/common";
import { buildPostFilters } from "@/lib/filters";
import { slugify } from "@/lib/slugify";
import type { PostExtended as PostWithImage } from "@/types/post";
import type { Metadata } from "next";
import ServiceListSSR from "./components/service-list-ssr";
import { ServicesControls } from "./components/services-controls";

const PAGE_SIZE = 12;
const PATHNAME = "/services";

export const metadata: Metadata = {
  title: "Services | Kosmo DNC",
  description:
    "Explore our full range of design, construction, and branding services.",
};

interface ServicesPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt((params.page as string) ?? "1") || 1);
  const categoryParam = (params.category as string) ?? "";

  // --- Fetch categories ---
  let serviceCategory: CategoryWithChildren | undefined;
  let serviceSubCategories: CategoryWithChildren["categories"] = [];
  let categoriesError = false;

  try {
    const categoriesData = await getApiV10Category({ language: "en" });
    const allCategories =
      (categoriesData as unknown as { responseData?: CategoryWithChildren[] })
        ?.responseData ?? [];
    serviceCategory = allCategories.find((cat) => cat.link === PATHNAME);
    serviceSubCategories = serviceCategory?.categories || [];
  } catch {
    categoriesError = true;
  }

  let selectedCategory = "";
  if (categoryParam && serviceSubCategories.length > 0) {
    const matched = serviceSubCategories.find(
      (cat) => slugify(cat.name || "") === categoryParam || cat.id === categoryParam,
    );
    selectedCategory = matched?.id || "";
  }

  const rootCategoryName = serviceCategory?.name || "Services";
  const currentCategoryName = selectedCategory
    ? serviceSubCategories.find((cat) => cat.id === selectedCategory)?.name || "N/a"
    : "All Services";
  const activeCategoryLink = selectedCategory
    ? serviceSubCategories.find((cat) => cat.id === selectedCategory)?.link
    : serviceSubCategories[0]?.link;

  // --- Fetch posts ---
  const filters = buildPostFilters(undefined);
  const postQueryParams: GetApiV10PostParams = {
    filters,
    page: currentPage,
    pageSize: PAGE_SIZE,
    position: "true" as const,
    sortOrderPosition: "ASC" as const,
    filterBy: "CLIENT" as const,
    ...(selectedCategory ? { category_id: selectedCategory } : {}),
  };

  let posts: PostWithImage[] = [];
  let totalPages = 1;
  let postsError = false;

  try {
    const data = await getApiV10Post(postQueryParams);
    const responseData = (data as unknown as {
      responseData?: { rows?: PostWithImage[]; count?: number; pageSize?: number };
    }).responseData;
    posts = (responseData?.rows as PostWithImage[]) || [];
    const count = responseData?.count ?? 0;
    totalPages = count
      ? Math.ceil(count / (responseData?.pageSize || PAGE_SIZE))
      : 1;
  } catch {
    postsError = true;
  }

  const hasFilters = !!selectedCategory;

  return (
    <>
      <PageHero
        title={rootCategoryName}
        subtitle="All Services"
        breadcrumbs={[
          { label: "Home", href: "/home" },
          { label: "Services" },
        ]}
        backgroundImage="/images/hero.jpg"
      />

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading
            eyebrow="Categories"
            title={currentCategoryName}
            subtitle="All Services"
          />

          <ServicesControls
            categories={serviceSubCategories}
            selectedCategory={selectedCategory}
          >
            <ServiceListSSR
              posts={posts}
              error={
                postsError || categoriesError
                  ? new Error("Failed to load")
                  : undefined
              }
              currentCategoryName={currentCategoryName}
              currentPage={currentPage}
              totalPages={totalPages}
              hasFilters={hasFilters}
              hasDateFilter={false}
              hasCategoryFilter={hasFilters}
              categoryLink={activeCategoryLink ?? undefined}
            />
          </ServicesControls>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
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
