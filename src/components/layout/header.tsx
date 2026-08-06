"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Calendar, MapPin, ShoppingCart } from "lucide-react";
import { MegaMenu } from "./mega-menu";
import { MobileNav } from "./mobile-nav";
import { useCartStore } from "@/stores/cart-store";
import type { GetApiV10Category200 } from "@/api/models";

export function KosmoHeader({ categoriesData }: { categoriesData?: GetApiV10Category200 | null }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 transition-all duration-300 ${isScrolled
        ? "bg-white/95 backdrop-blur-[14px] border-b border-mutedLine shadow-soft"
        : "bg-white"
        }`}
      style={{ zIndex: 9997 }}
    >
      <div className="container-kosmo">
        <div className="flex items-center justify-between h-[78px]">
          {/* Logo */}
          <Link href="/home" className="flex items-center gap-3 flex-shrink-0">
            <img src="/logo.png" alt="Kosmo DNC - Interior Design & Construction" className="h-9 sm:h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <MegaMenu categoriesData={categoriesData} />

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Schedule Now CTA */}
            <Link
              href="/consultation"
              className="hidden xl:inline-flex items-center justify-center gap-2 min-h-[46px] px-5 bg-[#12355B] text-white font-semibold text-[14px] rounded-full hover:brightness-110 transition-all"
            >
              <Calendar className="w-4 h-4" />
              Schedule Now
            </Link>

            {/* Phone */}
            <a
              href="tel:+14437360577"
              className="hidden xl:flex items-center justify-center w-11 h-11 rounded-full border border-black-800/15 text-ink hover:bg-cream transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Location */}
            <a
              href="/locations"
              className="hidden xl:flex items-center justify-center w-11 h-11 rounded-full border border-black-800/15 text-ink hover:bg-cream transition-colors"
            >
              <MapPin className="w-4 h-4" />
            </a>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center w-11 h-11 rounded-full border border-black-800/15 text-ink hover:bg-cream transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold px-1">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Nav */}
            <MobileNav categoriesData={categoriesData} />
          </div>
        </div>
      </div>
    </header>
  );
}
