'use client'

import { Menubar, MenubarMenu } from "@/components/ui/menubar"
import Link from "next/link"

export function Menu( props : { nosidebar? : boolean} ) {
  return (
    <Menubar className="relative p-2 py-5 bg-background w-full rounded-none border-b">
      <MenubarMenu>

      </MenubarMenu>
      <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-xl font-bold uppercase">
        Wellness
      </Link>
    </Menubar>
  )
}