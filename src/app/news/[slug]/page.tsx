import baseConfig from "@/configs/base";
import type { PostExtended } from "@/types/post";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsDetailView from "./views/news-detail-view";

interface NewsDetailPageProps {
  params: { slug: string };
}

async function getPost(slug: string): Promise<PostExtended | null> {
  try {
    const res = await fetch(
      `${baseConfig.backendDomain}/api/v1.0/post/slug/${slug}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return (data?.responseData as PostExtended) || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "News not found",
      description: "The article does not exist or has been deleted.",
    };
  }

  const thumbnailUrl = post.thumbnail_path || "";

  const pageUrl = `${baseConfig.frontendDomain}/news/${params.slug}`;
  const description = post.summary?.replace(/<[^>]*>/g, "").slice(0, 160) || "Latest news";

  return {
    title: post.title || "News",
    description,
    openGraph: {
      title: post.title || "News",
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
      title: post.title || "News",
      description,
      ...(thumbnailUrl && { images: [thumbnailUrl] }),
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const post = await getPost(params.slug);

  if (!post) notFound();

  return <NewsDetailView slug={params.slug} initialPost={post} />;
}
