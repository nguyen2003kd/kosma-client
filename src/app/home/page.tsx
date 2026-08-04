import { Hero, StatsStrip, QuoteSection, SpaceCard, ProcessCard, SolutionCard, SectionHeading, SplitContent, ConsultationForm, FeatureRow } from "@/components/common";

const services = [
  { title: "Interior Design", description: "Concept design, 3D rendering, and material selection for residential and commercial spaces.", image: "/images/living.jpg", href: "/spaces/closets" },
  { title: "Commercial Fit-Out", description: "Full design and construction for nail salons, retail, and light commercial spaces.", image: "/images/showroom.jpg", href: "/spaces/garages" },
  { title: "Residential Renovation", description: "Kitchen, bathroom, and whole-home renovations from concept to completion.", image: "/images/office.jpg", href: "/spaces/home-offices" },
  { title: "Custom Joinery", description: "Bespoke cabinetry, built-ins, and custom woodwork crafted to your specs.", image: "/images/kitchen.jpg", href: "/spaces/pantries" },
  { title: "Construction Drawings", description: "Building permit drawings and construction documents for code compliance.", image: "/images/lounge.jpg", href: "/spaces/laundry-rooms" },
  { title: "Branding", description: "Website design, product labels, business cards, and brand identity.", image: "/images/exterior.jpg", href: "/spaces/mudrooms" },
];

const solutions = [
  {
    id: "design",
    title: "Design",
    description: "Interior design, space planning, and 3D renderings for residential and commercial projects.",
    image: "/images/living.jpg",
    href: "/solutions/design",
  },
  {
    id: "construction",
    title: "Construction",
    description: "Design-build construction combining licensed trades crews with modern technology.",
    image: "/images/lounge.jpg",
    href: "/solutions/construction",
  },
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
        ctaSecondary={{ label: "View Solutions", href: "/solutions" }}
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
          <SectionHeading eyebrow="Our Solutions" title="Design & Construction" subtitle="From concept to completion — we handle every aspect of your project." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
            {solutions.map((s) => (<SolutionCard key={s.id} {...s} />))}
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
