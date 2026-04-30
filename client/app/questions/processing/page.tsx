
import { Menu } from "@/components/ForAllPage/Menu";
import { Footer } from "@/components/ForAllPage/Footer";
import LoadingScreen from "./LoadingScreen";
export default function Home() {




  return (
    <div className="flex flex-col min-h-screen w-full items-center">

      <header className="w-full"><Menu /></header>

      <main className="flex flex-1 flex-col gap-6 p-8 max-w-3xl w-full mx-auto">

         <p className="text-xl font-bold text-center"> Processing your personal program</p>

      <LoadingScreen
  items={["Fetching answers", "Loading data", "Compearing data", "Making Plan", "Generating program"]}
  route="/questions/personal-program"
  
/>

      </main>

     

    </div>
  );
}