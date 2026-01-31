"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { cn } from "@/lib/utils/cn";

type NavItem = {
  href: "/dashboard" | "/transfers";
  label: string;
};

const nav: Array<NavItem> = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/transfers", label: "Novas transferência" },
];

export type AppHeaderProps = {
  className?: string;
};

export function AppHeader({ className }: AppHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  function onLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <header
      data-slot="app-header"
      className={cn(
        "border-b border-[color:var(--color-muted)] bg-[color:var(--color-surface)]",
        className,
      )}
    >
      <div className="mx-auto max-w-5xl px-6 py-3 flex items-center justify-between gap-3">
        <nav
          aria-label="Navegação principal"
          className="flex items-center gap-2"
        >
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-slot="nav-link"
                data-active={active ? "true" : "false"}
                className={cn(
                  "h-9 px-3 inline-flex items-center rounded-[var(--radius)] text-sm",
                  "border border-[color:var(--color-muted)]",
                  "text-[color:var(--color-primary)]",
                  active
                    ? "bg-[color:var(--color-muted)]/20"
                    : "hover:bg-[color:var(--color-muted)]/10",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface)]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            data-slot="logout"
            type="button"
            onClick={onLogout}
            className={cn(
              "h-9 px-3 rounded-[var(--radius)]",
              "border border-[color:var(--color-muted)]",
              "text-sm text-[color:var(--color-primary)]",
              "hover:bg-[color:var(--color-muted)]/10",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface)]",
            )}
            aria-label="Sair"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
