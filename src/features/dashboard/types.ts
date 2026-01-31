export type TransactionType = "credit" | "debit";

export type Transaction = {
  id: string;
  type: TransactionType;
  amount: number;
  recipient: string;
  description: string;
  createdAt: string; // ISO
};

export type Balance = {
  amount: number;
};
