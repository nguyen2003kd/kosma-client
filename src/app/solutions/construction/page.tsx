import { getApiV10PostCategoryByUrl } from "@/api/endpoints/post-category";
import { getApiV10Product } from "@/api/endpoints/product";
import type { GetApiV10ProductParams } from "@/api/models";
import type { PostCategory } from "@/api/models/postCategory";
import {
  PageHero,
  SectionHeading,
  SplitContent,
  QuoteSection,
} from "@/components/common";
import type { PostExtended as PostWithImage } from "@/types/post";
import type { Metadata } from "next";
import ConstructionList from "./components/construction-list";
import {
  MaterialsMarketplace,
  transformToMaterialProduct,
  type ProductRow,
} from "./components/materials-marketplace";
import { MaterialsMarketplaceControls } from "./components/materials-marketplace-controls";

const CATEGORY_URL = "/solutions/construction";
const PAGE_SIZE = 12;
const MATERIALS_PAGE_SIZE = 50;

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
  title: "Construction | Kosmo DNC",
  description:
    "Skilled craftsmanship and modern construction technology — built to last, delivered on schedule.",
};

interface ConstructionPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ConstructionPage({
  searchParams,
}: ConstructionPageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt((params.page as string) ?? "1") || 1);

  const mcat = (params.mcat as string) ?? "all";
  const msort = (params.msort as string) ?? "featured";
  const msearch = (params.msearch as string) ?? "";

  let posts: PostWithImage[] = [];
  let category: PostCategoryWithPost["category"];
  let totalPages = 1;
  let postsError = false;

  try {
    const data = await getApiV10PostCategoryByUrl({
      categoryUrl: CATEGORY_URL,
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
    postsError = true;
  }

  const categoryName = category?.name || "Construction";
  const categoryDescription =
    category?.description?.replace(/<[^>]*>/g, "") || undefined;
  const categoryLink = category?.link || CATEGORY_URL;

  let materialProducts: ReturnType<typeof transformToMaterialProduct>[] = [];
  let materialsError = false;

  try {
    const filters = [
      "status==active",
      mcat !== "all" ? `category==${mcat}` : "",
    ]
      .filter(Boolean)
      .join(",");

    const queryParams: GetApiV10ProductParams = {
      page: 1,
      pageSize: MATERIALS_PAGE_SIZE,
      filters,
    };

    if (msort === "price-asc") {
      queryParams.sortField = "price";
      queryParams.sortOrder = "asc";
    } else if (msort === "price-desc") {
      queryParams.sortField = "price";
      queryParams.sortOrder = "desc";
    }

    const data = await getApiV10Product(queryParams);
    const rows =
      ((data as unknown as { responseData?: { rows?: ProductRow[] } })
        ?.responseData?.rows) ?? [];
    materialProducts = rows.map(transformToMaterialProduct);

    // Client-side search filter (search is applied in the client controls
    // via URL param, but since we already fetched all 50, we filter here too)
    if (msearch.trim()) {
      const q = msearch.trim().toLowerCase();
      materialProducts = materialProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.brand?.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q),
      );
    }
  } catch {
    materialsError = true;
  }

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
        backgroundImage="/images/exterior.jpg"
      />

      {/* Intro Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <SplitContent
            image="/images/exterior.jpg"
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
            error={postsError ? new Error("Failed to load") : undefined}
            currentCategoryName={categoryName}
            currentPage={currentPage}
            totalPages={totalPages}
            hasFilters={false}
            categoryLink={categoryLink}
          />
        </div>
      </section>

      {/* Section 2: Materials Marketplace */}
      <section id="materials" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white scroll-mt-20">
        <div className="container-kosmo">
          <SectionHeading
            eyebrow="Shop Materials"
            title="Construction Materials Marketplace"
            subtitle="Buy toilets, sinks, lighting, hardware, and building materials directly — with trade pricing for contractors."
          />
          <MaterialsMarketplaceControls basePath="/solutions/construction">
            <MaterialsMarketplace
              products={materialProducts}
              error={materialsError ? new Error("Failed to load") : undefined}
            />
          </MaterialsMarketplaceControls>
        </div>
      </section>

      <QuoteSection
        quote="The crew's craftsmanship was evident in every detail — from the framing to the final finish. They used modern layout tools that kept everything plumb and level. Outstanding build quality."
        author="Property Owner"
        title="Gaithersburg, MD"
      />
    </>
  );
}
