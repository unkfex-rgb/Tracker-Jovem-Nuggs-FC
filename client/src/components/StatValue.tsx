import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/utils";

interface StatValueProps {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}

/**
 * StatValue — renders a large number with CountUp animation.
 * Uses Space Grotesk (font-display) for the premium dashboard look.
 */
export function StatValue({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  className,
  duration = 1500,
}: StatValueProps) {
  const animated = useCountUp({ end: value, decimals, duration });
  return (
    <span
      className={cn("font-display tabular-nums tracking-tight", className)}
      aria-label={`${prefix}${value}${suffix}`}
    >
      {prefix}
      {animated.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
