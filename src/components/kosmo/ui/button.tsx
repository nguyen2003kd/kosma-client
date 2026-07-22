import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-extrabold text-[14px] transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-800 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-green-800 text-white hover:bg-green-950 hover:-translate-y-0.5 shadow-button",
        secondary:
          "bg-white text-green-950 hover:bg-green-50 hover:-translate-y-0.5",
        outline:
          "border border-green-800 text-green-900 bg-transparent hover:bg-green-800 hover:text-white",
        ghost: "text-green-800 hover:bg-green-50",
        link: "text-green-800 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 min-h-[48px]",
        sm: "h-10 px-4 text-[13px]",
        lg: "h-14 px-8 text-[15px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

// Text button variant (no background, arrow icon)
export function TextButton({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 text-green-800 font-extrabold text-[14px] hover:gap-3 transition-all",
        className
      )}
      {...props}
    >
      {children}
      <span className="transition-transform">→</span>
    </button>
  );
}
