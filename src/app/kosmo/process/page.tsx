import { PageHero, SectionHeading, ProcessCard, ConsultationForm } from "@/components/kosmo/ui";

const processSteps = [
  { number: 1, title: "Concept Design", description: "We develop the design concept and 3D renderings for your space." },
  { number: 2, title: "Construction Drawings", description: "Permit documents, construction drawings, and material selection." },
  { number: 3, title: "Construction", description: "Construction, joinery, and installation by our skilled team." },
  { number: 4, title: "Custom Joinery", description: "Bespoke cabinetry and woodwork crafted to your specifications." },
  { number: 5, title: "Branding", description: "Website, product labels, business cards, and brand identity." },
  { number: 6, title: "Project Handover", description: "Final walkthrough and handover of the completed project." },
];

const benefits = [
  { title: "Design-Build Under One Roof", description: "From concept to construction to branding — all by one team." },
  { title: "3D Renderings", description: "Visualize your space before construction begins." },
  { title: "Licensed & Insured", description: "Licensed MD #113826 with full insurance coverage." },
  { title: "Custom Joinery", description: "Bespoke cabinetry and woodwork crafted to your specs." },
  { title: "Serving MD & Northern VA", description: "Rockville, Annapolis, Bel Air, McLean, Dumfries." },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        title="Our Process"
        subtitle="From concept design to construction and branding — we make your project seamless."
        breadcrumbs={[
          { label: "Home", href: "/kosmo/home" },
          { label: "Process" },
        ]}
        backgroundImage="/images/kosmo/office.jpg"
      />

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading eyebrow="How It Works" title="A Seamless Experience" subtitle="Our proven process ensures a stress-free journey." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {processSteps.map((step) => (
              <ProcessCard key={step.number} number={step.number} title={step.title} description={step.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container-kosmo">
          <SectionHeading eyebrow="Why Kosmo DNC" title="The Kosmo DNC Difference" subtitle="What sets us apart from the competition." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="p-5 sm:p-6 rounded-[--radius-md] bg-white shadow-soft">
                <h3 className="font-serif text-[20px] sm:text-[22px] text-ink mb-2">{benefit.title}</h3>
                <p className="text-[13px] sm:text-[14px] text-gray-700 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading eyebrow="Get Started" title="Ready to Begin?" subtitle="Request a free project quote today." />
          <div className="max-w-4xl mx-auto">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </>
  );
}
