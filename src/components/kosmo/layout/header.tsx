"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-[14px] border-b border-mutedLine shadow-soft"
          : "bg-white"
      }`}
    >
      <div className="container-kosmo">
        <div className="flex items-center justify-between h-[78px]">
          {/* Logo */}
          <Link href="/kosmo/home" className="flex items-center gap-3">
            <img src="/logo.png" alt="Kosmo DNC - Interior Design & Construction" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <MegaMenu />

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Phone */}
            <a
              href="tel:+14437360577"
              className="hidden lg:flex items-center gap-2 text-[13px] font-extrabold text-ink hover:text-black-800 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>(443) 736-0577</span>
            </a>

            {/* CTA Button */}
            <Link
              href="/kosmo/consultation"
              className="hidden lg:inline-flex items-center justify-center min-h-[48px] px-6 bg-black-800 text-white font-extrabold text-[14px] rounded-xl hover:bg-black-950 hover:-translate-y-0.5 transition-all duration-250 shadow-button"
            >
              Get a Quote
            </Link>

            {/* Mobile Nav */}
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
