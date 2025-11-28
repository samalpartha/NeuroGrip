"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarContent,
  SidebarMenuBadge,
} from "@/components/ui/sidebar"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  BrainCircuit,
  LayoutDashboard,
  HeartPulse,
  Users,
  Settings,
  LogOut,
} from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"

const userAvatar = PlaceHolderImages.find((img) => img.id === "user-avatar-1")

const menuItems = [
  {
    href: "/",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/therapy",
    icon: HeartPulse,
    label: "Therapy",
  },
  {
    href: "/patients",
    icon: Users,
    label: "Patients",
    badge: "3",
  },
  {
    href: "/settings",
    icon: Settings,
    label: "Settings",
  },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <BrainCircuit className="size-6 text-primary" />
          <span className="text-lg font-semibold">NeuroGrip</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                  {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={{ children: "Logout" }}>
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/settings" legacyBehavior passHref>
              <SidebarMenuButton size="lg" tooltip={{ children: "Alex Johnson" }}>
                <Avatar className="size-8">
                  {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" />}
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold">Alex Johnson</span>
                  <span className="text-xs text-muted-foreground">
                    alex.j@example.com
                  </span>
                </div>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  )
}
