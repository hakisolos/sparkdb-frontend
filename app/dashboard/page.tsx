"use client";

import React, { useState, useEffect } from "react"; 
import { MoreVertical, Plus, Database, Activity, Timer, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const databases = [
  { name: "users_db", type: "PostgreSQL", region: "us-east-1", emoji: "🐘" },
  { name: "analytics", type: "MongoDB", region: "eu-west-1", emoji: "🍃" },
  { name: "logs_db", type: "MySQL", region: "us-east-1", emoji: "🐬" },
];

// We extract the stats into an array so we don't duplicate code for Mobile vs Desktop
const statsData = [
  {
    title: "Total Databases",
    value: "15",
    icon: Database,
    content: (
      <div className="flex items-center mt-1">
        <span className="relative flex h-2.5 w-2.5 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
        </span>
        <p className="text-xs text-muted-foreground">All systems running</p>
      </div>
    ),
  },
  {
    title: "Active Connections",
    value: "8",
    icon: Activity,
    content: (
      <p className="text-xs text-green-500 dark:text-green-400 mt-1">
        +2 since last hour
      </p>
    ),
  },
  {
    title: "Uptime",
    value: "99.9%",
    icon: Timer,
    content: (
      <>
        <Progress value={99.9} className="h-1.5 mt-3 mb-1" />
        <p className="text-xs text-muted-foreground">Target: 99.99% this month</p>
      </>
    ),
  },
  {
    title: "Avg. Response Time",
    value: "320ms",
    icon: Zap,
    content: (
      <p className="text-xs text-muted-foreground mt-1">
        -40ms from yesterday
      </p>
    ),
  },
];

export default function DashboardPage() {
  const [currentStat, setCurrentStat] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Auto-cycle timer (Set to 3 seconds so users actually have time to read it!)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % statsData.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Native Swipe Logic
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentStat((prev) => (prev + 1) % statsData.length);
    } else if (isRightSwipe) {
      setCurrentStat((prev) => (prev - 1 + statsData.length) % statsData.length);
    }
    // Reset
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="max-w-5xl w-full mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />
          <Button className="bg-violet-600 hover:bg-violet-500 text-white gap-2 shadow-md size-9 md:w-auto md:px-4">
            <Plus className="w-4 h-4 md:mr-1 shrink-0" />
            <span className="hidden md:inline">New Database</span>
          </Button>
        </div>
      </div>

      {/* 📱 MOBILE VIEW: Auto-fading, swipeable stat card */}
      <div className="block sm:hidden mb-8">
        <Card 
          className="shadow-sm relative h-[140px] overflow-hidden bg-card"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            const isActive = index === currentStat;
            return (
              <div
                key={stat.title}
                className={cn(
                  "absolute inset-0 p-5 transition-opacity duration-500 ease-in-out",
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                )}
              >
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="text-3xl font-bold mt-1">{stat.value}</div>
                  {stat.content}
                </div>
              </div>
            );
          })}
          
          {/* Pagination Dots */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
            {statsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStat(idx)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  idx === currentStat ? "w-4 bg-violet-500" : "w-1.5 bg-muted-foreground/30"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </Card>
      </div>

      {/* 💻 DESKTOP VIEW: Standard Premium Grid */}
      <div className="hidden sm:grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                {stat.content}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Database List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Your Databases</h2>
        </div>
        
        <div className="flex flex-col gap-3">
          {databases.map(({ name, type, region, emoji }) => (
            <div
              key={name}
              className="group flex items-center justify-between rounded-xl p-3 md:p-4 border border-border bg-card shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 md:gap-4 min-w-0">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted shrink-0 text-xl">
                  {emoji}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-semibold text-sm text-foreground truncate">{name}</span>
                  <span className="text-xs text-muted-foreground hidden sm:block truncate">{type}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-6 shrink-0">
                <span className="text-xs text-muted-foreground hidden md:inline">{region}</span>
                <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400 dark:bg-green-500/10 border-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
                  Running
                </Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}