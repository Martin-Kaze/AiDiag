'use client'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area" // You need this for scrolling
import { Logs, ShieldCheck, Mail, RefreshCcw, FileText } from 'lucide-react';
import Link from "next/link"

export function Menu() {
  return (
    <Menubar className="relative p-2 bg-background w-full rounded-0 border-b">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer"><Logs /></MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Mail className="mr-2 h-4 w-4" />
            <a href="mailto:yourwellnesschatplan@gmail.com">Contact Support</a>
          </MenubarItem>
          
          <MenubarSeparator />

          {/* REFUND DIALOG */}
          <Dialog>
            <DialogTrigger asChild>
              <MenubarItem onSelect={(e) => e.preventDefault()}>
                <RefreshCcw className="mr-2 h-4 w-4" /> Refund Policy
              </MenubarItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106.25">
              <DialogHeader>
                <DialogTitle>Refund Policy</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-75 w-full rounded-md border p-4">
                <p className="text-sm">
                  We want you to be happy with your Wellness Plan. If you are not satisfied, 
                  you can request a refund within <strong>30 days</strong> of purchase.
                  <br /><br />
                  <strong>How to request:</strong><br />
                  1. Email us at: yourwellnesschatplan@gmail.com<br />
                  2. Provide a brief explanation of why the plan didn't work.<br /><br />
                  Once approved, your refund will be processed back to your original 
                  payment method via Stripe within 5-10 business days.
                </p>
              </ScrollArea>
            </DialogContent>
          </Dialog>

          {/* PRIVACY DIALOG */}
          <Dialog>
            <DialogTrigger asChild>
              <MenubarItem onSelect={(e) => e.preventDefault()}>
                <ShieldCheck className="mr-2 h-4 w-4" /> Privacy Policy
              </MenubarItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106.25">
              <DialogHeader>
                <DialogTitle>Privacy Policy</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-75 w-full p-4">
                <p className="text-sm">
                  Your privacy is important to us. We only collect your email address 
                  via Stripe to send you your Wellness PDF. We never sell your data 
                  to third parties. All payments are processed securely by Stripe.
                </p>
              </ScrollArea>
            </DialogContent>
          </Dialog>

        </MenubarContent>
      </MenubarMenu>

      <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-xl font-bold uppercase">
        Wellness
      </Link>
    </Menubar>
  )
}