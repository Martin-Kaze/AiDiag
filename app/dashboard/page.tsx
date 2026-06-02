import { Menu } from "@/components/ForAllPage/Menu";
import youtube from '@/lib/youtube';
import { DashboardClient } from "./DashboardClient";
import TestComp from "../test/TestComp";
const getdata = async () =>{
return youtube();
}



export default async function Page() {
  
 
     const data = await getdata();

 
  

  return (
    <div className="flex flex-col min-h-screen w-full">

      <header className="w-full"><Menu /></header>

      
       <p className="text-3xl font-bold text-center"> Text chat </p>

      <main className="grid grid-cols-[auto_1fr_1fr]  p-8  w-full">
      
      
      <TestComp data={data}/>
      <DashboardClient />
       
      </main>

      <footer className="border-t p-2 mt-auto">
        <p className="text-neutral-700 text-center">© 2026 Wellness.chat</p>
      </footer>

    </div>
  );
}