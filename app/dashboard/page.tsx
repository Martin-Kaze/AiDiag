import { Menu } from "@/components/ForAllPage/Menu";
import { DashboardClient } from "./components/DashboardClient";
export default async function Page() {
  
  return (
    <div className="flex flex-col min-h-screen w-full">

      <header className="w-full"><Menu /></header>

     <main className=" flex  justify-center p-8 w-full  ">
      
    
      <DashboardClient />
</main>

    </div>
  );
}