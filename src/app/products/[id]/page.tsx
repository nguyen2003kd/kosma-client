import { getApiV10ProductId, getApiV10Product } from "@/api/endpoints/product";
import { PageHero } from "@/components/common";
import { getProductImageList, type ProductImageRow, } from "@/lib/product-image";
import baseConfig from "@/configs/base";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailView from "../components/product-view";

const FALLBACK_IMAGE = "/images/living.jpg";

type ProductDetail = {
  id: string;
  sku?: string;
  name: string;
  slug?: string;
  description?: string | null;
  price?: number | null;
  original_price?: number | null;
  category?: string | null;
  product_type?: string;
  brand?: string | null;
  thumbnail_path?: string | null;
  product_images?: ProductImageRow[] | null;
  stock?: number | null;
  status?: string;
  is_featured?: boolean | null;
  rating?: number;
  reviews?: number;
};

type ProductRow = ProductDetail;

async function getProduct(id: string): Promise<ProductDetail | null> {
  try {
    const data = (await getApiV10ProductId(id)) as unknown as {
      responseData?: ProductDetail;
    } | void;
    return (data?.responseData as ProductDetail) || null;
  } catch {
    return null;
  }
}

async function getRelatedProducts(excludeId?: string): Promise<ProductRow[]> {
  try {
    const data = (await getApiV10Product({
      page: 1,
      pageSize: 5,
      filters: "status==active",
      sortField: "created_at",
      sortOrder: "desc",
    })) as unknown as { responseData?: { rows?: ProductRow[] } } | void;
    const rows = data?.responseData?.rows ?? [];
    return rows.filter((p) => p.id !== excludeId).slice(0, 4);
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "This product does not exist or has been removed.",
    };
  }

  const thumbnailUrl =
    getProductImageList(product.product_images)[0] ||
    (product.thumbnail_path
      ? `${baseConfig.backendDomain}${product.thumbnail_path}`
      : undefined);
  const pageUrl = `${baseConfig.frontendDomain}/products/${product.slug || product.id}`;
  const description =
    product.description?.replace(/<[^>]*>/g, "").slice(0, 160) ||
    `${product.name} — available now at Kosmo DNC with trade pricing.`;

  return {
    title: product.name,
    description,
    openGraph: {
      title: product.name,
      description,
      url: pageUrl,
      type: "website",
      siteName: "Kosmo DNC",
      ...(thumbnailUrl && {
        images: [{ url: thumbnailUrl, width: 1200, height: 630, alt: product.name }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      ...(thumbnailUrl && { images: [thumbnailUrl] }),
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  const [relatedProducts] = await Promise.all([getRelatedProducts(product.id)]);

  const shareUrl = `${baseConfig.frontendDomain}/products/${product.slug || product.id}`;
  const imageList = getProductImageList(product.product_images);
  const thumbnailSrc =
    imageList.length > 0
      ? imageList[0]
      : product.thumbnail_path
        ? product.thumbnail_path.startsWith("/images/")
          ? product.thumbnail_path
          : `${baseConfig.backendDomain}${product.thumbnail_path}`
        : FALLBACK_IMAGE;

  return (
    <div>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/home" },
          { label: "Products", href: "/products" },
          { label: product.name },
        ]}
        image={thumbnailSrc}
        imageAlt={product.name}
      />

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <div>
            <article className="relative z-10 -mt-[113px] sm:-mt-[140px] md:-mt-[173px] rounded-[--radius-md] border border-line bg-white shadow-soft p-6 sm:p-8 md:p-10">
              <ProductDetailView
                product={product}
                thumbnailSrc={thumbnailSrc}
                imageList={imageList}
                shareUrl={shareUrl}
                relatedProducts={relatedProducts}
              />
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
