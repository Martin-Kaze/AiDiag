import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export function CardDemo() {
  return (
   <Card className="bg-accent">
  <CardHeader className="">
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
    <CardAction><Button> idk asdhasdhkhkasdhakjshd</Button>
    </CardAction>
    
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter className="">
   
  </CardFooter>
</Card>
  )
}
