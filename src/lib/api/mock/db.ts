import type { Transaction } from "@/features/dashboard/types";

type MockDb = {
  balance: number;
  transactions: Array<Transaction>;
};

export const db: MockDb = {
  balance: 12500.55,
  transactions: [
    {
      id: "t1",
      type: "credit",
      amount: 2500,
      recipient: "Salário",
      description: "Empresa ACME",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    },
    {
      id: "t2",
      type: "debit",
      amount: 180.9,
      recipient: "Supermercado",
      description: "Compras do mês",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    },
  ],
};
