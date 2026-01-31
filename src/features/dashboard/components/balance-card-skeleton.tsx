import { Skeleton } from "@/components/common/skeleton";
import { cn } from "@/lib/utils/cn";

export type BalanceCardSkeletonProps = { className?: string };

export function BalanceCardSkeleton({ className }: BalanceCardSkeletonProps) {
  return (
    <section
      data-slot="balance-card-skeleton"
      className={cn(
        "rounded-[var(--radius)] bg-[color:var(--color-surface)] p-4 border border-[color:var(--color-muted)]",
        className,
      )}
    >
      <Skeleton className="h-4 w-16" />
      <Skeleton className="mt-3 h-8 w-48" />
      <Skeleton className="mt-2 h-4 w-32" />
    </section>
  );
}
