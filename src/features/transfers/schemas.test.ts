import { describe, expect, it } from "vitest";
import { transferSchema } from "@/features/transfers/schemas";

describe("transferSchema", () => {
  it("aceita payload válido", () => {
    const parsed = transferSchema.safeParse({
      recipient: "João Silva",
      amount: 10.5,
      description: "Pix",
    });

    expect(parsed.success).toBe(true);
  });

  it("rejeita mais de 2 casas decimais", () => {
    const parsed = transferSchema.safeParse({
      recipient: "João Silva",
      amount: 1.999,
    });

    expect(parsed.success).toBe(false);
  });

  it("rejeita recipient muito curto", () => {
    const parsed = transferSchema.safeParse({
      recipient: "J",
      amount: 10,
    });

    expect(parsed.success).toBe(false);
  });

  it("normaliza description vazia para undefined", () => {
    const parsed = transferSchema.safeParse({
      recipient: "João Silva",
      amount: 10,
      description: "   ",
    });

    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.description).toBeUndefined();
    }
  });
});
