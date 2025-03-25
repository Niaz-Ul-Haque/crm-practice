// src/components/settings/AccountTab.tsx
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const AccountTab: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [theme, setTheme] = useState('light');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      toast({
        title: 'Incomplete Form',
        description: 'Please fill in all password fields.',
      });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: 'Your new password and confirmation do not match.',
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      toast({
        title: 'Password Updated',
        description: 'Your password has been updated successfully.',
      });
    }, 1000);
  };

  const hasMinLength = formData.newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(formData.newPassword);
  const hasLowercase = /[a-z]/.test(formData.newPassword);
  const hasNumber = /[0-9]/.test(formData.newPassword);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(formData.newPassword);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showPasswords.current ? 'text' : 'password'}
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Enter your current password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => togglePasswordVisibility('current')}
                >
                  {showPasswords.current ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showPasswords.new ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => togglePasswordVisibility('new')}
                >
                  {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {formData.newPassword && (
              <div className="space-y-2 p-3 bg-gray-50 rounded-md text-sm">
                <p className="font-medium text-gray-700">Password strength:</p>
                <ul className="space-y-1">
                  <li className="flex items-center">
                    <span
                      className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                        hasMinLength ? 'bg-green-500 text-white' : 'bg-gray-300'
                      }`}
                    >
                      {hasMinLength && <Check size={12} />}
                    </span>
                    <span
                      className={
                        hasMinLength ? 'text-green-700' : 'text-gray-500'
                      }
                    >
                      At least 8 characters
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span
                      className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                        hasUppercase ? 'bg-green-500 text-white' : 'bg-gray-300'
                      }`}
                    >
                      {hasUppercase && <Check size={12} />}
                    </span>
                    <span
                      className={
                        hasUppercase ? 'text-green-700' : 'text-gray-500'
                      }
                    >
                      Uppercase letter
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span
                      className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                        hasLowercase ? 'bg-green-500 text-white' : 'bg-gray-300'
                      }`}
                    >
                      {hasLowercase && <Check size={12} />}
                    </span>
                    <span
                      className={
                        hasLowercase ? 'text-green-700' : 'text-gray-500'
                      }
                    >
                      Lowercase letter
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span
                      className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                        hasNumber ? 'bg-green-500 text-white' : 'bg-gray-300'
                      }`}
                    >
                      {hasNumber && <Check size={12} />}
                    </span>
                    <span
                      className={hasNumber ? 'text-green-700' : 'text-gray-500'}
                    >
                      Number
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span
                      className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                        hasSpecialChar
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-300'
                      }`}
                    >
                      {hasSpecialChar && <Check size={12} />}
                    </span>
                    <span
                      className={
                        hasSpecialChar ? 'text-green-700' : 'text-gray-500'
                      }
                    >
                      Special character
                    </span>
                  </li>
                </ul>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  {showPasswords.confirm ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
              {formData.newPassword &&
                formData.confirmPassword &&
                formData.newPassword !== formData.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    Passwords do not match
                  </p>
                )}
            </div>

            <div className="mt-2">
              <Button
                type="submit"
                size="sm"
                disabled={isSubmitting}
                className="relative overflow-hidden"
              >
                <span className={isSubmitting ? 'invisible' : 'visible'}>
                  Update Password
                </span>
                {isSubmitting && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
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
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Theme Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div
              className={`border p-4 rounded-md cursor-pointer ${
                theme === 'light' ? 'bg-blue-50 border-blue-200' : 'bg-white'
              }`}
              onClick={() => setTheme('light')}
            >
              <p className="font-medium">Light Mode</p>
            </div>
            <div
              className={`border p-4 rounded-md cursor-pointer ${
                theme === 'dark' ? 'bg-blue-50 border-blue-200' : 'bg-white'
              }`}
              onClick={() => setTheme('dark')}
            >
              <p className="font-medium">Dark Mode</p>
            </div>
            <div
              className={`border p-4 rounded-md cursor-pointer ${
                theme === 'system' ? 'bg-blue-50 border-blue-200' : 'bg-white'
              }`}
              onClick={() => setTheme('system')}
            >
              <p className="font-medium">System Default</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AccountTab;
