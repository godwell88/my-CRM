
"use client"

import { Moon } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { SidebarTrigger } from "@/components/ui/sidebar"

function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = (value: string) => {
    if (
      value === "system" ||
      value === "light" ||
      value === "dark"
    ) {
      setTheme(value)
    }
  }

  return (
    <nav className="flex h-16 items-center justify-between border-b px-4">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <SidebarTrigger aria-label="Toggle sidebar" />

        <Link
          href="/dashboard"
          className="text-2xl font-serif font-medium"
        >
          2KZ CRM
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Theme Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Choose theme"
              >
                <Moon aria-hidden="true" />
              </Button>
            }
          />

          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuRadioGroup
              value={mounted ? theme ?? "system" : "system"}
              onValueChange={handleThemeChange}
            >
              <DropdownMenuLabel>Theme</DropdownMenuLabel>

              <DropdownMenuRadioItem value="system">
                System
              </DropdownMenuRadioItem>

              <DropdownMenuRadioItem value="light">
                Light
              </DropdownMenuRadioItem>

              <DropdownMenuRadioItem value="dark">
                Dark
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Account Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                aria-label="Open account menu"
              >
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="User avatar"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            }
          />

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>

              <DropdownMenuItem
                render={<Link href="/profile" />}
              >
                Profile
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuLabel>Workspace</DropdownMenuLabel>

              <DropdownMenuItem>Team</DropdownMenuItem>

              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              render={<Link href="/login" />}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default Navbar
