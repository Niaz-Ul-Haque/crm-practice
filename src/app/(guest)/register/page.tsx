// src/app/(guest)/register/page.tsx
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

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsRegistering(true);
    setError("");

    setTimeout(() => {
      dispatch(
        loginSuccess({
          user: {
            id: "1",
            name: `${form.firstName} ${form.lastName}`,
            email: form.email,
          },
        })
      );
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-[500px] shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create an Account
          </CardTitle>
          <CardDescription className="text-center">
            Register to access the LynIQ AI CRM.
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className={`transition-colors duration-200 ${
                    focusedField === "firstName" ? "text-purple-600" : ""
                  }`}
                >
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("firstName")}
                  onBlur={() => setFocusedField(null)}
                  className={`transition-all duration-200 ${
                    focusedField === "firstName"
                      ? "border-blue-400 ring-1 ring-blue-200"
                      : ""
                  }`}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className={`transition-colors duration-200 ${
                    focusedField === "lastName" ? "text-purple-600" : ""
                  }`}
                >
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("lastName")}
                  onBlur={() => setFocusedField(null)}
                  className={`transition-all duration-200 ${
                    focusedField === "lastName"
                      ? "border-blue-400 ring-1 ring-blue-200"
                      : ""
                  }`}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className={`transition-colors duration-200 ${
                  focusedField === "email" ? "text-purple-600" : ""
                }`}
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
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
              <Label
                htmlFor="password"
                className={`transition-colors duration-200 ${
                  focusedField === "password" ? "text-purple-600" : ""
                }`}
              >
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                className={`transition-all duration-200 ${
                  focusedField === "password"
                    ? "border-blue-400 ring-1 ring-blue-200"
                    : ""
                }`}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className={`transition-colors duration-200 ${
                  focusedField === "confirmPassword" ? "text-purple-600" : ""
                }`}
              >
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                onFocus={() => setFocusedField("confirmPassword")}
                onBlur={() => setFocusedField(null)}
                className={`transition-all duration-200 ${
                  focusedField === "confirmPassword"
                    ? "border-blue-400 ring-1 ring-blue-200"
                    : ""
                }`}
              />
            </div>
            <Button
              className="w-full relative overflow-hidden"
              type="submit"
              disabled={isRegistering}
            >
              <span
                className={`inline-block transition-all duration-200 ${
                  isRegistering ? "opacity-0" : "opacity-100"
                }`}
              >
                Register
              </span>
              {isRegistering && (
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
              Already have an account?{" "}
              <Link href="/login" className="text-purple-600 hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
