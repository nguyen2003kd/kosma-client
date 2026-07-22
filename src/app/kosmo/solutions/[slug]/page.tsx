import { PageHero, SectionHeading, SplitContent, SpaceCard, ConsultationForm } from "@/components/kosmo/ui";

const solutionsData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  features: { title: string; description: string }[];
  spaces: { title: string; description: string; image: string; href: string }[];
}> = {
  "walk-in-closets": {
    title: "Walk-In Closets", subtitle: "Luxurious walk-in closet designs.",
    description: "Transform your closet into a luxurious retreat with our custom walk-in closet designs.",
    features: [
      { title: "Custom Layouts", description: "Designs tailored to your space." },
      { title: "Premium Materials", description: "High-quality materials." },
      { title: "Smart Storage", description: "Solutions for shoes, bags, jewelry." },
    ],
    spaces: [
      { title: "Closets", description: "Browse all closet options", image: "/images/kosmo/living.jpg", href: "/kosmo/spaces/closets" },
    ],
  },
  "reach-in-closets": {
    title: "Reach-In Closets", subtitle: "Smart organization for smaller spaces.",
    description: "Maximize every inch of your closet with our smart reach-in solutions.",
    features: [
      { title: "Space Optimization", description: "Creative solutions for small spaces." },
      { title: "Adjustable Shelving", description: "Flexibility to change." },
    ],
    spaces: [
      { title: "Closets", description: "Browse all closet options", image: "/images/kosmo/lounge.jpg", href: "/kosmo/spaces/closets" },
    ],
  },
  "garage-cabinets": {
    title: "Garage Cabinets", subtitle: "Durable storage for your garage.",
    description: "Transform your garage into an organized, functional space.",
    features: [
      { title: "Steel Construction", description: "Durable cabinets." },
      { title: "Lockable Storage", description: "Secure valuable items." },
    ],
    spaces: [
      { title: "Garages", description: "Browse garage solutions", image: "/images/kosmo/showroom.jpg", href: "/kosmo/spaces/garages" },
    ],
  },
  "wall-beds": {
    title: "Wall Beds", subtitle: "Multi-functional space saving solutions.",
    description: "Maximize your living space with our custom wall beds.",
    features: [
      { title: "Space Saving", description: "Free up floor space." },
      { title: "Easy Operation", description: "Smooth mechanisms." },
    ],
    spaces: [
      { title: "Garages", description: "Multi-functional spaces", image: "/images/kosmo/living.jpg", href: "/kosmo/spaces/garages" },
    ],
  },
  "entertainment-centers": {
    title: "Entertainment Centers", subtitle: "Custom media storage and display.",
    description: "Create the perfect entertainment setup with our custom media storage.",
    features: [
      { title: "Cable Management", description: "Hide cords." },
      { title: "Media Storage", description: "Organized space for media." },
    ],
    spaces: [
      { title: "Home Offices", description: "Media solutions", image: "/images/kosmo/office.jpg", href: "/kosmo/spaces/home-offices" },
    ],
  },
  "custom-accessories": {
    title: "Custom Accessories", subtitle: "Personalized add-ons for your space.",
    description: "Complete your custom storage solution with our range of accessories.",
    features: [
      { title: "Jewelry Drawers", description: "Velvet-lined storage." },
      { title: "Shoe Racks", description: "Organized footwear storage." },
    ],
    spaces: [
      { title: "Closets", description: "Accessorize your closet", image: "/images/kosmo/kitchen.jpg", href: "/kosmo/spaces/closets" },
    ],
  },
};

export default function SolutionPage({ params }: { params: { slug: string } }) {
  const solution = solutionsData[params.slug];

  if (!solution) {
    return (
      <>
        <PageHero title="Solution Not Found" breadcrumbs={[{ label: "Home", href: "/kosmo/home" }]} />
        <div className="py-24 text-center"><p className="text-muted">This solution is not available yet.</p></div>
      </>
    );
  }

  return (
    <>
      <PageHero title={solution.title} subtitle={solution.subtitle} breadcrumbs={[{ label: "Home", href: "/kosmo/home" }, { label: solution.title }]} backgroundImage="/images/kosmo/showroom.jpg" />

      <section className="py-24 bg-white">
        <div className="container-kosmo">
          <SplitContent image="/images/kosmo/office.jpg" eyebrow="Custom Solutions" title={`Why Choose ${solution.title}?`} description={solution.description} features={solution.features} cta={{ label: "Get a Free Quote", href: "/kosmo/consultation" }} />
        </div>
      </section>

      {solution.spaces.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container-kosmo">
            <SectionHeading title="Perfect For" subtitle="Spaces that work great with this solution." />
            <div className="grid md:grid-cols-2 gap-6">
              {solution.spaces.map((space) => (<SpaceCard key={space.title} {...space} />))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 bg-green-50">
        <div className="container-kosmo">
          <SectionHeading title="Ready to Get Started?" subtitle="Schedule your free design consultation today." />
          <div className="max-w-4xl mx-auto"><ConsultationForm /></div>
        </div>
      </section>
    </>
  );
}
