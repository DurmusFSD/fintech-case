"use client";

import { useQuery } from "@tanstack/react-query";
import { getWallet } from "@/features/financial/api";
import WalletCardsBlock from "./WalletCardsBlock";
import ScheduledTransfers from "./ScheduledTransfers";


type WalletCard = {
  id: string;
  name: string;
  type: string;
  cardNumber: string;
  bank: string;
  network: string;
  expiryMonth: number;
  expiryYear: number;
  color: string;
  isDefault: boolean;
};

type WalletRes = {
  success: boolean;
  message?: string;
  data?: {
    cards?: WalletCard[];
  };
};

export default function WalletSection() {
  const walletQ = useQuery({
    queryKey: ["financial", "wallet"],
    queryFn: getWallet,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 0,
  });

  const res = walletQ.data as WalletRes | undefined;
  const cards: WalletCard[] = res?.success ? (res.data?.cards ?? []) : [];

  return (
    <aside
      style={{
        width: 354,
        height: 739,
        display: "flex",
        flexDirection: "column",
        gap: 30,
        fontFamily: "Kumbh Sans, ui-sans-serif, system-ui",
      }}
    >
      {walletQ.isLoading ? (
        <div style={{ fontSize: 13, color: "#78778B" }}>Loading wallet...</div>
      ) : !res?.success ? (
        <div style={{ fontSize: 13, color: "red" }}>
          {res?.message || "Wallet request failed"}
        </div>
      ) : (
        <WalletCardsBlock cards={cards} />
      )}

      <div style={{ height: 24 }} />

      <ScheduledTransfers />

    </aside>
  );
}
