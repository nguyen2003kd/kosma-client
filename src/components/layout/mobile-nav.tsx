"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ChevronDown, Menu, Phone, Calendar, MapPin } from "lucide-react";
import type { GetApiV10Category200 } from "@/api/models";
import type { CategoryWithChildren } from "@/api/models/categoryWithChildren";
import type { Category } from "@/api/models/category";

export function MobileNav({ categoriesData }: { categoriesData?: GetApiV10Category200 | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedRoot, setExpandedRoot] = useState<string | null>(null);

  const rootCategories = (categoriesData?.responseData as CategoryWithChildren[]) || [];

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
    setExpandedRoot(null);
  };

  const toggleRoot = (rootId: string) => {
    setExpandedRoot(expandedRoot === rootId ? null : rootId);
  };

  return (
    <>
      {/* Menu Trigger Button - hidden on xl+ (synced with MegaMenu) */}
      <button
        onClick={() => setIsOpen(true)}
        className="xl:hidden flex items-center justify-center w-10 h-10 -mr-2"
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
              <Link href="/home" onClick={closeMenu} className="flex-shrink-0">
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
              {/* API-driven root categories with sub-category accordions */}
              {rootCategories.map((rootCat) => {
                const hasChildren = (rootCat.categories?.length ?? 0) > 0;
                const isExpanded = expandedRoot === rootCat.id;

                return (
                  <div key={rootCat.id || rootCat.name} className="border-b border-gray-100">
                    {hasChildren ? (
                      <>
                        <button
                          onClick={() => toggleRoot(rootCat.id || "")}
                          className="w-full flex items-center justify-between px-5 py-3.5 text-[15px] font-semibold text-gray-900 active:bg-gray-50"
                          type="button"
                        >
                          <span>{rootCat.name}</span>
                          <ChevronDown
                            className="w-4 h-4 text-gray-500"
                            style={{
                              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                              transition: "transform 200ms",
                            }}
                          />
                        </button>
                        {isExpanded && (
                          <div className="pb-2 bg-gray-50">
                            <Link
                              href={rootCat.link || "#"}
                              onClick={closeMenu}
                              className="block px-8 py-2.5 text-[14px] font-semibold text-gray-900 active:bg-gray-100"
                            >
                              View All {rootCat.name}
                            </Link>
                            {rootCat.categories!.map((sub: Category) => (
                              <Link
                                key={sub.id || sub.name}
                                href={sub.link || "#"}
                                onClick={closeMenu}
                                className="block px-8 py-2.5 text-[14px] text-gray-600 active:bg-gray-100"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={rootCat.link || "#"}
                        onClick={closeMenu}
                        className="block px-5 py-3.5 text-[15px] font-semibold text-gray-900 active:bg-gray-50"
                      >
                        {rootCat.name}
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Bottom CTA Section - matching desktop header CTAs */}
            <div className="p-5 border-t border-gray-100 bg-white flex-shrink-0 space-y-4">
              <Link
                href="/consultation"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 w-full py-3.5 text-white text-center text-[14px] font-semibold rounded-full"
                style={{ backgroundColor: "#1e3a5f" }}
              >
                <Calendar className="w-4 h-4" />
                Schedule Now
              </Link>

              <div className="flex items-center justify-center gap-4">
                <a
                  href="tel:+14437360577"
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-700"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <Link
                  href="/locations"
                  onClick={closeMenu}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-700"
                >
                  <MapPin className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
