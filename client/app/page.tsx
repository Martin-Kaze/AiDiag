
import { Menu } from "@/components/ForAllPage/Menu";
import { Footer } from "@/components/ForAllPage/Footer";
import ButtonPushRoute from "@/components/QuestioPage/ButtonPushRoute";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">

      <header className="w-full"><Menu /></header>

      <main className=" relative flex flex-1 flex-col items-center justify-center gap-4 p-8 max-w-3xl w-full mx-auto">

     
        <h1 className="text-2xl font-medium text-neutral-800">Where would you like to start?</h1>
        <p className="text-neutral-500 text-sm mb-4">Choose a path below</p>

        <ButtonPushRoute
          text="Take the Posture Test"
          route="/questions/1"
          classname="w-full max-w-sm"
        />
        <ButtonPushRoute
        disabled={true}
          text="Read the Blog"
          route="/blogs"
          classname="w-full max-w-sm"
        />
        <ButtonPushRoute
        disabled={true}
          text="Go to Forums"
          route="/blogs"
          classname="w-full max-w-sm"
        />
      </main>

     <Footer/>

    </div>
  );
}