import { cn } from "@/lib/utils/cn";

export type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-[var(--radius)] bg-[color:var(--color-muted)]/20",
        className,
      )}
      aria-hidden="true"
    />
  );
}
