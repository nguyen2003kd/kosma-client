"use client";

import Link from "next/link";

export function PromoBar() {
  return (
    <div className="bg-black-950 text-white text-center py-2 sm:py-2.5 px-3 sm:px-5 text-[10px] sm:text-[11px] md:text-[12px] font-extrabold uppercase tracking-[0.06em] sm:tracking-[0.08em]">
      <Link href="/consultation" className="hover:text-white/80 transition-colors block truncate">
        Request a Free Project Quote →
      </Link>
    </div>
  );
}
