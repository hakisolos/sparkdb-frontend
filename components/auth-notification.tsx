"use client";

import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthNotificationProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export function AuthNotification({ message, type, onClose }: AuthNotificationProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        "fixed top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border animate-in fade-in slide-in-from-top-4 z-50 min-w-[300px]",
        type === "success"
          ? "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20 text-green-800 dark:text-green-400"
          : "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20 text-red-800 dark:text-red-400"
      )}
    >
      {type === "success" ? (
        <CheckCircle2 className="w-5 h-5 shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 shrink-0" />
      )}
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        onClick={onClose}
        className="shrink-0 opacity-70 hover:opacity-100 transition-opacity p-1"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}