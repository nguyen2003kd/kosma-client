"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  Facebook,
  Link as LinkIcon,
  Linkedin,
  Mail,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Twitter,
} from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { getPrimaryProductImage } from "@/lib/product-image";
import parse from "html-react-parser";

const FALLBACK_IMAGE = "/images/living.jpg";

interface ProductDetailData {
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
  product_images?: import("@/lib/product-image").ProductImageRow[] | null;
  stock?: number | null;
  status?: string;
  is_featured?: boolean | null;
  rating?: number;
  reviews?: number;
}

interface ProductViewProps {
  product: ProductDetailData;
  thumbnailSrc: string;
  imageList?: string[];
  shareUrl: string;
  relatedProducts: ProductDetailData[];
}

function toNumber(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
}

export default function ProductDetailView({
  product,
  thumbnailSrc,
  imageList,
  shareUrl,
  relatedProducts,
}: ProductViewProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [imgSrc, setImgSrc] = useState(thumbnailSrc);
  const addItem = useCartStore((state) => state.addItem);

  const gallery = imageList && imageList.length > 0 ? imageList : [thumbnailSrc];

  const price = toNumber(product.price);
  const originalPrice =
    product.original_price != null ? toNumber(product.original_price) : undefined;
  const stock = toNumber(product.stock);
  const inStock = stock > 0 && product.status !== "out_of_stock";
  const rating = toNumber(product.rating) || 4.5;
  const reviews = toNumber(product.reviews);

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price,
      image: thumbnailSrc,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left: Image */}
        <div className="space-y-4">
          <div className="relative w-full aspect-square rounded-[--radius-md] overflow-hidden bg-cream border border-line">
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover"
              onError={() => {
                if (imgSrc !== FALLBACK_IMAGE) setImgSrc(FALLBACK_IMAGE);
              }}
            />
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.category && (
                <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-extrabold uppercase tracking-[0.1em] text-ink">
                  {product.category}
                </span>
              )}
              {discount > 0 && (
                <span className="px-2.5 py-1 rounded-full bg-red-500 text-white text-[10px] font-extrabold uppercase tracking-[0.1em]">
                  -{discount}%
                </span>
              )}
            </div>
            {!inStock && (
              <div className="absolute inset-0 bg-black-950/40 flex items-center justify-center">
                <span className="px-3 py-1.5 rounded-full bg-white text-ink text-[11px] font-extrabold uppercase tracking-[0.1em]">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Gallery thumbnails */}
          {gallery.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {gallery.map((src, idx) => {
                const isActive = src === imgSrc;
                return (
                  <button
                    key={`${src}-${idx}`}
                    type="button"
                    onClick={() => setImgSrc(src)}
                    className={`relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-colors ${isActive ? "border-ink" : "border-line hover:border-ink/40"
                      }`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <Image
                      src={src}
                      alt={`${product.name} — image ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="space-y-6">
          <div>
            {product.brand && (
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-500 mb-2 block">
                {product.brand}
              </span>
            )}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.round(rating)
                      ? "fill-gold text-gold"
                      : "text-gray-300"
                      }`}
                  />
                ))}
              </div>
              <span className="text-[13px] text-gray-500">
                {rating.toFixed(1)} ({reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-serif text-[28px] sm:text-[32px] text-ink">
                ${price.toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-[16px] text-gray-400 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.sku && (
              <p className="text-[12px] text-gray-500">
                SKU: <span className="font-semibold">{product.sku}</span>
              </p>
            )}
          </div>

          {/* Stock status */}
          <div className="flex items-center gap-2 text-[13px]">
            {inStock ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-green-700 font-semibold">In Stock</span>
                {stock > 0 && <span className="text-gray-500">({stock} available)</span>}
              </>
            ) : (
              <span className="text-red-600 font-semibold">Out of Stock</span>
            )}
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="inline-flex items-center rounded-lg border border-mutedLine bg-white">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-11 flex items-center justify-center text-ink hover:bg-cream transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center text-[14px] font-bold text-ink">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-11 flex items-center justify-center text-ink hover:bg-cream transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              disabled={!inStock || added}
              className={`flex-1 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-[14px] font-bold transition-colors ${!inStock
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : added
                  ? "bg-green-600 text-white"
                  : "bg-ink text-white hover:bg-black-800"
                }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </>
              )}
            </button>
          </div>

          {/* Share */}
          <div className="flex items-center gap-3 pt-4 border-t border-line">
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
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(product.name)}`}
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
              href={`mailto:?subject=${encodeURIComponent(product.name)}&body=${encodeURIComponent(shareUrl)}`}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-black-800/15 text-ink hover:bg-cream hover:border-black-800/40 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <div className="pt-6 border-t border-line">
          <h2 className="font-serif text-[22px] sm:text-[24px] text-ink mb-4">Description</h2>
          <div className="tiptap prose max-w-none text-gray-700 leading-relaxed">
            {parse(product.description)}
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-6 border-t border-line">
          <h2 className="font-serif text-[22px] sm:text-[24px] text-ink mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {relatedProducts.map((rp) => {
              const rpSrc = getPrimaryProductImage(
                rp.product_images,
                rp.thumbnail_path,
                FALLBACK_IMAGE,
              );
              const rpHref = `/products/${rp.slug || rp.id}`;
              return (
                <Link
                  key={rp.id}
                  href={rpHref}
                  className="group flex flex-col h-full rounded-[--radius-md] overflow-hidden bg-white border border-mutedLine hover:shadow-soft transition-shadow"
                >
                  <div className="relative aspect-square overflow-hidden bg-cream">
                    <Image
                      src={rpSrc}
                      alt={rp.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3 sm:p-4 flex flex-col gap-1">
                    <h3 className="font-serif text-[14px] sm:text-[15px] text-ink line-clamp-2 leading-tight group-hover:text-gold transition-colors">
                      {rp.name}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-serif text-[15px] sm:text-[16px] text-ink">
                        ${toNumber(rp.price).toFixed(2)}
                      </span>
                      <ArrowRight className="w-4 h-4 text-ink group-hover:text-gold group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
