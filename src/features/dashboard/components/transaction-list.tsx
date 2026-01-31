"use client";

import * as React from "react";
import { EmptyState } from "@/components/common/empty-state";
import { Select } from "@/components/ui/select";
import {
  applyTransactionFilters,
  type TransactionFilters,
} from "@/features/dashboard/filters";
import { useTransactions } from "@/features/dashboard/hooks/use-transactions";
import { getErrorMessage } from "@/lib/api/error";
import { cn } from "@/lib/utils/cn";
import { formatBrl, formatDateTime } from "@/lib/utils/format";
import { TransactionListSkeleton } from "./transaction-list-skeleton";

export type TransactionListProps = {
  className?: string;
};

const typeItems = [
  { value: "all", label: "Todas" },
  { value: "credit", label: "Entradas" },
  { value: "debit", label: "Saídas" },
] as const;

const sortItems = [
  { value: "date_desc", label: "Mais recentes" },
  { value: "date_asc", label: "Mais antigas" },
] as const;

const pageSizeItems = [
  { value: "5", label: "5 por página" },
  { value: "10", label: "10 por página" },
  { value: "20", label: "20 por página" },
];

export function TransactionList({ className }: TransactionListProps) {
  const { data, isPending, isError, error, refetch } = useTransactions();

  const [filters, setFilters] = React.useState<TransactionFilters>({
    query: "",
    type: "all",
    dateFrom: undefined,
    dateTo: undefined,
    sort: "date_desc",
    page: 1,
    pageSize: 10,
  });

  // reset page quando mudar filtros principais
  function patchFilters(patch: Partial<Omit<TransactionFilters, "page">>) {
    setFilters((prev) => ({ ...prev, ...patch, page: 1 }));
  }

  const list = data ?? [];
  const result = React.useMemo(
    () => applyTransactionFilters(list, filters),
    [list, filters],
  );

  return (
    <section
      data-slot="transaction-list"
      className={cn(
        "rounded-[var(--radius)] bg-[color:var(--color-surface)] p-4 border border-[color:var(--color-muted)]",
        className,
      )}
    >
      <header className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-[color:var(--color-primary)]">
            Transações
          </h2>
          <p className="text-sm text-[color:var(--color-muted)]">
            Filtre por texto, tipo e período.
          </p>
        </div>
      </header>

      {/* Filtros */}
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <label className="md:col-span-2 text-sm">
          <span className="sr-only">Buscar</span>
          <input
            data-slot="transaction-filter-query"
            className={cn(
              "h-10 w-full rounded-[var(--radius)] px-3",
              "bg-[color:var(--color-surface)] text-[color:var(--color-primary)]",
              "border border-[color:var(--color-muted)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface)]",
            )}
            placeholder="Buscar por favorecido ou descrição…"
            value={filters.query}
            onChange={(e) => patchFilters({ query: e.target.value })}
            aria-label="Buscar transações"
          />
        </label>

        <Select
          ariaLabel="Filtrar por tipo"
          items={
            typeItems as unknown as Array<{
              value: TransactionFilters["type"];
              label: string;
            }>
          }
          value={filters.type}
          onValueChange={(v) => patchFilters({ type: v })}
          className="w-full"
        />

        <Select
          ariaLabel="Ordenar"
          items={
            sortItems as unknown as Array<{
              value: TransactionFilters["sort"];
              label: string;
            }>
          }
          value={filters.sort}
          onValueChange={(v) => patchFilters({ sort: v })}
          className="w-full"
        />

        <label className="text-sm">
          <span className="sr-only">Data inicial</span>
          <input
            data-slot="transaction-filter-date-from"
            type="date"
            className={cn(
              "h-10 w-full rounded-[var(--radius)] px-3",
              "bg-[color:var(--color-surface)] text-[color:var(--color-primary)]",
              "border border-[color:var(--color-muted)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface)]",
            )}
            value={filters.dateFrom ?? ""}
            onChange={(e) =>
              patchFilters({
                dateFrom: e.target.value.length ? e.target.value : undefined,
              })
            }
            aria-label="Data inicial"
          />
        </label>

        <label className="text-sm">
          <span className="sr-only">Data final</span>
          <input
            data-slot="transaction-filter-date-to"
            type="date"
            className={cn(
              "h-10 w-full rounded-[var(--radius)] px-3",
              "bg-[color:var(--color-surface)] text-[color:var(--color-primary)]",
              "border border-[color:var(--color-muted)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface)]",
            )}
            value={filters.dateTo ?? ""}
            onChange={(e) =>
              patchFilters({
                dateTo: e.target.value.length ? e.target.value : undefined,
              })
            }
            aria-label="Data final"
          />
        </label>

        <Select
          ariaLabel="Itens por página"
          items={
            pageSizeItems as unknown as Array<{
              value: "5" | "10" | "20";
              label: string;
            }>
          }
          value={String(filters.pageSize) as "5" | "10" | "20"}
          onValueChange={(v) => patchFilters({ pageSize: Number(v) })}
          className="w-full"
        />
      </div>

      {/* Conteúdo */}
      <div className="mt-4">
        {isPending ? (
          <TransactionListSkeleton className={className} />
        ) : isError ? (
          <EmptyState
            title="Falha ao carregar transações"
            description={getErrorMessage(error)}
            action={
              <button
                type="button"
                className="text-sm underline text-[color:var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)]"
                onClick={() => refetch()}
              >
                Tentar novamente
              </button>
            }
            className={className}
          />
        ) : result.total === 0 ? (
          <EmptyState
            title="Nenhuma transação encontrada"
            description="Ajuste os filtros ou o período."
            className={className}
          />
        ) : (
          <>
            <p className="text-xs text-[color:var(--color-muted)]">
              {result.total} resultado(s)
            </p>

            <ul className="mt-2 divide-y divide-[color:var(--color-muted)]">
              {result.items.map((t) => (
                <li
                  key={t.id}
                  data-slot="transaction-row"
                  data-type={t.type}
                  className="py-3 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[color:var(--color-primary)]">
                      {t.recipient}
                    </p>
                    <p className="truncate text-xs text-[color:var(--color-muted)]">
                      {t.description} • {formatDateTime(t.createdAt)}
                    </p>
                  </div>

                  <p className="text-sm font-semibold tabular-nums text-[color:var(--color-primary)]">
                    {t.type === "credit" ? "+" : "-"}
                    {formatBrl(t.amount)}
                  </p>
                </li>
              ))}
            </ul>

            {/* Paginação */}
            <div className="mt-4 flex items-center justify-between gap-2">
              <button
                data-slot="transaction-page-prev"
                type="button"
                className={cn(
                  "h-9 px-3 rounded-[var(--radius)]",
                  "border border-[color:var(--color-muted)]",
                  "text-sm text-[color:var(--color-primary)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface)]",
                  "disabled:opacity-50 disabled:pointer-events-none",
                )}
                onClick={() =>
                  setFilters((p) => ({ ...p, page: Math.max(1, p.page - 1) }))
                }
                disabled={filters.page <= 1}
              >
                Anterior
              </button>

              <p className="text-sm text-[color:var(--color-muted)]">
                Página {Math.min(filters.page, result.totalPages)} de{" "}
                {result.totalPages}
              </p>

              <button
                data-slot="transaction-page-next"
                type="button"
                className={cn(
                  "h-9 px-3 rounded-[var(--radius)]",
                  "border border-[color:var(--color-muted)]",
                  "text-sm text-[color:var(--color-primary)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface)]",
                  "disabled:opacity-50 disabled:pointer-events-none",
                )}
                onClick={() =>
                  setFilters((p) => ({
                    ...p,
                    page: Math.min(result.totalPages, p.page + 1),
                  }))
                }
                disabled={filters.page >= result.totalPages}
              >
                Próxima
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
