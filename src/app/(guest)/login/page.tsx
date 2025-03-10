// src/app/(guest)/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/app/redux/hooks";
import { loginSuccess } from "@/app/redux/slices/authSlice";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoggingIn(true);
    setError("");

    setTimeout(() => {
      if (email === "demo@example.com" && password === "password") {
        dispatch(
          loginSuccess({
            user: {
              id: "1",
              name: "Jane Smith",
              email: "demo@example.com",
            },
          })
        );
        router.push("/dashboard");
      } else {
        setError("Invalid credentials. Try demo@example.com / password");
        setIsLoggingIn(false);
      }
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-[400px] shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            LynIQ AI CRM
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to access your LynIQ dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <motion.div
                className="bg-red-50 text-red-600 p-3 rounded-md text-sm"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.2 }}
              >
                {error}
              </motion.div>
            )}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className={`transition-colors duration-200 ${
                  focusedField === "email" ? "text-blue-600" : ""
                }`}
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className={`transition-all duration-200 ${
                  focusedField === "email"
                    ? "border-blue-400 ring-1 ring-blue-200"
                    : ""
                }`}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className={`transition-colors duration-200 ${
                    focusedField === "password" ? "text-blue-600" : ""
                  }`}
                >
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                className={`transition-all duration-200 ${
                  focusedField === "password"
                    ? "border-blue-400 ring-1 ring-blue-200"
                    : ""
                }`}
              />
            </div>
            <Button
              className="w-full relative overflow-hidden group"
              type="submit"
              disabled={isLoggingIn}
            >
              <span
                className={`inline-block transition-all duration-200 ${
                  isLoggingIn ? "opacity-0" : "opacity-100"
                }`}
              >
                Login
              </span>
              {isLoggingIn && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </span>
              )}
            </Button>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </div>
            <div className="text-center text-xs text-gray-500 mt-2">
              Demo credentials: demo@example.com / password
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
