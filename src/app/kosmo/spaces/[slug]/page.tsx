import { PageHero, SectionHeading, SplitContent, SolutionCard, ConsultationForm } from "@/components/kosmo/ui";

const spacesData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  features: { title: string; description: string }[];
  solutions: { title: string; description: string; image: string; href: string }[];
}> = {
  closets: {
    title: "Custom Closets", subtitle: "Beautifully organized closets designed around your lifestyle.",
    description: "Transform your closet into a luxurious, organized retreat.",
    features: [
      { title: "Custom Design", description: "Tailored to your specific needs." },
      { title: "Premium Materials", description: "High-quality materials." },
      { title: "Smart Storage", description: "Innovative solutions." },
    ],
    solutions: [
      { title: "Walk-In Closets", description: "Luxurious walk-in designs", image: "/images/kosmo/living.jpg", href: "/kosmo/solutions/walk-in-closets" },
      { title: "Reach-In Closets", description: "Smart organization", image: "/images/kosmo/lounge.jpg", href: "/kosmo/solutions/reach-in-closets" },
    ],
  },
  garages: {
    title: "Garage Storage", subtitle: "Organize your garage with custom cabinet solutions.",
    description: "Reclaim your garage with our custom storage solutions.",
    features: [
      { title: "Durable Cabinets", description: "Built to withstand heavy use." },
      { title: "Modular Systems", description: "Flexible configurations." },
    ],
    solutions: [
      { title: "Garage Cabinets", description: "Sleek storage cabinets", image: "/images/kosmo/showroom.jpg", href: "/kosmo/solutions/garage-cabinets" },
    ],
  },
  "home-offices": {
    title: "Home Offices", subtitle: "Create a productive workspace tailored to you.",
    description: "Design the perfect home office with custom solutions.",
    features: [
      { title: "Ergonomic Design", description: "Workspaces for comfort." },
      { title: "Cable Management", description: "Keep cords organized." },
    ],
    solutions: [],
  },
  pantries: {
    title: "Pantry Organization", subtitle: "Transform your pantry into an organized oasis.",
    description: "Say goodbye to cluttered pantries.",
    features: [
      { title: "Adjustable Shelving", description: "Customize shelf heights." },
      { title: "Pull-Out Systems", description: "Easy access." },
    ],
    solutions: [],
  },
  "laundry-rooms": {
    title: "Laundry Rooms", subtitle: "Make laundry day more efficient.",
    description: "Transform your laundry room into a functional space.",
    features: [
      { title: "Custom Cabinetry", description: "Beautiful storage." },
      { title: "Fold Stations", description: "Dedicated spaces." },
    ],
    solutions: [],
  },
  mudrooms: {
    title: "Mudrooms", subtitle: "Create an organized entryway.",
    description: "Make the most of your entryway.",
    features: [
      { title: "Built-In Lockers", description: "Individual storage." },
      { title: "Bench Seating", description: "Comfortable spots." },
    ],
    solutions: [],
  },
};

export default function SpacePage({ params }: { params: { slug: string } }) {
  const space = spacesData[params.slug];

  if (!space) {
    return (
      <>
        <PageHero title="Space Not Found" breadcrumbs={[{ label: "Home", href: "/kosmo/home" }]} />
        <div className="py-24 text-center"><p className="text-muted">This space is not available yet.</p></div>
      </>
    );
  }

  return (
    <>
      <PageHero title={space.title} subtitle={space.subtitle} breadcrumbs={[{ label: "Home", href: "/kosmo/home" }, { label: space.title }]} backgroundImage="/images/kosmo/living.jpg" />

      <section className="py-24 bg-white">
        <div className="container-kosmo">
          <SplitContent image="/images/kosmo/kitchen.jpg" eyebrow="Custom Solutions" title={`Why Choose ${space.title}?`} description={space.description} features={space.features} cta={{ label: "Get a Free Quote", href: "/kosmo/consultation" }} />
        </div>
      </section>

      {space.solutions.length > 0 && (
        <section className="py-24 bg-green-50">
          <div className="container-kosmo">
            <SectionHeading title="Related Solutions" subtitle="Explore our custom options." />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {space.solutions.map((solution) => (<SolutionCard key={solution.title} {...solution} />))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading title="Ready to Get Started?" subtitle="Schedule your free design consultation today." />
          <div className="max-w-4xl mx-auto"><ConsultationForm /></div>
        </div>
      </section>
    </>
  );
}
