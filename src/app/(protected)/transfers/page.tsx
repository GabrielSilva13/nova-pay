import { TransferForm } from "@/features/transfers/components/transfer-form";

export default function Page() {
  return (
    <main
      className="mx-auto max-w-3xl p-6 space-y-6"
      data-slot="transfers-page"
    >
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-[color:var(--color-primary)]">
          Transferências
        </h1>
        <p className="text-sm text-[color:var(--color-muted)]">
          Nova transferência com validação e saldo.
        </p>
      </header>

      <TransferForm />
    </main>
  );
}
