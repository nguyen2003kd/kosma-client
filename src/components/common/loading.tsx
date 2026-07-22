import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-gray-300 border-t-blue-600",
        sizeClasses[size],
        className
      )}
      aria-label="Loading"
    />
  );
}

interface LoadingProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Loading({
  text = "Loading...",
  size = "md",
  className,
}: LoadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        className
      )}
    >
      <LoadingSpinner size={size} />
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}

// Page loading skeleton
export function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loading text="Loading page..." size="lg" />
    </div>
  );
}

// Card skeleton - sử dụng Skeleton component
export function CardSkeleton() {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

// Grid Card skeleton - cho grid view
export function GridCardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100"
        >
          <Skeleton className="h-36 sm:h-40 w-full" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="pt-3 border-t flex justify-between items-center">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// List Card skeleton - cho list view
export function ListCardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 flex"
        >
          <Skeleton className="w-64 h-48 flex-shrink-0" />
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="pt-4 border-t flex justify-between items-center">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Sidebar skeleton
export function SidebarNewsSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      <div className="bg-[#1e40af] px-4 py-3 rounded-t-lg flex items-center justify-between">
        <Skeleton className="h-5 w-32 bg-blue-300/30" />
        <Skeleton className="h-5 w-5 rounded bg-blue-300/30" />
      </div>
      <div>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`flex gap-4 px-4 py-3 ${
              index !== 9 ? "border-b border-gray-100" : ""
            }`}
          >
            <Skeleton className="flex-shrink-0 h-9 w-9" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-2.5 bg-gray-50 text-center border-t border-gray-100">
        <Skeleton className="h-4 w-20 mx-auto" />
      </div>
    </div>
  );
}

// chỉ phần form gửi yêu cầu
export function RequestFormSkeleton() {
  return (
    <div className="rounded-xl p-5 shadow-lg border border-gray-200 bg-white">
      <div className="space-y-3">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

// Sidebar skeleton - cái này dùng cho service details
export function SidebarSkeleton() {
  return (
    <div className="sticky top-6 space-y-4">
      <SidebarNewsSkeleton />
      <RequestFormSkeleton />
    </div>
  );
}

// Category skeleton - Note: Requires CarouselItem wrapper from parent
export function CategorySkeleton({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="pl-2 md:pl-4 basis-auto flex-shrink-0">
          <div className="w-[110px] h-[100px] sm:w-[130px] sm:h-[115px] md:w-[150px] md:h-[130px] rounded-lg md:rounded-xl border-2 border-gray-200 bg-white p-2.5 md:p-3.5 flex flex-col items-center justify-center">
            <Skeleton className="w-9 h-9 md:w-11 md:h-11 rounded-lg md:rounded-xl mb-2 md:mb-2.5" />
            <Skeleton className="h-3 w-16 mb-1" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
      ))}
    </>
  );
}

// Table skeleton
export function TableSkeleton({
  rows = 5,
  columns = 4,
}: {
  rows?: number;
  columns?: number;
}) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 p-4 border-b">
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className="h-4" />
          ))}
        </div>
      </div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="p-4 border-b last:border-b-0">
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton key={colIndex} className="h-4" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
