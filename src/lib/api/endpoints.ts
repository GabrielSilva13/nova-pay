import type { Balance, Transaction } from "@/features/dashboard/types";
import type { TransferInput, TransferResult } from "@/features/transfers/type";
import { mockClient } from "@/lib/api/mock/client";

export async function getBalance(): Promise<Balance> {
  return mockClient.get<Balance>("/balance");
}

export async function listTransactions(): Promise<Array<Transaction>> {
  return mockClient.get<Array<Transaction>>("/transactions");
}

export async function createTransfer(
  input: TransferInput,
): Promise<TransferResult> {
  return mockClient.post<TransferResult>("/transfers", input);
}
