// src/app/(auth)/dashboard/page.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import PageTitle from '@/components/shared/PageTitle';
import SummaryCard from '@/components/dashboard/SummaryCard';
import ChartCard from '@/components/dashboard/ChartCard';
import MonthlyRenewalsChart from '@/components/dashboard/MonthlyRenewalsChart';
import PerformanceTrendsChart from '@/components/dashboard/PerformanceTrendsChart';
import BestOpportunityAlert from '@/components/dashboard/BestOpportunityAlert';
import RecentActivity from '@/components/dashboard/RecentActivity';
import UserFeedbackWidget from '@/components/shared/UserFeedbackWidget';
import { dashboardData } from '@/data/dashboardData';

export default function DashboardPage() {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle
          title="Dashboard"
          subtitle="Welcome to your LynIQ dashboard"
        />
        <Button
          onClick={() => setShowFeedback(true)}
          variant="outline"
          size="sm"
        >
          Give Feedback
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {dashboardData.summaryCards.map((card, index) => (
          <SummaryCard
            key={card.title}
            title={card.title}
            value={card.value}
            change={card.change}
            timeFrame={card.timeFrame}
            delay={index}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Monthly Renewals" delay={3}>
          <MonthlyRenewalsChart data={dashboardData.monthlyRenewals} />
        </ChartCard>
        <ChartCard title="Performance Trends" delay={4}>
          <PerformanceTrendsChart data={dashboardData.performanceTrends} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <BestOpportunityAlert
            opportunities={dashboardData.bestOpportunities}
            delay={5}
          />
        </div>
        <div>
          <RecentActivity activities={dashboardData.recentActivity} delay={6} />
        </div>
      </div>

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
    </>
  );
}
