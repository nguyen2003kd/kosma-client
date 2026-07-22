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
      className="relative min-h-[720px] flex items-center"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(7,30,24,.9), rgba(7,30,24,.62) 44%, rgba(7,30,24,.12) 78%), linear-gradient(0deg, rgba(7,30,24,.2), transparent), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center 53%",
      }}
    >
      <div className="container-kosmo py-[90px]">
        <div className="max-w-[670px]">
          {/* Offer Pill */}
          {offer && (
            <span className="inline-block px-4 py-2 mb-6 rounded-full bg-white/10 border border-white/30 text-white text-[12px] font-extrabold uppercase tracking-[0.1em]">
              {offer}
            </span>
          )}

          {/* Title */}
          <h1 className="font-serif text-display text-white mb-6">{title}</h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-lead text-white mb-8 max-w-[570px]">{subtitle}</p>
          )}

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
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
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 hidden lg:flex items-center gap-3 text-white/80">
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
    <div className="bg-green-950 py-10">
      <div className="container-kosmo">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center px-5 py-4 border-l border-white/13 first:border-0"
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
