
'use client'
import { RootState } from "@/state/store"
import { Progress } from "@/components/ui/progress"
import { useSelector } from "react-redux"
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Field, FieldLabel } from "@/components/ui/field"
import { BadgeInfo  , HeartPlus, Brain } from "lucide-react";

const ProgressBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  
    const progress = useSelector((state: RootState) => state.UserInputReducer);
    console.log(progress);
    let value = 5;
    if( progress.Selected ){
      value += 10;
    }
  
    if ( progress.ExplainingSelected){
      value += 10;
    }
    if(progress.Gender){
      value += 5
    }
    if(progress.Age){
      value += 5
    }
  
    useEffect(() => {
  if (pathname === '/questions') {
    if (progress.ExplainingSelected === false || progress.Selected === false) {
      router.push("/");
    }
  }
}, [pathname, progress, router]);
  
  return (
    <Field >
         <FieldLabel  className="flex justify-between pt-5 text-neutral-800" htmlFor="progress-upload">

      <div className="flex flex-col items-center">
      <span >Start</span>
        <BadgeInfo  size={15} />
          </div>
        
         <div className="flex flex-col items-center">
      <span >Analysis</span>
        <Brain  size={15} />
          </div>
       
       <div className="flex flex-col items-center">
      <span > Results</span>
        <HeartPlus size={15} />
          </div>
        </FieldLabel>
       <Progress className="h-5 border-2"value={value} />
     
    </Field>
   
  )
}

export default ProgressBar