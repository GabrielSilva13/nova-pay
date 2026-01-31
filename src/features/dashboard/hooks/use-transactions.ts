import { useQuery } from "@tanstack/react-query";
import { listTransactions } from "@/lib/api/endpoints";

export function useTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: listTransactions,
  });
}
