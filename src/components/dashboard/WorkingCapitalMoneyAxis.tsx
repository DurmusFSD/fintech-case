"use client";

type Props = {
  top?: number; 
};

export default function WorkingCapitalMoneyAxis({ top = 30 }: Props) {
  return (
    <div
      className="absolute left-[25px] w-[20px] h-[171px] flex flex-col justify-between"
      style={{ top, rowGap: 24 }}
    >
      {["10K", "7K", "5K", "3K", "0K"].map((t) => (
        <div
          key={t}
          className="w-[20px] h-[15px]"
          style={{
            fontSize: 12,
            fontWeight: 400,
            lineHeight: "100%",
            letterSpacing: "0%",
            color: "#929EAE",
          }}
        >
          {t}
        </div>
      ))}
    </div>
  );
}
