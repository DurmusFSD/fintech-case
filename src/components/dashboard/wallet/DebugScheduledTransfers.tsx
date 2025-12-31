"use client";

import { useQuery } from "@tanstack/react-query";
import { getScheduledTransfers } from "@/features/financial/api";

export default function DebugScheduledTransfers() {
  const q = useQuery({
    queryKey: ["financial", "transfers", "scheduled"],
    queryFn: getScheduledTransfers,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (q.isLoading) {
    return <div>Loading scheduled transfers...</div>;
  }

  if (q.isError) {
    return <div>Scheduled transfers API error</div>;
  }

  return (
    <pre
      style={{
        fontSize: 12,
        background: "#fff",
        border: "1px solid #F5F5F5",
        borderRadius: 8,
        padding: 12,
        maxHeight: 400,
        overflow: "auto",
      }}
    >
      {JSON.stringify(q.data, null, 2)}
    </pre>
  );
}
