import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

interface VideoTestimonialCardProps {
  image: string;
  imageAlt?: string;
  quote: string;
  channelName: string;
  subscriberCount: string;
  rating?: number;
  onPlayClick?: () => void;
}

export default function VideoTestimonialCard({
  image,
  imageAlt = "Video thumbnail",
  quote,
  channelName,
  subscriberCount,
  rating = 5,
  onPlayClick,
}: VideoTestimonialCardProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="relative">
        <Card className="overflow-hidden rounded-2xl border-none shadow-lg">
          <div className="relative aspect-[4/3.5] w-full">
            <Image src={image} alt={imageAlt} fill className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                className="hover:scale-110 transition-transform cursor-pointer"
                onClick={onPlayClick}
              >
                <defs>
                  <mask id="playMask">
                    <circle cx="40" cy="40" r="40" fill="white" />
                    <polygon points="30,24 30,56 58,40" fill="black" />
                  </mask>
                </defs>
                <circle
                  cx="40"
                  cy="40"
                  r="40"
                  fill="white"
                  mask="url(#playMask)"
                  filter="drop-shadow(0 10px 15px rgba(0,0,0,0.3))"
                />
              </svg>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex gap-1 mb-6">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-8 h-8 fill-black text-black" />
          ))}
        </div>

        <blockquote className="mb-8">
          <p className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            &quot;{quote}&quot;
          </p>
        </blockquote>

        <div className="space-y-1">
          <p className="text-lg font-semibold text-gray-900">{channelName}</p>
          <p className="text-base text-gray-600">{subscriberCount}</p>
        </div>
      </div>
    </div>
  );
}
