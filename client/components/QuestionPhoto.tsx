'use client'
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button";
import Image from "next/image";


interface QuestionPhotoProps {
  image: [string, string, string];
  route: string;
}

const QuestionPhoto = ( props : QuestionPhotoProps ) => {
    const [api, setApi] = useState<CarouselApi>();
    const [Current, SetCurrent] = useState <number> (0);

    useEffect(() => {
  if (!api) return
  api.on("select", () => SetCurrent(api.selectedScrollSnap()));
}, [api])


  return (

    <>
      <div className="w-full px-8">  {/* 👈 px-8 makes room for the buttons */}
  <Carousel setApi={setApi} className="w-full" >
    <CarouselContent>
      <CarouselItem className=" ">
        <div className="relative w-full h-75 ">
          <Image className="object-contain " priority  src={props.image[0]} alt="photo" fill   sizes="(max-width: 968px) 100vw, 900px"/>
        </div>
      </CarouselItem>
      <CarouselItem className="">
        <div className="relative w-full h-75">
          <Image className="object-contain" src={props.image[1]} alt="photo" fill  sizes="(max-width: 768px) 100vw, 600px" />
        </div>
      </CarouselItem>
      <CarouselItem className=" "> 
        <div className="relative w-full h-75">
          <Image className="object-contain " src={props.image[2]} alt="photo" fill   sizes="(max-width: 768px) 100vw, 600px"/>
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</div>

        <div className="flex-col">
            
         <Slider value={[Current]} defaultValue={[0]} max={2} step={1} onValueChange={ (data) => {  SetCurrent(data[0]); api?.scrollTo(data[0])  }} />
         <div className="flex justify-between mt-5 text-xl ">
            <p> 1</p> <p>2</p> <p>3</p>
         </div>
        
        </div>
       
         
    
    </>
              
  )
}

export default QuestionPhoto