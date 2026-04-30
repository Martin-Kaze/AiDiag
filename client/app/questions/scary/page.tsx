
import { Menu } from "@/components/ForAllPage/Menu";
import { Footer } from "@/components/ForAllPage/Footer";
import PostureHorror from "@/app/questions/scary/text2";

import ButtonPushRoute from "@/components/QuestioPage/ButtonPushRoute";

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen w-full">

      <header className="w-full"><Menu /></header>

      <main className="flex flex-1 flex-col gap-6 p-8 max-w-3xl w-full mx-auto  ">

        <p className="text-3xl font-bold text-center"> This could happen if you have a bad posture! </p>

        <PostureHorror/>

        <ButtonPushRoute text="Understood" route="/questions/9"/>

      </main>

      <Footer/>

    </div>
  );
}