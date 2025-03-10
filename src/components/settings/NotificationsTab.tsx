// src/components/settings/NotificationsTab.tsx
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

const NotificationsTab: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    policyExpirations: {
      email: true,
      inApp: true,
    },
    clientBirthdays: {
      email: true,
      inApp: true,
    },
    taskReminders: {
      email: true,
      inApp: true,
    },
    systemUpdates: {
      email: false,
      inApp: true,
    },
  });

  const handleCheckboxChange = (
    category: string,
    channel: "email" | "inApp"
  ) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [channel]: !prev[category as keyof typeof prev][channel],
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Preferences Saved",
        description: "Your notification preferences have been updated.",
      });
    }, 1000);
  };

  const notificationCategories = [
    {
      id: "policyExpirations",
      name: "Policy Expirations",
      description: "Receive notifications about policy expirations",
    },
    {
      id: "clientBirthdays",
      name: "Client Birthdays",
      description: "Receive notifications about client birthdays",
    },
    {
      id: "taskReminders",
      name: "Task Reminders",
      description: "Receive notifications about task reminders",
    },
    {
      id: "systemUpdates",
      name: "System Updates",
      description: "Receive notifications about system updates",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {notificationCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between py-2 border-b"
                >
                  <div>
                    <p className="font-medium">{category.name}</p>
                    <p className="text-sm text-gray-500">
                      {category.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${category.id}-email`}
                        checked={
                          notificationSettings[
                            category.id as keyof typeof notificationSettings
                          ].email
                        }
                        onCheckedChange={() =>
                          handleCheckboxChange(category.id, "email")
                        }
                      />
                      <Label
                        htmlFor={`${category.id}-email`}
                        className="text-sm font-normal"
                      >
                        Email
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${category.id}-inApp`}
                        checked={
                          notificationSettings[
                            category.id as keyof typeof notificationSettings
                          ].inApp
                        }
                        onCheckedChange={() =>
                          handleCheckboxChange(category.id, "inApp")
                        }
                      />
                      <Label
                        htmlFor={`${category.id}-inApp`}
                        className="text-sm font-normal"
                      >
                        In-app
                      </Label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="relative overflow-hidden"
              >
                <span className={isSubmitting ? "invisible" : "visible"}>
                  Save Preferences
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
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NotificationsTab;
