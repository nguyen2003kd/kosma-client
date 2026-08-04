import { getApiV10PostSlugSlug } from "@/api/endpoints/post";
import { getApiV10PostCategoryByUrl } from "@/api/endpoints/post-category";
import { PageHero, SectionHeading } from "@/components/common";
import { getThumbnailSrc } from "@/lib/responsive-image";
import type { PostContent, PostExtended } from "@/types/post";
import baseConfig from "@/configs/base";
import parse from "html-react-parser";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Eye,
  Facebook,
  HardHat,
  Link as LinkIcon,
  Linkedin,
  Mail,
  Twitter,
  User,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DesignImage } from "../../design/components/design-image";
import { ConstructionContactForm } from "../components/construction-contact-form";

const CATEGORY_URL = "/solutions/construction";
const FALLBACK_IMAGE = "/images/living.jpg";

interface ConstructionPostDetailPageProps {
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

async function getRelatedConstruction(excludeId?: string): Promise<PostExtended[]> {
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
      .slice(0, 3);
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: ConstructionPostDetailPageProps): Promise<Metadata> {
  const { postSlug } = await params;
  const post = await getPost(postSlug);

  if (!post) {
    return {
      title: "Project Not Found",
      description: "This construction project does not exist or has been removed.",
    };
  }

  const thumbnailUrl =
    post.thumbnail_compress_info?.desktop
      ? `${baseConfig.backendDomain}${post.thumbnail_compress_info.desktop}`
      : post.thumbnail_path
        ? `${baseConfig.backendDomain}${post.thumbnail_path}`
        : undefined;

  const pageUrl = `${baseConfig.frontendDomain}/solutions/construction/${postSlug}`;
  const description =
    post.summary?.replace(/<[^>]*>/g, "").slice(0, 160) ||
    "Skilled craftsmanship and modern construction technology by Kosmo DNC.";

  return {
    title: post.title || "Construction Project",
    description,
    openGraph: {
      title: post.title || "Construction Project",
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
      title: post.title || "Construction Project",
      description,
      ...(thumbnailUrl && { images: [thumbnailUrl] }),
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function ConstructionPostDetailPage({
  params,
}: ConstructionPostDetailPageProps) {
  const { postSlug } = await params;
  const post = await getPost(postSlug);

  if (!post) notFound();

  const [relatedProjects] = await Promise.all([getRelatedConstruction(post.id)]);

  const shareUrl = `${baseConfig.frontendDomain}/solutions/construction/${postSlug}`;
  const thumbnailSrc = getThumbnailSrc(
    post.thumbnail_compress_info,
    post.thumbnail_path,
    FALLBACK_IMAGE,
  );

  return (
    <>
      <PageHero
        title={post.title || "Construction Project"}
        breadcrumbs={[
          { label: "Home", href: "/home" },
          { label: "Solutions", href: "/solutions" },
          { label: "Construction", href: "/solutions/construction" },
          { label: post.title || "" },
        ]}
        backgroundImage={thumbnailSrc}
      />

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          {/* Back link */}
          <Link
            href="/solutions/construction"
            className="inline-flex items-center gap-2 text-ink font-semibold text-sm hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Construction Projects
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: Main image + gallery */}
            <div className="space-y-4 lg:sticky lg:top-6">
              {/* Main image with craftsman-style frame */}
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-cream shadow-strong border-4 border-black-950">
                <DesignImage
                  src={thumbnailSrc}
                  alt={post.title || ""}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {/* Badge */}
                <div className="absolute top-0 left-0 bg-[#d8c29c] text-black-950 px-4 py-2 font-extrabold text-[11px] uppercase tracking-[0.12em] flex items-center gap-2">
                  <HardHat className="w-4 h-4" />
                  On Site
                </div>
              </div>

              {/* Content images gallery */}
              {post.post_content
                ?.flatMap((c: PostContent) => c.post_content_images || [])
                .filter(Boolean)
                .slice(0, 4)
                .map((img, i) => {
                  const imageSrc = getThumbnailSrc(
                    img.file?.compress_info,
                    img.file?.path,
                    FALLBACK_IMAGE,
                  );
                  return (
                    <div
                      key={img.id || i}
                      className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-cream border-2 border-line"
                    >
                      <DesignImage
                        src={imageSrc}
                        alt={`${post.title || ""} - image ${i + 2}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  );
                })}
            </div>

            {/* Right: Project info + content + contact */}
            <div className="space-y-8">
              {/* Project info header */}
              <div>
                <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#b8a06a] mb-2">
                  <Wrench className="w-3.5 h-3.5" />
                  Construction Project
                </span>
                <h1 className="font-serif text-[28px] sm:text-[36px] md:text-[40px] text-ink leading-tight mb-4">
                  {post.title}
                </h1>

                {/* Meta — craftsman style block */}
                <div className="bg-black-950 rounded-lg p-4 mb-6">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-white/90">
                    {post.created_at && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#d8c29c]" />
                        <span>
                          {new Date(post.created_at).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#d8c29c]" />
                      <span>{post.author || "Kosmo Crew"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-[#d8c29c]" />
                      <span>{post.view?.toLocaleString("en-US") || 0} views</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HardHat className="w-4 h-4 text-[#d8c29c]" />
                      <span>Licensed MD #113826</span>
                    </div>
                  </div>
                </div>

                {/* Share */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-line">
                  <span className="text-gray-600 text-[13px] font-semibold">Share:</span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-black-800/15 text-ink hover:bg-cream hover:border-black-800/40 transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-black-800/15 text-ink hover:bg-cream hover:border-black-800/40 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title || "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-black-800/15 text-ink hover:bg-cream hover:border-black-800/40 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={shareUrl}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-black-800/15 text-ink hover:bg-cream hover:border-black-800/40 transition-colors"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(post.title || "")}&body=${encodeURIComponent(shareUrl)}`}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-black-800/15 text-ink hover:bg-cream hover:border-black-800/40 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>

                {/* Summary — craftsman style block */}
                {post.summary && (
                  <div className="bg-cream border-l-4 border-[#b8a06a] p-4 mb-6 rounded-r-lg">
                    <div className="tiptap prose max-w-none text-gray-700 leading-relaxed">
                      {parse(post.summary || "")}
                    </div>
                  </div>
                )}
              </div>

              {/* Content sections */}
              {post.post_content && post.post_content.length > 0 && (
                <div className="space-y-6">
                  {post.post_content.map((content: PostContent) => {
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
                                    className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-line"
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
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="pt-6 border-t border-line">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-gray-600 text-[13px] font-semibold">Tags:</span>
                    {post.tags.map((tag) => (
                      <span
                        key={tag.id || tag.name}
                        className="px-3 py-1 rounded-md bg-cream text-ink text-[12px] font-semibold border border-line"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Quote Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container-kosmo">
          <SectionHeading
            eyebrow="Hire Our Crew"
            title="Want This Level of Craftsmanship?"
            subtitle="Tell us about your project — our crew will assess your site and provide a transparent fixed-price quote."
          />
          <div className="max-w-5xl mx-auto">
            <ConstructionContactForm postTitle={post.title} />
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
          <div className="container-kosmo">
            <SectionHeading
              eyebrow="More Projects"
              title="More of Our Work"
              subtitle="See more construction projects from our crew."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {relatedProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/solutions/construction/${project.slug || ""}`}
                  className="group flex flex-col h-full rounded-lg overflow-hidden bg-white border-2 border-line hover:border-ink/30 hover:shadow-soft transition-all"
                >
                  <div className="relative h-44 sm:h-48 overflow-hidden bg-cream">
                    <Image
                      src={getThumbnailSrc(
                        project.thumbnail_compress_info,
                        project.thumbnail_path,
                        FALLBACK_IMAGE,
                      )}
                      alt={project.title || ""}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-0 left-0 bg-[#d8c29c] text-black-950 px-3 py-1.5 font-extrabold text-[10px] uppercase tracking-[0.1em] flex items-center gap-1.5">
                      <HardHat className="w-3.5 h-3.5" />
                      Project
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col flex-grow">
                    <h3 className="font-serif text-[18px] sm:text-[20px] text-ink mb-2 line-clamp-2 leading-tight group-hover:text-gold transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[13px] text-gray-700 line-clamp-2 flex-grow">
                      {project.summary?.replace(/<[^>]*>/g, "") || ""}
                    </p>
                    <div className="mt-3 pt-3 border-t border-line flex items-center justify-between">
                      <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#b8a06a]">
                        View Project
                      </span>
                      <ArrowRight className="w-4 h-4 text-ink group-hover:text-gold group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
