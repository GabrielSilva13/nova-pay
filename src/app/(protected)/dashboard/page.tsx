import { BalanceCard } from "@/features/dashboard/components/balance-card";
import { TransactionList } from "@/features/dashboard/components/transaction-list";

export default function Page() {
  return (
    <main
      className="mx-auto max-w-5xl p-6 space-y-6"
      data-slot="dashboard-page"
    >
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-[color:var(--color-primary)]">
          Dashboard
        </h1>
        <p className="text-sm text-[color:var(--color-muted)]">
          Saldo e histórico de transações com filtros.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <BalanceCard className="md:col-span-1" />
        <div className="md:col-span-2">
          <TransactionList />
        </div>
      </div>
    </main>
  );
}
