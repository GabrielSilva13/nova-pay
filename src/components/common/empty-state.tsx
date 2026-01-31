import { cn } from "@/lib/utils/cn";

export type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "rounded-[var(--radius)] border border-[color:var(--color-muted)] p-4",
        "bg-[color:var(--color-surface)]",
        className,
      )}
    >
      <p className="text-sm font-medium text-[color:var(--color-primary)]">
        {title}
      </p>
      {description ? (
        <p className="mt-1 text-sm text-[color:var(--color-muted)]">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  );
}
