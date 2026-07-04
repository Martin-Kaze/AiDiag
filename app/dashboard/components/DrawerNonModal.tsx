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

export function DrawerNonModal() {
  return (
    <Drawer modal={false} disablePointerDismissal swipeDirection="right">
      <DrawerTrigger render={<Button className="ml-0" variant="outline">Login</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="self-center ">Settings</DrawerTitle>
        </DrawerHeader>
        
          
          <LoginForm/>
      
        <DrawerFooter>
          <DrawerClose render={<Button>Close</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
