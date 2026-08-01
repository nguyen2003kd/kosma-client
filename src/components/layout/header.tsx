"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Calendar, MapPin } from "lucide-react";
import { MegaMenu } from "./mega-menu";
import { MobileNav } from "./mobile-nav";

export function KosmoHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

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
          <MegaMenu />

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Schedule Now CTA */}
            <Link
              href="/consultation"
              className="hidden lg:inline-flex items-center justify-center gap-2 min-h-[46px] px-5 bg-[#1e3a5f] text-white font-extrabold text-[14px] rounded-full hover:bg-[#142a47] transition-colors shadow-button"
            >
              <Calendar className="w-4 h-4" />
              Schedule Now
            </Link>

            {/* Phone */}
            <a
              href="tel:+14437360577"
              className="hidden lg:flex items-center justify-center w-11 h-11 rounded-full border border-black-800/15 text-ink hover:bg-cream transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Location */}
            <a
              href="#"
              className="hidden lg:flex items-center justify-center w-11 h-11 rounded-full border border-black-800/15 text-ink hover:bg-cream transition-colors"
            >
              <MapPin className="w-4 h-4" />
            </a>

            {/* Mobile Nav */}
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
