import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const glassCardVariants = cva(
  "glass-card transition-all duration-200",
  {
    variants: {
      padding: {
        none: "",
        sm: "p-4",
        md: "p-5",
        lg: "p-6",
        xl: "p-8",
      },
      hover: {
        none: "",
        lift: "hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)]",
        glow: "hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]",
      },
    },
    defaultVariants: {
      padding: "md",
      hover: "glow",
    },
  }
);

export interface GlassCardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, padding, hover, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(glassCardVariants({ padding, hover }), className)}
        {...props}
      />
    );
  }
);

GlassCard.displayName = "GlassCard";
