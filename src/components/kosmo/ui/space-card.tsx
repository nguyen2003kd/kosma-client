"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SpaceCardProps {
  title: string;
  description?: string;
  image: string;
  href: string;
}

export function SpaceCard({ title, description, image, href }: SpaceCardProps) {
  return (
    <Link
      href={href}
      className="group relative block min-h-[440px] rounded-xl overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.055]"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black-950 via-black-950/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <h3 className="font-serif text-[32px] text-white mb-2">{title}</h3>
        {description && (
          <p className="text-[14px] text-white/95 line-clamp-2 mb-4 drop-shadow-md">
            {description}
          </p>
        )}
        <span className="inline-flex items-center gap-2 text-[13px] font-extrabold text-white group-hover:text-white transition-colors drop-shadow-md">
          Learn more
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

interface ProcessCardProps {
  number: number;
  title: string;
  description: string;
}

export function ProcessCard({ number, title, description }: ProcessCardProps) {
  return (
    <div className="group p-[30px_26px] rounded-xl border border-mutedLine bg-white hover:-translate-y-1.5 hover:border-[#b7c7c0] hover:shadow-soft transition-all duration-300">
      {/* Number Circle */}
      <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center mb-5">
        <span className="font-serif text-[22px] text-black-800">{number}</span>
      </div>

      {/* Content */}
      <h3 className="font-serif text-[26px] text-ink mb-3">{title}</h3>
      <p className="text-[14px] text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
}

interface SolutionCardProps {
  title: string;
  description?: string;
  image: string;
  href: string;
}

export function SolutionCard({ title, description, image, href }: SolutionCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-xl overflow-hidden bg-white hover:-translate-y-1 hover:shadow-soft transition-all duration-300"
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-[28px] text-ink mb-2">{title}</h3>
        {description && (
          <p className="text-[14px] text-gray-700 line-clamp-2">{description}</p>
        )}
      </div>
    </Link>
  );
}

interface ValueCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function ValueCard({ title, description, icon }: ValueCardProps) {
  return (
    <div className="p-7 rounded-xl bg-white shadow-soft">
      {icon && <div className="mb-4 text-black-800">{icon}</div>}
      <h3 className="font-serif text-[27px] text-ink mb-3">{title}</h3>
      <p className="text-[14px] text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
}
