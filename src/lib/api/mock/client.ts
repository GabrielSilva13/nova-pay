import type { Transaction } from "@/features/dashboard/types";
import type { TransferInput, TransferResult } from "@/features/transfers/type";

import { db } from "@/lib/api/mock/db";

type Route = "/balance" | "/transactions" | "/transfers";

type MockConfig = {
  minDelayMs: number;
  maxDelayMs: number;
  failureRate: number; // 0..1
};

const config: MockConfig = {
  minDelayMs: 250,
  maxDelayMs: 900,
  failureRate: 0.15,
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shouldFail(rate: number) {
  return Math.random() < rate;
}

class MockError extends Error {
  readonly code: "NETWORK" | "VALIDATION" | "INSUFFICIENT_FUNDS";

  constructor(message: string, code: MockError["code"]) {
    super(message);
    this.name = "MockError";
    this.code = code;
  }
}

async function withLatency() {
  await sleep(randomInt(config.minDelayMs, config.maxDelayMs));
  if (shouldFail(config.failureRate)) {
    throw new MockError("Falha de rede simulada. Tente novamente.", "NETWORK");
  }
}

export const mockClient = {
  async get<T>(route: Route): Promise<T> {
    await withLatency();

    if (route === "/balance") {
      return { amount: db.balance } as T;
    }

    if (route === "/transactions") {
      return [...db.transactions] as T;
    }

    throw new MockError("Rota não encontrada.", "VALIDATION");
  },

  async post<T>(route: Route, body: unknown): Promise<T> {
    await withLatency();

    if (route !== "/transfers") {
      throw new MockError("Rota não encontrada.", "VALIDATION");
    }

    const input = body as TransferInput;

    if (!input.recipient || input.amount <= 0) {
      throw new MockError("Dados inválidos.", "VALIDATION");
    }

    if (input.amount > db.balance) {
      throw new MockError("Saldo insuficiente.", "INSUFFICIENT_FUNDS");
    }

    db.balance -= input.amount;

    const tx: Transaction = {
      id: crypto.randomUUID(),
      type: "debit",
      amount: input.amount,
      recipient: input.recipient,
      description: input.description ?? "",
      createdAt: new Date().toISOString(),
    };

    db.transactions = [tx, ...db.transactions];

    const result: TransferResult = { transactionId: tx.id };
    return result as T;
  },
};

export type { MockError };
