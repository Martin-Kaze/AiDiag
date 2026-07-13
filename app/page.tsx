import Hero from "@/components/Hero";
import { Footer } from "@/components/ForAllPage/Footer";
import { Menu } from "@/components/ForAllPage/Menu";

export default function Page() {
  return (
   
    <div className="flex min-h-screen w-full flex-col">
       <Menu/>
      <main className="flex-1">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}