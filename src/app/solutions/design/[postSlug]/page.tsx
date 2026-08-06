import { getApiV10PostSlugSlug } from "@/api/endpoints/post";
import { getApiV10PostCategoryByUrl } from "@/api/endpoints/post-category";
import { PageHero, SectionHeading } from "@/components/common";
import { getThumbnailSrc } from "@/lib/responsive-image";
import type { PostContent, PostExtended } from "@/types/post";
import baseConfig from "@/configs/base";
import parse from "html-react-parser";
import {
  ArrowRight,
  Calendar,
  Eye,
  Facebook,
  Link as LinkIcon,
  Linkedin,
  Mail,
  PencilRuler,
  Twitter,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DesignImage } from "../components/design-image";
import { CustomDesignForm, MaterialsSuggestions } from "@/components/common";

const CATEGORY_URL = "/solutions/design";
const FALLBACK_IMAGE = "/images/living.jpg";

interface DesignPostDetailPageProps {
  params: Promise<{ postSlug: string }>;
}

async function getPost(postSlug: string): Promise<PostExtended | null> {
  try {
    const data = await getApiV10PostSlugSlug(postSlug);
    return (data?.responseData as PostExtended) || null;
  } catch {
    return null;
  }
}

async function getRelatedDesigns(excludeId?: string): Promise<PostExtended[]> {
  try {
    const data = await getApiV10PostCategoryByUrl({
      categoryUrl: CATEGORY_URL,
      pageSize: 5,
      sortField: "position",
      sortOrder: "asc",
    });
    const rows = (data?.responseData?.rows as { post?: PostExtended }[]) || [];
    return rows
      .map((r) => r.post)
      .filter((p): p is PostExtended => !!p && p.id !== excludeId)
      .slice(0, 4);
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: DesignPostDetailPageProps): Promise<Metadata> {
  const { postSlug } = await params;
  const post = await getPost(postSlug);

  if (!post) {
    return {
      title: "Design Not Found",
      description: "This design does not exist or has been removed.",
    };
  }

  const thumbnailUrl =
    post.thumbnail_compress_info?.desktop
      ? `${baseConfig.backendDomain}${post.thumbnail_compress_info.desktop}`
      : post.thumbnail_path
        ? `${baseConfig.backendDomain}${post.thumbnail_path}`
        : undefined;

  const pageUrl = `${baseConfig.frontendDomain}/solutions/design/${postSlug}`;
  const description =
    post.summary?.replace(/<[^>]*>/g, "").slice(0, 160) ||
    "Browse design drawings by Kosmo DNC — reference designs for your space.";

  return {
    title: post.title || "Design",
    description,
    openGraph: {
      title: post.title || "Design",
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
      title: post.title || "Design",
      description,
      ...(thumbnailUrl && { images: [thumbnailUrl] }),
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function DesignPostDetailPage({
  params,
}: DesignPostDetailPageProps) {
  const { postSlug } = await params;
  const post = await getPost(postSlug);

  if (!post) notFound();

  const [relatedDesigns] = await Promise.all([getRelatedDesigns(post.id)]);

  const shareUrl = `${baseConfig.frontendDomain}/solutions/design/${postSlug}`;
  const thumbnailSrc = getThumbnailSrc(
    post.thumbnail_compress_info,
    post.thumbnail_path,
    FALLBACK_IMAGE,
  );

  return (
    <div>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/home" },
          { label: "Solutions", href: "/solutions" },
          { label: "Design", href: "/solutions/design" },
          { label: post.title || "" },
        ]}
        image={thumbnailSrc}
        imageAlt={post.title || ""}
      />

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <div>
            <article className="relative z-10 -mt-[113px] sm:-mt-[140px] md:-mt-[173px] rounded-[--radius-md] border border-line bg-white shadow-soft p-6 sm:p-8 md:p-10">
              <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-gold mb-2">
                <PencilRuler className="w-3.5 h-3.5" />
                Design Drawing
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
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
                  <span>{post.author || "Kosmo Design Team"}</span>
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
                            {content.post_content_images.map((img, i) => {
                              const imageSrc = getThumbnailSrc(
                                img.file?.compress_info,
                                img.file?.path,
                                FALLBACK_IMAGE,
                              );
                              return (
                                <div
                                  key={img.id || i}
                                  className="relative w-full aspect-video rounded-[--radius-md] overflow-hidden"
                                >
                                  <DesignImage
                                    src={imageSrc}
                                    alt="Content image"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
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
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container-kosmo">
          <SectionHeading
            eyebrow="Get Started"
            title="Request a Custom Design"
            subtitle="Want a design tailored to your space? Share your requirements and our design team will prepare a custom drawing for you."
          />
          <div className="max-w-5xl mx-auto">
            <CustomDesignForm />
          </div>
        </div>
      </section>

      {/* Related Designs */}
      {relatedDesigns.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
          <div className="container-kosmo">
            <SectionHeading
              eyebrow="More Designs"
              title="You May Also Like"
              subtitle="Browse more designs from our gallery."
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {relatedDesigns.map((design) => (
                <Link
                  key={design.id}
                  href={`/solutions/design/${design.slug || ""}`}
                  className="group flex flex-col h-full rounded-[--radius-md] overflow-hidden bg-white border border-mutedLine hover:shadow-soft transition-shadow"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                    <Image
                      src={getThumbnailSrc(
                        design.thumbnail_compress_info,
                        design.thumbnail_path,
                        FALLBACK_IMAGE,
                      )}
                      alt={design.title || ""}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 sm:p-5 flex items-center justify-between gap-2">
                    <h3 className="font-serif text-[15px] sm:text-[16px] text-ink line-clamp-2 leading-tight group-hover:text-gold transition-colors flex-1">
                      {design.title}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-ink group-hover:text-gold group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Materials Suggestions */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container-kosmo">
          <SectionHeading
            eyebrow="Shop Materials"
            title="Materials You May Need"
            subtitle="A few suggested products for your project — browse the full marketplace for more."
          />
          <MaterialsSuggestions />
        </div>
      </section>
    </div>
  );
}
