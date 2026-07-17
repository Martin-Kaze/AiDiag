import { Menu } from "@/components/ForAllPage/Menu";
import { DashboardClient } from "./components/DashboardClient";
import { Footer } from "@/components/ForAllPage/Footer";


export default async function Page() {


  return (
    <div className="flex flex-col  min-h-screen w-full">

      <header className="w-full"><Menu /></header>

      <main className="flex flex-col flex-1 w-full  items-center gap-4 py-8
                 ">



        <DashboardClient
          className="w-[80vw] "
        />



      </main>



      <Footer />

    </div>
  );
}