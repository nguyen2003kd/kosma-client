import { PageHero, SectionHeading, ConsultationForm } from "@/components/common";

export default function ConsultationPage() {
  return (
    <>
      <PageHero
        title="Request a Project Quote"
        subtitle="Take the first step toward your design-build project."
        breadcrumbs={[
          { label: "Home", href: "/home" },
          { label: "Get a Quote" },
        ]}
        backgroundImage="/images/kitchen.jpg"
      />

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading
            eyebrow="Get Started"
            title="Request Your Free Project Quote"
            subtitle="Fill out the form below and we'll be in touch within 24 hours."
          />
          <div className="max-w-4xl mx-auto">
            <ConsultationForm />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container-kosmo">
          <SectionHeading title="What to Expect" subtitle="Here's what happens after you submit your consultation request." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {[
              { step: "1", title: "We Contact You", description: "Within 24 hours, our team will reach out." },
              { step: "2", title: "Site Visit", description: "We'll schedule a visit to assess your space." },
              { step: "3", title: "Design Proposal", description: "We present concept design and 3D renderings." },
              { step: "4", title: "Get Your Quote", description: "Receive a detailed project estimate." },
            ].map((item) => (
              <div key={item.step} className="text-center px-1 sm:px-2">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-black-800 text-white font-serif text-lg sm:text-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  {item.step}
                </div>
                <h3 className="font-serif text-[16px] sm:text-[20px] text-ink mb-2 leading-tight">{item.title}</h3>
                <p className="text-[12px] sm:text-[14px] text-gray-700 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
