import { Hero, StatsStrip, QuoteSection } from "@/components/kosmo/ui";
import { SpaceCard, ProcessCard, SolutionCard, SectionHeading, SplitContent, ConsultationForm } from "@/components/kosmo/ui";

const spaces = [
  { title: "Closets", description: "Custom closet systems designed to maximize your storage.", image: "/images/kosmo/living.jpg", href: "/kosmo/spaces/closets" },
  { title: "Garages", description: "Organize your garage with custom cabinets.", image: "/images/kosmo/showroom.jpg", href: "/kosmo/spaces/garages" },
  { title: "Home Offices", description: "Create a productive workspace tailored to you.", image: "/images/kosmo/office.jpg", href: "/kosmo/spaces/home-offices" },
  { title: "Pantries", description: "Transform your pantry into an organized space.", image: "/images/kosmo/kitchen.jpg", href: "/kosmo/spaces/pantries" },
];

const solutions = [
  { title: "Walk-In Closets", description: "Luxurious walk-in closet designs.", image: "/images/kosmo/living.jpg", href: "/kosmo/solutions/walk-in-closets" },
  { title: "Reach-In Closets", description: "Smart organization solutions.", image: "/images/kosmo/lounge.jpg", href: "/kosmo/solutions/reach-in-closets" },
  { title: "Garage Cabinets", description: "Durable and stylish garage cabinets.", image: "/images/kosmo/showroom.jpg", href: "/kosmo/solutions/garage-cabinets" },
];

const process = [
  { number: 1, title: "Design", description: "Our designers create a personalized 3D rendering." },
  { number: 2, title: "Personalize", description: "Choose from premium materials and finishes." },
  { number: 3, title: "Craft", description: "Your solution is manufactured to exact specs." },
  { number: 4, title: "Install", description: "Our professionals ensure flawless execution." },
];

const stats = [
  { number: "25+", label: "Years Experience" },
  { number: "50K+", label: "Projects Completed" },
  { number: "100%", label: "Satisfaction Guarantee" },
  { number: "50+", label: "Design Awards" },
];

export default function KosmoHomePage() {
  return (
    <>
      <Hero
        title="Custom Storage Solutions for Every Space"
        subtitle="Transform your home with beautifully organized spaces designed around your lifestyle."
        backgroundImage="/images/kosmo/hero.jpg"
        ctaPrimary={{ label: "Book Consultation", href: "/kosmo/consultation" }}
        ctaSecondary={{ label: "View Gallery", href: "/kosmo/gallery" }}
        offer="Free Design Consultation"
      />

      <StatsStrip stats={stats} />

      <section className="py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading eyebrow="Explore Our Spaces" title="Find Inspiration for Every Room" subtitle="Discover custom storage solutions for every area of your home." />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {spaces.map((space) => (<SpaceCard key={space.title} {...space} />))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-green-50">
        <div className="container-kosmo">
          <SectionHeading eyebrow="Our Process" title="How It Works" subtitle="From concept to completion, we make it seamless." />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map((item) => (<ProcessCard key={item.number} {...item} />))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading eyebrow="Our Solutions" title="Tailored to Your Needs" subtitle="Explore our range of custom storage solutions." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution) => (<SolutionCard key={solution.title} {...solution} />))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-green-50">
        <div className="container-kosmo">
          <SplitContent
            image="/images/kosmo/exterior.jpg"
            eyebrow="About Kosmo"
            title="Crafting Beautiful Spaces Since 1998"
            description="We believe organized spaces lead to organized lives. Our team creates custom storage solutions that maximize functionality and enhance your home."
            features={[
              { title: "Free Consultations", description: "Complimentary in-home design consultation." },
              { title: "3D Rendering", description: "Visualize your space before we begin." },
              { title: "Quality Guaranteed", description: "Every project comes with our guarantee." },
            ]}
            cta={{ label: "Learn More About Us", href: "/kosmo/about" }}
          />
        </div>
      </section>

      <QuoteSection quote="Kosmo transformed our chaotic closet into a stunning, organized space. The process was seamless from start to finish." author="Sarah M." title="Homeowner, Charlotte NC" />

      <section className="py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading eyebrow="Get Started" title="Ready to Transform Your Space?" subtitle="Schedule your free design consultation today." />
          <div className="max-w-4xl mx-auto"><ConsultationForm /></div>
        </div>
      </section>
    </>
  );
}
