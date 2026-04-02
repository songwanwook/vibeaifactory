"use client"

import * as React from "react"
import { LayoutDashboard, Calendar, Cpu, BrainCircuit, Settings, Activity } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const pathname = usePathname()

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Robot Monitoring", icon: Cpu, path: "/robots" },
    { name: "Production Calendar", icon: Calendar, path: "/calendar" },
    { name: "AI Analysis", icon: BrainCircuit, path: "/ai" },
  ]

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <Activity className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">WeldSense AI</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Enterprise Dashboard</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 mb-2">Navigation</SidebarGroupLabel>
          <SidebarMenu className="px-4">
            {navItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.path}
                  tooltip={item.name}
                  className={`
                    flex items-center gap-3 px-4 py-6 rounded-lg transition-all duration-200
                    ${pathname === item.path 
                      ? "bg-primary/15 text-primary border-l-2 border-primary shadow-[inset_4px_0_0_0_#3399CC]" 
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"}
                  `}
                >
                  <Link href={item.path}>
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="flex items-center gap-3 text-muted-foreground">
              <Settings className="w-5 h-5" />
              <span>System Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}