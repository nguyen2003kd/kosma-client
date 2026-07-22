import { PageHero, SectionHeading, ConsultationForm } from "@/components/kosmo/ui";

export default function ConsultationPage() {
  return (
    <>
      <PageHero
        title="Book Your Free Design Consultation"
        subtitle="Take the first step toward your dream space."
        breadcrumbs={[
          { label: "Home", href: "/kosmo/home" },
          { label: "Book Consultation" },
        ]}
        backgroundImage="/images/kosmo/kitchen.jpg"
      />

      <section className="py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading
            eyebrow="Get Started"
            title="Schedule Your Free Consultation"
            subtitle="Fill out the form below and we'll be in touch within 24 hours."
          />
          <div className="max-w-4xl mx-auto">
            <ConsultationForm />
          </div>
        </div>
      </section>

      <section className="py-24 bg-green-50">
        <div className="container-kosmo">
          <SectionHeading title="What to Expect" subtitle="Here's what happens after you submit your consultation request." />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "We Contact You", description: "Within 24 hours, our team will reach out." },
              { step: "2", title: "Schedule Visit", description: "We'll work with your schedule." },
              { step: "3", title: "Design Meeting", description: "Our designer will visit your home." },
              { step: "4", title: "Get Your Quote", description: "Receive a detailed quote." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-green-800 text-white font-serif text-xl flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-serif text-[20px] text-ink mb-2">{item.title}</h3>
                <p className="text-[14px] text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
