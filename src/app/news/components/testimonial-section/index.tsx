"use client";

import VideoTestimonialCard from "@/components/common/components/video-testimonial-card";

export default function TestimonialSection() {
  const handlePlayClick = () => {};

  return (
    <section className="bg-white py-16">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="mx-4 md:mx-8 lg:mx-10">
          <VideoTestimonialCard
            image="/images/service-1.png"
            imageAlt="SMEQ Testimonial Video"
            quote="HT 175 2018."
            channelName="Câu chuyện kinh doanh HTV9"
            subscriberCount="7,09 N người đăng ký"
            rating={5}
            onPlayClick={handlePlayClick}
          />
        </div>
      </div>
    </section>
  );
}
