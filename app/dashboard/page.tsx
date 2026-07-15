import { Menu } from "@/components/ForAllPage/Menu";
import { DashboardClient } from "./components/DashboardClient";
import { ScoreCard } from "./components/ScoreCard";
import { Footer } from "@/components/ForAllPage/Footer";


export default async function Page() {
  
  
  return (
    <div className="flex flex-col  min-h-screen w-full">

      <header className="w-full"><Menu /></header>

    <main className=" flex-1 grid w-full grid-cols-1 justify-items-center gap-4 py-8
                 md:grid-cols-[1fr_auto_1fr]">

  <DashboardClient
    className="w-[80vw] md:col-start-2 md:w-[58vw] "
  />

  <ScoreCard
    className=" h-fit md:col-start-1 md:row-start-1 md:justify-self-end"
  />

  <div className="hidden md:block" />
</main>

    <Footer/>
    
    </div>
  );
}