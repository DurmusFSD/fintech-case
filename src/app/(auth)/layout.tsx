import Image from "next/image";



export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className="h-screen w-screen overflow-hidden bg-white flex items-center justify-center"
      style={{ paddingRight: "135px" }}
    >
      <div className="h-full w-full overflow-hidden">
        <div className="flex h-full w-full">


          <div className="relative h-full flex-[53.125] overflow-hidden bg-white">
            {children}
          </div>


          <div className="relative h-full flex-[46.875] overflow-hidden">
            <Image
              src="/assets/Image.png"
              alt="Sign in visual"
              fill
              priority
              className="object-contain"
              sizes="46.875vw"
            />
          </div>

        </div>
      </div>
    </main>

  );
}
