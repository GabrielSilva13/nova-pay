// src/features/transfers/hooks/use-create-transfer.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TransferInput } from "@/features/transfers/types";
import { createTransfer } from "@/lib/api/endpoints";

export function useCreateTransfer() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (input: TransferInput) => createTransfer(input),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["transactions"] });
      await qc.invalidateQueries({ queryKey: ["balance"] });
    },
  });
}
