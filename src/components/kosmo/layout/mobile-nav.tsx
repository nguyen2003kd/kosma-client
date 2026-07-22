"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, Menu } from "lucide-react";

const spaces = [
  { name: "Closets", href: "/kosmo/spaces/closets" },
  { name: "Garages", href: "/kosmo/spaces/garages" },
  { name: "Home Offices", href: "/kosmo/spaces/home-offices" },
  { name: "Pantries", href: "/kosmo/spaces/pantries" },
  { name: "Laundry Rooms", href: "/kosmo/spaces/laundry-rooms" },
  { name: "Mudrooms", href: "/kosmo/spaces/mudrooms" },
];

const solutions = [
  { name: "Walk-In Closets", href: "/kosmo/solutions/walk-in-closets" },
  { name: "Reach-In Closets", href: "/kosmo/solutions/reach-in-closets" },
  { name: "Garage Cabinets", href: "/kosmo/solutions/garage-cabinets" },
  { name: "Wall Beds", href: "/kosmo/solutions/wall-beds" },
  { name: "Entertainment Centers", href: "/kosmo/solutions/entertainment-centers" },
  { name: "Custom Accessories", href: "/kosmo/solutions/custom-accessories" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="xl:hidden w-11 h-11 flex items-center justify-center" aria-label="Open menu">
        <Menu className="w-6 h-6 text-ink" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[60] xl:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="absolute top-[119px] left-0 right-0 bottom-0 bg-white overflow-y-auto">
            <div className="p-5">
              <button onClick={() => setIsOpen(false)} className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center" aria-label="Close menu">
                <X className="w-6 h-6 text-ink" />
              </button>

              <nav className="space-y-4">
                <div className="border-b border-mutedLine">
                  <button onClick={() => toggleSection("spaces")} className="w-full flex items-center justify-between py-4 font-serif text-[26px] text-ink">
                    Spaces
                    <ChevronDown className={`w-5 h-5 transition-transform ${expandedSection === "spaces" ? "rotate-180" : ""}`} />
                  </button>
                  {expandedSection === "spaces" && (
                    <div className="pb-4 space-y-3">
                      {spaces.map((item) => (
                        <Link key={item.name} href={item.href} className="block text-[15px] text-gray-700 hover:text-green-800" onClick={() => setIsOpen(false)}>{item.name}</Link>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-b border-mutedLine">
                  <button onClick={() => toggleSection("solutions")} className="w-full flex items-center justify-between py-4 font-serif text-[26px] text-ink">
                    Solutions
                    <ChevronDown className={`w-5 h-5 transition-transform ${expandedSection === "solutions" ? "rotate-180" : ""}`} />
                  </button>
                  {expandedSection === "solutions" && (
                    <div className="pb-4 space-y-3">
                      {solutions.map((item) => (
                        <Link key={item.name} href={item.href} className="block text-[15px] text-gray-700 hover:text-green-800" onClick={() => setIsOpen(false)}>{item.name}</Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link href="/kosmo/about" className="block py-4 font-serif text-[26px] text-ink border-b border-mutedLine" onClick={() => setIsOpen(false)}>About</Link>
                <Link href="/kosmo/process" className="block py-4 font-serif text-[26px] text-ink border-b border-mutedLine" onClick={() => setIsOpen(false)}>Process</Link>
                <Link href="/kosmo/gallery" className="block py-4 font-serif text-[26px] text-ink border-b border-mutedLine" onClick={() => setIsOpen(false)}>Gallery</Link>
                <Link href="/kosmo/locations" className="block py-4 font-serif text-[26px] text-ink border-b border-mutedLine" onClick={() => setIsOpen(false)}>Locations</Link>

                <div className="pt-6">
                  <Link href="/kosmo/consultation" className="inline-flex items-center justify-center min-h-[48px] px-6 w-full bg-green-800 text-white font-extrabold text-[14px] rounded-full hover:bg-green-950" onClick={() => setIsOpen(false)}>Book Consultation</Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
