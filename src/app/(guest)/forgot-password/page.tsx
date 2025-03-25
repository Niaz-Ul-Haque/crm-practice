// src/app/(guest)/forgot-password/page.tsx
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
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
            Reset Your Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and we&apos;ll send you instructions to reset your
            password
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-4"
            >
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <Check size={24} />
              </div>
              <h3 className="text-lg font-medium">Check your email</h3>
              <p className="text-sm text-gray-500">
                We&apos;ve sent password reset instructions to{' '}
                <span className="font-medium">{email}</span>
              </p>
              <div className="pt-4">
                <Link href="/login">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to login
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <motion.div
                  className="bg-red-50 text-red-600 p-3 rounded-md text-sm"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.2 }}
                >
                  {error}
                </motion.div>
              )}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className={`transition-colors duration-200 ${
                    focusedField === 'email' ? 'text-purple-600' : ''
                  }`}
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={`transition-all duration-200 ${
                    focusedField === 'email'
                      ? 'border-blue-400 ring-1 ring-blue-200'
                      : ''
                  }`}
                />
              </div>
              <Button
                className="w-full relative overflow-hidden"
                type="submit"
                disabled={isSubmitting}
              >
                <span
                  className={`inline-block transition-all duration-200 ${
                    isSubmitting ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  Send Reset Instructions
                </span>
                {isSubmitting && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  </span>
                )}
              </Button>
              <div className="text-center text-sm">
                <Link href="/login" className="text-purple-600 hover:underline">
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
