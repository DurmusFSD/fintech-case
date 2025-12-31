"use client";

import RecentTransactionTop from "./RecentTransactionTop";
import RecentTransactionIndex from "./RecentTransactionIndex";
import RecentTransactionMain from "./RecentTransactionMain";

export default function RecentTransactionSection() {
  return (
    <section
      className="bg-[#FFFFFF] border border-[#F5F5F5] rounded-[10px]"
      style={{
        width: 717,
        height: 293,
        paddingTop: 20,
        paddingRight: 19,
        paddingBottom: 20,
        paddingLeft: 25,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <RecentTransactionTop />
      <RecentTransactionIndex />
      <RecentTransactionMain />
    </section>
  );
}
