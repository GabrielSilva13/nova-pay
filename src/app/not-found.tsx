import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export default function NotFound() {
  return (
    <main
      className="mx-auto max-w-3xl p-6 space-y-4"
      data-slot="not-found-page"
    >
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-[color:var(--color-primary)]">
          Página não encontrada
        </h1>
        <p className="text-sm text-[color:var(--color-muted)]">
          O endereço pode estar errado ou a página foi movida.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        <Link
          href="/"
          data-slot="not-found-home"
          className={cn(
            "h-10 px-3 inline-flex items-center rounded-[var(--radius)] font-medium text-sm",
            "bg-[color:var(--color-primary)] text-[color:var(--color-surface)] hover:opacity-90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface)]",
          )}
        >
          Ir para início
        </Link>

        <Link
          href="/dashboard"
          data-slot="not-found-dashboard"
          className={cn(
            "h-10 px-3 inline-flex items-center rounded-[var(--radius)] text-sm",
            "border border-[color:var(--color-muted)] text-[color:var(--color-primary)]",
            "hover:bg-[color:var(--color-muted)]/10",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface)]",
          )}
        >
          Dashboard
        </Link>
      </div>
    </main>
  );
}
