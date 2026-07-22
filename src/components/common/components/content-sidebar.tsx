import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ContentItem {
  id?: string | number;
  title?: string;
  slug?: string;
  link?: string;
}

interface ContentSidebarProps {
  title: string;
  items: ContentItem[];
  className?: string;
  titleClassName?: string;
  maxHeight?: string;
}

export default function ContentSidebar({
  title,
  items,
  className,
  titleClassName,
  maxHeight,
}: ContentSidebarProps) {
  return (
    <Card
      className={cn(
        "border border-gray-900/15",
        maxHeight ? "flex flex-col" : "",
        className
      )}
      style={maxHeight ? { height: maxHeight } : undefined}
    >
      <CardHeader className="pb-4 flex-shrink-0">
        <CardTitle className={cn("text-2xl font-bold", titleClassName)}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 min-h-0 overflow-hidden">
        {maxHeight ? (
          <ScrollArea className="h-full">
            <div className="px-6 pb-4">
              {items.map((item, index) => {
                const href =
                  item.link || (item.slug ? `/news/${item.slug}` : "#");
                const displayTitle = item.title || "";
                return (
                  <div key={item.id || index}>
                    <Link
                      href={href}
                      className="block py-4 hover:text-blue-300 transition-colors group"
                    >
                      <p className="text-sm font-medium group-hover:text-blue-300 leading-relaxed">
                        {displayTitle}
                      </p>
                    </Link>
                    {index < items.length - 1 && (
                      <Separator className="bg-gray-700" />
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        ) : (
          <div className="px-6 pb-4">
            {items.map((item, index) => {
              const href =
                item.link || (item.slug ? `/news/${item.slug}` : "#");
              const displayTitle = item.title || "";
              return (
                <div key={item.id || index}>
                  <Link
                    href={href}
                    className="block py-4 hover:text-blue-300 transition-colors group"
                  >
                    <p className="text-sm font-medium group-hover:text-blue-300 leading-relaxed">
                      {displayTitle}
                    </p>
                  </Link>
                  {index < items.length - 1 && (
                    <Separator className="bg-gray-700" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
