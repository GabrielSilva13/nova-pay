import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("chama onClick quando clicado", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Continuar</Button>);

    await user.click(screen.getByRole("button", { name: "Continuar" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
