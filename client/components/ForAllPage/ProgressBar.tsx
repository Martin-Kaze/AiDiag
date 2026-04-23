
'use client'
import { RootState } from "@/state/store"
import { Progress } from "@/components/ui/progress"
import { useSelector } from "react-redux"
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const ProgressBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  
    const progress = useSelector((state: RootState) => state.UserInputReducer);
    console.log(progress);
    let value = 10;
    if( progress.Selected ){
      value += 10;
    }
    else{
      value -= 10;
    }
    if ( progress.ExplainingSelected){
      value += 10;
    }
    else{
      value -= 10;
    }
  
    useEffect(() => {
  if (pathname === '/questions') {
    if (progress.ExplainingSelected === false || progress.Selected === false) {
      router.push("/");
    }
  }
}, [pathname, progress, router]);
  
  return (
    <Progress value={value} />
  )
}

export default ProgressBar