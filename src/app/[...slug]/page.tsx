import { CategoryWithChildren } from "@/api/models/categoryWithChildren";
import baseConfig from "@/configs/base";
import {  getMockPostsForCategory } from "@/utils/mock-data";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import DynamicCategoryPage from "./views/category-page";
import DynamicPostDetailPage from "./views/post-detail-page";
import type { PostExtended } from "@/types/post";
interface DynamicPageProps {
  params: { slug: string[] };
  searchParams: { date?: string };
}
interface NewsDetailPageProps {
  params: { slug: string };
}

const createMockCategory = (slug: string): CategoryWithChildren => {
  const displayName =
    slug === "post" ? "Bài viết" : slug.charAt(0).toUpperCase() + slug.slice(1);

  return {
    id: `mock-category-${slug}`,
    name: displayName,
    code: `mock-category-${slug}`,
    link: `/${slug}`,
    description: `Danh mục ${displayName}`,
    categories: [],
  } as CategoryWithChildren;
};

async function getCategory(slug: string, language?: "vi" | "en") {
  try {
    const url = new URL(`${baseConfig.backendDomain}/api/v1.0/category`);
    if (language) url.searchParams.set("language", language);
    const res = await fetch(url.toString(), {
      cache: "no-store",
    });
    if (!res.ok) return null;

    const data = await res.json();
    const allCategories = (data?.responseData || []) as CategoryWithChildren[];

    return (
      allCategories.find((cat) => cat.link === `/${slug}`) ||
      allCategories
        .flatMap((parent) => parent.categories || [])
        .find((cat) => cat.link === `/${slug}`) ||
      null
    );
  } catch {
    return null;
  }
}

async function getPostsForCategory(categoryId: string) {
  try {
    const res = await fetch(
      `${baseConfig.backendDomain}/api/v1.0/post?category_id=${categoryId}&filters=is_hidden==false&sortField=created_at&sortOrder=desc&pageSize=999`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];

    const data = await res.json();
    return data?.responseData?.rows || [];
  } catch {
    return [];
  }
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
  const lastSlug = params.slug.at(-1);
  const post = await getPost(lastSlug??'');
  if (!post) {
    return {
      title: "Không tìm thấy tin tức",
      description: ` không tồn tại hoặc đã bị xóa.`,
    };
  }

  const thumbnailUrl =
    post.thumbnail_compress_info?.desktop
      ? `${baseConfig.backendDomain}${post.thumbnail_compress_info.desktop}`
      : post.thumbnail_path
        ? `${baseConfig.backendDomain}${post.thumbnail_path}`
        : undefined;

  const pageUrl = `${baseConfig.frontendDomain}/${params.slug}`;
  const description = post.summary?.replace(/<[^>]*>/g, "").slice(0, 160) || "Tin tức mới nhất";

  return {
    title: post.title || "Tin tức",
    description,
    openGraph: {
      title: post.title || "Tin tức",
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
      title: post.title || "Tin tức",
      description,
      ...(thumbnailUrl && { images: [thumbnailUrl] }),
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}
export default async function DynamicPage({
  params,
  searchParams,
}: DynamicPageProps) {
  const [firstSlug, secondSlug] = params.slug;

  if (params.slug.length === 1) {
    const post = await getPost(firstSlug);

    if (post) {
      return (
        <DynamicPostDetailPage
          post={post}
          categoryName={post.category?.name || "Bài viết"}
          categorySlug={post.category?.link?.replace(/^\//, "") || ""}
          urlCategoryId={post.category?.id}
        />
      );
    }

    const [category, categoryEn] = await Promise.all([
      getCategory(firstSlug, "vi"),
      getCategory(firstSlug, "en"),
    ]);
    const finalCategory = category ?? createMockCategory(firstSlug);
    const apiPosts = await getPostsForCategory(finalCategory.id!);
    const posts =
      apiPosts.length > 0
        ? apiPosts
        : getMockPostsForCategory(finalCategory.id!, finalCategory.name!, finalCategory.link!);

    return (
      <DynamicCategoryPage
        category={finalCategory}
        categoryEn={categoryEn}
        initialPosts={posts}
        date={searchParams.date}
      />
    );
  }

  if (params.slug.length === 2) {
    const post = await getPost(secondSlug);
    if (!post) notFound();

    const urlCategory = await getCategory(firstSlug);
    const displayCategory = urlCategory ?? createMockCategory(firstSlug);

    return (
      <DynamicPostDetailPage
        post={post}
        categoryName={displayCategory.name || firstSlug}
        categorySlug={displayCategory.link?.replace(/^\//, "") || firstSlug}
        urlCategoryId={urlCategory?.id}
      />
    );
  }

  notFound();
}
