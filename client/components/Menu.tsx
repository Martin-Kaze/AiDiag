import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

import Link from "next/link"
import { Logs } from 'lucide-react';
import { User } from 'lucide-react'
import { MessageSquarePlus } from 'lucide-react'
export function Menu () {
    return (

<Menubar className="relative p-2 bg-background w-full">
  <MenubarMenu >
    <MenubarTrigger className="border">Menu</MenubarTrigger>
    <MenubarContent>
      <MenubarGroup>
        <MenubarItem>
           <User size={32} strokeWidth={1} absoluteStrokeWidth /> Account
        </MenubarItem>
        <MenubarItem>
          <MessageSquarePlus size={50} strokeWidth={1} absoluteStrokeWidth />
          New Chat
          </MenubarItem>
      </MenubarGroup>
      <MenubarSeparator />
      <MenubarGroup>
        <MenubarItem>Settings</MenubarItem>
        <MenubarItem>About</MenubarItem>
      </MenubarGroup>
    </MenubarContent>
  </MenubarMenu>
  <Link 
  href={"/"}
  className="absolute left-1/2 -translate-x-1/2 text-xl font-bold tracking-widest uppercase"
  >
  Wellness
  </Link>
  <link ></link>
</Menubar>
    )

}
