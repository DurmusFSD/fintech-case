"use client";

import { ChevronRight } from "lucide-react";

export default function RecentTransactionTop() {
  return (
    <div
      className="flex items-center"
      style={{
        width: 673,
        height: 22,
        gap: 431,
        fontFamily: "Kumbh Sans, ui-sans-serif, system-ui",
      }}
    >
      <div
        style={{
          width: 163,
          height: 22,
          fontSize: 18,
          fontWeight: 600,
          lineHeight: "100%",
          letterSpacing: "0%",
          color: "#1B212D",
        }}
      >
        Recent Transaction
      </div>

      
      <div
        className="flex items-center cursor-pointer"
        style={{
          width: 79,
          height: 18,
          gap: 6,
          fontSize: 14,
          fontWeight: 600,
          lineHeight: "100%",
          letterSpacing: "0%",
          color: "#29A073",
        }}
      >
        <span style={{ textAlign: "right" }}>View All</span>

        <ChevronRight
          size={18}
          strokeWidth={2}
          style={{ transform: "rotate(0deg)" }}
        />
      </div>
    </div>
  );
}
