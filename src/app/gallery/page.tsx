import { PageHero, SectionHeading, GalleryGrid, ConsultationForm } from "@/components/common";

const galleryImages = [
  { src: "/images/hero.jpg", alt: "Kosmo Nail Bar interior at Rockville, Maryland", tall: true },
  { src: "/images/kitchen.jpg", alt: "Custom kitchen renovation in Annapolis, Maryland" },
  { src: "/images/office.jpg", alt: "Commercial interior design project in Maryland" },
  { src: "/images/lounge.jpg", alt: "Nail salon lounge area in Dumfries, Virginia" },
  { src: "/images/living.jpg", alt: "Residential interior design in Maryland", wide: true },
  { src: "/images/showroom.jpg", alt: "Commercial fit-out showroom in Bel Air, Maryland" },
  { src: "/images/exterior.jpg", alt: "Building exterior design by Kosmo DNC" },
  { src: "/images/hero.jpg", alt: "Nail salon reception area in McLean, Virginia" },
  { src: "/images/living.jpg", alt: "Custom joinery and cabinetry by Kosmo DNC" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Project Gallery"
        subtitle="Explore commercial and residential projects by Kosmo DNC across Maryland and Northern Virginia."
        breadcrumbs={[
          { label: "Home", href: "/home" },
          { label: "Gallery" },
        ]}
        backgroundImage="/images/showroom.jpg"
      />

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading title="Project Portfolio" subtitle="Commercial fit-outs, nail salon design, residential renovations and custom joinery." />
          <GalleryGrid images={galleryImages} />
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading title="Ready to Start Your Project?" subtitle="Request a free project quote today." />
          <div className="max-w-4xl mx-auto">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </>
  );
}
