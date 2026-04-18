"use client"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

export default function StartConvButton(props: { 
  children: React.ReactNode
  topic: "heal" | "support" | "clarity"
  className?: string
}) {
  return (
    <Button 
      onClick={() => console.log(props.topic)} 
      size={"lg"} 
      className={cn("flex-1 min-w-20 whitespace-normal h-auto py-1", props.className)}
    >
      {props.children}
    </Button>
  )
}