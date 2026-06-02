import { Menu } from "@/components/ForAllPage/Menu";
import youtube from "@/lib/youtube";
import { DashboardClient } from "./DashboardClient";
import TestComp from "../test/TestComp";

const getdata = async () => {
  return youtube();
};

export default async function Page() {
  const data = await getdata();

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#F5F4F0]">
      <header className="w-full">
        <Menu />
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        <div className="grid grid-cols-[220px_1fr] gap-4 items-start">
          <TestComp data={data} />
          <DashboardClient />
        </div>
      </main>

      <footer className="border-t border-neutral-200 py-3 mt-auto">
        <p className="text-neutral-400 text-center text-xs">© 2026 Wellness.chat</p>
      </footer>
    </div>
  );
}