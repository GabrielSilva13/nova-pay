export type ApiErrorCode = "NETWORK" | "VALIDATION" | "INSUFFICIENT_FUNDS";

export type ApiErrorLike = {
  code?: ApiErrorCode;
  message?: string;
};

export function getErrorCode(error: unknown): ApiErrorCode | null {
  if (typeof error !== "object" || error === null) return null;
  const e = error as ApiErrorLike;

  if (
    e.code === "NETWORK" ||
    e.code === "VALIDATION" ||
    e.code === "INSUFFICIENT_FUNDS"
  ) {
    return e.code;
  }

  return null;
}

export function getErrorMessage(error: unknown): string {
  const code = getErrorCode(error);

  if (code === "NETWORK") return "Falha de rede. Tente novamente.";
  if (code === "VALIDATION")
    return "Dados inválidos. Verifique os campos e tente novamente.";
  if (code === "INSUFFICIENT_FUNDS")
    return "Saldo insuficiente para esta transferência.";

  if (error instanceof Error && error.message.trim().length > 0)
    return error.message;

  return "Erro inesperado. Tente novamente.";
}
