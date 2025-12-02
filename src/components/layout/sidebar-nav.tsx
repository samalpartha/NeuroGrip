"use client"

import React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarContent,
} from "@/components/ui/sidebar"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  BrainCircuit,
  Users,
  Settings,
  LogOut,
} from "lucide-react"
import { useUser } from "@/firebase"
import { useToast } from "@/hooks/use-toast"

const menuItems = [
  {
    href: "/patients",
    icon: Users,
    label: "Patients",
  },
  {
    href: "/settings",
    icon: Settings,
    label: "Settings",
  },
]

export function SidebarNav() {
  const pathname = usePathname()
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();

  const handleLogout = () => {
    try {
      // Clear session from localStorage
      localStorage.removeItem('neurogrip_session');
      localStorage.removeItem('neurogrip_user');

      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push("/login");
    } catch (error) {
      // This catch block is mostly for consistency, as localStorage.removeItem rarely fails
      console.error("Logout failed:", error);
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "An error occurred while logging out. Please try again.",
      });
    }
  };

  const getActiveItem = () => {
    if (pathname === '/') return '/patients'; // Default to patients
    const activeItem = menuItems.find(item => item.href !== '/' && pathname.startsWith(item.href));
    return activeItem ? activeItem.href : '/patients';
  }

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
              <SidebarMenuButton
                asChild
                isActive={getActiveItem() === item.href}
                tooltip={{ children: item.label }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} tooltip={{ children: "Logout" }}>
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" tooltip={{ children: user?.displayName || 'User' }}>
              <Link href="/settings">
                <Avatar className="size-8">
                  {user?.photoURL && <AvatarImage src={user.photoURL} alt="User Avatar" />}
                  <AvatarFallback>{user?.displayName?.charAt(0)?.toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold">{user?.displayName || 'User'}</span>
                  <span className="text-xs text-muted-foreground">
                    {user?.email || ''}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  )
}
