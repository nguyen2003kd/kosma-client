import { getApiV10Post, getApiV10PostSlugSlug } from "@/api/endpoints/post";
import ServiceCard from "@/components/common/service-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getThumbnailSrc } from "@/lib/responsive-image";
import type { PostContent, PostExtended } from "@/types/post";
import baseConfig from "@/configs/base";
import parse from "html-react-parser";
import {
  ArrowRight,
  ChevronRight as BreadcrumbArrow,
  Calendar,
  Eye,
  Facebook,
  Home,
  Linkedin,
  Link as LinkIcon,
  Mail,
  Newspaper,
  Twitter,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface SolutionPostDetailPageProps {
  params: Promise<{ slug: string; postSlug: string }>;
}

async function getPost(postSlug: string): Promise<PostExtended | null> {
  try {
    const data = await getApiV10PostSlugSlug(postSlug);
    return (data?.responseData as PostExtended) || null;
  } catch {
    return null;
  }
}

async function getRelatedSolutions(excludeId?: string): Promise<PostExtended[]> {
  try {
    const data = await getApiV10Post({
      filters: "is_hidden==false , is_service==true",
      sortField: "created_at",
      sortOrder: "desc",
      pageSize: 3,
      page: 1,
    });
    return ((data?.responseData?.rows as PostExtended[]) || []).filter(
      (s) => s.id !== excludeId,
    );
  } catch {
    return [];
  }
}

async function getLatestSolutions(excludeId?: string): Promise<PostExtended[]> {
  try {
    const data = await getApiV10Post({
      filters: "is_hidden==false , is_service==true",
      sortField: "created_at",
      sortOrder: "desc",
      page: 1,
      pageSize: 10,
    });
    return ((data?.responseData?.rows as PostExtended[]) || []).filter(
      (s) => s.id !== excludeId,
    );
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: SolutionPostDetailPageProps): Promise<Metadata> {
  const { slug, postSlug } = await params;
  const post = await getPost(postSlug);

  if (!post) {
    return {
      title: "Không tìm thấy giải pháp",
      description: "Giải pháp không tồn tại hoặc đã bị xóa.",
    };
  }

  const thumbnailUrl =
    post.thumbnail_compress_info?.desktop
      ? `${baseConfig.backendDomain}${post.thumbnail_compress_info.desktop}`
      : post.thumbnail_path
        ? `${baseConfig.backendDomain}${post.thumbnail_path}`
        : undefined;

  const pageUrl = `${baseConfig.frontendDomain}/solutions/${slug}/${postSlug}`;
  const description =
    post.summary?.replace(/<[^>]*>/g, "").slice(0, 160) ||
    "Giải pháp kiểm định - thử nghiệm - hiệu chuẩn";

  return {
    title: post.title || "Giải pháp",
    description,
    openGraph: {
      title: post.title || "Giải pháp",
      description,
      url: pageUrl,
      type: "article",
      publishedTime: post.created_at || undefined,
      siteName: "CASE-SMQ",
      ...(thumbnailUrl && {
        images: [{ url: thumbnailUrl, width: 1200, height: 630, alt: post.title || "" }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title || "Giải pháp",
      description,
      ...(thumbnailUrl && { images: [thumbnailUrl] }),
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function SolutionPostDetailPage({
  params,
}: SolutionPostDetailPageProps) {
  const { slug, postSlug } = await params;
  const post = await getPost(postSlug);

  if (!post) notFound();

  const [relatedSolutions, latestSolutions] = await Promise.all([
    getRelatedSolutions(post.id),
    getLatestSolutions(post.id),
  ]);

  const categoryLink = `/solutions/${slug}`;
  const shareUrl = `${baseConfig.frontendDomain}/solutions/${slug}/${postSlug}`;

  return (
    <>
      {/* Hero Navbar Section */}
      <section
        className="bg-[#0C2449] py-12 border-t border-gray-600"
        style={{ backgroundImage: "url('/images/banner_service_2.png')" }}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
            Page / Solution
          </h1>
          <nav>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
              <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                <Home className="w-4 h-4" />
              </Link>
              <BreadcrumbArrow className="w-4 h-4 text-gray-400" />
              <Link href="/solutions" className="hover:text-white transition-colors">
                Solutions
              </Link>
              <BreadcrumbArrow className="w-4 h-4 text-gray-400" />
              <Link href={categoryLink} className="hover:text-white transition-colors">
                {slug}
              </Link>
              <BreadcrumbArrow className="w-4 h-4 text-gray-400" />
              <span className="text-white font-medium line-clamp-1">{post.title}</span>
            </div>
          </nav>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="bg-gray-50 py-16 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="bg-white rounded-lg shadow-sm p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {(() => {
                        const d = new Date(post.created_at || "");
                        const date = d.toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        });
                        const time = d.toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        });
                        return `${date} - ${time}`;
                      })()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author || "Admin"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{post.view?.toLocaleString("vi-VN") || 0} views</span>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                  <span className="text-gray-600 text-sm font-medium">Share:</span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title || "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={shareUrl}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(post.title || "")}&body=${encodeURIComponent(shareUrl)}`}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>

                {/* Featured Image */}
                <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={getThumbnailSrc(
                      post.thumbnail_compress_info,
                      post.thumbnail_path,
                      "/images/service-1.png",
                    )}
                    alt={post.title || ""}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Summary */}
                {post.summary && (
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
                    <div className="tiptap prose max-w-none text-gray-700 italic leading-relaxed">
                      {parse(post.summary || "")}
                    </div>
                  </div>
                )}

                {/* Article Content */}
                <div className="space-y-6 mb-8 prose prose-lg max-w-none">
                  {post.post_content?.map((content: PostContent) => {
                    const imageColumns = content.image_columns || 1;
                    return (
                      <div key={content.id} className="space-y-4">
                        <div className="tiptap prose max-w-none text-gray-700 leading-relaxed">
                          {content.content ? parse(content.content || "") : null}
                        </div>
                        {content.post_content_images &&
                          content.post_content_images.length > 0 && (
                            <div
                              className="grid gap-4"
                              style={{
                                gridTemplateColumns: `repeat(${imageColumns}, minmax(0, 1fr))`,
                              }}
                            >
                              {content.post_content_images.map((img) => {
                                const imageSrc = getThumbnailSrc(
                                  img.file?.compress_info,
                                  img.file?.path,
                                  "/images/service-1.png",
                                );
                                return (
                                  <div
                                    key={img.id}
                                    className="relative w-full aspect-video rounded-lg overflow-hidden"
                                  >
                                    <Image
                                      src={imageSrc}
                                      alt="Content image"
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-gray-600 font-medium">Tags:</span>
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag.id || tag.name}
                          variant="secondary"
                          className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                        >
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <Separator className="my-6" />
              </article>

              {/* Related Solutions */}
              {relatedSolutions.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    Related Solutions
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedSolutions.map((solution) => (
                      <ServiceCard
                        key={solution.id}
                        image={getThumbnailSrc(
                          solution.thumbnail_compress_info,
                          solution.thumbnail_path,
                          "/images/service-1.png",
                        )}
                        title={solution.title || ""}
                        description={solution.summary || ""}
                        link={`${categoryLink}/${solution.slug || ""}`}
                        backgroundColor="white"
                        textColor="#1e293b"
                        descriptionColor="#64748b"
                        linkColor="#3b82f6"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-4">
                <Card className="overflow-hidden">
                  <div className="bg-[#1e40af] px-4 py-3 flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">Latest Solutions</h3>
                    <Newspaper className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    {latestSolutions.slice(0, 10).map((solution, index) => (
                      <Link
                        key={solution.id}
                        href={`${categoryLink}/${solution.slug || ""}`}
                        className={`flex gap-4 group hover:bg-blue-50 px-4 py-3 transition-colors ${index !== latestSolutions.slice(0, 10).length - 1
                            ? "border-b border-gray-100"
                            : ""
                          }`}
                      >
                        <div className="flex-shrink-0 text-3xl font-bold text-gray-200">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                            {solution.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {new Date(solution.created_at || "").toLocaleDateString("vi-VN", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="px-4 py-2.5 bg-gray-50 text-center border-t border-gray-100">
                    <Link
                      href="/solutions"
                      className="text-blue-600 font-semibold text-xs hover:text-blue-700 inline-flex items-center gap-1"
                    >
                      View All
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
