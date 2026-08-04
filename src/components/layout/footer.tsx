"use client";

import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

const services = [
  { name: "Interior Design", href: "/spaces/closets" },
  { name: "Commercial Fit-Out", href: "/spaces/garages" },
  { name: "Nail Salon Design & Construction", href: "/spaces/home-offices" },
  { name: "Residential Renovation", href: "/spaces/pantries" },
  { name: "Custom Joinery", href: "/spaces/laundry-rooms" },
  { name: "Branding", href: "/spaces/mudrooms" },
];

const projects = [
  { name: "Commercial Projects", href: "/gallery" },
  { name: "Residential Projects", href: "/gallery" },
  { name: "Nail Salon Portfolio", href: "/gallery" },
  { name: "Kitchen Renovation", href: "/gallery" },
  { name: "Custom Joinery", href: "/gallery" },
];

const company = [
  { name: "About Us", href: "/about" },
  { name: "Our Process", href: "/process" },
  { name: "Gallery", href: "/gallery" },
  { name: "Service Areas", href: "/locations" },
  { name: "Get a Quote", href: "/consultation" },
];

export function KosmoFooter() {
  return (
    <footer className="bg-black-950 text-white">
      <div className="container-kosmo py-12 sm:py-16 md:py-[72px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/home" className="inline-flex items-center gap-3 mb-5 sm:mb-6 p-2 sm:p-3 bg-white rounded-lg">
              <img src="/logo.png" alt="Kosmo DNC - Interior Design & Construction" className="h-10 sm:h-12 w-auto" />
            </Link>
            <p className="text-[13px] text-white/80 mb-5 sm:mb-6 leading-relaxed">
              Interior design, commercial fit-outs, residential renovations,
              construction and branding services in Maryland and Northern Virginia.
            </p>
            <div className="space-y-2 mb-5 sm:mb-6 text-[13px] text-white/80">
              <p>14229 Travilah Rd, Rockville, MD 20850</p>
              <p>
                <a href="tel:+14437360577" className="hover:text-white transition-colors">(443) 736-0577</a>
                {" · "}
                <a href="mailto:kosmodnc@gmail.com" className="hover:text-white transition-colors">kosmodnc@gmail.com</a>
              </p>
              <p>Mon–Fri 10:00 AM–6:00 PM · Licensed MD #113826</p>
            </div>
            <div className="flex gap-3 sm:gap-4">
              <a
                href="https://www.facebook.com/Kosmodnc/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
              <a
                href="https://www.instagram.com/kosmo.dnc/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-white mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[13px] text-white/80 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-white mb-4">
              Projects
            </h3>
            <ul className="space-y-3">
              {projects.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[13px] text-white/80 hover:text-white transition-colors"
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
                    className="text-[13px] text-white/80 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-white/20">
          <div className="flex flex-col lg:flex-row lg:items-center gap-5 sm:gap-6">
            <div className="flex-1">
              <h3 className="font-serif text-lg sm:text-xl text-white mb-2">
                Stay Updated
              </h3>
              <p className="text-[13px] text-white/80">
                Subscribe to get design tips and exclusive offers.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 sm:gap-0">
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full lg:w-72 h-11 sm:h-12 pl-4 pr-4 rounded-xl sm:rounded-l-full sm:rounded-r-none bg-white/10 border border-white/30 text-white placeholder:text-white/70 focus:outline-none focus:border-white/60"
                />
              </div>
              <button
                type="submit"
                className="h-11 sm:h-12 px-5 sm:px-6 bg-[#d8c29c] text-black-950 font-extrabold text-[14px] rounded-xl sm:rounded-l-none sm:rounded-r-full hover:bg-white/20 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/20 py-4 sm:py-5">
        <div className="container-kosmo flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-center sm:text-left">
          <p className="text-[11px] sm:text-[12px] text-white/80">
            Copyright © {new Date().getFullYear()} Kosmo DNC. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6">
            <Link href="/privacy" className="text-[11px] sm:text-[12px] text-white/80 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[11px] sm:text-[12px] text-white/80 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
