// Inside components/ForAllPage/AppSidebar.tsx
import { Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar variant="floating">
      <SidebarHeader className="flex flex-row items-center justify-between p-4">
        <span className="font-bold text-amber-900">Menu</span>
        {/* This trigger will be visible inside the sidebar to close it */}
        <SidebarTrigger /> 
      </SidebarHeader>
      <SidebarContent>
        {/* Your links here */}
      </SidebarContent>
    </Sidebar>
  )
}