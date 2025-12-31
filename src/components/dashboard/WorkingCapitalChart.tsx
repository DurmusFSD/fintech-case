"use client";

import { LineChart, Line, Tooltip, XAxis, YAxis } from "recharts";
import PointMoney from "@/components/dashboard/PointMoney";

export type WorkingCapitalPoint = {
  month: string;
  income: number;
  expense: number;
};

type Props = {
  data: WorkingCapitalPoint[];
  width?: number;
  height?: number;
};

export default function WorkingCapitalChart({
  data,
  width = 619,
  height = 164,
}: Props) {
  return (
    <div style={{ width, height }} aria-label="Working Capital Chart">
      <LineChart width={width} height={height} data={data}>
        <XAxis dataKey="month" hide />
        <YAxis hide domain={[0, "auto"]} />

        <Tooltip
          cursor={false}
          content={({ active, payload }: any) => {
            if (!active || !payload?.length) return null;

            const incomeVal =
              payload.find((p: any) => p.dataKey === "income")?.value ?? 0;

            const formatted = new Intl.NumberFormat("tr-TR", {
              style: "currency",
              currency: "TRY",
            }).format(incomeVal);

            return <PointMoney value={formatted} />;
          }}
        />

        <Line
          type="monotone"
          dataKey="income"
          stroke="#29A073"
          strokeWidth={2}
          dot={false}
          activeDot={{
            r: 6,
            stroke: "#DDE3EA",
            strokeWidth: 2,
            fill: "#5B3DF5",
          }}
        />

        <Line
          type="monotone"
          dataKey="expense"
          stroke="#C8EE44"
          strokeWidth={2}
          dot={false}
          activeDot={{
            r: 6,
            stroke: "#DDE3EA",
            strokeWidth: 2,
            fill: "#5B3DF5",
          }}
        />
      </LineChart>
    </div>
  );
}
