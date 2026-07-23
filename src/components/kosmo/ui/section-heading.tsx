import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8 sm:mb-10 px-2",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p className="text-eyebrow text-black-700 font-extrabold uppercase tracking-[0.18em] mb-2 sm:mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-[28px] sm:text-[36px] md:text-h1 text-ink">{title}</h2>
      {subtitle && (
        <p className="mt-3 sm:mt-4 text-[14px] sm:text-base md:text-[17px] text-gray-700 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  backgroundImage?: string;
  className?: string;
}

export function PageHero({
  title,
  subtitle,
  breadcrumbs,
  backgroundImage,
  className,
}: PageHeroProps) {
  return (
    <div
      className={cn(
        "relative min-h-[340px] sm:min-h-[420px] md:min-h-[520px] flex items-end py-14 sm:py-20 md:py-[92px]",
        className
      )}
      style={{
        backgroundImage: backgroundImage
          ? `linear-gradient(90deg, rgba(0,0,0,.9), rgba(0,0,0,.35) 65%, rgba(0,0,0,.12)), url(${backgroundImage})`
          : undefined,
        backgroundColor: backgroundImage ? undefined : "#0b2f27",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container-kosmo w-full">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold text-white/90 mb-3 sm:mb-4 flex-wrap">
            {breadcrumbs.map((item, index) => (
              <span key={index} className="flex items-center gap-2">
                {index > 0 && <span className="text-white/70">/</span>}
                {item.href ? (
                  <a
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="text-white">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <h1 className="font-serif text-[28px] sm:text-[36px] md:text-[44px] lg:text-h1 text-white max-w-[700px] leading-tight">{title}</h1>
        {subtitle && (
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/80 max-w-[570px]">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
