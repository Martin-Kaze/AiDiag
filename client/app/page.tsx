
import { Menu } from "@/components/ForAllPage/Menu";
import { Footer } from "@/components/ForAllPage/Footer";
import { UserInput } from "@/components/ForAllPage/UserInput";

import AddedSympt from "@/components/ForAllPage/AddedSympt";
import AnaliseButton from "@/components/ForAllPage/AnaliseButton";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">

      <header className="w-full"><Menu /></header>
      

      <main className=" relative flex flex-1 flex-col items-center justify-center gap-4 p-8 max-w-3xl w-full mx-auto">

     
 <p className="text-3xl font-bold text-center"> Describe your psyhological symptoms! </p>

     <UserInput/>
      
    <AddedSympt/>
    <AnaliseButton/>
      </main>

     <Footer/>

    </div>
  );
}