// src/data/dashboardData.ts
import type { ActivityItem } from '@/components/dashboard/RecentActivity';
// import { ClientOpportunity } from "@/components/dashboard/BestOpportunityAlert";
import { formatCurrency } from '@/lib/formatters';

export interface SummaryCard {
  title: string;
  value: number | string;
  change: string;
  timeFrame: string;
  trend: 'positive' | 'negative' | 'neutral';
  icon?: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    name: string;
    data: number[];
    color?: string;
  }[];
}

export interface OpportunityData {
  clientName: string;
  clientId: string;
  policyType: string;
  expiryDate: string;
  opportunity: string;
  opportunityId: string;
  potentialRevenue: number;
  potentialSavings?: number;
  priority: 'high' | 'medium' | 'low';
}

export const dashboardData = {
  summaryCards: [
    {
      title: 'Active Clients',
      value: 12,
      change: '+3',
      timeFrame: 'since last month',
      trend: 'positive',
      icon: 'users',
    },
    {
      title: 'Expiring Policies',
      value: 7,
      change: '+2',
      timeFrame: 'in next 30 days',
      trend: 'neutral',
      icon: 'calendar',
    },
    {
      title: 'Annual Premium',
      value: formatCurrency(54850),
      change: '+12.4%',
      timeFrame: 'year-to-date',
      trend: 'positive',
      icon: 'dollar-sign',
    },
    {
      title: 'Open Opportunities',
      value: 13,
      change: '-2',
      timeFrame: 'since last week',
      trend: 'negative',
      icon: 'target',
    },
  ],

  monthlyRenewals: {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        name: 'Policy Renewals',
        data: [5, 3, 7, 4, 6, 3, 4, 2, 5, 3, 2, 4],
        color: '#4F46E5',
      },
      {
        name: 'New Policies',
        data: [2, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 2],
        color: '#10B981',
      },
    ],
  },

  performanceTrends: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        name: 'Policies',
        data: [4, 6, 3, 7],
        color: '#4F46E5',
      },
      {
        name: 'Revenue ($000s)',
        data: [9.5, 12.8, 7.2, 14.3],
        color: '#10B981',
      },
    ],
  },

  bestOpportunities: [
    {
      clientName: 'Jamal Haija',
      clientId: '1',
      policyType: 'Home Insurance',
      expiryDate: '2025-01-15',
      opportunity: 'Policy Renewal & Coverage Increase',
      opportunityId: '1',
      potentialRevenue: 2400,
      priority: 'high',
    },
    {
      clientName: 'Niaz Haque',
      clientId: '2',
      policyType: 'Umbrella Insurance',
      expiryDate: '',
      opportunity: 'New Policy',
      opportunityId: '2',
      potentialRevenue: 950,
      priority: 'high',
    },
    {
      clientName: 'Akeem Herbert',
      clientId: '5',
      policyType: 'Specialized Athlete Coverage',
      expiryDate: '',
      opportunity: 'New Policy Package',
      opportunityId: '5',
      potentialRevenue: 3200,
      potentialSavings: 0,
      priority: 'high',
    },
    {
      clientName: 'Richard Bangyay',
      clientId: '3',
      policyType: 'Business Insurance',
      expiryDate: '2025-02-01',
      opportunity: 'Coverage Expansion',
      opportunityId: '4',
      potentialRevenue: 1850,
      priority: 'high',
    },
    {
      clientName: 'Sanjay Gupta',
      clientId: '13',
      policyType: 'Business Interruption',
      expiryDate: '',
      opportunity: 'Cross-Sell',
      opportunityId: '11',
      potentialRevenue: 1800,
      priority: 'high',
    },
  ],

  recentActivity: [
    {
      type: 'policy_renewal',
      client: 'Tamara Britton',
      clientId: '6',
      policyType: 'Professional Liability',
      policyId: '15',
      date: '2025-03-07T10:23:00Z',
    },
    {
      type: 'client_added',
      client: 'Sofia Chen',
      clientId: '7',
      date: '2025-03-06T15:45:00Z',
    },
    {
      type: 'task_completed',
      task: 'Send updated business policy documents',
      taskId: '6',
      client: 'Tamara Britton',
      clientId: '6',
      date: '2025-03-06T15:45:00Z',
    },
    {
      type: 'policy_change',
      client: 'Lyndsay MacDermott',
      clientId: '4',
      policyType: 'Life Insurance',
      policyId: '12',
      change: 'Beneficiary updated',
      date: '2025-03-04T11:30:00Z',
    },
    {
      type: 'opportunity_created',
      client: 'Devon Jackson',
      clientId: '12',
      opportunity: 'Auto insurance bundle',
      opportunityId: '9',
      date: '2025-03-07T09:30:00Z',
    },
    {
      type: 'meeting_scheduled',
      client: 'Richard Bangyay',
      clientId: '3',
      subject: 'Annual policy review',
      date: '2025-03-22T11:00:00Z',
    },
    {
      type: 'premium_payment',
      client: 'Omar Al-Farsi',
      clientId: '8',
      amount: 780,
      policyType: 'Renters Insurance',
      policyId: '18',
      date: '2025-03-03T16:20:00Z',
    },
  ] as ActivityItem[],

  taskSummary: {
    totalTasks: 20,
    overdueTasks: 2,
    dueTodayTasks: 3,
    highPriorityTasks: 5,
    tasksByType: {
      meeting: 5,
      call: 3,
      email: 2,
      follow_up: 3,
      review: 3,
      document: 3,
      proposal: 1,
    },
  },

  policyDistribution: [
    { type: 'Home', count: 11, revenue: 19050 },
    { type: 'Auto', count: 6, revenue: 9590 },
    { type: 'Life', count: 5, revenue: 5130 },
    { type: 'Business', count: 4, revenue: 7830 },
    { type: 'Commercial Property', count: 3, revenue: 9350 },
    { type: 'Professional Liability', count: 4, revenue: 7850 },
    { type: 'Umbrella', count: 2, revenue: 1400 },
    { type: 'Cyber', count: 1, revenue: 1800 },
  ],
};
