import { apiFetch } from "@/lib/http";

/** Backend’in standart sarmalı */
export type ApiResult<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

/** Working capital satırı */
export type WorkingCapitalRow = {
  month: string;
  income: number;
  expense: number;
};

/** Working capital payload (backend data alanının içi) */
export type WorkingCapitalPayload = {
  data?: WorkingCapitalRow[];
};

export function getSummary() {
  return apiFetch(`/financial/summary`, { method: "GET", auth: true });
}

export function getWorkingCapital(): Promise<ApiResult<WorkingCapitalPayload>> {
  return apiFetch<WorkingCapitalPayload>(`/financial/working-capital`, {
    method: "GET",
    auth: true,
  });
}

export function getWallet() {
  return apiFetch(`/financial/wallet`, { method: "GET", auth: true });
}

export function getRecentTransactions() {
  return apiFetch(`/financial/transactions/recent`, { method: "GET", auth: true });
}

export function getScheduledTransfers() {
  return apiFetch(`/financial/transfers/scheduled`, { method: "GET", auth: true });
}
