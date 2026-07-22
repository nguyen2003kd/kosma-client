import VideoTestimonialCard from "@/components/common/components/video-testimonial-card";
import { useTranslation } from "react-i18next";

export default function Testimonial() {
  const { t } = useTranslation("pages/about");
  return (
    <section className="bg-white py-16">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="mx-4 md:mx-8 lg:mx-10">
          <VideoTestimonialCard
            image="/images/video-section-1.png"
            imageAlt="SMEQ - HT 175 2018"
            quote={t("testimonialQuote")}
            channelName={t("testimonialChannel")}
            subscriberCount={t("testimonialSubscribers")}
            rating={5}
          />
        </div>
      </div>
    </section>
  );
}
