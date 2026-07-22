import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

interface DocumentCardProps {
  category: string;
  date: string;
  title: string;
  description?: string;
  link: string;
  className?: string;
  fullHeight?: boolean;
}

export default function DocumentCard({
  category,
  date,
  title,
  description,
  link,
  className,
  fullHeight = false,
}: DocumentCardProps) {
  return (
    <Card
      className={cn(
        "bg-gradient-to-br from-blue-50 via-white to-cyan-50 border border-gray-900/15 overflow-hidden hover:shadow-lg transition-shadow rounded-lg flex flex-col",
        className
      )}
    >
      <CardHeader className="pb-3 pt-4 px-5">
        <div className="flex items-center gap-3 mb-2">
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-700 border border-blue-200/50 hover:bg-blue-500/20 text-xs font-semibold"
          >
            {category}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Calendar className="w-3.5 h-3.5" />
            <span>{date}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4 px-5 flex flex-col flex-1">
        <h3
          className={cn(
            "text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors",
            fullHeight ? "leading-relaxed" : "line-clamp-2 leading-snug",
          )}
        >
          {title}
        </h3>
        {description && (
          <div className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
            {parse(description)}
          </div>
        )}
        <Button
          asChild
          variant="ghost"
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto font-semibold text-sm mt-auto self-start group/btn"
        >
          <Link href={link} className="inline-flex items-center gap-2">
            Xem thêm
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
