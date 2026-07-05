import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { LoginForm } from "@/app/dashboard/components/login-form"

export function DrawerNonModal( props: {name : string ; login : boolean}) {
  return (
    <Drawer modal={false} disablePointerDismissal swipeDirection="right">
      <DrawerTrigger render={<Button className="ml-0" variant="outline">{props.name}</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="self-center "></DrawerTitle>
        </DrawerHeader>
        
          { (props.login)?  null : <LoginForm/>}
         
      
        <DrawerFooter>
          <DrawerClose render={<Button>Close</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
