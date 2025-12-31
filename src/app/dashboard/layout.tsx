import Sidebar from "@/components/sidebar";
import Topbar from "@/components/topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userName = "Mahfuzul Nabil";

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#ffffff]">
      <div className="flex h-full w-full">
        <Sidebar />

        <div className="flex-1 h-full overflow-hidden">
          <main className="h-full overflow-y-auto px-6">
            <div className="pt-[30px]">
              <div className="w-full max-w-[1110px] h-[48px]">
                <Topbar title="Dashboard" userName={userName} />
              </div>

              
              <div className="pt-6 pb-6">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
