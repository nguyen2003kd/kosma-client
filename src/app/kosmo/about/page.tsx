import { PageHero, SectionHeading, SplitContent, QuoteSection, ConsultationForm } from "@/components/kosmo/ui";

const timeline = [
  { year: "2015", title: "First Nail Salon", description: "Completed the first Kosmo Nail Bar project in Annapolis, MD." },
  { year: "2017", title: "Expansion to Virginia", description: "Expanded operations to serve Northern Virginia with the McLean project." },
  { year: "2020", title: "Rockville Flagship", description: "Completed the Kosmo Nail Bar at Montrose Crossing in Rockville, MD." },
  { year: "2024", title: "Continued Growth", description: "Completed the Dumfries, VA project and expanded branding services." },
];

const values = [
  { title: "Design-Build Expertise", description: "From concept to construction to branding — all under one roof." },
  { title: "Quality Craftsmanship", description: "Every project is built with attention to detail and premium materials." },
  { title: "Licensed & Insured", description: "Licensed MD #113826 with full insurance coverage." },
  { title: "Client-Focused", description: "Your vision and satisfaction are at the center of everything we do." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Kosmo DNC"
        subtitle="Interior design, construction & branding in Maryland and Northern Virginia."
        breadcrumbs={[
          { label: "Home", href: "/kosmo/home" },
          { label: "About" },
        ]}
        backgroundImage="/images/kosmo/exterior.jpg"
      />

      <section className="py-24 bg-white">
        <div className="container-kosmo">
          <SplitContent
            image="/images/kosmo/exterior.jpg"
            eyebrow="Our Story"
            title="Design. Build. Brand."
            description="Kosmo DNC is a design-build contractor based in Rockville, Maryland. We specialize in interior design, commercial fit-outs, residential renovations, custom joinery, and branding. From nail salon construction to kitchen renovations, we handle every aspect of your project under one roof."
            features={[
              { title: "Licensed MD #113826", description: "Fully licensed and insured contractor." },
              { title: "50+ Projects Completed", description: "Commercial and residential projects across MD & Northern VA." },
              { title: "Design-Build Approach", description: "One team handles design, construction, and branding." },
            ]}
          />
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container-kosmo">
          <SectionHeading eyebrow="Our Journey" title="Milestones That Define Us" />
          <div className="max-w-[900px] mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-7 py-6 border-b border-line last:border-0">
                <div className="w-[100px] flex-shrink-0">
                  <div className="w-[100px] h-[100px] rounded-full bg-black-800 flex items-center justify-center">
                    <span className="font-serif text-[22px] text-white">{item.year}</span>
                  </div>
                </div>
                <div className="pt-5">
                  <h3 className="font-serif text-[28px] text-ink mb-2">{item.title}</h3>
                  <p className="text-[15px] text-gray-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading eyebrow="What We Stand For" title="Our Values" subtitle="These core values guide everything we do." />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="p-7 rounded-[--radius-md] bg-white shadow-soft">
                <h3 className="font-serif text-[24px] text-ink mb-3">{value.title}</h3>
                <p className="text-[14px] text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuoteSection
        quote="Kosmo DNC handled everything from concept design to construction and branding for our nail salon. The result exceeded our expectations."
        author="Nail Salon Owner"
        title="Rockville, MD"
      />

      <section className="py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading eyebrow="Get Started" title="Ready to Start Your Project?" />
          <div className="max-w-4xl mx-auto">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </>
  );
}
