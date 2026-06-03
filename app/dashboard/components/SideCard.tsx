
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CustAvatarGroup } from "./CustAvatarGroup"

const SideCard = () => {
  return (
    <Card className=" mx-auto w-full min-w-50 pt-0">
     
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Connected</Badge>
        </CardAction>
        <CardTitle>Connect Social Media</CardTitle>
        <CardDescription>
         Allows AI anayse your subcription channels
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <CustAvatarGroup/>
      </CardFooter>
    </Card>
  )
}

export default SideCard