"use client";

type Props = {
  dates: string[];
  activeIndex?: number;
};

export default function WorkingCapitalDateRow({
  dates,
  activeIndex = dates.length - 1,
}: Props) {
  return (
    <div
     className="relative -top-25 w-[621px] h-[15px] flex justify-between"

      style={{
        fontFamily: "Kumbh Sans",
        fontSize: 12,
        fontWeight: 400,
        lineHeight: "100%",
        letterSpacing: "0%",
        opacity: 1,
      }}
      aria-label="Working Capital Dates"
    >
      {dates.map((d, i) => {
        const isActive = i === activeIndex;

        return (
          <span
            key={d}
            className="h-[15px] whitespace-nowrap"
            style={{
              width: 36,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? "#1B212D" : "#929EAE",
              opacity: 1,
              textAlign: "left",
            }}
          >
            {d}
          </span>
        );
      })}
    </div>
  );
}
