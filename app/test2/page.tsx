
import { Footer } from "@/components/ForAllPage/Footer";
import { Menu } from "@/components/ForAllPage/Menu";
import { CustAvatarGroup } from "@/components/ForDashboad/CustAvatarGroup";
import FeedSection from "../dashboard/FeedSection";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner"
import { Skeleton } from "@/components/ui/skeleton"
import youtube from "@/lib/youtube";
import { UserInput } from '@/components/FirstPage/UserInput'
import AnaliseButton from '@/components/FirstPage/AnaliseButton'
import AddedSympt from '@/components/ForAllPage/AddedSympt'

export default async function Dashboard() {


  const data = ['e'];

  return (

    <div className="flex flex-col min-h-screen w-full">

      <header className="w-full">
        <Menu />
      </header>

      <main className="relative flex flex-1 flex-col items-center justify-center gap-4 p-8 max-w-3xl w-full mx-auto">

        <p className="text-3xl font-bold text-center"> Your subcriptions</p>

        <CustAvatarGroup data={data} />


          <p className="text-xl  text-center"> Describe your for feed makes you fell </p>
            
              
            <UserInput/>
                  
                <AddedSympt/>
                <AnaliseButton/>


        <Suspense fallback={<> <p> <Spinner className="justify-center mx-auto" /> Loading channel feeds...</p> <br></br>  <div className="flex w-full max-w-sm flex-col gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="flex gap-4" key={index}>
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div> </>}>

          <FeedSection subscriptions={data} />
        </Suspense>


      </main>

      <Footer />

    </div>

  );
}