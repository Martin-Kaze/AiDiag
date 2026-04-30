
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
    const progress = useSelector((state: RootState) => state.UserInputReducer.selections);
    console.log(progress);
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
       <Progress className="h-5 border-2"value={10*Object.keys(progress).length} />
     
    </Field>
   
  )
}

export default ProgressBar