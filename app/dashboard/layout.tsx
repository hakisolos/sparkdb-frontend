import React from "react"; 
import { SidebarNav } from "@/components/sidebar-nav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    // FIX: Notice the "flex-col md:flex-row" right here!
    // This stacks the sidebar on top of the main content on mobile.
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <SidebarNav />
      <main className="flex-1 p-4 sm:p-8 w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}