"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const services = [
  { name: "Interior Design", href: "/kosmo/spaces/closets", image: "/images/kosmo/living.jpg" },
  { name: "Commercial Fit-Out", href: "/kosmo/spaces/garages", image: "/images/kosmo/showroom.jpg" },
  { name: "Residential Renovation", href: "/kosmo/spaces/home-offices", image: "/images/kosmo/office.jpg" },
  { name: "Custom Joinery", href: "/kosmo/spaces/pantries", image: "/images/kosmo/kitchen.jpg" },
  { name: "Construction Drawings", href: "/kosmo/spaces/laundry-rooms", image: "/images/kosmo/lounge.jpg" },
  { name: "Branding", href: "/kosmo/spaces/mudrooms", image: "/images/kosmo/living.jpg" },
];

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
                {services.map((item) => (
                  <li key={item.name}><Link href={item.href} className="text-[14px] text-ink hover:text-black-800 transition-colors">{item.name}</Link></li>
                ))}
              </ul>
            </div>
            <div className="col-span-3 grid grid-cols-3 gap-4">
              {services.map((item) => (
                <Link key={item.name} href={item.href} className="group relative aspect-[4/3] rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${item.image})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black-950/80 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3"><span className="text-white font-serif text-[18px]">{item.name}</span></div>
                </Link>
              ))}
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
      <Link href="/kosmo/process" className="h-[78px] flex items-center text-[14px] font-semibold text-ink hover:text-black-800">Process</Link>
      <Link href="/kosmo/gallery" className="h-[78px] flex items-center text-[14px] font-semibold text-ink hover:text-black-800">Gallery</Link>
      <Link href="/kosmo/locations" className="h-[78px] flex items-center text-[14px] font-semibold text-ink hover:text-black-800">Service Areas</Link>
    </div>
  );
}
