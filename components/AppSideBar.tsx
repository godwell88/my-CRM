
"use client"

import { useRouter, usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarSeparator,
} from "@/components/ui/sidebar"

import {
  LayoutDashboard,
  ChartColumn,
  Settings,
  HelpCircle,
  LogOut,
  PersonStanding,
  Calendar,
} from "lucide-react"

const mainMenu = [
  {
    title: "Customers",
    url: "/customers",
    icon: PersonStanding,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: ChartColumn,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: LayoutDashboard,
  },
  {
    title: "Marketing Campaigns",
    url: "/campaigns",
    icon: LayoutDashboard,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export default function AppSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="top-16 h-[calc(100svh-4rem)]">
      {/* Sidebar heading */}
      <SidebarHeader>
        <div className="px-3 py-3 text-lg font-bold">
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      {/* Main menu */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Main Menu
          </SidebarGroupLabel>

          <SidebarMenu className="bg-grey-300">
            {mainMenu.map((item) => {
              const isActive = pathname === item.url ||
                pathname.startsWith(item.url + "/")

              return (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={isActive}
                    onClick={() => router.push(item.url)}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Help Center"
              isActive={pathname === "/help"}
              onClick={() => router.push("/help")}
            >
              <HelpCircle />
              <span>Help Center</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Log out"
              onClick={() => router.push("/logout")}
            >
              <LogOut />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
