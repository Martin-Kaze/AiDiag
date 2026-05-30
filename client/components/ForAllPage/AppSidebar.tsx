// Inside components/ForAllPage/AppSidebar.tsx
import { Sidebar, SidebarContent, SidebarHeader, SidebarTrigger, SidebarFooter } from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar variant="floating" className="p-0"  >
      <SidebarHeader className="flex flex-row items-center justify-between p-1 border-b">
        <span className=" mx-auto">Menu</span>
           <SidebarTrigger className=""/> 
        
      </SidebarHeader>
      <SidebarContent>
        
      </SidebarContent>

      <SidebarFooter className="border-t">
        hehe 
      </SidebarFooter>
    </Sidebar>
  )
}