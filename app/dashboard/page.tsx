"use client";

import React from "react"; 
import { Plus, Database, Activity, Zap, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const metrics = [
  { label: "Usage", val: "84.2 GB", icon: Database },
  { label: "Requests", val: "1.2M", icon: Activity },
  { label: "Latency", val: "14ms", icon: Zap },
  { label: "Health", val: "99.9%", icon: Activity },
];

const projects = [
  { name: "users_db", type: "POSTGRESQL", status: "Active" },
  { name: "analytics_v2", type: "MONGODB", status: "Active" },
  { name: "logs_store", type: "MYSQL", status: "Active" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-10 md:space-y-14">
      {/* ─── HEADER: High Contrast ─── */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Databases</h1>
        <Button className="bg-white text-black hover:bg-[#E5E5E5] h-10 md:h-12 px-5 md:px-6 text-xs md:text-sm font-bold rounded-md transition-transform active:scale-95">
          <Plus className="w-4 h-4 mr-2" /> New Database
        </Button>
      </div>

      {/* ─── KEY METRICS: Grid that doesn't mess up on mobile ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {metrics.map((s, i) => (
          <div key={i} className="bg-[#0A0A0A] border border-white/[0.08] p-5 md:p-6 rounded-lg group">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <span className="text-[10px] md:text-xs font-bold text-[#666] uppercase tracking-widest">{s.label}</span>
              <s.icon className="w-4 h-4 text-[#444] group-hover:text-white transition-colors" />
            </div>
            <p className="text-xl md:text-3xl font-bold text-white tracking-tight">{s.val}</p>
          </div>
        ))}
      </div>

      {/* ─── PROJECT LIST: Mobile Optimized Flat List ─── */}
      <div className="space-y-6">
        <h2 className="text-[10px] md:text-xs font-bold text-[#444] uppercase tracking-[0.2em] px-1">Your Projects</h2>
        
        <div className="flex flex-col gap-3">
          {projects.map((db) => (
            <div key={db.name} className="flex items-center justify-between p-4 md:p-5 rounded-lg bg-[#0A0A0A] border border-white/[0.08] hover:border-white/20 transition-all active:bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-md bg-white/[0.03] flex items-center justify-center border border-white/[0.08]">
                  <Database className="w-5 h-5 md:w-6 md:h-6 text-white/50" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm md:text-base text-[#EDEDED]">{db.name}</span>
                  <span className="text-[9px] md:text-[10px] font-mono text-[#555] uppercase tracking-wider mt-0.5">{db.type}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 md:gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="hidden xs:inline text-[10px] md:text-[11px] font-bold text-[#EDEDED] uppercase tracking-widest">{db.status}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-[#444] hover:text-white">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}