"use client";

type Props = {
  value: string;
};

export default function PointMoney({ value }: Props) {
  return (
    <div
      className="w-[57px] h-[70px] flex flex-col items-center gap-[22px]"
      style={{ fontFamily: "Kumbh Sans, ui-sans-serif, system-ui" }}
    >
      
      <div className="w-[57px] h-[36px] rounded-[8px] bg-[#F3F6F8] flex items-center justify-center">
        <span
          className="w-[37px] h-[15px] text-center"
          style={{
            fontSize: 12,
            fontWeight: 500,
            lineHeight: "100%",
            letterSpacing: "0%",
            color: "#1B212D",
          }}
        >
          {value}
        </span>
      </div>

      <div className="relative w-[18px] h-[18px]">
        <span className="absolute inset-0 rounded-full border border-[#DDE3EA]" />
        <span className="absolute left-1/2 top-1/2 w-[8px] h-[8px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5B3DF5]" />
      </div>
    </div>
  );
}
