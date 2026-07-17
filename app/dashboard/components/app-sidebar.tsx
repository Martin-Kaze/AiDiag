'use client'
import * as React from "react"
import { GalleryVerticalEnd, BarChart3, SlidersHorizontal } from "lucide-react"

import { Separator } from "@base-ui/react"
import { ScoreCard } from "./ScoreCard"
import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldGroup,
} from "@/components/ui/field"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter
} from "@/components/ui/sidebar"

import { useSidebar } from "@/components/ui/sidebar"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { LoginForm } from "./login-form"




export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const [criteria, setCriteria] = useState<string>("")
  const [goals, setGoals] = useState<string>("")
  const [cirtNumb, setCirtNumb] = useState<number>(0)
  const [scoreOpen, setScoreOpen] = useState(false)
  const [prefsOpen, setPrefsOpen] = useState(false);

  const [session, setSession] = useState<typeof authClient.$Infer.Session | null>(null);
  const [isPending, setIsPending] = useState(true);

  const { toggleSidebar, isMobile } = useSidebar();
  const router = useRouter();


   async function logout() {
    await authClient.signOut();
    router.push("/");
  }

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      setSession(data);
      setIsPending(false);
    });
  }, []);


  useEffect(() => {
    const criteria = localStorage.getItem("criteria")
    const goals = localStorage.getItem("goals")
    if (criteria) setCriteria(criteria)
    if (goals) setGoals(goals)
  }, [])

  useEffect(() => {
    localStorage.setItem("criteria", criteria)
    localStorage.setItem("goals", goals)
  }, [criteria, goals])

  return (
    <Sidebar {...props}>
      <SidebarHeader className="px-3 py-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="sm"
              render={
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex aspect-square size-6 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                    <GalleryVerticalEnd className="size-3.5" />

                  </div>
                  <span className="truncate font-medium text-sm">Settings</span>
                  {isMobile && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-[90%] size-8 shrink-0"
                      onClick={toggleSidebar}
                    >
                      <X className="size-4" />

                    </Button>)}
                </div>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
        <Separator />
      </SidebarHeader>

      <SidebarContent className="gap-1">

        {isPending ? (
          <div className=" m-5 px-3  text-sm text-muted-foreground">Loading…</div>
        ) : !session ? (

          <Dialog>

            <DialogTrigger render={<Button className="m-2 shadow my-2"  variant="default">Login</Button>} />
            <DialogContent className="sm:max-w-sm">
              <LoginForm />
            </DialogContent>
          </Dialog>) : (


          <>
            <SidebarGroup className="px-3 py-2">
              <SidebarGroupLabel className="px-0 text-xs">Overview</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Drawer swipeDirection={isMobile ? "down" : "right"} open={scoreOpen} onOpenChange={setScoreOpen}>
                    <DrawerTrigger render={<SidebarMenuButton>
                      <BarChart3 className="size-4" />
                      <span>View score</span>
                    </SidebarMenuButton>}>

                    </DrawerTrigger>
                    <DrawerContent>
                      <div className="mx-auto w-full flex flex-col ">
                        <DrawerHeader>
                          <DrawerTitle className="self-center">Your score</DrawerTitle>

                        </DrawerHeader>
                        <div className=" mt-5 px-4 pb-4">
                          <ScoreCard className="w-full" />
                        </div>
                        <DrawerFooter>
                          <DrawerClose render={<Button variant="outline">Close</Button>}>

                          </DrawerClose>
                        </DrawerFooter>
                      </div>
                    </DrawerContent>
                  </Drawer>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup className="px-3 py-2">
              <SidebarGroupLabel className="px-0 text-xs">Preferences</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Drawer swipeDirection={isMobile ? "down" : "right"} open={prefsOpen} onOpenChange={setPrefsOpen}>
                    <DrawerTrigger render={<SidebarMenuButton>
                      <SlidersHorizontal className="size-4" />
                      <span>Edit preferences</span>
                    </SidebarMenuButton>}>

                    </DrawerTrigger>
                    <DrawerContent>
                      <div className="mx-auto w-full max-w-md">
                        <DrawerHeader>
                          <DrawerTitle>Preferences</DrawerTitle>
                          <DrawerDescription>
                            Tell us what you want more or less of.
                          </DrawerDescription>
                        </DrawerHeader>

                        <div className="px-4 pb-2">
                          <FieldGroup className="gap-4">
                            <Field>
                              <FieldLabel htmlFor="block-end-input">
                                Your wellness goals
                              </FieldLabel>
                              <InputGroup className="h-auto">
                                <InputGroupInput
                                  id="block-end-input"
                                  placeholder="Write shortly..."
                                  value={goals}
                                  onChange={(e) => {
                                    if (e.target.value.length > 280) return
                                    setGoals(e.target.value)
                                  }}
                                />
                                <InputGroupAddon align="block-end" />
                              </InputGroup>
                              <FieldDescription>
                                What are your goals for this app?
                              </FieldDescription>
                            </Field>

                            <Field>
                              <FieldLabel htmlFor="block-end-textarea">
                                Your criteria for channels
                              </FieldLabel>
                              <InputGroup
                                className={cn(criteria.length > 280 ? "bg-red-100" : "")}
                              >
                                <InputGroupTextarea
                                  id="block-end-textarea"
                                  placeholder="e.g. Religion, Politics"
                                  className="min-h-24"
                                  value={criteria}
                                  onChange={(e) => {
                                    const value = e.target.value
                                    if (value.length > 280) return
                                    setCriteria(value)
                                    setCirtNumb(value.length)
                                  }}
                                />
                                <InputGroupAddon align="block-end">
                                  <InputGroupText>{cirtNumb}/280</InputGroupText>
                                </InputGroupAddon>
                              </InputGroup>
                              <FieldDescription>
                                Describe the kinds of channels you want to see or avoid.
                              </FieldDescription>
                            </Field>
                          </FieldGroup>
                        </div>

                        <DrawerFooter>
                          <Button onClick={() => setPrefsOpen(false)}>Save</Button>
                          <DrawerClose render={<Button variant="outline">Cancel</Button>}>

                          </DrawerClose>
                        </DrawerFooter>
                      </div>
                    </DrawerContent>
                  </Drawer>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

          </>

        )

        }

      </SidebarContent>
      <SidebarFooter>

      </SidebarFooter>
        {session ? <Button variant="default" className="shadow mb-3 mx-2" onClick={logout}>Logout</Button> : null}
      <SidebarRail />
    </Sidebar>
  )
}