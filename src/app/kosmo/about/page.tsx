import { PageHero, SectionHeading, SplitContent, QuoteSection, ConsultationForm } from "@/components/kosmo/ui";

const timeline = [
  { year: "1998", title: "Founded", description: "Kosmo was founded with a vision to transform how people organize their homes." },
  { year: "2005", title: "Expansion", description: "Expanded to multiple locations across the country." },
  { year: "2015", title: "Innovation", description: "Introduced 3D design technology for personalized consultations." },
  { year: "2024", title: "Growth", description: "Now serving thousands of happy customers nationwide." },
];

const values = [
  { title: "Quality Craftsmanship", description: "Every project is built with attention to detail and premium materials." },
  { title: "Customer Focus", description: "Your vision and satisfaction are at the center of everything we do." },
  { title: "Innovation", description: "We continuously improve our processes and designs." },
  { title: "Integrity", description: "Honest pricing and transparent communication." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Kosmo"
        subtitle="Transforming homes with custom storage solutions since 1998."
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
            title="Crafting Beautiful Spaces for Over 25 Years"
            description="At Kosmo, we believe that an organized space leads to an organized life. Since 1998, we've been helping homeowners transform their living spaces with custom storage solutions that combine functionality with beautiful design."
            features={[
              { title: "25+ Years Experience", description: "Decades of expertise in custom storage solutions." },
              { title: "50,000+ Projects", description: "Successfully completed installations across the country." },
              { title: "100% Satisfaction", description: "Our guarantee ensures your complete happiness." },
            ]}
          />
        </div>
      </section>

      <section className="py-24 bg-green-50">
        <div className="container-kosmo">
          <SectionHeading eyebrow="Our Journey" title="Milestones That Define Us" />
          <div className="max-w-[900px] mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-7 py-6 border-b border-line last:border-0">
                <div className="w-[100px] flex-shrink-0">
                  <div className="w-[100px] h-[100px] rounded-full bg-green-800 flex items-center justify-center">
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
        quote="The team at Kosmo exceeded all our expectations. Their attention to detail and commitment to quality is unmatched in the industry."
        author="Michael R."
        title="Homeowner, Dallas TX"
      />

      <section className="py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading eyebrow="Get Started" title="Ready to Transform Your Space?" />
          <div className="max-w-4xl mx-auto">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </>
  );
}
