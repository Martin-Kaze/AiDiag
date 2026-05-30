'use client'

import { Menubar, MenubarMenu } from "@/components/ui/menubar"
import { SidebarTrigger } from "@/components/ui/sidebar"; // Only one import allowed
import Link from "next/link"

export function Menu() {
  return (
    <Menubar className="relative p-2 bg-background w-full rounded-none border-b">
      <MenubarMenu>
        <SidebarTrigger />
      </MenubarMenu>
      <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-xl font-bold uppercase">
        Wellness
      </Link>
    </Menubar>
  )
}