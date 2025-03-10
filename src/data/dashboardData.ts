// src/data/dashboardData.ts
import type { ActivityItem } from "@/components/dashboard/RecentActivity";

export const dashboardData = {
    summaryCards: [
      { title: "Total Clients", value: 42, change: "+12%", timeFrame: "since last month" },
      { title: "Expiring Policies", value: 7, change: "+2", timeFrame: "in next 30 days" },
      { title: "Upcoming Tasks", value: 12, change: "-3", timeFrame: "since last week" },
    ],
    monthlyRenewals: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      data: [5, 8, 12, 7, 10, 13, 9, 11, 14, 15, 12, 8],
    },
    performanceTrends: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      policies: [4, 7, 5, 10],
      revenue: [4200, 7800, 5500, 9800],
    },
    bestOpportunities: [
      {
        clientName: "John Doe",
        policyType: "Home Insurance",
        expiryDate: "2025-04-15",
        opportunity: "Bundle with Auto",
        potentialSavings: "$240/year",
      },
      {
        clientName: "Sarah Smith",
        policyType: "Auto Insurance",
        expiryDate: "2025-04-03",
        opportunity: "Increase Coverage",
        potentialSavings: "$0",
      },
      {
        clientName: "Michael Brown",
        policyType: "Life Insurance",
        expiryDate: "2025-05-12",
        opportunity: "Term Conversion",
        potentialSavings: "$180/year",
      },
    ],
    recentActivity: [
      {
        type: "policy_renewal",
        client: "Jane Wilson",
        policyType: "Home Insurance",
        date: "2025-03-07T10:23:00Z",
      },
      {
        type: "client_added",
        client: "Robert Johnson",
        date: "2025-03-06T15:45:00Z",
      },
      {
        type: "task_completed",
        task: "Follow-up call",
        client: "Maria Garcia",
        date: "2025-03-05T09:15:00Z",
      },
      {
        type: "policy_change",
        client: "David Lee",
        policyType: "Auto Insurance",
        change: "Coverage increased",
        date: "2025-03-04T11:30:00Z",
      },
    ] as ActivityItem[],
  };