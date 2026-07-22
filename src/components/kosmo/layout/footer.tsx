"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";

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

const company = [
  { name: "About Us", href: "/kosmo/about" },
  { name: "Our Process", href: "/kosmo/process" },
  { name: "Gallery", href: "/kosmo/gallery" },
  { name: "Locations", href: "/kosmo/locations" },
  { name: "Contact", href: "/kosmo/contact" },
];

export function KosmoFooter() {
  return (
    <footer className="bg-green-950 text-white">
      <div className="container-kosmo py-[72px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/kosmo/home" className="inline-flex items-center gap-3 mb-6 p-3 bg-white rounded-lg">
              <img src="/logo.png" alt="Kosmo" className="h-12 w-auto" />
            </Link>
            <p className="text-[13px] text-white/85 mb-6 leading-relaxed">
              Transform your space with custom storage solutions designed to maximize
              functionality and elevate your home aesthetic.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Spaces */}
          <div>
            <h3 className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-white mb-4">
              Spaces
            </h3>
            <ul className="space-y-3">
              {spaces.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[13px] text-white/85 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-white mb-4">
              Solutions
            </h3>
            <ul className="space-y-3">
              {solutions.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[13px] text-white/85 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-white mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[13px] text-white/85 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-10 border-t border-white/12">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex-1">
              <h3 className="font-serif text-xl text-white mb-2">
                Stay Updated
              </h3>
              <p className="text-[13px] text-white/85">
                Subscribe to get design tips and exclusive offers.
              </p>
            </div>
            <form className="flex w-full lg:w-auto">
              <div className="relative flex-1 lg:w-72">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full lg:w-72 h-12 pl-4 pr-4 rounded-l-full bg-white/10 border border-white/30 text-white placeholder:text-white/70 focus:outline-none focus:border-white/60"
                />
              </div>
              <button
                type="submit"
                className="h-12 px-6 bg-[#d8c29c] text-green-950 font-extrabold text-[14px] rounded-r-full hover:bg-white/20 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/12 py-5">
        <div className="container-kosmo flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] text-white/80">
            © {new Date().getFullYear()} Kosmo. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-[12px] text-white/85 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[12px] text-white/85 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
