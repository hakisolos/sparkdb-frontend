"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Database, Link2, Settings, Zap, 
  Command, LayoutDashboard, Sun, Moon 
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Databases", href: "/dashboard/databases", icon: Database },
  { label: "API Keys", href: "/dashboard/connections", icon: Link2 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const ThemeToggle = () => (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-[#888] hover:text-white transition-colors"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );

  return (
    <>
      {/* 📱 MOBILE HEADER */}
      <div className="md:hidden flex items-center justify-between px-6 h-14 bg-background border-b border-border sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-foreground fill-current" />
          <span className="font-bold tracking-tight">SparkDB</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="text-[#888] hover:text-foreground transition-colors outline-none">
                <Command className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-background border-r border-border p-0 flex flex-col">
              <SheetHeader className="p-6 border-b border-border">
                <SheetTitle className="text-foreground text-left font-bold flex items-center gap-2">
                  <Zap className="w-4 h-4" /> SparkDB
                </SheetTitle>
              </SheetHeader>
              <nav className="p-4 space-y-1 flex-1">
                {navItems.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href} 
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-colors",
                      pathname === item.href ? "bg-accent text-accent-foreground" : "text-[#888] hover:text-foreground"
                    )}
                  >
                    <item.icon className="w-4 h-4" /> {item.label}
                  </Link>
                ))}
              </nav>
              <div className="p-4 border-t border-border flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <span className="text-sm font-bold">Admin User</span>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* 💻 DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-[260px] min-h-screen flex-col px-4 py-10 border-r border-border bg-background shrink-0 sticky top-0">
        <div className="flex items-center gap-2 px-3 mb-12">
          <Zap className="w-5 h-5 text-foreground fill-current" />
          <span className="font-bold text-xl tracking-tighter text-foreground">SparkDB</span>
        </div>
        
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all",
                pathname === item.href 
                  ? "bg-accent text-accent-foreground shadow-sm" 
                  : "text-[#888] hover:text-foreground hover:bg-accent/50"
              )}
            >
              <item.icon className="w-4 h-4" /> {item.label}
            </Link>
          ))}
        </nav>

        {/* BOTTOM SECTION: Theme + Avatar */}
        <div className="mt-auto pt-6 border-t border-border space-y-4">
          <div className="flex items-center justify-between px-3">
            <span className="text-[10px] font-bold text-[#555] uppercase tracking-widest">Settings</span>
            <ThemeToggle />
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer group">
            <Avatar className="h-8 w-8 border border-border">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="text-[10px] font-bold">AD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-foreground truncate leading-none">Admin Instance</span>
              <span className="text-[10px] font-mono text-[#555] uppercase mt-1">Personal Plan</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}