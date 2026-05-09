
import { Menu } from "@/components/ForAllPage/Menu";
import { UserInput } from "@/components/ForAllPage/UserInput";
import AddedSympt from "@/components/ForAllPage/AddedSympt";
import AnaliseButton from "@/components/ForAllPage/AnaliseButton";
export default function Home() {

  return (
    <div className="flex flex-col min-h-screen w-full">

      <header className="w-full"><Menu /></header>

      <main className="flex flex-1 flex-col gap-6 p-8 max-w-3xl w-full mx-auto  ">

        <p className="text-3xl font-bold text-center"> Describe your psyhological symptoms! </p>

     <UserInput/>
      
    <AddedSympt/>
    <AnaliseButton/>
      </main>

      <footer className="border-t p-2 ">
        <p className="text-neutral-700">© 2026 Wellness.chat</p>
      </footer>

    </div>
  );
}