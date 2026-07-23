"use client";

import { Button } from "./button";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  offer?: string;
}

export function Hero({
  title,
  subtitle,
  backgroundImage,
  ctaPrimary,
  ctaSecondary,
  offer,
}: HeroProps) {
  return (
    <div
      className="relative w-full min-h-[500px] sm:min-h-[560px] md:min-h-[600px] lg:min-h-[680px] flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,.5) 100%), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container-kosmo w-full px-3 sm:px-4">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto pt-10 sm:pt-14 md:pt-16 pb-12 sm:pb-16">
          {/* Offer Pill */}
          {offer && (
            <span className="inline-block px-3 py-1.5 sm:py-2 mb-4 sm:mb-5 rounded-lg sm:rounded-xl bg-[#d8c29c] text-black-950 text-[10px] sm:text-[11px] md:text-[12px] font-extrabold uppercase tracking-wider">
              {offer}
            </span>
          )}

          {/* Title */}
          <h1 className="font-serif text-[26px] sm:text-[32px] md:text-[40px] lg:text-[48px] xl:text-[56px] text-white mb-3 sm:mb-4 leading-[1.15] px-1 sm:px-0">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-base text-white/90 mb-5 sm:mb-6 max-w-xl mx-auto leading-relaxed px-2 sm:px-0">
              {subtitle}
            </p>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-center items-center w-full sm:w-auto px-4 sm:px-0">
            {ctaPrimary && (
              <Link href={ctaPrimary.href} className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto min-w-[160px] sm:min-w-[180px]">
                  {ctaPrimary.label}
                </Button>
              </Link>
            )}
            {ctaSecondary && (
              <Link href={ctaSecondary.href} className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto min-w-[160px] sm:min-w-[180px]">
                  {ctaSecondary.label}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-5 sm:bottom-6 right-4 sm:right-8 hidden lg:flex items-center gap-2 sm:gap-3 text-white/70">
        <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.16em]">
          Scroll
        </span>
        <ArrowDown className="w-4 h-4" />
      </div>
    </div>
  );
}

interface StatsStripProps {
  stats: { number: string; label: string }[];
}

export function StatsStrip({ stats }: StatsStripProps) {
  return (
    <div className="bg-black-950 py-6 sm:py-8 md:py-10">
      <div className="container-kosmo">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center px-2 sm:px-3 py-3 sm:py-4 border-l border-white/20 first:border-0"
            >
              <div className="font-serif text-[20px] sm:text-[24px] md:text-[28px] lg:text-[30px] text-white mb-0.5 sm:mb-1">
                {stat.number}
              </div>
              <div className="text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] font-extrabold uppercase tracking-[0.1em] sm:tracking-[0.12em] text-white/80 sm:text-white/90">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
