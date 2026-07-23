import { PageHero, SectionHeading, SplitContent, SpaceCard, ConsultationForm } from "@/components/kosmo/ui";

const solutionsData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  features: { title: string; description: string }[];
  spaces: { title: string; description: string; image: string; href: string }[];
}> = {
  "walk-in-closets": {
    title: "Nail Salon Design & Construction", subtitle: "Specialized design-build for nail salons across MD & Northern VA.",
    description: "From concept design to construction drawings to custom joinery and branding — we handle your entire nail salon project under one roof.",
    features: [
      { title: "Concept to Completion", description: "Full design-build service for nail salons." },
      { title: "Custom Joinery", description: "Bespoke salon cabinetry and displays." },
      { title: "Branding Included", description: "Website, business cards, and brand identity." },
    ],
    spaces: [
      { title: "Interior Design", description: "Our design services", image: "/images/kosmo/living.jpg", href: "/kosmo/spaces/closets" },
    ],
  },
  "reach-in-closets": {
    title: "Kitchen Renovation", subtitle: "Custom kitchen renovations from concept to completion.",
    description: "Transform your kitchen with our design-build renovation services including custom joinery, flooring, plumbing, lighting and painting.",
    features: [
      { title: "Custom Cabinetry", description: "Bespoke kitchen cabinetry and countertops." },
      { title: "Full Service", description: "Flooring, plumbing, lighting, and painting." },
    ],
    spaces: [
      { title: "Residential Renovation", description: "Our renovation services", image: "/images/kosmo/lounge.jpg", href: "/kosmo/spaces/home-offices" },
    ],
  },
  "garage-cabinets": {
    title: "Commercial Fit-Out", subtitle: "Full design and construction for commercial spaces.",
    description: "We handle commercial fit-outs for nail salons, retail stores, and light commercial spaces across Maryland and Northern Virginia.",
    features: [
      { title: "Design-Build", description: "One team for design and construction." },
      { title: "Permit Handling", description: "Building permits and code compliance." },
    ],
    spaces: [
      { title: "Commercial Fit-Out", description: "Our commercial services", image: "/images/kosmo/showroom.jpg", href: "/kosmo/spaces/garages" },
    ],
  },
  "wall-beds": {
    title: "Residential Renovation", subtitle: "Whole-home and room-by-room renovations.",
    description: "From kitchens to bathrooms to whole-home renovations, we handle every aspect of your residential project.",
    features: [
      { title: "Kitchen & Bath", description: "Custom kitchen and bathroom renovations." },
      { title: "Whole-Home", description: "Complete home renovation services." },
    ],
    spaces: [
      { title: "Residential Renovation", description: "Our renovation services", image: "/images/kosmo/living.jpg", href: "/kosmo/spaces/home-offices" },
    ],
  },
  "entertainment-centers": {
    title: "Custom Joinery", subtitle: "Bespoke cabinetry and custom woodwork.",
    description: "Our skilled craftsmen create custom joinery that elevates every space — from salon cabinetry to kitchen built-ins.",
    features: [
      { title: "Custom Cabinetry", description: "Bespoke cabinets for any room." },
      { title: "Built-Ins", description: "Custom built-in shelving and storage." },
    ],
    spaces: [
      { title: "Custom Joinery", description: "Our joinery services", image: "/images/kosmo/office.jpg", href: "/kosmo/spaces/pantries" },
    ],
  },
  "custom-accessories": {
    title: "Branding & Website", subtitle: "Website design, brand identity, and marketing collateral.",
    description: "Complete your project with our branding services — website design, product labels, business cards, and brand identity.",
    features: [
      { title: "Website Design", description: "Custom websites for your business." },
      { title: "Brand Identity", description: "Logos, business cards, and product labels." },
    ],
    spaces: [
      { title: "Branding", description: "Our branding services", image: "/images/kosmo/kitchen.jpg", href: "/kosmo/spaces/mudrooms" },
    ],
  },
};

export default function SolutionPage({ params }: { params: { slug: string } }) {
  const solution = solutionsData[params.slug];

  if (!solution) {
    return (
      <>
        <PageHero title="Solution Not Found" breadcrumbs={[{ label: "Home", href: "/kosmo/home" }]} />
        <div className="py-24 text-center"><p className="text-muted">This solution is not available yet.</p></div>
      </>
    );
  }

  return (
    <>
      <PageHero title={solution.title} subtitle={solution.subtitle} breadcrumbs={[{ label: "Home", href: "/kosmo/home" }, { label: solution.title }]} backgroundImage="/images/kosmo/showroom.jpg" />

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <SplitContent image="/images/kosmo/office.jpg" eyebrow="Our Services" title={`Why Choose ${solution.title}?`} description={solution.description} features={solution.features} cta={{ label: "Request a Quote", href: "/kosmo/consultation" }} />
        </div>
      </section>

      {solution.spaces.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
          <div className="container-kosmo">
            <SectionHeading title="Related Services" subtitle="Explore our other capabilities." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {solution.spaces.map((space) => (<SpaceCard key={space.title} {...space} />))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container-kosmo">
          <SectionHeading title="Ready to Get Started?" subtitle="Request a free project quote today." />
          <div className="max-w-4xl mx-auto"><ConsultationForm /></div>
        </div>
      </section>
    </>
  );
}
