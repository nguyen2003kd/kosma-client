import { getApiV10PostCategoryByUrl } from "@/api/endpoints/post-category";
import type { PostCategory } from "@/api/models/postCategory";
import ServiceCard from "@/components/common/service-card";
import baseConfig from "@/configs/base";
import { getThumbnailSrc } from "@/lib/responsive-image";
import type { ImageCompressInfo, PostExtended } from "@/types/post";
import { Calendar, ChevronRight as BreadcrumbArrow, Home } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

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

  const title = category?.name || (posts[0]?.title as string | undefined) || "Dịch vụ";
  const description =
    category?.description?.replace(/<[^>]*>/g, "").slice(0, 160) ||
    "Dịch vụ kiểm định - thử nghiệm - hiệu chuẩn";
  const pageUrl = `${baseConfig.frontendDomain}/services/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: "website",
      siteName: "CASE-SMQ",
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

  const categoryName = category?.name || "Dịch vụ";
  const categoryDescription = category?.description;
  const categoryLink = category?.link;

  return (
    <>
      {/* Hero Banner */}
      <section
        className="relative bg-cover bg-center bg-no-repeat pt-16 pb-32 overflow-hidden"
        style={{ backgroundImage: "url('/images/banner_service_2.png')" }}
      >
        <div className="absolute inset-0 bg-[#1a3a5c]/60" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-gray-300 mb-4">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" />
            </Link>
            <BreadcrumbArrow className="w-4 h-4 text-gray-400" />
            <Link href={categoryLink || "/services"} className="hover:text-white transition-colors">
              Dịch vụ
            </Link>
            <BreadcrumbArrow className="w-4 h-4 text-gray-400" />
            <span className="text-white font-medium line-clamp-1">{categoryName}</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{categoryName}</h1>
          {categoryDescription && (
            <p className="text-blue-100 text-base md:text-lg max-w-3xl mx-auto line-clamp-3">
              {categoryDescription}
            </p>
          )}
        </div>
      </section>

      {/* Posts Grid */}
      <section className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 -mt-20 pb-16">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-700">
                {posts.length > 0
                  ? `${posts.length} dịch vụ`
                  : "Chưa có dịch vụ nào trong danh mục này"}
              </h2>
            </div>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {posts.map((post) => {
                const href = `${categoryLink || "/services"}/${post.slug || ""}`;
                const image = getThumbnailSrc(
                  post.thumbnail_compress_info as ImageCompressInfo | undefined,
                  post.thumbnail_path,
                );
                const date = post.created_at
                  ? new Date(post.created_at).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                  : undefined;

                return (
                  <ServiceCard
                    key={post.id}
                    image={image}
                    title={post.title || ""}
                    description={post.summary || ""}
                    link={href}
                    date={date}
                  />
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <p className="text-gray-500">
                Hiện tại chưa có bài viết nào được đăng tải trong danh mục này.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 mt-4 text-blue-600 font-medium hover:text-blue-700"
              >
                Quay lại danh sách dịch vụ
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
