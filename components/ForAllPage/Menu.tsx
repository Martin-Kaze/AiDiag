'use client'

import { Menubar, MenubarMenu } from "@/components/ui/menubar"
import Link from "next/link"

export function Menu(  ) {
  return (
    <Menubar className="relative p-2 py-7 bg-white w-full rounded-none border-b shadow-sma">
      <MenubarMenu>

      </MenubarMenu>
      <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-xl font-bold uppercase">
        Wellness
      </Link>
    </Menubar>
  )
}