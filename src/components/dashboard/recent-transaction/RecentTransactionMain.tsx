"use client";

import { useQuery } from "@tanstack/react-query";
import { getRecentTransactions } from "@/features/financial/api";

type ApiTx = {
  id: string;
  name: string;
  business: string;
  image: string;
  type: string;
  amount: number; 
  currency: string; 
  date: string; 
};

type ApiResponse = {
  success: boolean;
  message?: string;
  data?: {
    transactions?: ApiTx[];
  };
};

function formatAmount(amount: number, currency: string) {
  const v = Math.abs(Number(amount || 0));
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: 2,
  }).format(v);
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

export default function RecentTransactionMain() {
  const txQ = useQuery({
    queryKey: ["financial", "transactions", "recent"],
    queryFn: getRecentTransactions,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 0,
  });

  if (txQ.isLoading) {
    return (
      <div
        className="text-[13px] text-[#78778B]"
        style={{ fontFamily: "Kumbh Sans, ui-sans-serif, system-ui" }}
      >
        Loading...
      </div>
    );
  }

  const res = txQ.data as ApiResponse | undefined;
  if (!res?.success) {
    return (
      <div
        className="text-[13px] text-red-600"
        style={{ fontFamily: "Kumbh Sans, ui-sans-serif, system-ui" }}
      >
        Recent transactions request failed
      </div>
    );
  }

  const rows = (res.data?.transactions ?? []).slice(0, 3);

  return (
    <div
      style={{
        width: 660,
        height: 176,
        display: "flex",
        flexDirection: "column",
        gap: 15,
        fontFamily: "Kumbh Sans, ui-sans-serif, system-ui",
      }}
    >
      {rows.map((tx, idx) => {
        const amountText = formatAmount(tx.amount, tx.currency);
        const dateText = formatDate(tx.date);

        return (
          <div
            key={tx.id ?? idx}
            style={{
              width: 660,
              height: 53,
              border: "1px solid #F5F5F5",
              borderRadius: 5,
              position: "relative",
              display: "flex",
              alignItems: "center",
              paddingLeft: 12,
              paddingRight: 12,
              boxSizing: "border-box",
            }}
          >
            
            <div
              style={{
                width: 633,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              
              <div
                style={{
                  width: 179,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 5,
                    backgroundColor: "#E4F1FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={tx.image}
                    alt={tx.name}
                    width={32}
                    height={30}
                    style={{ width: 32, height: 30, objectFit: "contain" }}
                  />
                </div>

                
                <div style={{ width: 125, height: 37 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      color: "#1B212D",
                    }}
                  >
                    {tx.name}
                  </div>

                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 12,
                      fontWeight: 400,
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      color: "#929EAE",
                    }}
                  >
                    {tx.business}
                  </div>
                </div>
              </div>

              
              <div
                style={{
                  width: 120,
                  height: 17,
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: 500,
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#929EAE",
                }}
              >
                {tx.type}
              </div>

              
              <div
                style={{
                  width: 80,
                  height: 17,
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#1B212D",
                }}
              >
                {amountText}
              </div>

              
              <div
                style={{
                  width: 80, //78 de yıl alta iniyor
                  height: 17,
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: 500,
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#929EAE",
                }}
              >
                {dateText}
              </div>
            </div>

           
            {idx !== rows.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  left: 3,
                  bottom: -1,
                  width: 657,
                  height: 0,
                  borderTop: "1px solid #F5F5F5",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
