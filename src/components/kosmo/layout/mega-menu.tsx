"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useGetApiV10PostByTagsTagIds } from "@/api/endpoints/post";
import { getThumbnailSrc } from "@/lib/responsive-image";
import { kosmoSpaces } from "@/configs/kosmo-spaces";
import type { PostExtended } from "@/types/post";

const FALLBACK_IMAGE = "/images/kosmo/living.jpg";

function ServiceImage({ post }: { post: PostExtended }) {
  const src = getThumbnailSrc(
    post.thumbnail_compress_info,
    post.thumbnail_path,
    FALLBACK_IMAGE,
  );
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <Image
      src={currentSrc}
      alt={post.title || ""}
      fill
      sizes="(max-width: 1280px) 0px, 200px"
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      onError={() => {
        if (currentSrc !== FALLBACK_IMAGE) setCurrentSrc(FALLBACK_IMAGE);
      }}
    />
  );
}

const services = kosmoSpaces;

const projectTypes = [
  { name: "Nail Salon Design & Construction", href: "/kosmo/solutions/walk-in-closets" },
  { name: "Kitchen Renovation", href: "/kosmo/solutions/reach-in-closets" },
  { name: "Commercial Fit-Out", href: "/kosmo/solutions/garage-cabinets" },
  { name: "Residential Renovation", href: "/kosmo/solutions/wall-beds" },
  { name: "Custom Joinery", href: "/kosmo/solutions/entertainment-centers" },
  { name: "Branding & Website", href: "/kosmo/solutions/custom-accessories" },
];

export function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [hoveredServiceIndex, setHoveredServiceIndex] = useState(0);

  const hoveredService = services[hoveredServiceIndex];
  const tagIdsParam = hoveredService?.tagIds?.join(",") || "";

  const { data: tagPostsData, isLoading: isLoadingPosts } = useGetApiV10PostByTagsTagIds(
    tagIdsParam,
    {
      filters: "is_hidden==false",
      sortField: "created_at",
      sortOrder: "desc",
      pageSize: 6,
      filterBy: "CLIENT",
    },
    {
      query: { enabled: tagIdsParam.length > 0 },
    },
  );

  const tagPosts = (tagPostsData?.responseData?.rows as PostExtended[]) || [];

  return (
    <div className="hidden xl:flex items-center gap-7">
      <div className="relative" onMouseEnter={() => setActiveMenu("spaces")} onMouseLeave={() => setActiveMenu(null)}>
        <button className="flex items-center gap-1 h-[78px] text-[14px] font-semibold text-ink hover:text-black-800 transition-colors">
          Services
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === "spaces" ? "rotate-180" : ""}`} />
        </button>
        {activeMenu === "spaces" && (
          <div className="absolute top-full left-0 w-[780px] bg-white shadow-mega rounded-xl p-6 grid grid-cols-4 gap-[34px] z-50 animate-fade-in">
            <div className="col-span-1">
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-black-800 mb-4">Our Services</h3>
              <ul className="space-y-3">
                {services.map((item, index) => (
                  <li
                    key={item.name}
                    onMouseEnter={() => setHoveredServiceIndex(index)}
                  >
                    <Link
                      href={item.href}
                      className={`text-[14px] transition-colors ${hoveredServiceIndex === index ? "text-black-800 font-semibold" : "text-ink hover:text-black-800"}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-3 grid grid-cols-2 grid-rows-3 gap-4">
              {isLoadingPosts ? (
                <div className="col-span-2 row-span-3 flex items-center justify-center text-gray-400 text-sm">
                  Loading...
                </div>
              ) : tagPosts.length > 0 ? (
                tagPosts.map((post) => (
                  <Link key={post.id} href={`/services/${post.slug || ""}`} className="group relative aspect-[4/3] rounded-xl overflow-hidden">
                    <ServiceImage post={post} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black-950/80 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3"><span className="text-white font-serif text-[18px]">{post.title}</span></div>
                  </Link>
                ))
              ) : (
                <div className="col-span-2 row-span-3 flex items-center justify-center text-gray-400 text-sm">
                  No posts available for this service.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="relative" onMouseEnter={() => setActiveMenu("solutions")} onMouseLeave={() => setActiveMenu(null)}>
        <button className="flex items-center gap-1 h-[78px] text-[14px] font-semibold text-ink hover:text-black-800 transition-colors">
          Projects
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === "solutions" ? "rotate-180" : ""}`} />
        </button>
        {activeMenu === "solutions" && (
          <div className="absolute top-full left-0 w-[520px] bg-white shadow-mega rounded-xl p-6 z-50 animate-fade-in">
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-black-800 mb-4">Project Types</h3>
            <ul className="grid grid-cols-2 gap-4">
              {projectTypes.map((item) => (
                <li key={item.name}><Link href={item.href} className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"><span className="text-[14px] text-ink hover:text-black-800">{item.name}</span></Link></li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-mutedLine">
              <Link href="/kosmo/consultation" className="text-[14px] font-semibold text-black-800 hover:text-black-700">Request a Free Quote â†’</Link>
            </div>
          </div>
        )}
      </div>

      <Link href="/kosmo/about" className="h-[78px] flex items-center text-[14px] font-semibold text-ink hover:text-black-800">About</Link>
      {/* <Link href="/kosmo/process" className="h-[78px] flex items-center text-[14px] font-semibold text-ink hover:text-black-800">Process</Link>
      <Link href="/kosmo/gallery" className="h-[78px] flex items-center text-[14px] font-semibold text-ink hover:text-black-800">Gallery</Link>
      <Link href="/kosmo/locations" className="h-[78px] flex items-center text-[14px] font-semibold text-ink hover:text-black-800">Service Areas</Link> */}
    </div>
  );
}
