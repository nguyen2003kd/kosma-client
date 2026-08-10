import { getApiV10PostCategoryByUrl } from "@/api/endpoints/post-category";
import type { PostCategory } from "@/api/models/postCategory";
import { PageHero, SectionHeading, QuoteSection, ConsultationForm } from "@/components/common";
import baseConfig from "@/configs/base";
import { getThumbnailSrc } from "@/lib/responsive-image";
import type { PostExtended } from "@/types/post";
import { ArrowRight, Calendar, Eye, FileText, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DesignImage } from "@/app/solutions/design/components/design-image";

const FALLBACK_IMAGE = "/images/living.jpg";

interface ServiceCategoryPageProps {
  params: Promise<{ slug: string }>;
}

interface PostCategoryWithPost extends PostCategory {
  post?: PostExtended;
  category?: { id?: string; name?: string; description?: string | null; link?: string | null };
}

async function getPostCategoriesByUrl(
  categoryUrl: string,
): Promise<{ category: PostCategoryWithPost["category"]; posts: PostExtended[] }> {
  try {
    const data = await getApiV10PostCategoryByUrl({
      categoryUrl,
      pageSize: 100,
      sortField: "position",
      sortOrder: "asc",
    });
    const rows = (data?.responseData?.rows as PostCategoryWithPost[]) || [];

    const posts = rows
      .map((row) => row.post)
      .filter((post): post is PostExtended => !!post);

    const category = rows[0]?.category;

    return { category, posts };
  } catch {
    return { category: undefined, posts: [] };
  }
}

export async function generateMetadata({
  params,
}: ServiceCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryUrl = `/services/${slug}`;
  const { category, posts } = await getPostCategoriesByUrl(categoryUrl);

  const title = category?.name || (posts[0]?.title as string | undefined) || "Services";
  const description =
    category?.description?.replace(/<[^>]*>/g, "").slice(0, 160) ||
    "Interior design, construction and branding services by Kosmo DNC.";
  const pageUrl = `${baseConfig.frontendDomain}/services/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: "website",
      siteName: "Kosmo DNC",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function ServiceCategoryPage({ params }: ServiceCategoryPageProps) {
  const { slug } = await params;
  const categoryUrl = `/services/${slug}`;
  const { category, posts } = await getPostCategoriesByUrl(categoryUrl);

  if (!category && posts.length === 0) notFound();

  const categoryName = category?.name || "Services";
  const categoryDescription = category?.description?.replace(/<[^>]*>/g, "") || undefined;
  const categoryLink = category?.link || categoryUrl;

  // Featured post = first one
  const featuredPost = posts[0];
  const restPosts = posts.slice(1);
  const featuredImage = featuredPost
    ? getThumbnailSrc(
      undefined,
      featuredPost.thumbnail_path,
      FALLBACK_IMAGE,
    )
    : FALLBACK_IMAGE;

  return (
    <>
      <PageHero
        title={categoryName}
        subtitle={categoryDescription || undefined}
        breadcrumbs={[
          { label: "Home", href: "/home" },
          { label: "Services", href: "/services" },
          { label: categoryName },
        ]}
        backgroundImage="/images/lounge.jpg"
      />

      {/* Stats / Overview Bar */}
      <section className="bg-black-950 py-6 sm:py-8">
        <div className="container-kosmo">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center px-2 sm:px-3 py-2 sm:py-3 border-l border-white/15 first:border-0">
              <div className="font-serif text-[22px] sm:text-[26px] md:text-[30px] text-[#d8c29c] mb-0.5">
                {posts.length}
              </div>
              <div className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.1em] text-white/80">
                Projects
              </div>
            </div>
            <div className="text-center px-2 sm:px-3 py-2 sm:py-3 border-l border-white/15">
              <div className="font-serif text-[22px] sm:text-[26px] md:text-[30px] text-[#d8c29c] mb-0.5">
                15+
              </div>
              <div className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.1em] text-white/80">
                Years Experience
              </div>
            </div>
            <div className="text-center px-2 sm:px-3 py-2 sm:py-3 border-l border-white/15">
              <div className="font-serif text-[22px] sm:text-[26px] md:text-[30px] text-[#d8c29c] mb-0.5">
                500+
              </div>
              <div className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.1em] text-white/80">
                Clients Served
              </div>
            </div>
            <div className="text-center px-2 sm:px-3 py-2 sm:py-3 border-l border-white/15">
              <div className="font-serif text-[22px] sm:text-[26px] md:text-[30px] text-[#d8c29c] mb-0.5">
                MD #113826
              </div>
              <div className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.1em] text-white/80">
                Licensed & Insured
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container-kosmo">
          <SectionHeading
            eyebrow={posts.length > 0 ? "All Projects" : undefined}
            title={posts.length > 0 ? `${categoryName} Projects` : "No Projects Yet"}
            subtitle={
              posts.length > 0
                ? `Browse all ${posts.length} ${categoryName.toLowerCase()} projects we've delivered.`
                : "There are no posts published in this category yet. Check back soon or contact us for a custom quote."
            }
          />

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {/* Featured post also appears as first card for consistency */}
              {posts.map((post, index) => {
                const href = `${categoryLink}/${post.slug || ""}`;
                const image = getThumbnailSrc(
                  undefined,
                  post.thumbnail_path,
                  FALLBACK_IMAGE,
                );
                const date = post.created_at
                  ? new Date(post.created_at).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                  : undefined;
                const isFeatured = index === 0;

                return (
                  <Link
                    key={post.id}
                    href={href}
                    className={`group flex flex-col h-full rounded-[--radius-md] overflow-hidden bg-white transition-all hover:shadow-strong ${isFeatured
                      ? "border-2 border-[#d8c29c]"
                      : "border border-line hover:border-ink/20"
                      }`}
                  >
                    <div className="relative h-44 sm:h-48 overflow-hidden bg-cream">
                      <Image
                        src={image}
                        alt={post.title || ""}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1080px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {isFeatured && (
                        <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#d8c29c] text-black-950 text-[10px] font-extrabold uppercase tracking-[0.1em]">
                          <Sparkles className="w-3 h-3" />
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                      <h3 className="font-serif text-[18px] sm:text-[20px] text-ink mb-2 line-clamp-2 leading-tight group-hover:text-gold transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-[13px] sm:text-[14px] text-gray-700 line-clamp-2 flex-grow">
                        {post.summary?.replace(/<[^>]*>/g, "") || ""}
                      </p>
                      <div className="mt-4 pt-3 border-t border-line flex items-center justify-between">
                        {date ? (
                          <p className="text-gray-600 text-xs flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {date}
                          </p>
                        ) : (
                          <span />
                        )}
                        <span className="inline-flex items-center text-ink font-semibold text-[13px] group-hover:text-gold transition-colors">
                          View Details
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[--radius-md] border border-line bg-white py-16 px-6 text-center max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center mx-auto mb-5">
                <FileText className="w-8 h-8 text-black-700/40" />
              </div>
              <h3 className="font-serif text-[22px] text-ink mb-2">
                No Projects Published Yet
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                We're working on adding content to this category. In the meantime,
                feel free to reach out — we'd love to discuss your project.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-ink font-semibold text-sm hover:text-gold transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to All Services
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Quote Section */}
      <QuoteSection
        quote="Kosmo DNC delivered beyond our expectations. Professional, on time, and the quality of work is exceptional."
        author="Satisfied Client"
        title="Maryland"
      />

      {/* Consultation Form */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container-kosmo">
          <SectionHeading
            eyebrow="Get Started"
            title={`Request a ${categoryName} Consultation`}
            subtitle="Share your project details — our team will prepare a tailored proposal and contact you within 24 hours."
          />
          <div className="max-w-4xl mx-auto">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </>
  );
}
