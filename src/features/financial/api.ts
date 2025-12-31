import { apiFetch } from "@/lib/http";

export function getSummary() {
  return apiFetch(`/financial/summary`, { method: "GET", auth: true });
}

export function getWorkingCapital() {
  return apiFetch(`/financial/working-capital`, { method: "GET", auth: true });
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
