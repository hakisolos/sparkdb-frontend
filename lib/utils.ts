import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// lib/utils.ts (or lib/api.ts)

const API_BASE_URL = "http://localhost:8080";

export async function generateOtp(email: string) {
  const response = await fetch(`${API_BASE_URL}/auth/otp/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to generate OTP");
  }

  return data;
}

export async function verifyOtp(email: string, otp: string) {
  const response = await fetch(`${API_BASE_URL}/auth/otp/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, otp }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Verification failed");
  }

  return data;
}

// Add this below your OTP functions in lib/utils.ts

export async function getUserProfile() {
  const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    // THE FIX: This tells the browser to send your backend cookies!
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }
  return response.json();
}
