import { Menu } from "@/components/ForAllPage/Menu";
import { DashboardClient } from "./components/DashboardClient";
import { CustAvatarGroup } from "./components/CustAvatarGroup";
import { Card } from "@/components/ui/card";
import SideCard from "./components/SideCard";
import QuestionSideCard from "./components/QuestionSideCard";
export default async function Page() {
  
 
  
 
  

  return (
    <div className="flex flex-col min-h-screen w-full">

      <header className="w-full"><Menu /></header>

      
       <p className="text-3xl font-bold text-center"> Text chat </p>

     <main className=" flex  items-start p-8 w-full  mx-auto">
      <div className="flex flex-col gap-5">
        <SideCard/>
        <QuestionSideCard/>
      </div>
    
      <DashboardClient />
</main>

      <footer className="border-t p-2 mt-auto">
        <p className="text-neutral-700 text-center">© 2026 Wellness.chat</p>
      </footer>

    </div>
  );
}