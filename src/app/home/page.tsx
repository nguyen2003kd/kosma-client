import { Hero, StatsStrip, QuoteSection, SpaceCard, ProcessCard, SolutionCard, SectionHeading, SplitContent, ConsultationForm, FeatureRow } from "@/components/common";
import { services, solutions, process, stats, whyChooseUs } from "./constant";

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
            {services.map((service) => (
              <SpaceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading eyebrow="Our Solutions" title="Design & Construction" subtitle="From concept to completion — we handle every aspect of your project." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
            {solutions.map((s) => (
              <SolutionCard key={s.id} {...s} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container-kosmo">
          <SectionHeading eyebrow="Our Process" title="How It Works" subtitle="From concept to completion, we make it seamless." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {process.map((item) => (
              <ProcessCard key={item.number} {...item} />
            ))}
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
