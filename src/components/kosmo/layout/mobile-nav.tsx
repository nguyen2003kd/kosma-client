"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ChevronDown, Menu, Phone } from "lucide-react";

const services = [
  { name: "Interior Design", href: "/kosmo/spaces/closets" },
  { name: "Commercial Fit-Out", href: "/kosmo/spaces/garages" },
  { name: "Residential Renovation", href: "/kosmo/spaces/home-offices" },
  { name: "Custom Joinery", href: "/kosmo/spaces/pantries" },
  { name: "Construction Drawings", href: "/kosmo/spaces/laundry-rooms" },
  { name: "Branding", href: "/kosmo/spaces/mudrooms" },
];

const projectTypes = [
  { name: "Nail Salon Design", href: "/kosmo/solutions/walk-in-closets" },
  { name: "Kitchen Renovation", href: "/kosmo/solutions/reach-in-closets" },
  { name: "Commercial Fit-Out", href: "/kosmo/solutions/garage-cabinets" },
  { name: "Residential Renovation", href: "/kosmo/solutions/wall-beds" },
  { name: "Custom Joinery", href: "/kosmo/solutions/entertainment-centers" },
  { name: "Branding & Website", href: "/kosmo/solutions/custom-accessories" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
    setExpandedSection(null);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <>
      {/* Menu Trigger Button - hidden on lg+ */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg-hidden-mobile flex items-center justify-center w-10 h-10 -mr-2"
        aria-label="Open menu"
        type="button"
      >
        <Menu className="w-6 h-6" style={{ color: "#0a0a0a" }} />
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            style={{ zIndex: 9998 }}
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Slide-out Drawer */}
          <aside
            className="fixed top-0 right-0 h-screen bg-white flex flex-col shadow-2xl"
            style={{
              width: "min(85vw, 340px)",
              zIndex: 9999,
              transform: "translateX(0)",
              transition: "transform 300ms ease-out",
            }}
            aria-label="Mobile navigation"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 h-[64px] border-b border-gray-100 flex-shrink-0">
              <Link href="/kosmo/home" onClick={closeMenu} className="flex-shrink-0">
                <img src="/logo.png" alt="Kosmo DNC" className="h-8 w-auto" />
              </Link>
              <button
                onClick={closeMenu}
                className="flex items-center justify-center w-10 h-10 -mr-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
                type="button"
              >
                <X className="w-5 h-5" style={{ color: "#0a0a0a" }} />
              </button>
            </div>

            {/* Scrollable Nav */}
            <nav className="flex-1 overflow-y-auto py-2 bg-white">
              {/* Services Accordion */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => toggleSection("services")}
                  className="w-full flex items-center justify-between px-5 py-3.5 text-[15px] font-semibold text-gray-900 active:bg-gray-50"
                  type="button"
                >
                  <span>Services</span>
                  <ChevronDown
                    className="w-4 h-4 text-gray-500"
                    style={{
                      transform: expandedSection === "services" ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 200ms",
                    }}
                  />
                </button>
                {expandedSection === "services" && (
                  <div className="pb-2 bg-gray-50">
                    {services.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeMenu}
                        className="block px-8 py-2.5 text-[14px] text-gray-600 active:bg-gray-100"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Projects Accordion */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => toggleSection("projects")}
                  className="w-full flex items-center justify-between px-5 py-3.5 text-[15px] font-semibold text-gray-900 active:bg-gray-50"
                  type="button"
                >
                  <span>Projects</span>
                  <ChevronDown
                    className="w-4 h-4 text-gray-500"
                    style={{
                      transform: expandedSection === "projects" ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 200ms",
                    }}
                  />
                </button>
                {expandedSection === "projects" && (
                  <div className="pb-2 bg-gray-50">
                    {projectTypes.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeMenu}
                        className="block px-8 py-2.5 text-[14px] text-gray-600 active:bg-gray-100"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Simple Links */}
              <Link
                href="/kosmo/about"
                onClick={closeMenu}
                className="block px-5 py-3.5 text-[15px] font-semibold text-gray-900 border-b border-gray-100 active:bg-gray-50"
              >
                About
              </Link>
              <Link
                href="/kosmo/process"
                onClick={closeMenu}
                className="block px-5 py-3.5 text-[15px] font-semibold text-gray-900 border-b border-gray-100 active:bg-gray-50"
              >
                Process
              </Link>
              <Link
                href="/kosmo/gallery"
                onClick={closeMenu}
                className="block px-5 py-3.5 text-[15px] font-semibold text-gray-900 border-b border-gray-100 active:bg-gray-50"
              >
                Gallery
              </Link>
              <Link
                href="/kosmo/locations"
                onClick={closeMenu}
                className="block px-5 py-3.5 text-[15px] font-semibold text-gray-900 border-b border-gray-100 active:bg-gray-50"
              >
                Service Areas
              </Link>
            </nav>

            {/* Bottom CTA Section */}
            <div className="p-5 border-t border-gray-100 bg-white flex-shrink-0">
              <Link
                href="/kosmo/consultation"
                onClick={closeMenu}
                className="block w-full py-3.5 text-white text-center text-[14px] font-bold rounded-lg"
                style={{ backgroundColor: "#0a0a0a" }}
              >
                Get a Quote
              </Link>

              <a
                href="tel:+14437360577"
                className="mt-4 flex items-center justify-center gap-2 text-[14px] text-gray-700"
              >
                <Phone className="w-4 h-4" />
                <span className="font-semibold" style={{ color: "#0a0a0a" }}>(443) 736-0577</span>
              </a>
            </div>
          </aside>
        </>
      )}

      {/* Inline style for hiding on lg breakpoint */}
      <style jsx>{`
        .lg-hidden-mobile {
          display: flex;
        }
        @media (min-width: 820px) {
          .lg-hidden-mobile {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
