import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TransferForm } from "@/features/transfers/components/transfer-form";

// Mocks dos hooks (tipados sem any)
type UseBalanceResult = {
  data?: { amount: number };
  isPending: boolean;
  isError: boolean;
};

type UseCreateTransferResult = {
  isPending: boolean;
  mutateAsync: (input: {
    recipient: string;
    amount: number;
    description?: string;
  }) => Promise<unknown>;
};

const useBalanceMock = vi.fn<() => UseBalanceResult>();
const useCreateTransferMock = vi.fn<() => UseCreateTransferResult>();

vi.mock("@/features/dashboard/hooks/use-balance", () => ({
  useBalance: () => useBalanceMock(),
}));

vi.mock("@/features/transfers/hooks/use-create-transfer", () => ({
  useCreateTransfer: () => useCreateTransferMock(),
}));

function fillForm(
  user: ReturnType<typeof userEvent.setup>,
  data: { recipient: string; amount: string; description?: string },
) {
  const recipient = screen.getByLabelText("Destinatário");
  const amount = screen.getByLabelText("Valor");
  const description = screen.getByLabelText("Descrição (opcional)");

  return (async () => {
    await user.clear(recipient);
    await user.type(recipient, data.recipient);

    await user.clear(amount);
    await user.type(amount, data.amount);

    await user.clear(description);
    if (data.description) await user.type(description, data.description);
  })();
}

describe("TransferForm", () => {
  it("bloqueia submit quando saldo é insuficiente (antes do mutate)", async () => {
    const user = userEvent.setup();

    const mutateAsync = vi
      .fn<UseCreateTransferResult["mutateAsync"]>()
      .mockResolvedValue({});

    useBalanceMock.mockReturnValue({
      data: { amount: 50 },
      isPending: false,
      isError: false,
    });

    useCreateTransferMock.mockReturnValue({
      isPending: false,
      mutateAsync,
    });

    render(<TransferForm />);

    await fillForm(user, {
      recipient: "João",
      amount: "100",
      description: "Pix",
    });
    await user.click(screen.getByRole("button", { name: "Transferir" }));

    expect(mutateAsync).not.toHaveBeenCalled();
    expect(
      await screen.findByText("Saldo insuficiente para esta transferência."),
    ).toBeInTheDocument();
  });

  it("submete com sucesso, mostra feedback e reseta o form", async () => {
    const user = userEvent.setup();

    const mutateAsync = vi
      .fn<UseCreateTransferResult["mutateAsync"]>()
      .mockResolvedValue({ transactionId: "t123" });

    useBalanceMock.mockReturnValue({
      data: { amount: 1000 },
      isPending: false,
      isError: false,
    });

    useCreateTransferMock.mockReturnValue({
      isPending: false,
      mutateAsync,
    });

    render(<TransferForm />);

    await fillForm(user, {
      recipient: "Maria",
      amount: "25.5",
      description: "Aluguel",
    });
    await user.click(screen.getByRole("button", { name: "Transferir" }));

    expect(mutateAsync).toHaveBeenCalledTimes(1);
    expect(mutateAsync).toHaveBeenCalledWith({
      recipient: "Maria",
      amount: 25.5,
      description: "Aluguel",
    });

    expect(
      await screen.findByText("Transferência realizada com sucesso."),
    ).toBeInTheDocument();

    // reset (inputs voltam ao default)
    expect(screen.getByLabelText("Destinatário")).toHaveValue("");
    expect(screen.getByLabelText("Valor")).toHaveValue(0);
    expect(screen.getByLabelText("Descrição (opcional)")).toHaveValue("");
  });

  it("mostra erro quando mutate falha", async () => {
    const user = userEvent.setup();

    const mutateAsync = vi
      .fn<UseCreateTransferResult["mutateAsync"]>()
      .mockRejectedValue(new Error("Falha de rede simulada. Tente novamente."));

    useBalanceMock.mockReturnValue({
      data: { amount: 1000 },
      isPending: false,
      isError: false,
    });

    useCreateTransferMock.mockReturnValue({
      isPending: false,
      mutateAsync,
    });

    render(<TransferForm />);

    await fillForm(user, {
      recipient: "Maria",
      amount: "10",
      description: "Teste",
    });
    await user.click(screen.getByRole("button", { name: "Transferir" }));

    expect(
      await screen.findByText("Falha de rede simulada. Tente novamente."),
    ).toBeInTheDocument();
  });
});
