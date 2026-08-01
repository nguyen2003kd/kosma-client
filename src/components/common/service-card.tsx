import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import { ArrowRight, Calendar, ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
  date?: string;
  imageAlt?: string;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  descriptionColor?: string;
  linkColor?: string;
}

export default function ServiceCard({
  image,
  title,
  description,
  link,
  date,
  imageAlt = title,
  className,
  backgroundColor = "#346293",
  textColor = "white",
  descriptionColor = "rgb(209 213 219 / 0.9)",
  linkColor = "white",
}: ServiceCardProps) {
  const hasImage = image && image.trim() !== "";

  return (
    <Card
      className={cn(
        "border-none overflow-hidden hover:shadow-xl transition-shadow rounded-xl flex flex-col h-full",
        className,
      )}
      style={className?.includes("bg-") ? {} : { backgroundColor }}
    >
      <div className="relative w-full overflow-hidden h-40">
        {hasImage ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition-transform hover:scale-105 duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex flex-col items-center justify-center">
            <ImageOff
              className="w-12 h-12 text-gray-400 mb-2"
              strokeWidth={1.5}
            />
            <p className="text-gray-400 font-medium text-sm">
              Không có hình ảnh
            </p>
          </div>
        )}
      </div>

      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle
          className="text-base font-bold leading-tight line-clamp-2"
          style={{ color: textColor }}
        >
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-3 px-4 flex-1">
        <CardDescription
          className="text-sm leading-relaxed line-clamp-2"
          style={{ color: descriptionColor }}
        >
          {parse(description)}
        </CardDescription>
      </CardContent>

      <CardFooter className="pb-4 px-4 flex items-center justify-between mt-auto border-t border-white/10 pt-3">
        {date && (
          <div
            className="flex items-center gap-2 text-sm"
            style={{ color: descriptionColor }}
          >
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
        )}
        <Button
          asChild
          variant="ghost"
          className="hover:bg-transparent p-0 h-auto font-normal text-sm ml-auto"
        >
          <Link
            href={link}
            className="inline-flex items-center gap-2"
            style={{ color: linkColor }}
          >
            Xem chi tiết
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
