import { getApiV10Product } from "@/api/endpoints/product";
import type { GetApiV10ProductParams } from "@/api/models";
import {
  PageHero,
  SectionHeading,
  SplitContent,
} from "@/components/common";
import ProductListSSR from "./components/product-list-ssr";
import { ProductsControls } from "./components/products-controls";
import { getPrimaryProductImage, type ProductImageRow } from "@/lib/product-image";
import type { Metadata } from "next";

const PAGE_SIZE = 12;

type ProductRow = {
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

function toNumber(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
}

function transformToProductCard(item: ProductRow) {
  return {
    id: item.id,
    sku: item.sku,
    name: item.name,
    slug: item.slug,
    price: toNumber(item.price),
    originalPrice: item.original_price != null ? toNumber(item.original_price) : undefined,
    image: getPrimaryProductImage(item.product_images, item.thumbnail_path, "/images/living.jpg"),
    category: item.category ?? "product",
    rating: toNumber(item.rating) || 4.5,
    reviews: toNumber(item.reviews),
    inStock: toNumber(item.stock) > 0 && item.status !== "out_of_stock",
    brand: item.brand ?? undefined,
  };
}

export const metadata: Metadata = {
  title: "Products | Kosmo DNC",
  description:
    "Shop construction materials, fixtures, lighting, and hardware — with trade pricing for contractors and builders.",
};

interface ProductsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt((params.page as string) ?? "1") || 1);
  const sortBy = (params.sort as string) ?? "featured";
  const search = (params.search as string) ?? "";
  const activeCategory = (params.category as string) ?? "all";
  const activeProductType = (params.type as string) ?? "all";

  // Build filter string
  const filterParts: string[] = ["status==active"];
  if (activeCategory !== "all") filterParts.push(`category==${activeCategory}`);
  if (activeProductType !== "all") filterParts.push(`product_type==${activeProductType}`);
  if (search.trim()) filterParts.push(`name==${search.trim()}`);

  const queryParams: GetApiV10ProductParams = {
    page: currentPage,
    pageSize: PAGE_SIZE,
    filters: filterParts.join(","),
  };

  if (sortBy === "price-asc") {
    queryParams.sortField = "price";
    queryParams.sortOrder = "asc";
  } else if (sortBy === "price-desc") {
    queryParams.sortField = "price";
    queryParams.sortOrder = "desc";
  } else {
    queryParams.sortField = "created_at";
    queryParams.sortOrder = "desc";
  }

  let products: ReturnType<typeof transformToProductCard>[] = [];
  let totalPages = 1;
  let hasError = false;

  try {
    const data = await getApiV10Product(queryParams);
    const responseData = (data as unknown as {
      responseData?: { rows?: ProductRow[]; count?: number; pageSize?: number };
    }).responseData;
    const rows = responseData?.rows ?? [];
    const count = responseData?.count ?? 0;
    products = rows.map(transformToProductCard);
    totalPages = count ? Math.ceil(count / PAGE_SIZE) : 1;
  } catch {
    hasError = true;
  }

  const hasFilters =
    search.trim().length > 0 || activeCategory !== "all" || activeProductType !== "all";

  return (
    <>
      <PageHero
        title="Products"
        subtitle="Shop construction materials, fixtures, lighting, and hardware — with trade pricing for contractors and builders."
        breadcrumbs={[
          { label: "Home", href: "/home" },
          { label: "Products" },
        ]}
        backgroundImage="/images/living.jpg"
      />

      {/* Intro Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <SplitContent
            image="/images/living.jpg"
            eyebrow="Quality Materials, Trade Pricing"
            title="Building Materials & Fixtures Direct to You"
            description="From toilets and sinks to lighting, hardware, and structural materials — buy direct from Kosmo DNC with transparent trade pricing. Stocked, vetted, and ready to ship or pick up on site."
            features={[
              {
                title: "Vetted Brands",
                description:
                  "We carry trusted manufacturers — no knockoffs, no factory seconds.",
              },
              {
                title: "Trade Pricing",
                description:
                  "Contractors and builders get exclusive discounts on bulk purchases.",
              },
              {
                title: "Fast Fulfillment",
                description:
                  "In-stock items ship within 24 hours, with site delivery available.",
              },
            ]}
          />
        </div>
      </section>

      {/* Products List with Sidebar */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container-kosmo">
          <SectionHeading
            eyebrow="Shop All"
            title="Browse Products"
            subtitle="Filter, sort, and find the right materials for your next build."
          />

          <ProductsControls basePath="/products">
            <ProductListSSR
              products={products}
              error={hasError ? new Error("Failed to load") : undefined}
              currentPage={currentPage}
              totalPages={totalPages}
              hasFilters={hasFilters}
            />
          </ProductsControls>
        </div>
      </section>
    </>
  );
}
