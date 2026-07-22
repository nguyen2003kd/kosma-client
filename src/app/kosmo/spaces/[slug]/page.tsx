import { PageHero, SectionHeading, SplitContent, SolutionCard, ConsultationForm } from "@/components/kosmo/ui";

const spacesData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  features: { title: string; description: string }[];
  solutions: { title: string; description: string; image: string; href: string }[];
}> = {
  closets: {
    title: "Interior Design", subtitle: "Concept design, 3D rendering, and material selection for residential and commercial spaces.",
    description: "From concept to completion, we create interior spaces that are beautiful, functional, and tailored to your vision.",
    features: [
      { title: "Concept Design", description: "Custom design concepts tailored to your space and style." },
      { title: "3D Renderings", description: "Visualize your space before construction begins." },
      { title: "Material Selection", description: "Premium materials and finishes curated for your project." },
    ],
    solutions: [
      { title: "Commercial Interior Design", description: "Nail salons, retail, and light commercial", image: "/images/kosmo/living.jpg", href: "/kosmo/solutions/walk-in-closets" },
      { title: "Residential Interior Design", description: "Whole-home and room-by-room design", image: "/images/kosmo/lounge.jpg", href: "/kosmo/solutions/reach-in-closets" },
    ],
  },
  garages: {
    title: "Commercial Fit-Out", subtitle: "Full design and construction for nail salons, retail, and light commercial spaces.",
    description: "We handle every aspect of your commercial fit-out from design to construction to branding.",
    features: [
      { title: "Design-Build", description: "One team handles design and construction." },
      { title: "Permit & Code", description: "Building permits and code compliance handled." },
    ],
    solutions: [
      { title: "Nail Salon Construction", description: "Specialized nail salon design & build", image: "/images/kosmo/showroom.jpg", href: "/kosmo/solutions/garage-cabinets" },
    ],
  },
  "home-offices": {
    title: "Residential Renovation", subtitle: "Kitchen, bathroom, and whole-home renovations from concept to completion.",
    description: "Transform your home with our full-service residential renovation services.",
    features: [
      { title: "Kitchen Renovation", description: "Custom kitchens with joinery and cabinetry." },
      { title: "Whole-Home", description: "Complete home renovation services." },
    ],
    solutions: [],
  },
  pantries: {
    title: "Custom Joinery", subtitle: "Bespoke cabinetry, built-ins, and custom woodwork crafted to your specs.",
    description: "Our skilled craftsmen create custom joinery that elevates every space.",
    features: [
      { title: "Custom Cabinetry", description: "Bespoke cabinets for any room." },
      { title: "Built-Ins", description: "Custom built-in shelving and storage." },
    ],
    solutions: [],
  },
  "laundry-rooms": {
    title: "Construction Drawings", subtitle: "Building permit drawings and construction documents for code compliance.",
    description: "We prepare detailed construction drawings and permit documents for your project.",
    features: [
      { title: "Permit Drawings", description: "Code-compliant permit drawings." },
      { title: "Construction Docs", description: "Full construction document sets." },
    ],
    solutions: [],
  },
  mudrooms: {
    title: "Branding", subtitle: "Website design, product labels, business cards, and brand identity.",
    description: "Complete your project with our branding and marketing collateral services.",
    features: [
      { title: "Website Design", description: "Custom websites for your business." },
      { title: "Brand Identity", description: "Logos, business cards, and product labels." },
    ],
    solutions: [],
  },
};

export default function SpacePage({ params }: { params: { slug: string } }) {
  const space = spacesData[params.slug];

  if (!space) {
    return (
      <>
        <PageHero title="Space Not Found" breadcrumbs={[{ label: "Home", href: "/kosmo/home" }]} />
        <div className="py-24 text-center"><p className="text-muted">This space is not available yet.</p></div>
      </>
    );
  }

  return (
    <>
      <PageHero title={space.title} subtitle={space.subtitle} breadcrumbs={[{ label: "Home", href: "/kosmo/home" }, { label: space.title }]} backgroundImage="/images/kosmo/living.jpg" />

      <section className="py-24 bg-white">
        <div className="container-kosmo">
          <SplitContent image="/images/kosmo/kitchen.jpg" eyebrow="Our Services" title={`Why Choose ${space.title}?`} description={space.description} features={space.features} cta={{ label: "Request a Quote", href: "/kosmo/consultation" }} />
        </div>
      </section>

      {space.solutions.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="container-kosmo">
            <SectionHeading title="Related Services" subtitle="Explore our other capabilities." />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {space.solutions.map((solution) => (<SolutionCard key={solution.title} {...solution} />))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading title="Ready to Get Started?" subtitle="Request a free project quote today." />
          <div className="max-w-4xl mx-auto"><ConsultationForm /></div>
        </div>
      </section>
    </>
  );
}
