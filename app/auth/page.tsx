"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Zap, Mail, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { AuthNotification } from "@/components/auth-notification";
import { generateOtp, verifyOtp } from "@/lib/utils"; 

export default function AuthPage() {
  const router = useRouter();
  
  // Form States
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  
  // Loading & Notification States
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [countdown, setCountdown] = useState(30);

  // Success Modal States
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [redirectTimer, setRedirectTimer] = useState(3);

  // 1. Resend OTP Countdown Effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "otp" && countdown > 0 && !showSuccessModal) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown, showSuccessModal]);

  // 2. Redirect Countdown Effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSuccessModal && redirectTimer > 0) {
      timer = setInterval(() => setRedirectTimer((prev) => prev - 1), 1000);
    } else if (showSuccessModal && redirectTimer === 0) {
      router.push("/dashboard");
    }
    return () => clearInterval(timer);
  }, [showSuccessModal, redirectTimer, router]);

  // --- API HANDLERS ---
  const handleVerifyEmail = async () => {
    if (!email) return;
    setIsLoading(true);
    setNotification(null);
    
    try {
      await generateOtp(email);
      setStep("otp");
      setCountdown(30);
      setNotification({ message: "Verification code sent to your email.", type: "success" });
    } catch (error: any) {
      setNotification({ message: error.message || "Failed to send code.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      await generateOtp(email);
      setCountdown(30);
      setNotification({ message: "A new code has been sent!", type: "success" });
    } catch (error: any) {
      setNotification({ message: error.message || "Failed to resend code.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);
    setIsLoading(true);

    try {
      await verifyOtp(email, otp);
      setShowSuccessModal(true);
    } catch (error: any) {
      setNotification({ message: error.message || "Invalid verification code.", type: "error" });
      setOtp(""); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative">
      
      {/* Top Right Toast Notification */}
      {notification && !showSuccessModal && (
        <AuthNotification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}

      {/* --- THE SUCCESS MODAL --- */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
          <Card className="w-full max-w-sm shadow-2xl border-border animate-in zoom-in-95 duration-300">
            <CardContent className="pt-8 pb-8 text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Welcome back!
              </h2>
              <p className="text-muted-foreground text-sm font-medium px-4">
                {email}
              </p>
              <div className="pt-4 flex flex-col items-center gap-3">
                <Loader2 className="w-5 h-5 text-violet-500 animate-spin" />
                <p className="text-xs text-muted-foreground">
                  Redirecting to dashboard in {redirectTimer}s...
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => router.push("/dashboard")}
                className="mt-4 text-xs text-muted-foreground hover:text-foreground"
              >
                Skip timer
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Auth Form */}
      <Card className="w-full max-w-md shadow-lg border-border relative z-10">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-violet-600 dark:text-violet-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome to SparkDB
          </CardTitle>
          <CardDescription>
            Enter your email to receive a secure login code.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* EMAIL ROW */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-9"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    // Hydration fix for Input
                    disabled={step === "otp" || isLoading ? true : undefined} 
                    required
                  />
                </div>
                <Button 
                  type="button" 
                  onClick={handleVerifyEmail}
                  // Hydration fix for Verify Button
                  disabled={!email || isLoading || step === "otp" ? true : undefined}
                  className="bg-violet-600 hover:bg-violet-500 text-white shrink-0 min-w-[90px]"
                >
                  {isLoading && step === "email" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : step === "otp" ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    "Verify"
                  )}
                </Button>
              </div>
            </div>

            {/* OTP ROW */}
            <div className={`space-y-3 transition-all duration-500 ${step === "email" ? "opacity-50 grayscale pointer-events-none" : "opacity-100"}`}>
              <Label>Secure Code</Label>
              <div className="flex justify-center">
                <InputOTP 
                  maxLength={4} 
                  value={otp} 
                  onChange={setOtp}
                >
                  <InputOTPGroup className="gap-2">
                    {[...Array(4)].map((_, index) => (
                      <InputOTPSlot 
                        key={index} 
                        index={index} 
                        className="w-12 h-14 text-lg rounded-md border-border"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              {/* Resend OTP Logic */}
              <div className="flex items-center justify-between mt-2 px-1">
                <p className="text-xs text-muted-foreground">
                  {step === "otp" ? "Code sent to your inbox." : "Awaiting email verification."}
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleResendOtp}
                  // Hydration fix for Resend Button
                  disabled={step === "otp" && (countdown > 0 || isLoading) ? true : undefined}
                  className="h-auto p-0 text-xs text-violet-600 hover:text-violet-500 hover:bg-transparent dark:text-violet-400 font-medium"
                >
                  {step === "otp" && countdown > 0 ? `Resend code in ${countdown}s` : "Resend code"}
                </Button>
              </div>
            </div>

            {/* SUBMIT ROW */}
            <Button 
              type="submit" 
              className="w-full bg-violet-600 hover:bg-violet-500 text-white group mt-6"
              // Hydration fix for Submit Button
              disabled={step === "email" || otp.length < 4 || isLoading ? true : undefined}
            >
              {isLoading && step === "otp" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
            
          </form>
        </CardContent>
      </Card>
    </div>
  );
}