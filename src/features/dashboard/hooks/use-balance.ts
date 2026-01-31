import { useQuery } from "@tanstack/react-query";
import { getBalance } from "@/lib/api/endpoints";

export function useBalance() {
  return useQuery({
    queryKey: ["balance"],
    queryFn: getBalance,
  });
}
