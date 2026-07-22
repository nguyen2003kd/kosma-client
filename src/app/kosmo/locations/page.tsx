"use client";

import { useState } from "react";
import { PageHero, SectionHeading, ConsultationForm } from "@/components/kosmo/ui";
import { Input } from "@/components/kosmo/ui";
import { MapPin, Phone } from "lucide-react";

const locations = [
  { city: "Charlotte", state: "North Carolina", address: "123 Design Drive, Charlotte, NC 28202", phone: "(704) 555-0101" },
  { city: "Orlando", state: "Florida", address: "456 Storage Way, Orlando, FL 32801", phone: "(407) 555-0202" },
  { city: "Dallas", state: "Texas", address: "789 Organization Blvd, Dallas, TX 75201", phone: "(214) 555-0303" },
  { city: "Denver", state: "Colorado", address: "321 Custom Lane, Denver, CO 80202", phone: "(303) 555-0404" },
  { city: "Portland", state: "Oregon", address: "654 Solutions Ave, Portland, OR 97201", phone: "(503) 555-0505" },
  { city: "Phoenix", state: "Arizona", address: "987 Innovation Dr, Phoenix, AZ 85001", phone: "(602) 555-0606" },
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
        title="Our Locations"
        subtitle="Find a Kosmo showroom near you."
        breadcrumbs={[
          { label: "Home", href: "/kosmo/home" },
          { label: "Locations" },
        ]}
        backgroundImage="/images/kosmo/living.jpg"
      />

      <section className="py-16 bg-green-900">
        <div className="container-kosmo">
          <div className="max-w-xl mx-auto">
            <Input
              placeholder="Search by city or state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-14 rounded-full !bg-white/15 border-white/40 !text-white placeholder:text-white/70"
            />
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading title="Visit Our Showrooms" subtitle="Experience our designs in person." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLocations.map((location) => (
              <div key={`${location.city}-${location.state}`} className="p-6 rounded-[--radius-md] border border-line bg-white hover:shadow-soft transition-shadow">
                <h3 className="font-serif text-[25px] text-ink mb-2">{location.city}, {location.state}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-green-800 flex-shrink-0 mt-0.5" />
                    <p className="text-[14px] text-gray-700">{location.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-green-800 flex-shrink-0" />
                    <a href={`tel:${location.phone}`} className="text-[14px] text-gray-700 hover:text-green-800">{location.phone}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-green-50">
        <div className="container-kosmo">
          <SectionHeading title="Can't Visit Us?" subtitle="Schedule a free in-home consultation." />
          <div className="max-w-4xl mx-auto">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </>
  );
}
