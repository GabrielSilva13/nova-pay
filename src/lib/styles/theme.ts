export type Theme = "light" | "dark";

const STORAGE_KEY = "bank-demo:theme";

export function readStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "light" || v === "dark" ? v : null;
}

export function writeStoredTheme(theme: Theme) {
  window.localStorage.setItem(STORAGE_KEY, theme);
}

export function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function resolveInitialTheme(): Theme {
  return readStoredTheme() ?? getSystemTheme();
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
}
