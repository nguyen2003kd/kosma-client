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
      className="relative h-[480px] flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.25) 0%, rgba(0,0,0,.4) 100%), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container-kosmo text-center">
        {/* Offer Pill */}
        {offer && (
          <span className="inline-block px-4 py-2 mb-5 rounded-xl bg-[#d8c29c] text-black-950 text-[12px] font-extrabold uppercase tracking-[0.1em]">
            {offer}
          </span>
        )}

        {/* Title */}
        <h1 className="font-serif text-[42px] md:text-[56px] text-white mb-4 leading-[1.1] max-w-[800px] mx-auto">{title}</h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-lg text-white/90 mb-6 max-w-[600px] mx-auto leading-relaxed">{subtitle}</p>
        )}

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center">
          {ctaPrimary && (
            <Link href={ctaPrimary.href}>
              <Button size="lg">{ctaPrimary.label}</Button>
            </Link>
          )}
          {ctaSecondary && (
            <Link href={ctaSecondary.href}>
              <Button size="lg" variant="secondary">
                {ctaSecondary.label}
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 right-8 hidden lg:flex items-center gap-3 text-white/80">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.16em]">
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
    <div className="bg-black-950 py-10">
      <div className="container-kosmo">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center px-5 py-4 border-l border-white/20 first:border-0"
            >
              <div className="font-serif text-[30px] text-white mb-1">
                {stat.number}
              </div>
              <div className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-white/90">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
