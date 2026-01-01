"use client";

import { useQuery } from "@tanstack/react-query";
import DashboardCards from "@/components/dashboard/DashboardCards";
import WorkingCapitalGraph from "@/components/dashboard/WorkingCapitalGraph";
import RecentTransactionSection from "@/components/dashboard/recent-transaction";
import WalletSection from "@/components/dashboard/wallet/WalletSection "; // ✅ boşluk yok
import { getWorkingCapital } from "@/features/financial/api";
import type { WorkingCapitalPoint } from "@/components/dashboard/WorkingCapitalChart";
import type { ApiResult, WorkingCapitalPayload } from "@/features/financial/api";

export default function DashboardPage() {
  const wcQ = useQuery<ApiResult<WorkingCapitalPayload>>({
    queryKey: ["financial", "working-capital"],
    queryFn: getWorkingCapital,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 0,
  });

  const wcRaw = wcQ.data?.success ? wcQ.data?.data?.data ?? [] : [];

  const wcData: WorkingCapitalPoint[] = wcRaw.map((p) => ({
    month: p.month,
    income: p.income,
    expense: p.expense,
  }));

  return (
    <div className="mt-[20px] flex gap-[30px]">
      <div className="w-[717px] flex flex-col gap-[20px]">
        <DashboardCards />

        {wcData.length > 0 && <WorkingCapitalGraph data={wcData} />}

        <RecentTransactionSection />
      </div>

      <div>
        <WalletSection />
      </div>
    </div>
  );
}
