"use client";

import Image from "next/image";

type TopbarProps = {
  title?: string;         
  userName: string;       
  avatarSrc?: string;     
};

export default function Topbar({
  title = "Dashboard",
  userName,
  avatarSrc = "/assets/avatar.png",
}: TopbarProps) {
  return (
    <div
      className={[
        "w-full",
        "flex items-center justify-between",
        "h-[48px]",
      ].join(" ")}
      style={{ fontFamily: "Kumbh Sans, ui-sans-serif, system-ui" }}
    >
      
      <div
        className="h-[31px]"
        style={{
          fontSize: 25,        
          fontWeight: 600,     
          lineHeight: "100%",
          letterSpacing: "0%",
          color: "#1B212D",
        }}
      >
        {title}
      </div>

     
      <div className="flex items-center gap-[45px] h-[48px]">
        
        <div className="flex items-center gap-[45px] h-[24px]">
          <button
            type="button"
            className="w-[24px] h-[24px] grid place-items-center"
            aria-label="Search"
          >
            <Image
              src="/assets/search1.png"
              alt="Search"
              width={24}
              height={24}
              className="w-[24px] h-[24px] object-contain"
            />
          </button>

          <button
            type="button"
            className="w-[24px] h-[24px] grid place-items-center"
            aria-label="Notifications"
          >
            <Image
              src="/assets/bing.png"
              alt="Notifications"
              width={24}
              height={24}
              className="w-[24px] h-[24px] object-contain"
            />
          </button>
        </div>

        
        <button
          type="button"
          className={[
            "w-[215px] h-[48px]",
            "flex items-center justify-between",
            "pt-[6px] pr-[15px] pb-[6px] pl-[7px]",
            "rounded-[100px]",
            "bg-[#FAFAFA]",
          ].join(" ")}
          aria-label="Account Menu"
        >
          
          <div className="flex items-center gap-[12px] h-[36px]">
            
            <div className="w-[36px] h-[36px] rounded-full overflow-hidden bg-[#E9E9F2] shrink-0">
              <Image
                src={avatarSrc}
                alt="Avatar"
                width={36}
                height={36}
                className="w-[36px] h-[36px] object-cover"
              />
            </div>

            
            <div
              className="h-[17px] max-w-[100px] truncate"
              style={{
                fontSize: 14,
                fontWeight: 600,
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#1B212D",
              }}
              title={userName}
            >
              {userName}
            </div>
          </div>

          
          <Image
            src="/assets/Dropdown.png"
            alt="Dropdown"
            width={17}
            height={17}
            className="w-[17px] h-[17px] object-contain"
          />
        </button>
      </div>
    </div>
  );
}
