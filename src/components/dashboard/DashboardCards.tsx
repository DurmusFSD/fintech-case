"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "@/features/financial/api";

type MoneyBlock = {
  amount: number;
  currency: string;
  change: {
    percentage: number;
    trend: "up" | "down";
  };
};

type SummaryResponse = {
  success: boolean;
  data: {
    totalBalance: MoneyBlock;
    totalExpense: MoneyBlock;
    totalSavings: MoneyBlock;
    lastUpdated: string;
  };
};

type CardItem = {
  key: "balance" | "expense" | "savings";
  title: string;
  variant: "dark" | "light";
  iconBg: string;
  iconSrc: string;
  titleColor: string;
  valueColor: string;
};

const CARDS: CardItem[] = [
  {
    key: "balance",
    title: "Total balance",
    variant: "dark",
    iconBg: "#4E5257",
    iconSrc: "/assets/wallet-2.6 1.png",
    titleColor: "#929EAE",
    valueColor: "#FFFFFF",
  },
  {
    key: "expense",
    title: "Total expense",
    variant: "light",
    iconBg: "#EBE8E8",
    iconSrc: "/assets/wallet-2.6 1 (1).png",
    titleColor: "#929EAE",
    valueColor: "#1B212D",
  },
  {
    key: "savings",
    title: "Total savings",
    variant: "light",
    iconBg: "#EBE8E8",
    iconSrc: "/assets/wallet-add.12 1.png",
    titleColor: "#929EAE",
    valueColor: "#1B212D",
  },
];

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function DashboardCards() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["financial", "summary"],
    queryFn: getSummary,
  });

  if (isError) {
    return (
      <div className="w-[716px] rounded-[10px] bg-white border border-[#E9E9F2] p-4 text-[14px] text-red-600">
        Financial summary could not be loaded
      </div>
    );
  }

  const res = data as SummaryResponse | undefined;
  const summary = res?.data;

  const valuesByKey: Record<CardItem["key"], string> = {
    balance: summary
      ? formatCurrency(
          summary.totalBalance.amount,
          summary.totalBalance.currency
        )
      : "—",
    expense: summary
      ? formatCurrency(
          summary.totalExpense.amount,
          summary.totalExpense.currency
        )
      : "—",
    savings: summary
      ? formatCurrency(
          summary.totalSavings.amount,
          summary.totalSavings.currency
        )
      : "—",
  };

  return (
    <section
      className="w-[716px] h-[105px] flex gap-[25px]"
      style={{ fontFamily: "Kumbh Sans, ui-sans-serif, system-ui" }}
    >
      {CARDS.map((c) => {
        const isDark = c.variant === "dark";

        return (
          <div
            key={c.key}
            className={[
              "w-[222px] h-[105px]",
              "rounded-[10px]",
              "pt-[24px] pr-[20px] pb-[24px] pl-[20px]",
              "flex items-center gap-[15px]",
              isDark ? "bg-[#363A3F]" : "bg-[#F8F8F8]",
            ].join(" ")}
          >
            <div
              className="w-[42px] h-[42px] rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: c.iconBg }}
            >
              <Image
                src={c.iconSrc}
                alt={c.title}
                width={20}
                height={20}
                className="w-[20px] h-[20px] object-contain"
              />
            </div>

            <div className="flex flex-col gap-[10px]">
              <div
                className="h-[17px]"
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: "100%",
                  color: c.titleColor,
                }}
              >
                {c.title}
              </div>

              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  lineHeight: "100%",
                  color: c.valueColor,
                }}
              >
                {isLoading ? "—" : valuesByKey[c.key]}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
