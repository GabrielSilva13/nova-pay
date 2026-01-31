"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@/components/ui/text-field";
import { useBalance } from "@/features/dashboard/hooks/use-balance";
import { useCreateTransfer } from "@/features/transfers/hooks/use-create-transfer";
import {
  type TransferFormValues,
  transferSchema,
} from "@/features/transfers/schemas";
import { getErrorMessage } from "@/lib/api/error";
import { cn } from "@/lib/utils/cn";

export type TransferFormProps = {
  className?: string;
};

export function TransferForm({ className }: TransferFormProps) {
  const balanceQuery = useBalance();
  const mutation = useCreateTransfer();

  const [feedback, setFeedback] = React.useState<null | {
    type: "ok" | "error";
    message: string;
  }>(null);

  const form = useForm<TransferFormValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: { recipient: "", amount: 0, description: "" },
    mode: "onSubmit",
  });

  async function onSubmit(values: TransferFormValues) {
    setFeedback(null);

    const currentBalance = balanceQuery.data?.amount;

    // Checagem de saldo "sem falhas": bloqueia antes do mutate
    if (typeof currentBalance === "number" && values.amount > currentBalance) {
      setFeedback({
        type: "error",
        message: "Saldo insuficiente para esta transferência.",
      });
      return;
    }

    try {
      await mutation.mutateAsync({
        recipient: values.recipient,
        amount: values.amount,
        description: values.description,
      });

      setFeedback({
        type: "ok",
        message: "Transferência realizada com sucesso.",
      });
      form.reset({ recipient: "", amount: 0, description: "" });
    } catch (err) {
      setFeedback({ type: "error", message: getErrorMessage(err) });
    }
  }

  const isBlocked = mutation.isPending || balanceQuery.isPending;

  return (
    <section
      data-slot="transfer-form"
      className={cn(
        "rounded-[var(--radius)] bg-[color:var(--color-surface)] p-4 border border-[color:var(--color-muted)]",
        className,
      )}
    >
      <header className="space-y-1">
        <h2 className="text-base font-semibold text-[color:var(--color-primary)]">
          Nova transferência
        </h2>
        <p className="text-sm text-[color:var(--color-muted)]">
          Validação robusta e checagem de saldo.
        </p>
      </header>

      {balanceQuery.isError ? (
        <p
          className="mt-3 text-sm text-[color:var(--color-destructive)]"
          data-state="balance-error"
        >
          Não foi possível carregar o saldo. Tente novamente.
        </p>
      ) : null}

      <form className="mt-4 space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <TextField
          label="Destinatário"
          error={form.formState.errors.recipient?.message}
          inputProps={{
            id: "recipient",
            disabled: isBlocked,
            ...form.register("recipient"),
          }}
        />

        <TextField
          label="Valor"
          error={form.formState.errors.amount?.message}
          inputProps={{
            id: "amount",
            type: "number",
            inputMode: "decimal",
            step: "0.01",
            disabled: isBlocked,
            ...form.register("amount", { valueAsNumber: true }),
          }}
        />

        <TextField
          label="Descrição (opcional)"
          error={form.formState.errors.description?.message}
          inputProps={{
            id: "description",
            disabled: isBlocked,
            ...form.register("description"),
          }}
        />

        {feedback ? (
          <output
            data-slot="feedback"
            data-state={feedback.type}
            className={cn(
              "text-sm",
              feedback.type === "ok"
                ? "text-[color:var(--color-secondary)]"
                : "text-[color:var(--color-destructive)]",
            )}
          >
            {feedback.message}
          </output>
        ) : null}

        <button
          data-slot="submit"
          type="submit"
          className={cn(
            "h-10 w-full rounded-[var(--radius)] px-3 font-medium",
            "bg-[color:var(--color-primary)] text-[color:var(--color-surface)] hover:opacity-90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface)]",
            "disabled:opacity-50 disabled:pointer-events-none",
          )}
          disabled={isBlocked}
        >
          {mutation.isPending ? "Enviando…" : "Transferir"}
        </button>
      </form>
    </section>
  );
}
