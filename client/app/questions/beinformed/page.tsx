
import { Menu } from "@/components/ForAllPage/Menu";
import { Footer } from "@/components/ForAllPage/Footer";
import ButtonPushRoute from "@/components/QuestioPage/ButtonPushRoute";
import Image from 'next/image'
import Oragn from  '../../../public/svgs/CrushedOrgan.svg';
import Brain from  '../../../public/svgs/brain-svgrepo-com.svg';
import Skull from '../../../public/svgs/ugly.svg'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen w-full">

      <header className="w-full"><Menu /></header>

      <main className="flex flex-1 flex-col gap-6 p-8 max-w-3xl w-full mx-auto  ">

        <p className="text-3xl font-bold text-center"> Did you know that bad posture can cause?</p>

<div className="flex w-full max-w-md flex-col gap-6 mx-auto">
     
      <Item variant="outline" className="bg-neutral-100">
        <ItemMedia variant="icon">
           <Image src={Skull} height={110} alt="pain"/>
        </ItemMedia>
        <ItemContent>
          <ItemTitle><p className="font-bold "> Less attractive (up to -40%) </p> </ItemTitle>
          <ItemDescription>
            Studies suggest poor posture is often perceived as significantly less attractive.
          </ItemDescription>
        </ItemContent>
      </Item>

     
     <Item variant="outline" className="bg-neutral-100">
        <ItemMedia variant="icon">
           <Image src={Oragn} height={110} alt="pain"/>
        </ItemMedia>
        <ItemContent>
          <ItemTitle><p className="font-bold  "> Crushed Organs & Poor Digestion </p></ItemTitle>
          <ItemDescription>
           Compresses your abdominal organs, and even reduce lung capacity by up to 30% 
          </ItemDescription>
        </ItemContent>
      </Item>

      <Item variant="outline" className="bg-neutral-100">
        <ItemMedia variant="icon">
           <Image src={Brain} height={110} alt="pain"/>
        </ItemMedia>
        <ItemContent>
          <ItemTitle><p className="font-bold ">  Brain Fog & Mood Problems </p></ItemTitle>
          <ItemDescription>
          Educed oxygen flow from shallow breathing affects concentration and memory.
          </ItemDescription>
        </ItemContent>
      </Item>

    </div>

   <ButtonPushRoute classname="mt-2" text="Understood" route="/questions/analysis"/>
  
      </main>

      <Footer/>

    </div>
  );
}