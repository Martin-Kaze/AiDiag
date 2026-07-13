import { Button } from "@/components/ui/button";
import { BadgeCheckIcon, ChevronRightIcon , Landmark, ScanHeart} from "lucide-react"


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"


import { Marker, MarkerContent } from "@/components/ui/marker"

import { MoveUpLeft } from 'lucide-react';

import Image from "next/image";
import img from "@/public/well.svg"
interface HeroButton {
  text: string;
  url: string;
}

interface HeroProps {
  heading?: string;
  subheadingItalic?: string;
  subheadingBold?: string;
  description?: string;
  buttons?: {
    primary: HeroButton;
    secondary: HeroButton;
  };
}

export default function Hero({
  subheadingItalic = "Understand how your",
  subheadingBold = "YouTube habits shape your wellbeing.",
  description = " ",
  buttons = {
    primary: { text: "Get Started", url: "/dashboard" },
    secondary: { text: "Read Terms", url: "/terms" },
  },
}: HeroProps) {
  return (
    <section className="flex flex-col items-center text-center px-4 py-10 max-w-3xl mx-auto ">


      <p className="text-3xl font-quicksand font-semibold text-black ">
        <span className="font-quicksand font-bold">
          {subheadingItalic} <br></br>
        </span>{" "}
        <span className=" font-semibold">{subheadingBold}</span>
      </p>

<div className="flex mt-5">

  <div className="flex flex-1 shrink w-full max-w-md flex-col gap-6 justify-center ">
     
      <Item variant="outline" className="shadow" size="sm" render={<a href="/dashboard?button=channel"><ItemMedia>
          <BadgeCheckIcon className="size-5 text-blue-400" />
        </ItemMedia><ItemContent>
          <ItemTitle className="text-black">Analyse Youtube Channels.</ItemTitle>
        </ItemContent><ItemActions>
          <ChevronRightIcon className="size-4 " />
        </ItemActions></a>} />
         <Item variant="outline" className="shadow" size="sm" render={<a href="/dashboard?button=politics"><ItemMedia>
          <Landmark className="size-5 text-purple-400" />
        </ItemMedia><ItemContent>
          <ItemTitle className="text-black">Learn Channels political stance.</ItemTitle>
        </ItemContent><ItemActions>
          <ChevronRightIcon className="size-4 " />
        </ItemActions></a>} />
        <Item variant="outline" className="shadow" size="sm" render={<a href="/dashboard?button=score"><ItemMedia>
          <ScanHeart className="size-5 text-green-400" />
        </ItemMedia><ItemContent>
          <ItemTitle className="text-black">Get AI made Wellness Score.</ItemTitle>
        </ItemContent><ItemActions>
          <ChevronRightIcon className="size-4 " />
        </ItemActions></a>} />
    </div>
<div className="hidden md:block">
<Image src={img} alt="none" className="size-100" />
</div>

</div>
      

      <div className="mt-8 flex flex-col sm:flex-row gap-3 ">
        <Button size="lg" className="hover:animate-pulse">
          <a href={buttons.primary.url}>{buttons.primary.text}</a>
        </Button>
        <Button size="lg" variant="outline" >
          <a href={buttons.secondary.url}>{buttons.secondary.text}</a><MoveUpLeft />
        </Button>
      </div>

<Marker variant="separator" className="my-10 " >
  <MarkerContent>
    More Info
  </MarkerContent>
</Marker>

      <Accordion defaultValue={["info"]} className=" bg-white ">
        <AccordionItem value="info">
          <AccordionTrigger>What does Wellness.chat do?</AccordionTrigger>
          <AccordionContent> Wellness.chat securely connects to your YouTube account (read-only) and uses AI to analyse your channel subscriptions. It provides personalised insights into how the content you follow may influence your wellbeing, mental health, and daily habits. </AccordionContent>
        </AccordionItem>
        <AccordionItem value="privacy">
          <AccordionTrigger>What happens to my data?</AccordionTrigger>
          <AccordionContent> We only request read-only access to your YouTube subscriptions. We never post to your account, modify your YouTube data, or access anything beyond the permissions you grant. </AccordionContent>
        </AccordionItem> <AccordionItem value="support">
          <AccordionTrigger>How can I contact support?</AccordionTrigger>
          <AccordionContent> If you have any questions or need assistance, you can contact us by email using the Contact link in the footer. </AccordionContent>
        </AccordionItem>
      </Accordion>

    </section>
  );
}