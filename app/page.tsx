import { Hero } from "@/components/Hero";
import { Menu } from "@/components/ForAllPage/Menu";
import { Footer } from "@/components/ForAllPage/Footer";

export default function Page() {

  return (

    <div className="flex flex-col min-h-screen w-full">
      <Menu nosidebar={true} />
      <main >
        <Hero className="" />
      </main>
      <Footer />
    </div>

  )
}