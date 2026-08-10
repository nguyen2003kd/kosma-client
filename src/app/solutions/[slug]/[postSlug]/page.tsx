import { getApiV10Post, getApiV10PostSlugSlug } from "@/api/endpoints/post";
import { getApiV10PostCategoryByUrl } from "@/api/endpoints/post-category";
import { PageHero } from "@/components/common";
import { getThumbnailSrc } from "@/lib/responsive-image";
import type { PostContent, PostExtended } from "@/types/post";
import baseConfig from "@/configs/base";
import parse from "html-react-parser";
import {
  ArrowRight,
  Calendar,
  Eye,
  Facebook,
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

async function getCategoryName(categoryUrl: string): Promise<string | undefined> {
  try {
    const data = await getApiV10PostCategoryByUrl({ categoryUrl, pageSize: 1 });
    const rows = (data?.responseData?.rows as { category?: { name?: string } }[]) || [];
    return rows[0]?.category?.name;
  } catch {
    return undefined;
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
      title: "Solution Not Found",
      description: "This solution does not exist or has been removed.",
    };
  }

  const thumbnailUrl = post.thumbnail_path || "";

  const pageUrl = `${baseConfig.frontendDomain}/solutions/${slug}/${postSlug}`;
  const description =
    post.summary?.replace(/<[^>]*>/g, "").slice(0, 160) ||
    "Interior design, construction and branding solutions by Kosmo DNC.";

  return {
    title: post.title || "Solution",
    description,
    openGraph: {
      title: post.title || "Solution",
      description,
      url: pageUrl,
      type: "article",
      publishedTime: post.created_at || undefined,
      siteName: "Kosmo DNC",
      ...(thumbnailUrl && {
        images: [{ url: thumbnailUrl, width: 1200, height: 630, alt: post.title || "" }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title || "Solution",
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

  const categoryLink = `/solutions/${slug}`;
  const [relatedSolutions, latestSolutions, categoryName] = await Promise.all([
    getRelatedSolutions(post.id),
    getLatestSolutions(post.id),
    getCategoryName(categoryLink),
  ]);

  const shareUrl = `${baseConfig.frontendDomain}${categoryLink}/${postSlug}`;

  return (
    <>
      <PageHero
        title={post.title || "Solution"}
        breadcrumbs={[
          { label: "Home", href: "/home" },
          { label: "Solutions", href: "/solutions" },
          { label: categoryName || slug, href: categoryLink },
          { label: post.title || "" },
        ]}
        backgroundImage={getThumbnailSrc(
          undefined,
          post.thumbnail_path,
          "/images/banner_service_2.png",
        )}
      />

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <div className="grid lg:grid-cols-4 gap-6 md:gap-8">
            <div className="lg:col-span-3">
              <article className="rounded-[--radius-md] border border-line bg-white shadow-soft p-6 sm:p-8 md:p-10">
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-[13px] text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {(() => {
                        const d = new Date(post.created_at || "");
                        const date = d.toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        });
                        const time = d.toLocaleTimeString("en-US", {
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
                    <span>{post.view?.toLocaleString("en-US") || 0} views</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-line">
                  <span className="text-gray-600 text-[13px] font-semibold">Share:</span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-black-800/15 text-ink hover:bg-cream hover:border-black-800/40 transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-black-800/15 text-ink hover:bg-cream hover:border-black-800/40 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title || "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-black-800/15 text-ink hover:bg-cream hover:border-black-800/40 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={shareUrl}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-black-800/15 text-ink hover:bg-cream hover:border-black-800/40 transition-colors"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(post.title || "")}&body=${encodeURIComponent(shareUrl)}`}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-black-800/15 text-ink hover:bg-cream hover:border-black-800/40 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>

                <div className="relative w-full aspect-video mb-8 rounded-[--radius-md] overflow-hidden bg-cream">
                  <Image
                    src={getThumbnailSrc(
                      undefined,
                      post.thumbnail_path,
                      "/images/service-1.png",
                    )}
                    alt={post.title || ""}
                    fill
                    className="object-cover"
                  />
                </div>

                {post.summary && (
                  <div className="bg-cream border-l-4 border-gold p-4 mb-8 rounded-r-[--radius-sm]">
                    <div className="tiptap prose max-w-none text-gray-700 italic leading-relaxed">
                      {parse(post.summary || "")}
                    </div>
                  </div>
                )}

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
                                  undefined,
                                  img.file?.path,
                                  "/images/service-1.png",
                                );
                                return (
                                  <div
                                    key={img.id}
                                    className="relative w-full aspect-video rounded-[--radius-md] overflow-hidden"
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

                {post.tags && post.tags.length > 0 && (
                  <div className="pt-6 border-t border-line">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-gray-600 text-[13px] font-semibold">Tags:</span>
                      {post.tags.map((tag) => (
                        <span
                          key={tag.id || tag.name}
                          className="px-3 py-1 rounded-full bg-cream text-ink text-[12px] font-semibold"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>

              {relatedSolutions.length > 0 && (
                <div className="mt-10 md:mt-12">
                  <h2 className="font-serif text-[24px] sm:text-[28px] text-ink mb-6">
                    Related Solutions
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                    {relatedSolutions.map((solution) => (
                      <Link
                        key={solution.id}
                        href={`${categoryLink}/${solution.slug || ""}`}
                        className="group flex flex-col h-full rounded-[--radius-md] overflow-hidden bg-white border border-line hover:shadow-soft transition-shadow"
                      >
                        <div className="relative h-36 sm:h-40 overflow-hidden bg-cream">
                          <Image
                            src={getThumbnailSrc(
                              undefined,
                              solution.thumbnail_path,
                              "/images/service-1.png",
                            )}
                            alt={solution.title || ""}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4 sm:p-5 flex flex-col flex-grow">
                          <h3 className="font-serif text-[16px] sm:text-[18px] text-ink mb-2 line-clamp-2 leading-tight group-hover:text-gold transition-colors">
                            {solution.title}
                          </h3>
                          <p className="text-[13px] text-gray-700 line-clamp-2 flex-grow">
                            {solution.summary?.replace(/<[^>]*>/g, "") || ""}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <div className="rounded-[--radius-md] border border-line bg-white overflow-hidden shadow-soft">
                  <div className="bg-black-900 px-4 py-3.5 flex items-center justify-between">
                    <h3 className="font-serif text-[16px] text-white">Latest Solutions</h3>
                    <Newspaper className="w-4.5 h-4.5 text-white/70" />
                  </div>
                  <div>
                    {latestSolutions.slice(0, 10).map((solution, index) => (
                      <Link
                        key={solution.id}
                        href={`${categoryLink}/${solution.slug || ""}`}
                        className={`flex gap-4 group hover:bg-cream px-4 py-3 transition-colors ${index !== latestSolutions.slice(0, 10).length - 1
                          ? "border-b border-line"
                          : ""
                          }`}
                      >
                        <div className="flex-shrink-0 font-serif text-2xl text-black-700/20">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <h4 className="font-semibold text-ink text-sm line-clamp-2 group-hover:text-gold transition-colors leading-snug">
                            {solution.title}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {new Date(solution.created_at || "").toLocaleDateString("en-US", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="px-4 py-2.5 bg-cream text-center border-t border-line">
                    <Link
                      href="/solutions"
                      className="text-ink font-semibold text-xs hover:text-gold inline-flex items-center gap-1 transition-colors"
                    >
                      View All
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
