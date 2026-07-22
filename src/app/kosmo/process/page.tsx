import { PageHero, SectionHeading, ProcessCard, ConsultationForm } from "@/components/kosmo/ui";

const processSteps = [
  { number: 1, title: "Design Consultation", description: "Meet with one of our expert designers in your home." },
  { number: 2, title: "3D Visualization", description: "We create a detailed 3D rendering of your space." },
  { number: 3, title: "Material Selection", description: "Choose from our wide range of materials and finishes." },
  { number: 4, title: "Precise Manufacturing", description: "Your custom solution is manufactured to exact specifications." },
  { number: 5, title: "Professional Installation", description: "Our certified installers complete the installation efficiently." },
  { number: 6, title: "Follow-Up Support", description: "We follow up to ensure everything meets your expectations." },
];

const benefits = [
  { title: "Free In-Home Consultation", description: "We come to you to understand your needs." },
  { title: "Detailed 3D Renderings", description: "See your space before we begin." },
  { title: "Transparent Pricing", description: "No hidden fees or surprise charges." },
  { title: "Professional Installation", description: "Certified installers with years of experience." },
  { title: "Satisfaction Guarantee", description: "We're not done until you're happy." },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        title="Our Process"
        subtitle="From concept to completion, we make creating your dream space seamless and enjoyable."
        breadcrumbs={[
          { label: "Home", href: "/kosmo/home" },
          { label: "Process" },
        ]}
        backgroundImage="/images/kosmo/office.jpg"
      />

      <section className="py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading eyebrow="How It Works" title="A Seamless Experience" subtitle="Our proven process ensures a stress-free journey." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step) => (
              <ProcessCard key={step.number} number={step.number} title={step.title} description={step.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-green-50">
        <div className="container-kosmo">
          <SectionHeading eyebrow="Why Kosmo" title="The Kosmo Difference" subtitle="What sets us apart from the competition." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="p-6 rounded-[--radius-md] bg-white shadow-soft">
                <h3 className="font-serif text-[22px] text-ink mb-2">{benefit.title}</h3>
                <p className="text-[14px] text-gray-700">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading eyebrow="Get Started" title="Ready to Begin?" subtitle="Schedule your free design consultation today." />
          <div className="max-w-4xl mx-auto">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </>
  );
}
