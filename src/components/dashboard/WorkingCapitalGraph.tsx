"use client";

import WorkingCapitalGraphTop from "@/components/dashboard/WorkingCapitalGraphTop";
import WorkingCapitalMoneyAxis from "@/components/dashboard/WorkingCapitalMoneyAxis";
import WorkingCapitalDateAndLines from "./WorkingCapitalDateAndLines";
import { WorkingCapitalPoint } from "./WorkingCapitalChart";

type Props = {
  title?: string;
  data: WorkingCapitalPoint[];
};

export default function WorkingCapitalGraph({
  title = "Working Capital",
  data,
}: Props) {
  return (
    <section
      className="w-[716px] h-[291px] rounded-[10px] bg-white border border-[#F5F5F5] overflow-visible pt-[20px]"
      style={{ fontFamily: "Kumbh Sans, ui-sans-serif, system-ui" }}
    >
      <WorkingCapitalGraphTop title={title} />

      <div className="relative mt-[10px] h-[240px]">
        <WorkingCapitalMoneyAxis top={30} />

        <WorkingCapitalDateAndLines
          data={data}
          dates={data.map((d) => d.month)}
        />
      </div>
    </section>
  );
}
