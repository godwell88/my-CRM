
import Navbar  from "@/components/Navbar";
import type { Metadata } from "next";
import React from "react";
import AppSidebar from "@/components/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";



export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard layout for the CRM application",
};


export default function DashboardLayout({
  children,
  
}: 

Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background text-foreground">
        <nav className="fixed left-0 top-0 z-50 h-16 w-full border-b border-border bg-background">
          <Navbar />
        </nav>

        <div className="flex min-h-screen pt-16">
          <AppSidebar />
          <main className="min-w-0 flex-1">
            <section className="min-h-[calc(100vh-4rem)] p-6">
              {children}
            </section>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
