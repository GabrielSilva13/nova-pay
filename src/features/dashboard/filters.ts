import type { Transaction, TransactionType } from "@/features/dashboard/types";

export type TransactionFilters = {
  query: string;
  type: "all" | TransactionType;
  dateFrom?: string; // YYYY-MM-DD
  dateTo?: string; // YYYY-MM-DD
  sort: "date_desc" | "date_asc";
  page: number; // 1-based
  pageSize: number;
};

export type FilteredResult = {
  items: Array<Transaction>;
  total: number;
  totalPages: number;
};

function toStartOfDayMs(date: string): number {
  // date: YYYY-MM-DD
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d, 0, 0, 0, 0).getTime();
}

function toEndOfDayMs(date: string): number {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d, 23, 59, 59, 999).getTime();
}

export function applyTransactionFilters(
  transactions: Array<Transaction>,
  filters: TransactionFilters,
): FilteredResult {
  const q = filters.query.trim().toLowerCase();

  const fromMs = filters.dateFrom
    ? toStartOfDayMs(filters.dateFrom)
    : undefined;
  const toMs = filters.dateTo ? toEndOfDayMs(filters.dateTo) : undefined;

  const filtered = transactions.filter((t) => {
    if (filters.type !== "all" && t.type !== filters.type) return false;

    if (q.length > 0) {
      const hay = `${t.recipient} ${t.description}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }

    const createdMs = new Date(t.createdAt).getTime();
    if (Number.isNaN(createdMs)) return false;

    if (fromMs !== undefined && createdMs < fromMs) return false;
    if (toMs !== undefined && createdMs > toMs) return false;

    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const ams = new Date(a.createdAt).getTime();
    const bms = new Date(b.createdAt).getTime();
    return filters.sort === "date_desc" ? bms - ams : ams - bms;
  });

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / filters.pageSize));
  const safePage = Math.min(Math.max(filters.page, 1), totalPages);

  const start = (safePage - 1) * filters.pageSize;
  const end = start + filters.pageSize;

  return {
    items: sorted.slice(start, end),
    total,
    totalPages,
  };
}
