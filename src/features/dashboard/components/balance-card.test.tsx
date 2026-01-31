import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BalanceCard } from "@/features/dashboard/components/balance-card";

type UseBalanceResult = {
  data?: { amount: number };
  isPending: boolean;
  isError: boolean;
  refetch: () => void;
};

const useBalanceMock = vi.fn<() => UseBalanceResult>();

vi.mock("@/features/dashboard/hooks/use-balance", () => ({
  useBalance: () => useBalanceMock(),
}));

describe("BalanceCard", () => {
  it("renderiza saldo quando disponível", () => {
    useBalanceMock.mockReturnValue({
      data: { amount: 123.45 },
      isPending: false,
      isError: false,
      refetch: vi.fn(),
    });

    const { container } = render(<BalanceCard />);

    const balance = container.querySelector('[data-slot="balance-amount"]');

    expect(balance).toHaveTextContent("R$");
  });

  it("renderiza estado de loading", () => {
    useBalanceMock.mockReturnValue({
      data: undefined,
      isPending: true,
      isError: false,
      refetch: vi.fn(),
    });

    const { container } = render(<BalanceCard />);

    expect(
      container.querySelector('[data-slot="balance-card-skeleton"]'),
    ).toBeTruthy();
  });
});
