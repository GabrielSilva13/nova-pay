"use client";

import { useTheme } from "@/lib/styles/theme-provider";
import { cn } from "@/lib/utils/cn";

export type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      data-slot="theme-toggle"
      data-theme={theme}
      type="button"
      onClick={toggleTheme}
      className={cn(
        "h-9 px-3 rounded-[var(--radius)] border border-[color:var(--color-muted)]",
        "text-sm text-[color:var(--color-primary)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface)]",
        className,
      )}
      aria-label="Alternar tema"
    >
      Tema: {theme === "dark" ? "Escuro" : "Claro"}
    </button>
  );
}
