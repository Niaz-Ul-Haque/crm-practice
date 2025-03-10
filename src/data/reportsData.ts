// src/data/reportsData.ts
export interface SalesData {
    month: string;
    revenue: number;
    policies: number;
    target: number;
  }
  
  export interface PolicyDistribution {
    type: string;
    count: number;
    revenue: number;
  }
  
  export interface ClientAcquisition {
    month: string;
    newClients: number;
    referrals: number;
  }
  
  export interface RenewalRate {
    month: string;
    renewed: number;
    expired: number;
    rate: number;
  }
  
  export const monthlyPerformanceData: SalesData[] = [
    { month: "Jan", revenue: 42500, policies: 28, target: 40000 },
    { month: "Feb", revenue: 38700, policies: 25, target: 40000 },
    { month: "Mar", revenue: 45200, policies: 30, target: 40000 },
    { month: "Apr", revenue: 39800, policies: 26, target: 40000 },
    { month: "May", revenue: 44100, policies: 29, target: 45000 },
    { month: "Jun", revenue: 48500, policies: 32, target: 45000 },
    { month: "Jul", revenue: 46200, policies: 31, target: 45000 },
    { month: "Aug", revenue: 49800, policies: 33, target: 45000 },
    { month: "Sep", revenue: 52300, policies: 35, target: 50000 },
    { month: "Oct", revenue: 55600, policies: 37, target: 50000 },
    { month: "Nov", revenue: 51200, policies: 34, target: 50000 },
    { month: "Dec", revenue: 57900, policies: 39, target: 50000 },
  ];
  
  export const policyDistributionData: PolicyDistribution[] = [
    { type: "Home", count: 156, revenue: 187200 },
    { type: "Auto", count: 203, revenue: 192850 },
    { type: "Life", count: 78, revenue: 93600 },
    { type: "Health", count: 45, revenue: 54000 },
    { type: "Business", count: 32, revenue: 96000 },
    { type: "Umbrella", count: 24, revenue: 14400 },
    { type: "Renters", count: 47, revenue: 16450 },
  ];
  
  export const clientAcquisitionData: ClientAcquisition[] = [
    { month: "Jan", newClients: 12, referrals: 5 },
    { month: "Feb", newClients: 9, referrals: 3 },
    { month: "Mar", newClients: 15, referrals: 7 },
    { month: "Apr", newClients: 11, referrals: 4 },
    { month: "May", newClients: 13, referrals: 6 },
    { month: "Jun", newClients: 18, referrals: 9 },
    { month: "Jul", newClients: 14, referrals: 6 },
    { month: "Aug", newClients: 16, referrals: 8 },
    { month: "Sep", newClients: 19, referrals: 10 },
    { month: "Oct", newClients: 15, referrals: 7 },
    { month: "Nov", newClients: 12, referrals: 5 },
    { month: "Dec", newClients: 10, referrals: 4 },
  ];
  
  export const renewalRateData: RenewalRate[] = [
    { month: "Jan", renewed: 18, expired: 3, rate: 0.86 },
    { month: "Feb", renewed: 15, expired: 2, rate: 0.88 },
    { month: "Mar", renewed: 22, expired: 4, rate: 0.85 },
    { month: "Apr", renewed: 19, expired: 2, rate: 0.90 },
    { month: "May", renewed: 21, expired: 3, rate: 0.88 },
    { month: "Jun", renewed: 25, expired: 4, rate: 0.86 },
    { month: "Jul", renewed: 23, expired: 3, rate: 0.88 },
    { month: "Aug", renewed: 24, expired: 3, rate: 0.89 },
    { month: "Sep", renewed: 26, expired: 4, rate: 0.87 },
    { month: "Oct", renewed: 27, expired: 3, rate: 0.90 },
    { month: "Nov", renewed: 23, expired: 2, rate: 0.92 },
    { month: "Dec", renewed: 20, expired: 2, rate: 0.91 },
  ];
  
  export const topPerformingPoliciesData = [
    { policyType: "Home Insurance", totalSold: 42, revenue: 75600, avgPremium: 1800, conversionRate: 35 },
    { policyType: "Auto Insurance", totalSold: 53, revenue: 58300, avgPremium: 1100, conversionRate: 40 },
    { policyType: "Life Insurance", totalSold: 21, revenue: 31500, avgPremium: 1500, conversionRate: 25 },
    { policyType: "Business Insurance", totalSold: 15, revenue: 45000, avgPremium: 3000, conversionRate: 20 },
  ];