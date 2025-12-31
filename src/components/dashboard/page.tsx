"use client";

import { useQuery } from "@tanstack/react-query";
import DashboardCards from "@/components/dashboard/DashboardCards";
import WorkingCapitalGraph from "@/components/dashboard/WorkingCapitalGraph";
import { getWorkingCapital } from "@/features/financial/api";
import type { WorkingCapitalPoint } from "@/components/dashboard/WorkingCapitalChart";

type WorkingCapitalApiResponse = {
  success: boolean;
  data: {
    period: string;
    currency: string;
    data: {
      month: string;
      income: number;
      expense: number;
      net: number;
    }[];
    summary: {
      totalIncome: number;
      totalExpense: number;
      netBalance: number;
    };
  };
};

function normalizeWorkingCapital(
  res: WorkingCapitalApiResponse | undefined
): WorkingCapitalPoint[] {
  if (!res?.success) return [];

  return res.data.data.map((p) => ({
    month: p.month,
    income: p.income,
    expense: p.expense,
  }));
}

export default function DashboardPage() {
  const wcQ = useQuery({
    queryKey: ["financial", "working-capital"],
    queryFn: getWorkingCapital,
  });

  const wcData = normalizeWorkingCapital(
    wcQ.data as WorkingCapitalApiResponse | undefined
  );

  console.log("WORKING_CAPITAL_RAW:", wcQ.data);
  console.log("WORKING_CAPITAL_NORMALIZED:", wcData);

  return (
    <div className="flex flex-col gap-[30px]">
      <DashboardCards />

      <pre className="w-[716px] text-[11px] bg-white border border-[#F5F5F5] rounded-[10px] p-3 overflow-auto">
        {JSON.stringify(
          {
            loading: wcQ.isLoading,
            success: wcQ.data?.success,
            months: wcData.map((d) => d.month),
            firstPoint: wcData[0] ?? null,
          },
          null,
          2
        )}
      </pre>

      {wcQ.data?.success && wcData.length > 0 ? (
        <WorkingCapitalGraph data={wcData} />
      ) : (
        <div className="w-[716px] text-[13px] text-[#78778B]">
          Working capital data yok veya fetch başarısız.
        </div>
      )}
    </div>
  );
}
