import { PageHero, SectionHeading, ConsultationForm } from "@/components/kosmo/ui";
import Link from "next/link";

const posts = [
  { title: "6 Steps to Your Dream Closet", excerpt: "Transform your closet with these essential tips.", date: "January 15, 2024", category: "Closet Organization", image: "/images/kosmo/living.jpg", slug: "six-steps-to-dream-closet" },
  { title: "Seasonal Wardrobe Reset Guide", excerpt: "Get your wardrobe ready for the new season.", date: "January 10, 2024", category: "Organization Tips", image: "/images/kosmo/lounge.jpg", slug: "seasonal-wardrobe-reset" },
  { title: "Maximizing Small Spaces", excerpt: "Small room? No problem!", date: "January 5, 2024", category: "Small Spaces", image: "/images/kosmo/office.jpg", slug: "small-room-big-storage" },
  { title: "Garage Organization Ideas", excerpt: "Transform your garage from chaotic to organized.", date: "December 28, 2023", category: "Garage", image: "/images/kosmo/showroom.jpg", slug: "garage-organization" },
  { title: "Home Office Design Trends", excerpt: "Create the perfect workspace.", date: "December 20, 2023", category: "Home Office", image: "/images/kosmo/kitchen.jpg", slug: "home-office-trends" },
  { title: "Pantry Organization Essentials", excerpt: "Everything you need to know about pantry organization.", date: "December 15, 2023", category: "Pantry", image: "/images/kosmo/exterior.jpg", slug: "pantry-organization" },
];

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Our Blog"
        subtitle="Tips, trends, and inspiration for your custom storage solutions."
        breadcrumbs={[
          { label: "Home", href: "/kosmo/home" },
          { label: "Blog" },
        ]}
        backgroundImage="/images/kosmo/lounge.jpg"
      />

      <section className="py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading title="Latest Articles" subtitle="Explore our collection of design tips and organization ideas." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/kosmo/blog/${post.slug}`} className="group block rounded-[--radius-md] overflow-hidden bg-white hover:shadow-soft transition-shadow">
                <div className="aspect-[16/10] overflow-hidden">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${post.image})` }} />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-green-800">{post.category}</span>
                    <span className="text-[11px] text-gray-600">{post.date}</span>
                  </div>
                  <h3 className="font-serif text-[27px] text-ink mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-[14px] text-gray-700 line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-green-50">
        <div className="container-kosmo">
          <SectionHeading title="Need Personal Help?" subtitle="Our design experts are here to help you." />
          <div className="max-w-4xl mx-auto">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </>
  );
}
