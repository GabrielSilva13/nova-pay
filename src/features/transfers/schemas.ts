import { z } from "zod";
import { isTwoDecimalNumber } from "@/lib/utils/money";

export const transferSchema = z.object({
  recipient: z
    .string()
    .trim()
    .min(2, "Informe o favorecido.")
    .max(80, "Máximo de 80 caracteres."),
  amount: z
    .number({ error: "Informe um valor." })
    .positive("O valor deve ser maior que zero.")
    .refine((v) => isTwoDecimalNumber(v), "Use no máximo 2 casas decimais.")
    .refine(
      (v) => v <= 100_000,
      "Valor máximo por transferência: R$ 100.000,00.",
    ),
  description: z
    .string()
    .trim()
    .max(140, "Máximo de 140 caracteres.")
    .optional()
    .transform((v) => (v && v.length > 0 ? v : undefined)),
});

export type TransferFormValues = z.infer<typeof transferSchema>;
