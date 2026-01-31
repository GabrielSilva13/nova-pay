"use client";

import { EmptyState } from "@/components/common/empty-state";
import { useBalance } from "@/features/dashboard/hooks/use-balance";
import { getErrorMessage } from "@/lib/api/error";
import { cn } from "@/lib/utils/cn";
import { formatBrl } from "@/lib/utils/format";
import { BalanceCardSkeleton } from "./balance-card-skeleton";

export type BalanceCardProps = {
  className?: string;
};

export function BalanceCard({ className }: BalanceCardProps) {
  const { data, isPending, isError, refetch, error } = useBalance();

  return (
    <section
      data-slot="balance-card"
      className={cn(
        "rounded-[var(--radius)] bg-[color:var(--color-surface)] p-4 border border-[color:var(--color-muted)]",
        className,
      )}
    >
      <header className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-[color:var(--color-primary)]">
            Saldo
          </h2>
          <p className="text-sm text-[color:var(--color-muted)]">
            Disponível para transferência.
          </p>
        </div>

        {isError ? (
          <button
            type="button"
            data-slot="balance-retry"
            onClick={() => refetch()}
            className="text-sm underline text-[color:var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)]"
          >
            Tentar novamente
          </button>
        ) : null}
      </header>

      <div className="mt-3">
        {isPending ? (
          <BalanceCardSkeleton className={className} />
        ) : isError ? (
          <EmptyState
            title="Não foi possível carregar o saldo"
            description={getErrorMessage(error)}
            action={
              <button
                type="button"
                data-slot="balance-retry"
                onClick={() => refetch()}
                className="text-sm underline text-[color:var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)]"
              >
                Tentar novamente
              </button>
            }
            className={className}
          />
        ) : (
          <p
            data-state="ready"
            data-slot="balance-amount"
            className="text-2xl font-semibold tabular-nums text-(--color-primary)"
          >
            {formatBrl(data?.amount ?? 0)}
          </p>
        )}
      </div>
    </section>
  );
}
