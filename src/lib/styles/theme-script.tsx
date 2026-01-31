const THEME_KEY = "bank-demo:theme";

function themeScript() {
  // Não usar imports aqui — isso precisa ser string pura
  // eslint-disable-next-line no-var
  var stored = null;
  var prefersDark = false;
  try {
    stored = window.localStorage.getItem(THEME_KEY);
  } catch {}

  var theme = stored === "light" || stored === "dark" ? stored : null;

  if (!theme) {
    try {
      prefersDark = window?.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {}
    theme = prefersDark ? "dark" : "light";
  }

  document.documentElement.dataset.theme = theme;
}

export function ThemeScript() {
  // Executa antes de hidratar, reduzindo FOUC
  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: script necessário para inicializar tema antes da hidratação
      dangerouslySetInnerHTML={{ __html: `(${themeScript.toString()})()` }}
    />
  );
}
