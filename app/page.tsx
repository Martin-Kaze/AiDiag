import { Hero } from "@/components/Hero";
import { Menu } from "@/components/ForAllPage/Menu";

export default function Page() {
  
  return (
  <>
   <div className="flex flex-col min-h-screen w-full">
  <Menu nosidebar={true}/>
        <main >
        <Hero className=""/>;

        </main>
  

 

  </div>
  </>
  )
}