"use client"

import { SidebarProvider, Sidebar, SidebarInset, SidebarRail } from "@/components/ui/sidebar"
import { SidebarNav } from "./sidebar-nav"

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarRail />
        <SidebarNav />
      </Sidebar>
      <SidebarInset className="p-4 sm:p-6 lg:p-8">
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
