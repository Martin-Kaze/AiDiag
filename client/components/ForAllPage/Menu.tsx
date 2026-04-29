'use client'
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
import { DialogDemo } from "./DialogDemo";
import Link from "next/link"
import { Logs } from 'lucide-react';
import { User } from 'lucide-react'
import { MessageSquarePlus } from 'lucide-react'
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
export function Menu () {
  const distpatch :AppDispatch =  useDispatch();
    return (

<Menubar className="relative p-2 bg-background w-full rounded-0">
  <MenubarMenu >
    <MenubarTrigger ><Logs/></MenubarTrigger>
  
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
