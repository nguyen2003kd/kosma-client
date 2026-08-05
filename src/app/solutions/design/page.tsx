import { getApiV10PostCategoryByUrl } from "@/api/endpoints/post-category";
import type { PostCategory } from "@/api/models/postCategory";
import {
  PageHero,
  SectionHeading,
  SplitContent,
  QuoteSection,
} from "@/components/common";
import type { PostExtended as PostWithImage } from "@/types/post";
import type { Metadata } from "next";
import { DesignControls } from "./components/design-controls";
import { DesignGallery } from "./components/design-gallery";
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

export const metadata: Metadata = {
  title: "Design Drawings Gallery | Kosmo DNC",
  description:
    "Browse our collection of design drawings — reference designs to help you visualize and choose the right look for your space.",
};

interface DesignPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function DesignPage({ searchParams }: DesignPageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt((params.page as string) ?? "1") || 1);
  const search = (params.search as string) ?? "";

  let posts: PostWithImage[] = [];
  let category: PostCategoryWithPost["category"];
  let totalPages = 1;
  let hasError = false;

  try {
    const data = await getApiV10PostCategoryByUrl({
      categoryUrl: CATEGORY_URL,
      page: currentPage,
      pageSize: PAGE_SIZE,
      sortField: "position",
      sortOrder: "asc",
    });
    const rows = (data?.responseData?.rows as PostCategoryWithPost[]) || [];
    const extractedPosts = rows
      .map((row) => row.post)
      .filter((post): post is PostWithImage => !!post);
    const cat = rows[0]?.category;
    const count = data?.responseData?.count || 0;
    posts = extractedPosts;
    category = cat;
    totalPages = count
      ? Math.ceil(count / (data?.responseData?.pageSize || PAGE_SIZE))
      : 1;
  } catch {
    hasError = true;
  }

  // Apply search filter server-side (search input is reflected in URL)
  const filteredPosts = search.trim()
    ? posts.filter((p) =>
      (p.title || "").toLowerCase().includes(search.trim().toLowerCase()),
    )
    : posts;

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
        backgroundImage="/images/showroom.jpg"
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

          <DesignControls basePath="/solutions/design">
            <DesignGallery
              posts={filteredPosts}
              error={hasError ? new Error("Failed to load") : undefined}
              currentPage={currentPage}
              totalPages={totalPages}
              search={search}
              categoryLink={categoryLink}
            />
          </DesignControls>
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

      <DesignInquiryForm />
    </>
  );
}
