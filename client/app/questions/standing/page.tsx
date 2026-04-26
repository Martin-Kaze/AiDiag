
import { Menu } from "@/components/ForAllPage/Menu";
import ProgressBar from "@/components/ForAllPage/ProgressBar";
import ButtonPushRoute from "@/components/ButtonPushRoute";

import { Bot } from "lucide-react";
import QuestionPhoto from "@/components/QuestionPhoto";

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen w-full">

      <header className="w-full"><Menu /></header>

      <main className="flex flex-1 flex-col gap-6 p-8 max-w-3xl w-full mx-auto  ">
   
        <div className="flex flex-col justify-center items-center">
   
      <p className="text-3xl font-bold text-center"> Can you touch your toes?</p>
        </div>
        
  <div className="border-2 bg-white px-5 rounded-2xl pb-2">
<QuestionPhoto image={["/images/standing-1.png" , "/images/standing-2.png" , "/images/standing-3.png"]} route={'questions/stading'} />

  </div>

    <ButtonPushRoute route='/' classname="" text='NEXT'/>
    
    <ProgressBar />
      </main>

      <footer className="border-t p-2 ">
        <p className="text-neutral-700">© 2026 Wellness.chat</p>
      </footer>

    </div>
  );
}