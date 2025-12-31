"use client";

import { ChevronDown } from "lucide-react";

type Props = {
  title?: string;
};

export default function WorkingCapitalGraphTop({ title = "Working Capital" }: Props) {
  return (
    <div className="pt-[15px] px-[25px]">
      <div className="w-[671px] h-[30px] flex items-center justify-between">
        <div
          className="h-[30px]"
          style={{
            fontSize: 18,
            fontWeight: 600,
            lineHeight: "100%",
            letterSpacing: "0%",
            color: "#1B212D",
          }}
        >
          {title}
        </div>

        <div className="w-[338px] h-[30px] flex items-center justify-between">
          <div className="w-[159px] h-[15px] flex items-center justify-between">
            <div className="w-[59px] h-[15px] flex items-center gap-[6px]">
              <span className="w-[8px] h-[8px] rounded-full bg-[#29A073]" />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#1B212D",
                }}
              >
                Income
              </span>
            </div>

            <div className="w-[70px] h-[15px] flex items-center gap-[6px]">
              <span className="w-[8px] h-[8px] rounded-full bg-[#C8EE44]" />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#1B212D",
                }}
              >
                Expenses
              </span>
            </div>
          </div>

          <button
            type="button"
            className={[
              "w-[107px] h-[30px]",
              "flex items-center justify-between",
              "pt-[6px] pr-[8px] pb-[6px] pl-[10px]",
              "rounded-[5px]",
              "bg-[#F8F8F8]",
            ].join(" ")}
            aria-label="Date Filter"
          >
            <span
              className="h-[15px]"
              style={{
                fontSize: 12,
                fontWeight: 400,
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#1B212D",
              }}
            >
              Last 7 days
            </span>

            <ChevronDown size={18} className="text-[#1B212D]" />
          </button>
        </div>
      </div>
    </div>
  );
}
