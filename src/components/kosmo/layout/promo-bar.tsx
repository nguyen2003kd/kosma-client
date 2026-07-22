"use client";

import Link from "next/link";

export function PromoBar() {
  return (
    <div className="bg-black-950 text-white text-center py-2.5 px-5 text-[12px] font-extrabold uppercase tracking-[0.08em]">
      <Link href="/kosmo/consultation" className="hover:text-white/80 transition-colors">
        Request a Free Project Quote →
      </Link>
    </div>
  );
}
