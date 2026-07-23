import { PageHero, SectionHeading, ConsultationForm } from "@/components/kosmo/ui";
import Link from "next/link";

const posts = [
  { title: "Nail Salon Design: From Concept to Completion", excerpt: "A step-by-step guide to designing and building a nail salon.", date: "January 15, 2024", category: "Commercial Design", image: "/images/kosmo/living.jpg", slug: "nail-salon-design-guide" },
  { title: "Kitchen Renovation Trends in Maryland", excerpt: "Popular kitchen design trends for Maryland homeowners.", date: "January 10, 2024", category: "Residential Renovation", image: "/images/kosmo/lounge.jpg", slug: "kitchen-renovation-trends" },
  { title: "Commercial Fit-Out: What to Expect", excerpt: "Understanding the commercial fit-out process.", date: "January 5, 2024", category: "Commercial Construction", image: "/images/kosmo/office.jpg", slug: "commercial-fit-out-guide" },
  { title: "Custom Joinery for Nail Salons", excerpt: "How custom cabinetry elevates salon interiors.", date: "December 28, 2023", category: "Custom Joinery", image: "/images/kosmo/showroom.jpg", slug: "custom-joinery-salons" },
  { title: "Building Permit Drawings in Maryland", excerpt: "What you need to know about permit drawings.", date: "December 20, 2023", category: "Construction", image: "/images/kosmo/kitchen.jpg", slug: "building-permit-drawings" },
  { title: "Branding for Nail Salons", excerpt: "Website, business cards, and brand identity tips.", date: "December 15, 2023", category: "Branding", image: "/images/kosmo/exterior.jpg", slug: "salon-branding-tips" },
];

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Our Blog"
        subtitle="Tips, trends, and insights on interior design, construction and branding."
        breadcrumbs={[
          { label: "Home", href: "/kosmo/home" },
          { label: "Blog" },
        ]}
        backgroundImage="/images/kosmo/lounge.jpg"
      />

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading title="Latest Articles" subtitle="Explore our collection of design, construction and branding insights." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/kosmo/blog/${post.slug}`} className="group block rounded-[--radius-md] overflow-hidden bg-white hover:shadow-soft transition-shadow">
                <div className="aspect-[16/10] overflow-hidden">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${post.image})` }} />
                </div>
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-2 sm:mb-3 flex-wrap">
                    <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.12em] text-black-800">{post.category}</span>
                    <span className="text-[10px] sm:text-[11px] text-gray-600">{post.date}</span>
                  </div>
                  <h3 className="font-serif text-[20px] sm:text-[24px] md:text-[27px] text-ink mb-2 line-clamp-2 leading-tight">{post.title}</h3>
                  <p className="text-[13px] sm:text-[14px] text-gray-700 line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container-kosmo">
          <SectionHeading title="Need Personal Help?" subtitle="Our design experts are here to help with your project." />
          <div className="max-w-4xl mx-auto">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </>
  );
}
