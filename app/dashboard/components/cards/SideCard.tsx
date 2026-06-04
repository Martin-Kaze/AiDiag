'use client'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import YtConnButt from "./buttons/YtConnButt"
import FetchYoutubeButt from "./buttons/FetchYoutubeButt"
import { useSelector } from "react-redux"
import { RootState } from "@/state/store"

const SideCard = () => {

  const data = useSelector( (data: RootState) => data.UserInputReducer.YoutuberList);

  return (
    <Card className=" mx-auto w-full min-w-50 pt-0">
     
      <CardHeader>
        <CardAction>
        { (data && data.length > 0) ? <Badge className="bg-green-200" variant="secondary">Have Data</Badge> : <Badge variant="destructive">No Data</Badge>}
        </CardAction>
        <CardTitle>Connect Social Media</CardTitle>
        <CardDescription>
         Allows AI anayse your subcription channels
        </CardDescription>
      </CardHeader>
      <CardFooter>
        
        <YtConnButt/>

        <FetchYoutubeButt/>

      </CardFooter>
    </Card>
  )
}

export default SideCard