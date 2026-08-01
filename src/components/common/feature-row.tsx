interface FeatureItem {
  title: string;
  description: string;
}

interface FeatureRowProps {
  features: FeatureItem[];
}

export function FeatureRow({ features }: FeatureRowProps) {
  return (
    <div className="divide-y divide-mutedLine">
      {features.map((feature, index) => (
        <div key={index} className="flex items-start gap-4 sm:gap-5 py-5 sm:py-6 first:pt-0 last:pb-0">
          <span className="font-serif text-[20px] sm:text-[24px] text-[#d8c29c] flex-shrink-0 w-8 sm:w-10 text-right">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-serif text-[20px] sm:text-[24px] md:text-[26px] text-ink mb-1 sm:mb-2 leading-tight">
              {feature.title}
            </h3>
            <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-700 leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
