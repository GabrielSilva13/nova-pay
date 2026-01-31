import { Skeleton } from "@/components/common/skeleton";
import { cn } from "@/lib/utils/cn";

export type TransactionListSkeletonProps = { className?: string };

export function TransactionListSkeleton({
  className,
}: TransactionListSkeletonProps) {
  return (
    <section
      data-slot="transaction-list-skeleton"
      className={cn(
        "rounded-[var(--radius)] bg-[color:var(--color-surface)] p-4 border border-[color:var(--color-muted)]",
        className,
      )}
    >
      <Skeleton className="h-4 w-28" />
      <Skeleton className="mt-2 h-4 w-52" />

      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <Skeleton className="h-10 md:col-span-2" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10 md:col-span-2" />
      </div>

      <div className="mt-4 space-y-2">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </section>
  );
}
