// src/app/(auth)/settings/page.tsx
'use client';

import React, { useState } from 'react';
import PageTitle from '@/components/shared/PageTitle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileTab from '@/components/settings/ProfileTab';
import AccountTab from '@/components/settings/AccountTab';
import NotificationsTab from '@/components/settings/NotificationsTab';
import UserFeedbackWidget from '@/components/shared/UserFeedbackWidget';
import { useAppSelector } from '@/app/redux/hooks';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const [showFeedback, setShowFeedback] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return <div className="p-8">Loading user information...</div>;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <PageTitle
          title="Profile & Settings"
          subtitle="Manage your profile and account preferences"
        />
        <button
          onClick={() => setShowFeedback(true)}
          className="text-purple-600 text-sm hover:underline"
        >
          Give Feedback
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileTab user={user} />
          </TabsContent>

          <TabsContent value="account">
            <AccountTab />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationsTab />
          </TabsContent>
        </Tabs>

        {/* Feedback Widget Modal */}
        {showFeedback && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="max-w-md w-full">
              <UserFeedbackWidget
                onClose={() => setShowFeedback(false)}
                onSubmit={(rating, feedback) => {
                  console.log({ rating, feedback });
                }}
              />
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}
