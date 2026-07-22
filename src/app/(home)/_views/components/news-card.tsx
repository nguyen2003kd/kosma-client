import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  image: string;
  category: string;
  date: string;
  title: string;
  link: string;
  imageAlt?: string;
  className?: string;
}

export default function NewsCard({
  image,
  date,
  title,
  link,
  imageAlt = title,
  className,
}: NewsCardProps) {
  return (
    <Card
      className={cn(
        "bg-white border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow rounded-lg",
        className,
      )}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>

      <CardHeader className="pb-2 pt-4">
        <div className="flex items-center gap-3 mb-3">
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-700 hover:bg-blue-100"
          >
            Tin tức
          </Badge>

          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 leading-tight">
          {title}
        </h3>
      </CardContent>

      <CardFooter className="pt-0 pb-4">
        <Button
          asChild
          variant="ghost"
          className="text-blue-600 hover:text-blue-700 hover:bg-transparent p-0 h-auto font-normal text-sm"
        >
          <Link href={link} className="inline-flex items-center gap-2">
            Xem thêm
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
