"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Database, Link2, Code2, Settings, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Databases", href: "/dashboard/databases", icon: Database },
  { label: "Connections", href: "/dashboard/connections", icon: Link2 },
  { label: "SDK & ORM", href: "/dashboard/sdk", icon: Code2 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="w-[210px] min-h-screen flex flex-col px-3 py-5 border-r border-border bg-background">
      {/* Logo */}
      <div className="flex items-center gap-2 px-3 mb-6">
        <Zap className="w-5 h-5 text-violet-500" />
        <span className="font-bold text-lg text-foreground">SparkDB</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 flex-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                active
                  ? "bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400 font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Theme toggle */}
      <div className="px-2 pt-4 border-t border-border">
        <ThemeToggle />
      </div>
    </aside>
  );
}