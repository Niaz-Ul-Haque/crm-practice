// src/app/(guest)/reset-password/page.tsx
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
import { motion } from "framer-motion";
import { Eye, EyeOff, Check } from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.password || !form.confirmPassword) {
      setError("Both fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsSubmitting(true);
    setError("");

    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/login");
    }, 1000);
  };

  const hasMinLength = form.password.length >= 8;
  const hasUppercase = /[A-Z]/.test(form.password);
  const hasLowercase = /[a-z]/.test(form.password);
  const hasNumber = /[0-9]/.test(form.password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(form.password);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-[450px] shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Reset Your Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter a new secure password for your account
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
                htmlFor="password"
                className={`transition-colors duration-200 ${
                  focusedField === "password" ? "text-blue-600" : ""
                }`}
              >
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className={`pr-10 transition-all duration-200 ${
                    focusedField === "password"
                      ? "border-blue-400 ring-1 ring-blue-200"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Password strength indicators */}
            {form.password && (
              <div className="space-y-2 p-3 bg-gray-50 rounded-md text-sm">
                <p className="font-medium text-gray-700">Password strength:</p>
                <ul className="space-y-1">
                  <li className="flex items-center">
                    <span
                      className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                        hasMinLength ? "bg-green-500 text-white" : "bg-gray-300"
                      }`}
                    >
                      {hasMinLength && <Check size={12} />}
                    </span>
                    <span
                      className={
                        hasMinLength ? "text-green-700" : "text-gray-500"
                      }
                    >
                      At least 8 characters
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span
                      className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                        hasUppercase ? "bg-green-500 text-white" : "bg-gray-300"
                      }`}
                    >
                      {hasUppercase && <Check size={12} />}
                    </span>
                    <span
                      className={
                        hasUppercase ? "text-green-700" : "text-gray-500"
                      }
                    >
                      Uppercase letter
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span
                      className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                        hasLowercase ? "bg-green-500 text-white" : "bg-gray-300"
                      }`}
                    >
                      {hasLowercase && <Check size={12} />}
                    </span>
                    <span
                      className={
                        hasLowercase ? "text-green-700" : "text-gray-500"
                      }
                    >
                      Lowercase letter
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span
                      className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                        hasNumber ? "bg-green-500 text-white" : "bg-gray-300"
                      }`}
                    >
                      {hasNumber && <Check size={12} />}
                    </span>
                    <span
                      className={hasNumber ? "text-green-700" : "text-gray-500"}
                    >
                      Number
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span
                      className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                        hasSpecialChar
                          ? "bg-green-500 text-white"
                          : "bg-gray-300"
                      }`}
                    >
                      {hasSpecialChar && <Check size={12} />}
                    </span>
                    <span
                      className={
                        hasSpecialChar ? "text-green-700" : "text-gray-500"
                      }
                    >
                      Special character
                    </span>
                  </li>
                </ul>
              </div>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className={`transition-colors duration-200 ${
                  focusedField === "confirmPassword" ? "text-blue-600" : ""
                }`}
              >
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("confirmPassword")}
                  onBlur={() => setFocusedField(null)}
                  className={`pr-10 transition-all duration-200 ${
                    focusedField === "confirmPassword"
                      ? "border-blue-400 ring-1 ring-blue-200"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
              {form.password &&
                form.confirmPassword &&
                form.password !== form.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    Passwords do not match
                  </p>
                )}
            </div>

            <Button
              className="w-full relative overflow-hidden"
              type="submit"
              disabled={isSubmitting}
            >
              <span
                className={`inline-block transition-all duration-200 ${
                  isSubmitting ? "opacity-0" : "opacity-100"
                }`}
              >
                Reset Password
              </span>
              {isSubmitting && (
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
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
