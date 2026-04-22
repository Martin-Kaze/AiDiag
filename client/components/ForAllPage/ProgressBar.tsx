
'use client'
import { Progress } from "@/components/ui/progress"
import { useSelector } from "react-redux"


const ProgressBar = () => {
    const progress = useSelector((state: any) => state.ProgressReducer.progress);
  return (
    <Progress value={progress} />
  )
}

export default ProgressBar