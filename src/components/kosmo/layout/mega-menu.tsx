"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const spaces = [
  { name: "Closets", href: "/kosmo/spaces/closets", image: "/images/kosmo/living.jpg" },
  { name: "Garages", href: "/kosmo/spaces/garages", image: "/images/kosmo/showroom.jpg" },
  { name: "Home Offices", href: "/kosmo/spaces/home-offices", image: "/images/kosmo/office.jpg" },
  { name: "Pantries", href: "/kosmo/spaces/pantries", image: "/images/kosmo/kitchen.jpg" },
  { name: "Laundry Rooms", href: "/kosmo/spaces/laundry-rooms", image: "/images/kosmo/lounge.jpg" },
  { name: "Mudrooms", href: "/kosmo/spaces/mudrooms", image: "/images/kosmo/living.jpg" },
];

const solutions = [
  { name: "Walk-In Closets", href: "/kosmo/solutions/walk-in-closets" },
  { name: "Reach-In Closets", href: "/kosmo/solutions/reach-in-closets" },
  { name: "Garage Cabinets", href: "/kosmo/solutions/garage-cabinets" },
  { name: "Wall Beds", href: "/kosmo/solutions/wall-beds" },
  { name: "Entertainment Centers", href: "/kosmo/solutions/entertainment-centers" },
  { name: "Custom Accessories", href: "/kosmo/solutions/custom-accessories" },
];

export function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <div className="hidden xl:flex items-center gap-7">
      <div className="relative" onMouseEnter={() => setActiveMenu("spaces")} onMouseLeave={() => setActiveMenu(null)}>
        <button className="flex items-center gap-1 h-[78px] text-[14px] font-semibold text-ink hover:text-green-800 transition-colors">
          Spaces
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === "spaces" ? "rotate-180" : ""}`} />
        </button>
        {activeMenu === "spaces" && (
          <div className="absolute top-full left-0 w-[780px] bg-white shadow-mega rounded-xl p-6 grid grid-cols-4 gap-[34px] z-50 animate-fade-in">
            <div className="col-span-1">
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-green-800 mb-4">Explore Spaces</h3>
              <ul className="space-y-3">
                {spaces.map((item) => (
                  <li key={item.name}><Link href={item.href} className="text-[14px] text-ink hover:text-green-800 transition-colors">{item.name}</Link></li>
                ))}
              </ul>
            </div>
            <div className="col-span-3 grid grid-cols-3 gap-4">
              {spaces.map((item) => (
                <Link key={item.name} href={item.href} className="group relative aspect-[4/3] rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${item.image})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-950/85 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3"><span className="text-white font-serif text-[18px]">{item.name}</span></div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative" onMouseEnter={() => setActiveMenu("solutions")} onMouseLeave={() => setActiveMenu(null)}>
        <button className="flex items-center gap-1 h-[78px] text-[14px] font-semibold text-ink hover:text-green-800 transition-colors">
          Solutions
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === "solutions" ? "rotate-180" : ""}`} />
        </button>
        {activeMenu === "solutions" && (
          <div className="absolute top-full left-0 w-[520px] bg-white shadow-mega rounded-xl p-6 z-50 animate-fade-in">
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-green-800 mb-4">Explore Solutions</h3>
            <ul className="grid grid-cols-2 gap-4">
              {solutions.map((item) => (
                <li key={item.name}><Link href={item.href} className="block p-3 rounded-lg hover:bg-green-50 transition-colors"><span className="text-[14px] text-ink hover:text-green-800">{item.name}</span></Link></li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-mutedLine">
              <Link href="/kosmo/consultation" className="text-[14px] font-semibold text-green-800 hover:text-green-700">Get a Free Quote →</Link>
            </div>
          </div>
        )}
      </div>

      <Link href="/kosmo/about" className="h-[78px] flex items-center text-[14px] font-semibold text-ink hover:text-green-800">About</Link>
      <Link href="/kosmo/process" className="h-[78px] flex items-center text-[14px] font-semibold text-ink hover:text-green-800">Process</Link>
      <Link href="/kosmo/gallery" className="h-[78px] flex items-center text-[14px] font-semibold text-ink hover:text-green-800">Gallery</Link>
      <Link href="/kosmo/locations" className="h-[78px] flex items-center text-[14px] font-semibold text-ink hover:text-green-800">Locations</Link>
    </div>
  );
}
