"use client";

import Image from "next/image";
import { Check, Plus, Star } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/stores/cart-store";

const FALLBACK_IMAGE = "/images/living.jpg";

export interface MaterialProduct {
  id: string;
  sku?: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating?: number;
  reviews?: number;
  inStock: boolean;
  brand?: string;
  slug?: string;
}

interface MaterialCardProps {
  product: MaterialProduct;
}

export function MaterialCard({ product }: MaterialCardProps) {
  const [added, setAdded] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.image);
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group flex flex-col h-full rounded-[--radius-md] overflow-hidden bg-white border border-mutedLine hover:shadow-soft transition-shadow">
      <div className="relative h-44 sm:h-48 overflow-hidden bg-cream">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1080px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => {
            if (imgSrc !== FALLBACK_IMAGE) setImgSrc(FALLBACK_IMAGE);
          }}
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-extrabold uppercase tracking-[0.1em] text-ink">
            {product.category}
          </span>
          {discount > 0 && (
            <span className="px-2.5 py-1 rounded-full bg-red-500 text-white text-[10px] font-extrabold uppercase tracking-[0.1em]">
              -{discount}%
            </span>
          )}
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black-950/40 flex items-center justify-center">
            <span className="px-3 py-1.5 rounded-full bg-white text-ink text-[11px] font-extrabold uppercase tracking-[0.1em]">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        {product.brand && (
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.08em] text-gray-500 mb-1">
            {product.brand}
          </span>
        )}
        <h3 className="font-serif text-[16px] sm:text-[18px] text-ink mb-1.5 line-clamp-2 leading-tight group-hover:text-gold transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.round(product.rating ?? 0)
                  ? "fill-gold text-gold"
                  : "text-gray-300"
                  }`}
              />
            ))}
          </div>
          <span className="text-[12px] text-gray-500">
            ({product.reviews})
          </span>
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-serif text-[20px] sm:text-[22px] text-ink">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-[13px] text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!product.inStock || added}
            className={`w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-bold transition-colors ${!product.inStock
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : added
                ? "bg-green-600 text-white"
                : "bg-ink text-white hover:bg-black-800"
              }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                Added to Cart
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
