import { Inter } from "next/font/google";
import { SidebarNav } from "@/components/sidebar-nav";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} flex flex-col md:flex-row min-h-screen bg-[#050505] text-[#EDEDED] antialiased`}>
      <SidebarNav />
      <main className="flex-1 p-6 md:p-12 lg:p-16">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}