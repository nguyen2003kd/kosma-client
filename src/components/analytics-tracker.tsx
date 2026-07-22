"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { pageview } from "@/lib/gtag";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const query = window.location.search;
    const url = query ? `${pathname}${query}` : pathname;
    pageview(url);
  }, [pathname]);

  return null;
}
