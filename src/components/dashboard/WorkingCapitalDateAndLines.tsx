"use client";

import WorkingCapitalChart, {
  WorkingCapitalPoint,
} from "./WorkingCapitalChart";
import WorkingCapitalDateRow from "./WorkingCapitalDateRow";

type Props = {
  data: WorkingCapitalPoint[];
  dates: string[];
  activeIndex?: number;
};

export default function WorkingCapitalDateAndLines({
  data,
  dates,
  activeIndex,
}: Props) {
  return (
    <div
      className="absolute left-[71px] top-[77px] w-[621px] h-[193px] z-10"
      style={{ fontFamily: "Kumbh Sans, ui-sans-serif, system-ui" }}
    >
      <div className="relative w-full h-full flex flex-col gap-[14px]">
        <div className="w-[588px] h-[164px] mx-auto flex justify-between">
          {dates.map((_, i) => (
            <div
              key={i}
              className="w-[1px] h-full"
              style={{ backgroundColor: "#FFF4FE" }}
            />
          ))}
        </div>

        <div className="absolute left-[1px] top-[20px] w-full h-[164px] ">
          <WorkingCapitalChart data={data} width={619} height={164} />
        </div>

        <WorkingCapitalDateRow
          dates={[
            "Apr 14",
            "Apr 15",
            "Apr 16",
            "Apr 17",
            "Apr 18",
            "Apr 19",
            "Apr 20",
          ]}
          activeIndex={3}
        />

      </div>
    </div>
  );
}
