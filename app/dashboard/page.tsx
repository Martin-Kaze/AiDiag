


import { Menu } from "@/components/ForAllPage/Menu";
import youtube from '@/lib/youtube';
import { CustAvatarGroup } from './CustAvatarGroup';
import { DashboardClient } from "./DashboardClient";

const getdata = async () =>{
return youtube();
}



export default async function Page() {
  
  const data = await getdata();
  

  return (
    <div className="flex flex-col min-h-screen w-full">

      <header className="w-full"><Menu /></header>

      
      <main className="flex flex-1 flex-col gap-6 p-8 max-w-3xl w-full mx-auto">

      <CustAvatarGroup data={data} />

      <DashboardClient/>
       
      </main>

      <footer className="border-t p-2 mt-auto">
        <p className="text-neutral-700 text-center">© 2026 Wellness.chat</p>
      </footer>

    </div>
  );
}