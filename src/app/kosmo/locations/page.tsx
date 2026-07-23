"use client";

import { useState } from "react";
import { PageHero, SectionHeading, ConsultationForm } from "@/components/kosmo/ui";
import { Input } from "@/components/kosmo/ui";
import { MapPin, Phone } from "lucide-react";

const locations = [
  { city: "Rockville", state: "Maryland", address: "14229 Travilah Rd, Rockville, MD 20850", phone: "(443) 736-0577" },
  { city: "Annapolis", state: "Maryland", address: "Serving Annapolis & Anne Arundel County", phone: "(443) 736-0577" },
  { city: "Bel Air", state: "Maryland", address: "Serving Bel Air & Harford County", phone: "(443) 736-0577" },
  { city: "McLean", state: "Virginia", address: "Serving McLean & Northern Virginia", phone: "(443) 736-0577" },
  { city: "Dumfries", state: "Virginia", address: "Serving Dumfries & Prince William County", phone: "(443) 736-0577" },
  { city: "Montgomery County", state: "Maryland", address: "Serving Montgomery County, MD", phone: "(443) 736-0577" },
];

export default function LocationsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLocations = locations.filter(
    (loc) =>
      loc.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <PageHero
        title="Service Areas"
        subtitle="Serving Maryland and Northern Virginia."
        breadcrumbs={[
          { label: "Home", href: "/kosmo/home" },
          { label: "Service Areas" },
        ]}
        backgroundImage="/images/kosmo/living.jpg"
      />

      <section className="py-10 sm:py-12 md:py-16 bg-black-900">
        <div className="container-kosmo">
          <div className="max-w-xl mx-auto">
            <Input
              placeholder="Search by city or state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 sm:h-14 rounded-full !bg-white/10 border-white/40 !text-white placeholder:text-white/70"
            />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading title="Areas We Serve" subtitle="Based in Rockville, MD — serving the greater Maryland and Northern Virginia region." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {filteredLocations.map((location) => (
              <div key={`${location.city}-${location.state}`} className="p-5 sm:p-6 rounded-[--radius-md] border border-line bg-white hover:shadow-soft transition-shadow">
                <h3 className="font-serif text-[22px] sm:text-[25px] text-ink mb-2">{location.city}, {location.state}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-black-800 flex-shrink-0 mt-0.5" />
                    <p className="text-[13px] sm:text-[14px] text-gray-700">{location.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-black-800 flex-shrink-0" />
                    <a href={`tel:${location.phone}`} className="text-[13px] sm:text-[14px] text-gray-700 hover:text-black-800">{location.phone}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container-kosmo">
          <SectionHeading title="Can't Find Your Area?" subtitle="Contact us to check if we serve your location." />
          <div className="max-w-4xl mx-auto">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </>
  );
}
