export type TransferInput = {
  recipient: string;
  amount: number;
  description?: string;
};

export type TransferResult = {
  transactionId: string;
};
