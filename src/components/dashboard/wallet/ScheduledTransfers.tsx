"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { getScheduledTransfers } from "@/features/financial/api";

type ScheduledTransferItem = {
  id: string;
  name: string;
  image: string;
  date: string;
  amount: number;
  currency: string;
  status?: string;
};

function pickList(res: any): ScheduledTransferItem[] {
  const raw = res?.data;
  const arr =
    (Array.isArray(raw) && raw) ||
    (Array.isArray(raw?.transfers) && raw.transfers) ||
    (Array.isArray(raw?.items) && raw.items) ||
    (Array.isArray(raw?.data) && raw.data) ||
    [];
  return arr as ScheduledTransferItem[];
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function formatDateLikeFigma(input?: string) {
  if (!input) return "";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return "";

  const month = d.toLocaleString("en-US", { month: "long" });
  const day = d.getDate();
  const year = d.getFullYear();
  const hh = pad2(d.getHours());
  const mm = pad2(d.getMinutes());

  return `${month} ${day}, ${year} at ${hh}:${mm}`;
}

function formatAmount(amount: any, currency: any) {
  const n = typeof amount === "number" ? amount : Number(amount);
  const cur = typeof currency === "string" && currency.trim() ? currency.trim() : "$";

  if (Number.isNaN(n)) return `${cur}0,00`;

  const abs = Math.abs(n);
  const s = abs.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return n < 0 ? `- ${cur}${s}` : `${cur}${s}`;
}

export default function ScheduledTransfers() {
  const q = useQuery({
    queryKey: ["financial", "transfers", "scheduled"],
    queryFn: getScheduledTransfers,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 0,
  });

  const itemsAll = q.data?.success ? pickList(q.data) : [];
  const items = itemsAll.slice(0, 5);

  return (
    <section
      style={{
        width: 354,
        height: 350,
        display: "flex",
        flexDirection: "column",
        gap: 25,
        fontFamily: "Kumbh Sans, ui-sans-serif, system-ui",
      }}
    >
      <div
        style={{
          width: 354,
          height: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: 173,
            height: 22,
            fontSize: 18,
            fontWeight: 600,
            lineHeight: "100%",
            color: "#1B212D",
          }}
        >
          Scheduled Transfers
        </div>

        <div
          style={{
            width: 79,
            height: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 6,
            cursor: "pointer",
            color: "#29A073",
            fontSize: 14,
            fontWeight: 600,
            lineHeight: "100%",
          }}
        >
          <span style={{ height: 17 }}>View All</span>

          <span
            style={{
              width: 18,
              height: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: "rotate(-90deg)",
            }}
          >
            <ChevronDown size={18} color="#29A073" />
          </span>
        </div>
      </div>

      <div
        style={{
          width: 354,
          height: 303,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {q.isLoading ? (
          <div style={{ fontSize: 13, color: "#929EAE" }}>Loading scheduled transfers...</div>
        ) : !q.data?.success ? (
          <div style={{ fontSize: 13, color: "#D10000" }}>
            {q.data?.message || "Scheduled transfers request failed"}
          </div>
        ) : items.length === 0 ? (
          <div style={{ fontSize: 13, color: "#929EAE" }}>No scheduled transfers</div>
        ) : (
          items.map((t, idx) => {
            const showDivider = idx !== items.length - 1;

            const avatarSrc =
              (typeof t?.image === "string" && t.image.trim() ? t.image : "") ||
              "/assets/avatar.png";

            return (
              <div key={t?.id ?? idx} style={{ width: 354, display: "flex", flexDirection: "column", gap: 12 }}>
                <div
                  style={{
                    width: 354,
                    height: 39,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: 170,
                      height: 39,
                      display: "flex",
                      alignItems: "center",
                      gap: 15,
                    }}
                  >
                    <div
                      style={{
                        width: 33,
                        height: 33,
                        borderRadius: 9999,
                        overflow: "hidden",
                        position: "relative",
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={avatarSrc}
                        alt={t?.name || "Avatar"}
                        width={33}
                        height={33}
                        style={{ width: 33, height: 33, objectFit: "cover" }}
                        unoptimized
                      />
                    </div>

                    <div
                      style={{
                        width: 122,
                        height: 39,
                        display: "flex",
                        flexDirection: "column",
                        gap: 7,
                      }}
                    >
                      <div
                        style={{
                          height: 17,
                          fontSize: 14,
                          fontWeight: 600,
                          lineHeight: "100%",
                          color: "#1B212D",
                        }}
                      >
                        {t?.name || "-"}
                      </div>

                      <div
                        style={{
                          height: 15,
                          fontSize: 12,
                          fontWeight: 500,
                          lineHeight: "100%",
                          color: "#929EAE",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        title={formatDateLikeFigma(t?.date)}
                      >
                        {formatDateLikeFigma(t?.date)}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      width: 76,
                      height: 20,
                      fontSize: 16,
                      fontWeight: 600,
                      lineHeight: "100%",
                      textAlign: "right",
                      color: "#000000",
                    }}
                  >
                    {formatAmount(t?.amount, t?.currency)}
                  </div>
                </div>

                {showDivider && (
                  <div
                    style={{
                      width: 354,
                      borderTop: "1px solid #FAFAFA",
                    }}
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
