"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // TODO: logar em um serviço (em app real)
    console.error(error);
  }, [error]);

  return (
    <main
      className="mx-auto max-w-3xl p-6 space-y-4"
      data-slot="global-error-page"
    >
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-[color:var(--color-primary)]">
          Algo deu errado
        </h1>
        <p className="text-sm text-[color:var(--color-muted)]">
          Ocorreu um erro inesperado. Você pode tentar novamente.
        </p>
      </header>

      <div className="rounded-[var(--radius)] border border-[color:var(--color-muted)] p-4 bg-[color:var(--color-surface)]">
        <p
          className="text-sm text-[color:var(--color-destructive)]"
          data-slot="error-message"
        >
          {error.message}
        </p>

        <button
          type="button"
          data-slot="error-retry"
          onClick={reset}
          className={cn(
            "mt-3 h-10 px-3 inline-flex items-center rounded-[var(--radius)] font-medium text-sm",
            "bg-[color:var(--color-primary)] text-[color:var(--color-surface)] hover:opacity-90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface)]",
          )}
        >
          Tentar novamente
        </button>
      </div>
    </main>
  );
}
