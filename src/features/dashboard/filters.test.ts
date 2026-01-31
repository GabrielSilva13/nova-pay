import { describe, expect, it } from "vitest";
import {
  applyTransactionFilters,
  type TransactionFilters,
} from "@/features/dashboard/filters";
import type { Transaction } from "@/features/dashboard/types";

function tx(id: string, iso: string, type: "credit" | "debit"): Transaction {
  return {
    id,
    createdAt: iso,
    type,
    amount: 10,
    recipient: "Alice",
    description: "Teste",
  };
}

describe("applyTransactionFilters", () => {
  it("filtra por faixa de datas (inclusivo)", () => {
    const items = [
      tx("1", "2026-01-01T10:00:00.000Z", "credit"),
      tx("2", "2026-01-15T10:00:00.000Z", "debit"),
      tx("3", "2026-02-01T10:00:00.000Z", "credit"),
    ];

    const filters: TransactionFilters = {
      query: "",
      type: "all",
      dateFrom: "2026-01-10",
      dateTo: "2026-01-31",
      sort: "date_asc",
      page: 1,
      pageSize: 50,
    };

    const result = applyTransactionFilters(items, filters);
    expect(result.total).toBe(1);
    expect(result.items[0]?.id).toBe("2");
  });

  it("ordena por data desc", () => {
    const items = [
      tx("1", "2026-01-01T10:00:00.000Z", "credit"),
      tx("2", "2026-01-15T10:00:00.000Z", "debit"),
    ];

    const filters: TransactionFilters = {
      query: "",
      type: "all",
      sort: "date_desc",
      page: 1,
      pageSize: 50,
    };

    const result = applyTransactionFilters(items, filters);
    expect(result.items.map((x) => x.id)).toEqual(["2", "1"]);
  });

  it("pagina resultados", () => {
    const items = [
      tx("1", "2026-01-01T10:00:00.000Z", "credit"),
      tx("2", "2026-01-02T10:00:00.000Z", "credit"),
      tx("3", "2026-01-03T10:00:00.000Z", "credit"),
    ];

    const filters: TransactionFilters = {
      query: "",
      type: "all",
      sort: "date_asc",
      page: 2,
      pageSize: 2,
    };

    const result = applyTransactionFilters(items, filters);
    expect(result.total).toBe(3);
    expect(result.totalPages).toBe(2);
    expect(result.items.map((x) => x.id)).toEqual(["3"]);
  });
});
