
import { Menu } from "@/components/ForAllPage/Menu";

import ProgressBar from "@/components/QuestioPage/ProgressBar";
import CustRadioGroup from "@/components/QuestioPage/CustRadioGroup";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import  workout  from "@/public/images/9.png"
import Image from "next/image";
import { Footer } from "@/components/ForAllPage/Footer";
export default function Home() {

  return (
    <div className="flex flex-col min-h-screen w-full">

      <header className="w-full"><Menu /></header>

      <main className="flex flex-1 flex-col gap-6 p-8 max-w-3xl w-full mx-auto  ">

        <p className="text-3xl font-bold text-center"> What features your ideal workout have? </p>

<div className=" flex flex-col items-center">

    <div className="w-full max-w-sm">
      <AspectRatio ratio={16 / 9} className="rounded-lg bg-transparent">
        <Image
          src={workout}
          alt="Photo"
          
          className="w-full rounded-lg object-cover  "
        />
      </AspectRatio>
    </div>


 <CustRadioGroup 
        fieldkey="9"
        route="/questions/your-name"
        className=" flex justify-items-center"  
        fields={[
    { 
      value: "Light", 
      title: "Light", 
      description: " " 
    },
    { 
      value: "Comftort", 
      title: "Comftort", 
      description: "" 
    },
    { 
      value: "Variety", 
      title: "Variety", 
      description: "" 
    }
                  ]} 
        />

</div>
       

    <ProgressBar/>

      </main>

      <Footer/>

    </div>
  );
}