import { getApiV10PostCategoryByUrl } from "@/api/endpoints/post-category";
import type { PostCategory } from "@/api/models/postCategory";
import { PageHero } from "@/components/common";
import baseConfig from "@/configs/base";
import { getThumbnailSrc } from "@/lib/responsive-image";
import type { ImageCompressInfo, PostExtended } from "@/types/post";
import { Calendar } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface SolutionCategoryPageProps {
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
}: SolutionCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryUrl = `/solutions/${slug}`;
  const { category, posts } = await getPostCategoriesByUrl(categoryUrl);

  const title = category?.name || (posts[0]?.title as string | undefined) || "Solutions";
  const description =
    category?.description?.replace(/<[^>]*>/g, "").slice(0, 160) ||
    "Interior design, construction and branding solutions by Kosmo DNC.";
  const pageUrl = `${baseConfig.frontendDomain}/solutions/${slug}`;

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

export default async function SolutionCategoryPage({ params }: SolutionCategoryPageProps) {
  const { slug } = await params;
  const categoryUrl = `/solutions/${slug}`;
  const { category, posts } = await getPostCategoriesByUrl(categoryUrl);

  if (!category && posts.length === 0) notFound();

  const categoryName = category?.name || "Solutions";
  const categoryDescription = category?.description?.replace(/<[^>]*>/g, "");
  const categoryLink = category?.link || categoryUrl;

  return (
    <>
      <PageHero
        title={categoryName}
        subtitle={categoryDescription || undefined}
        breadcrumbs={[
          { label: "Home", href: "/home" },
          { label: "Solutions", href: "/solutions" },
          { label: categoryName },
        ]}
        backgroundImage="/images/banner_service_2.png"
      />

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <div className="rounded-[--radius-md] border border-line bg-white shadow-soft px-5 py-4 mb-8 flex items-center gap-3">
            <Calendar className="w-5 h-5 text-black-700" />
            <h2 className="font-serif text-[18px] text-ink">
              {posts.length > 0
                ? `${posts.length} solutions`
                : "No solutions available in this category yet"}
            </h2>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {posts.map((post) => {
                const href = `${categoryLink}/${post.slug || ""}`;
                const image = getThumbnailSrc(
                  post.thumbnail_compress_info as ImageCompressInfo | undefined,
                  post.thumbnail_path,
                );
                const date = post.created_at
                  ? new Date(post.created_at).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                  : undefined;

                return (
                  <Link
                    key={post.id}
                    href={href}
                    className="group flex flex-col h-full rounded-[--radius-md] overflow-hidden bg-white border border-line hover:shadow-soft transition-shadow"
                  >
                    <div className="relative h-40 sm:h-44 overflow-hidden bg-cream">
                      <Image
                        src={image}
                        alt={post.title || ""}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                      <h3 className="font-serif text-[18px] sm:text-[20px] text-ink mb-2 line-clamp-2 leading-tight group-hover:text-gold transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-[13px] sm:text-[14px] text-gray-700 line-clamp-2 flex-grow">
                        {post.summary?.replace(/<[^>]*>/g, "") || ""}
                      </p>
                      {date && (
                        <div className="mt-4 pt-3 border-t border-line flex items-center gap-1.5 text-gray-600 text-xs">
                          <Calendar className="w-3.5 h-3.5" />
                          {date}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[--radius-md] border border-line bg-white py-16 px-6 text-center">
              <p className="text-gray-600">
                There are no posts published in this category yet.
              </p>
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 mt-4 text-ink font-semibold hover:text-gold transition-colors"
              >
                Back to solutions list
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
