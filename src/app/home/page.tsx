import { Hero, StatsStrip, QuoteSection, SpaceCard, ProcessCard, SolutionCard, SectionHeading, SplitContent, ConsultationForm, FeatureRow } from "@/components/common";

const services = [
  { title: "Interior Design", description: "Concept design, 3D rendering, and material selection for residential and commercial spaces.", image: "/images/living.jpg", href: "/spaces/closets" },
  { title: "Commercial Fit-Out", description: "Full design and construction for nail salons, retail, and light commercial spaces.", image: "/images/showroom.jpg", href: "/spaces/garages" },
  { title: "Residential Renovation", description: "Kitchen, bathroom, and whole-home renovations from concept to completion.", image: "/images/office.jpg", href: "/spaces/home-offices" },
  { title: "Custom Joinery", description: "Bespoke cabinetry, built-ins, and custom woodwork crafted to your specs.", image: "/images/kitchen.jpg", href: "/spaces/pantries" },
  { title: "Construction Drawings", description: "Building permit drawings and construction documents for code compliance.", image: "/images/lounge.jpg", href: "/spaces/laundry-rooms" },
  { title: "Branding", description: "Website design, product labels, business cards, and brand identity.", image: "/images/exterior.jpg", href: "/spaces/mudrooms" },
];

const projects = [
  { title: "Kosmo Nail Bar — Rockville", description: "1,770 sqft nail salon design & build at Montrose Crossing.", image: "/images/living.jpg", href: "/gallery" },
  { title: "Kosmo Nail Bar — Dumfries", description: "1,898 sqft full design, construction, joinery & branding.", image: "/images/lounge.jpg", href: "/gallery" },
  { title: "Kosmo Nail Bar — Annapolis", description: "1,150 sqft commercial fit-out completed in 2015.", image: "/images/showroom.jpg", href: "/gallery" },
  { title: "Kitchen Renovation — Annapolis", description: "160 sqft residential kitchen renovation with custom joinery.", image: "/images/living.jpg", href: "/gallery" },
  { title: "Lux Nail Spa — Bel Air", description: "1,350 sqft nail salon renovation in Bel Air, MD.", image: "/images/office.jpg", href: "/gallery" },
  { title: "Kosmo Nail Bar — McLean", description: "1,350 sqft interior design & construction in McLean, VA.", image: "/images/kitchen.jpg", href: "/gallery" },
];

const process = [
  { number: 1, title: "Concept", description: "We develop the design concept and 3D renderings for your space." },
  { number: 2, title: "Design", description: "Construction drawings, permit documents, and material selection." },
  { number: 3, title: "Build", description: "Construction, joinery, and installation by our skilled team." },
  { number: 4, title: "Brand", description: "Branding, website, and marketing collateral to complete the project." },
];

const whyChooseUs = [
  { title: "Design-Build Under One Roof", description: "From concept to construction to branding — all handled by a single team." },
  { title: "3D Renderings", description: "Visualize your space with realistic 3D design presentations before construction begins." },
  { title: "Licensed & Insured", description: "Licensed MD #113826 with full insurance coverage for your peace of mind." },
  { title: "Custom Joinery", description: "Bespoke cabinetry and woodwork crafted to your exact specifications." },
];

const stats = [
  { number: "10+", label: "Years Experience" },
  { number: "50+", label: "Projects Completed" },
  { number: "100%", label: "Satisfaction Guarantee" },
  { number: "MD #113826", label: "Licensed Contractor" },
];

export default function KosmoHomePage() {
  return (
    <>
      <Hero
        title="Interior Design, Construction & Branding—All in One Place"
        subtitle="Kosmo DNC provides interior design, commercial fit-outs, residential renovations, and branding in Maryland and Northern Virginia."
        backgroundImage="/images/hero.jpg"
        ctaPrimary={{ label: "Get a Quote", href: "/consultation" }}
        ctaSecondary={{ label: "View Projects", href: "/gallery" }}
        offer="Free Project Consultation"
      />

      <StatsStrip stats={stats} />

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading eyebrow="Our Services" title="What We Do" subtitle="From concept design to construction and branding — we handle every aspect of your project." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (<SpaceCard key={service.title} {...service} />))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading eyebrow="Our Projects" title="Recent Work" subtitle="Explore commercial and residential projects across Maryland and Northern Virginia." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {projects.map((project) => (<SolutionCard key={project.title} {...project} />))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container-kosmo">
          <SectionHeading eyebrow="Our Process" title="How It Works" subtitle="From concept to completion, we make it seamless." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {process.map((item) => (<ProcessCard key={item.number} {...item} />))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading eyebrow="Why Choose Kosmo DNC" title="The Kosmo DNC Difference" subtitle="What sets us apart from the competition." />
          <div className="max-w-3xl mx-auto px-2">
            <FeatureRow features={whyChooseUs} />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container-kosmo">
          <SplitContent
            image="/images/exterior.jpg"
            eyebrow="About Kosmo DNC"
            title="Design. Build. Brand."
            description="Kosmo DNC is a design-build contractor based in Rockville, Maryland. We specialize in interior design, commercial fit-outs, residential renovations, custom joinery, and branding for businesses across Maryland and Northern Virginia."
            features={[
              { title: "Licensed MD #113826", description: "Fully licensed and insured contractor." },
              { title: "Design-Build Approach", description: "One team handles design, construction, and branding." },
              { title: "Serving MD & Northern VA", description: "Rockville, Annapolis, Bel Air, McLean, Dumfries." },
            ]}
            cta={{ label: "Learn More About Us", href: "/about" }}
          />
        </div>
      </section>

      <QuoteSection quote="Kosmo DNC handled everything from concept design to construction and branding for our nail salon. The result exceeded our expectations." author="Nail Salon Owner" title="Rockville, MD" />

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading eyebrow="Get Started" title="Ready to Start Your Project?" subtitle="Request a free project quote today." />
          <div className="max-w-4xl mx-auto"><ConsultationForm /></div>
        </div>
      </section>
    </>
  );
}
