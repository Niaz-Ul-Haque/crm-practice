// src/app/(guest)/check-email/page.tsx
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail } from "lucide-react";

export default function CheckEmailPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-[400px] shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Check Your Email
          </CardTitle>
          <CardDescription className="text-center">
            We&apos;ve sent you a link to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <Mail size={32} />
          </div>

          <p className="text-sm text-gray-500">
            We&apos;ve sent an email with instructions on how to reset your
            password. Please check your inbox.
          </p>

          <div className="pt-4">
            <p className="text-sm text-gray-500 mb-4">
              Didn&apos;t receive the email? Check your spam folder or request a
              new link.
            </p>
            <Button className="w-full mb-2">Resend Email</Button>
            <Link href="/login">
              <Button variant="outline" className="w-full">
                <ArrowLeft size={16} className="mr-2" />
                Back to login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
