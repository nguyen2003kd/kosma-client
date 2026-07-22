import { PageHero, SectionHeading, GalleryGrid, ConsultationForm } from "@/components/kosmo/ui";

const galleryImages = [
  { src: "/images/kosmo/hero.jpg", alt: "Walk-in closet", tall: true },
  { src: "/images/kosmo/kitchen.jpg", alt: "Garage cabinets" },
  { src: "/images/kosmo/office.jpg", alt: "Home office" },
  { src: "/images/kosmo/lounge.jpg", alt: "Pantry organization" },
  { src: "/images/kosmo/living.jpg", alt: "Mudroom", wide: true },
  { src: "/images/kosmo/showroom.jpg", alt: "Laundry room" },
  { src: "/images/kosmo/exterior.jpg", alt: "Reach-in closet" },
  { src: "/images/kosmo/hero.jpg", alt: "Wall bed" },
  { src: "/images/kosmo/living.jpg", alt: "Entertainment center" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Our Gallery"
        subtitle="Browse through our collection of completed projects and get inspired."
        breadcrumbs={[
          { label: "Home", href: "/kosmo/home" },
          { label: "Gallery" },
        ]}
        backgroundImage="/images/kosmo/showroom.jpg"
      />

      <section className="py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading title="Project Gallery" subtitle="Explore our diverse portfolio of custom storage solutions." />
          <GalleryGrid images={galleryImages} />
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading title="Ready to Create Your Dream Space?" subtitle="Let our experts help you design the perfect storage solution." />
          <div className="max-w-4xl mx-auto">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </>
  );
}
