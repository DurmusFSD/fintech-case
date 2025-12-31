"use client";

export default function RecentTransactionIndex() {
  return (
    <div
      style={{
        width: 610,
        height: 15,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "Kumbh Sans, ui-sans-serif, system-ui",
        fontSize: 12,
        fontWeight: 600,
        lineHeight: "100%",
        letterSpacing: "0%",
        color: "#929EAE",
      }}
    >
      
      <div style={{ width: 100, height: 15 }}>NAME/BUSINESS</div>

      
      <div
        style={{
          width: 343,
          height: 15,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: 31, height: 15 }}>TYPE</div>
        <div style={{ height: 15 }}>AMOUNT</div>
        <div style={{ height: 15 }}>DATE</div>
      </div>
    </div>
  );
}
