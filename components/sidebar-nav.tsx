"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Database, Link2, Code2, Settings, Zap, Menu, User } from "lucide-react";
import { cn, getUserProfile } from "@/lib/utils"; // Make sure to import the function!
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Databases", href: "/dashboard/databases", icon: Database },
  { label: "Connections", href: "/dashboard/connections", icon: Link2 },
  { label: "SDK & ORM", href: "/dashboard/sdk", icon: Code2 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Fetch the user profile on component mount
  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getUserProfile();
        setUser(data);
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    }
    loadProfile();
  }, []);

  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    <nav className="flex flex-col gap-1 w-full">
      {navItems.map(({ label, href, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={() => isMobile && setIsOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
              active
                ? "bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400 font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* 📱 MOBILE VIEW: Top Navigation Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-background shrink-0 w-full relative">
        
        {/* LEFT: Menu Hamburger */}
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0">
              <Menu className="w-5 h-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </PopoverTrigger>
          
          <PopoverContent 
            align="start" 
            className="w-[240px] p-3 flex flex-col mt-2 rounded-xl shadow-lg border-border"
          >
            <div className="mb-2 px-3 py-2 border-b border-border">
              <span className="font-semibold text-sm text-foreground">Menu</span>
            </div>
            
            <div className="flex-1 overflow-y-auto py-1">
              <NavLinks isMobile />
            </div>
            
            <div className="px-1 pt-4 pb-1 mt-2 border-t border-border flex justify-between items-center">
              <span className="text-sm text-muted-foreground px-2">Theme</span>
              <ThemeToggle />
            </div>
          </PopoverContent>
        </Popover>

        {/* CENTER: Logo (Absolute positioned so it's always perfectly centered) */}
        <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2 pointer-events-none">
          <Zap className="w-5 h-5 text-violet-500" />
          <span className="font-bold text-lg text-foreground">SparkDB</span>
        </div>
        
        {/* RIGHT: Avatar */}
        <Avatar className="h-9 w-9 border border-border shadow-sm shrink-0">
          <AvatarImage src={user?.avatar_url} alt={user?.username || "User"} />
          <AvatarFallback className="bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400">
            {user?.username ? user.username.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
          </AvatarFallback>
        </Avatar>

      </div>

      {/* 💻 DESKTOP VIEW: Fixed Sidebar */}
      <aside className="hidden md:flex w-[210px] min-h-screen flex-col px-3 py-5 border-r border-border bg-background shrink-0 z-10">
        {/* Logo */}
        <div className="flex items-center gap-2 px-3 mb-6 shrink-0">
          <Zap className="w-5 h-5 text-violet-500" />
          <span className="font-bold text-lg text-foreground">SparkDB</span>
        </div>
        
        {/* Navigation Links */}
        <div className="flex-1">
          <NavLinks />
        </div>
        
        {/* Bottom Section: Avatar & Theme Toggle side-by-side */}
        <div className="px-2 pt-4 pb-2 border-t border-border mt-auto flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="h-9 w-9 border border-border">
              <AvatarImage src={user?.avatar_url} alt={user?.username || "User"} />
              <AvatarFallback className="bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400">
                {user?.username ? user.username.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
              </AvatarFallback>
            </Avatar>
            {/* Optional: Show username on desktop if there's space */}
            <span className="text-sm font-medium text-foreground truncate hidden lg:block">
              {user?.username || "Loading..."}
            </span>
          </div>
          
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}