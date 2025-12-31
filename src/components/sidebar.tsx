"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
  iconSrc: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", iconSrc: "/assets/dashimg.png" },
  { label: "Transactions", href: "/dashboard/transactions", iconSrc: "/assets/transactions.png" },
  { label: "Invoices", href: "/dashboard/invoices", iconSrc: "/assets/invoices.png" },
  { label: "My Wallets", href: "/dashboard/wallets", iconSrc: "/assets/MyWallets.png" },
  { label: "Settings", href: "/dashboard/settings", iconSrc: "/assets/settings.png" },
];

const BOTTOM_ITEMS: NavItem[] = [
  { label: "Help", href: "/dashboard/help", iconSrc: "/assets/help.png" },
  { label: "Logout", href: "/logout", iconSrc: "/assets/logout.png" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className={[
        "hidden lg:flex",
        "flex-col justify-between",
        "h-full",
        "w-[250px]",
        "bg-[#FAFAFA]",
        "pt-[30px] pr-[25px] pb-[100px] pl-[25px]",
        "border-r border-[#E9E9F2]",
      ].join(" ")}
      style={{ fontFamily: "Kumbh Sans, ui-sans-serif, system-ui" }}
    >
      <div className="flex flex-col">
        <div className="h-[30px]">
          <Image
            src="/assets/Logo.png"
            alt="Fintech Logo"
            width={107}
            height={30}
            priority
            className="h-[30px] w-auto object-contain"
          />
        </div>

        <nav className="mt-[30px] w-[200px]">
          <div className="flex flex-col gap-[2px]">
            {NAV_ITEMS.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "w-[200px] h-[48px] rounded-[8px]",
                    "flex items-center gap-[12px]",
                    "pt-[14px] pb-[14px] pl-[15px] pr-[81px]",
                    active ? "bg-[#C8EE44]" : "bg-transparent hover:bg-[#F1F2F7]",
                    "transition-colors",
                  ].join(" ")}
                >
                  <Image
                    src={item.iconSrc}
                    alt={item.label}
                    width={20}
                    height={20}
                    className="shrink-0 w-[20px] h-[20px] object-contain"
                  />

                  <span
                    className="leading-[100%] tracking-[0%]"
                    style={{
                      fontSize: 14, 
                      fontWeight: active ? 600 : 500, 
                      color: active ? "#1B212D" : "#78778B", 
                    }}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      <div className="w-[200px]">
        <div className="flex flex-col gap-[2px]">
          {BOTTOM_ITEMS.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "w-[200px] h-[48px] rounded-[8px]",
                  "flex items-center gap-[12px]",
                  "pt-[14px] pb-[14px] pl-[15px] pr-[81px]",
                  active ? "bg-[#C8EE44]" : "bg-transparent hover:bg-[#F1F2F7]",
                  "transition-colors",
                ].join(" ")}
              >
                <Image
                  src={item.iconSrc}
                  alt={item.label}
                  width={20}
                  height={20}
                  className="shrink-0 w-[20px] h-[20px] object-contain"
                />

                <span
                  className="leading-[100%] tracking-[0%]"
                  style={{
                    fontSize: 14,
                    fontWeight: active ? 600 : 500,
                    color: active ? "#1B212D" : "#78778B",
                  }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
