
import { Menu } from "@/components/ForAllPage/Menu";
import { Footer } from "@/components/ForAllPage/Footer";
import ProgressBar from "@/components/QuestioPage/ProgressBar";
import CustRadioGroup from "@/components/QuestioPage/CustRadioGroup";
export default function Home() {

  return (
    <div className="flex flex-col min-h-screen w-full">

      <header className="w-full"><Menu /></header>

      <main className="flex flex-1 flex-col gap-6 p-8 max-w-3xl w-full mx-auto  ">

        <p className="text-3xl font-bold text-center"> How long do you sit daily? </p>

<div className=" flex flex-col items-center">

<CustRadioGroup 
  fieldkey='3'
  route="/questions/4"  
  fields={[
    { 
      value: "Rarely", 
      title: "Rarely", 
      description: "Less than 1 hour of sitting per day" 
    },
    { 
      value: "Moderate", 
      title: "Moderate", 
      description: "Around 2–4 hours, typical desk work" 
    },
    { 
      value: "A lot", 
      title: "A lot", 
      description: "5+ hours — most of my day is seated" 
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