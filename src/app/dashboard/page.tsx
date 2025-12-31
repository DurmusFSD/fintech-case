"use client";

import { useQuery } from "@tanstack/react-query";
import DashboardCards from "@/components/dashboard/DashboardCards";
import WorkingCapitalGraph from "@/components/dashboard/WorkingCapitalGraph";
import RecentTransactionSection from "@/components/dashboard/recent-transaction";
import WalletSection from "@/components/dashboard/wallet/WalletSection ";
import { getWorkingCapital } from "@/features/financial/api";
import type { WorkingCapitalPoint } from "@/components/dashboard/WorkingCapitalChart";

type WorkingCapitalApiResponse = {
  success: boolean;
  data: {
    data: {
      month: string;
      income: number;
      expense: number;
    }[];
  };
};

export default function DashboardPage() {
  const wcQ = useQuery({
    queryKey: ["financial", "working-capital"],
    queryFn: getWorkingCapital,
  });

  const wcData: WorkingCapitalPoint[] =
    wcQ.data?.success
      ? wcQ.data.data.data.map((p: any) => ({
          month: p.month,
          income: p.income,
          expense: p.expense,
        }))
      : [];

  return (
    <div className="mt-[20px] flex gap-[30px]">
      <div className="w-[717px] flex flex-col gap-[20px]">
        <DashboardCards />

        {wcData.length > 0 && (
          <WorkingCapitalGraph data={wcData} />
        )}

        <RecentTransactionSection />
      </div>

      <div>
        <WalletSection />
      </div>
    </div>
  );
}
