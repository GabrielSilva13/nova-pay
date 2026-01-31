"use client";

import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { cn } from "@/lib/utils/cn";

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/dashboard";

  const [name, setName] = React.useState("Gabriel");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    login(name.trim() || "Usuário");
    router.replace(next);
  }

  return (
    <section
      data-slot="login-form"
      className={cn(
        "rounded-[var(--radius)] border border-[color:var(--color-muted)]",
        "bg-[color:var(--color-surface)] p-4 space-y-4 w-full",
      )}
    >
      <header className="space-y-1">
        <h1 className="text-xl font-semibold text-[color:var(--color-primary)]">
          Entrar
        </h1>
        <p className="text-sm text-[color:var(--color-muted)]">
          Login fake para simular área autenticada.
        </p>
      </header>

      <form className="space-y-3" onSubmit={onSubmit}>
        <label className="block text-sm text-[color:var(--color-primary)]">
          Nome
          <input
            className={cn(
              "mt-1 h-10 w-full rounded-[var(--radius)] px-3",
              "bg-[color:var(--color-surface)] text-[color:var(--color-primary)]",
              "border border-[color:var(--color-muted)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface)]",
            )}
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Nome"
          />
        </label>

        <button
          className={cn(
            "h-10 w-full rounded-[var(--radius)] px-3 font-medium",
            "bg-[color:var(--color-primary)] text-[color:var(--color-surface)] hover:opacity-90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface)]",
          )}
          type="submit"
        >
          Entrar
        </button>
      </form>
    </section>
  );
}
