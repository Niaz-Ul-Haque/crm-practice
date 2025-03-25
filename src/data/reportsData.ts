// src/data/reportsData.ts
export interface SalesData {
  month: string;
  revenue: number;
  policies: number;
  target: number;
  newPremium?: number;
  renewalPremium?: number;
}

export interface PolicyDistribution {
  type: string;
  count: number;
  revenue: number;
  avgPremium?: number;
  policyHolders?: number;
  percentOfTotal?: number;
}

export interface ClientAcquisition {
  month: string;
  newClients: number;
  referrals: number;
  referralSource?: string[];
  conversionRate?: number;
}

export interface RenewalRate {
  month: string;
  renewed: number;
  expired: number;
  rate: number;
  premiumChange?: number;
  coverage?: number;
}

export interface ClientSegment {
  segment: string;
  clients: number;
  totalPremium: number;
  avgPoliciesPerClient: number;
  retentionRate: number;
  growthRate: number;
}

export interface PerformanceMetric {
  metric: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'flat';
  benchmark?: number;
}

export const monthlyPerformanceData: SalesData[] = [
  {
    month: 'Jan',
    revenue: 42500,
    policies: 28,
    target: 40000,
    newPremium: 12500,
    renewalPremium: 30000,
  },
  {
    month: 'Feb',
    revenue: 38700,
    policies: 25,
    target: 40000,
    newPremium: 8700,
    renewalPremium: 30000,
  },
  {
    month: 'Mar',
    revenue: 47200,
    policies: 32,
    target: 45000,
    newPremium: 14200,
    renewalPremium: 33000,
  },
  {
    month: 'Apr',
    revenue: 39800,
    policies: 26,
    target: 45000,
    newPremium: 6800,
    renewalPremium: 33000,
  },
  {
    month: 'May',
    revenue: 46100,
    policies: 30,
    target: 45000,
    newPremium: 10100,
    renewalPremium: 36000,
  },
  {
    month: 'Jun',
    revenue: 49500,
    policies: 34,
    target: 50000,
    newPremium: 11500,
    renewalPremium: 38000,
  },
  {
    month: 'Jul',
    revenue: 46200,
    policies: 31,
    target: 50000,
    newPremium: 6200,
    renewalPremium: 40000,
  },
  {
    month: 'Aug',
    revenue: 52800,
    policies: 36,
    target: 50000,
    newPremium: 12800,
    renewalPremium: 40000,
  },
  {
    month: 'Sep',
    revenue: 54300,
    policies: 37,
    target: 55000,
    newPremium: 11300,
    renewalPremium: 43000,
  },
  {
    month: 'Oct',
    revenue: 59600,
    policies: 42,
    target: 55000,
    newPremium: 15600,
    renewalPremium: 44000,
  },
  {
    month: 'Nov',
    revenue: 53200,
    policies: 35,
    target: 55000,
    newPremium: 7200,
    renewalPremium: 46000,
  },
  {
    month: 'Dec',
    revenue: 60900,
    policies: 43,
    target: 60000,
    newPremium: 12900,
    renewalPremium: 48000,
  },
];

export const policyDistributionData: PolicyDistribution[] = [
  {
    type: 'Home',
    count: 11,
    revenue: 19050,
    avgPremium: 1732,
    policyHolders: 9,
    percentOfTotal: 30.6,
  },
  {
    type: 'Auto',
    count: 6,
    revenue: 9590,
    avgPremium: 1598,
    policyHolders: 6,
    percentOfTotal: 15.4,
  },
  {
    type: 'Life',
    count: 5,
    revenue: 5130,
    avgPremium: 1026,
    policyHolders: 5,
    percentOfTotal: 8.2,
  },
  {
    type: 'Business',
    count: 4,
    revenue: 7830,
    avgPremium: 1958,
    policyHolders: 4,
    percentOfTotal: 12.6,
  },
  {
    type: 'Commercial Property',
    count: 3,
    revenue: 9350,
    avgPremium: 3117,
    policyHolders: 3,
    percentOfTotal: 15.0,
  },
  {
    type: 'Professional Liability',
    count: 4,
    revenue: 7850,
    avgPremium: 1963,
    policyHolders: 4,
    percentOfTotal: 12.6,
  },
  {
    type: 'Umbrella',
    count: 2,
    revenue: 1400,
    avgPremium: 700,
    policyHolders: 2,
    percentOfTotal: 2.2,
  },
  {
    type: 'Cyber',
    count: 1,
    revenue: 1800,
    avgPremium: 1800,
    policyHolders: 1,
    percentOfTotal: 2.9,
  },
  {
    type: 'Renters',
    count: 1,
    revenue: 780,
    avgPremium: 780,
    policyHolders: 1,
    percentOfTotal: 1.3,
  },
];

export const clientAcquisitionData: ClientAcquisition[] = [
  {
    month: 'Jan',
    newClients: 2,
    referrals: 1,
    referralSource: ['Existing Client'],
    conversionRate: 66.7,
  },
  {
    month: 'Feb',
    newClients: 1,
    referrals: 0,
    referralSource: [],
    conversionRate: 50.0,
  },
  {
    month: 'Mar',
    newClients: 3,
    referrals: 2,
    referralSource: ['Professional Network', 'Existing Client'],
    conversionRate: 75.0,
  },
  {
    month: 'Apr',
    newClients: 1,
    referrals: 0,
    referralSource: [],
    conversionRate: 33.3,
  },
  {
    month: 'May',
    newClients: 2,
    referrals: 1,
    referralSource: ['Professional Network'],
    conversionRate: 66.7,
  },
  {
    month: 'Jun',
    newClients: 1,
    referrals: 1,
    referralSource: ['Existing Client'],
    conversionRate: 50.0,
  },
  {
    month: 'Jul',
    newClients: 1,
    referrals: 0,
    referralSource: [],
    conversionRate: 50.0,
  },
  {
    month: 'Aug',
    newClients: 2,
    referrals: 1,
    referralSource: ['Professional Network'],
    conversionRate: 66.7,
  },
  {
    month: 'Sep',
    newClients: 1,
    referrals: 1,
    referralSource: ['Existing Client'],
    conversionRate: 50.0,
  },
  {
    month: 'Oct',
    newClients: 0,
    referrals: 0,
    referralSource: [],
    conversionRate: 0.0,
  },
  {
    month: 'Nov',
    newClients: 1,
    referrals: 0,
    referralSource: [],
    conversionRate: 33.3,
  },
  {
    month: 'Dec',
    newClients: 0,
    referrals: 0,
    referralSource: [],
    conversionRate: 0.0,
  },
];

export const renewalRateData: RenewalRate[] = [
  {
    month: 'Jan',
    renewed: 18,
    expired: 3,
    rate: 0.86,
    premiumChange: +2.5,
    coverage: +50000,
  },
  {
    month: 'Feb',
    renewed: 15,
    expired: 2,
    rate: 0.88,
    premiumChange: +1.8,
    coverage: +25000,
  },
  {
    month: 'Mar',
    renewed: 22,
    expired: 4,
    rate: 0.85,
    premiumChange: +3.2,
    coverage: +75000,
  },
  {
    month: 'Apr',
    renewed: 19,
    expired: 2,
    rate: 0.9,
    premiumChange: +2.0,
    coverage: +30000,
  },
  {
    month: 'May',
    renewed: 21,
    expired: 3,
    rate: 0.88,
    premiumChange: +2.7,
    coverage: +45000,
  },
  {
    month: 'Jun',
    renewed: 25,
    expired: 4,
    rate: 0.86,
    premiumChange: +3.5,
    coverage: +80000,
  },
  {
    month: 'Jul',
    renewed: 23,
    expired: 3,
    rate: 0.88,
    premiumChange: +2.2,
    coverage: +35000,
  },
  {
    month: 'Aug',
    renewed: 24,
    expired: 3,
    rate: 0.89,
    premiumChange: +3.0,
    coverage: +60000,
  },
  {
    month: 'Sep',
    renewed: 26,
    expired: 4,
    rate: 0.87,
    premiumChange: +3.3,
    coverage: +70000,
  },
  {
    month: 'Oct',
    renewed: 27,
    expired: 3,
    rate: 0.9,
    premiumChange: +2.9,
    coverage: +55000,
  },
  {
    month: 'Nov',
    renewed: 23,
    expired: 2,
    rate: 0.92,
    premiumChange: +2.5,
    coverage: +40000,
  },
  {
    month: 'Dec',
    renewed: 20,
    expired: 2,
    rate: 0.91,
    premiumChange: +2.8,
    coverage: +50000,
  },
];

export const clientSegmentData: ClientSegment[] = [
  {
    segment: 'High-Value Executives',
    clients: 2,
    totalPremium: 8280,
    avgPoliciesPerClient: 3.5,
    retentionRate: 0.95,
    growthRate: 0.12,
  },
  {
    segment: 'Business Owners',
    clients: 5,
    totalPremium: 26790,
    avgPoliciesPerClient: 3.2,
    retentionRate: 0.92,
    growthRate: 0.08,
  },
  {
    segment: 'Medical Professionals',
    clients: 1,
    totalPremium: 4350,
    avgPoliciesPerClient: 3.0,
    retentionRate: 0.9,
    growthRate: 0.05,
  },
  {
    segment: 'Young Professionals',
    clients: 3,
    totalPremium: 5510,
    avgPoliciesPerClient: 1.3,
    retentionRate: 0.85,
    growthRate: 0.15,
  },
  {
    segment: 'Athletes',
    clients: 1,
    totalPremium: 1850,
    avgPoliciesPerClient: 1.0,
    retentionRate: 0.88,
    growthRate: 0.1,
  },
  {
    segment: 'Real Estate Professionals',
    clients: 1,
    totalPremium: 5840,
    avgPoliciesPerClient: 3.0,
    retentionRate: 0.93,
    growthRate: 0.07,
  },
  {
    segment: 'Educators',
    clients: 1,
    totalPremium: 0,
    avgPoliciesPerClient: 0.0,
    retentionRate: 0.0,
    growthRate: 0.0,
  },
];

export const topPerformingPoliciesData = [
  {
    policyType: 'Commercial Property',
    totalSold: 3,
    revenue: 9350,
    avgPremium: 3117,
    conversionRate: 75,
    clientSegment: 'Business Owners',
    growthRate: 0.15,
  },
  {
    policyType: 'Home Insurance',
    totalSold: 11,
    revenue: 19050,
    avgPremium: 1732,
    conversionRate: 85,
    clientSegment: 'Mixed',
    growthRate: 0.08,
  },
  {
    policyType: 'Professional Liability',
    totalSold: 4,
    revenue: 7850,
    avgPremium: 1963,
    conversionRate: 80,
    clientSegment: 'Business Professionals',
    growthRate: 0.12,
  },
  {
    policyType: 'Business Insurance',
    totalSold: 4,
    revenue: 7830,
    avgPremium: 1958,
    conversionRate: 70,
    clientSegment: 'Business Owners',
    growthRate: 0.09,
  },
];

export const keyPerformanceIndicators: PerformanceMetric[] = [
  {
    metric: 'Client Retention Rate',
    value: 88.5,
    change: +2.3,
    trend: 'up',
    benchmark: 86.0,
  },
  {
    metric: 'Average Policies per Client',
    value: 2.45,
    change: +0.3,
    trend: 'up',
    benchmark: 2.1,
  },
  {
    metric: 'Annual Premium per Client',
    value: 3850,
    change: +450,
    trend: 'up',
    benchmark: 3500,
  },
  {
    metric: 'Cross-Selling Rate',
    value: 35.2,
    change: +5.8,
    trend: 'up',
    benchmark: 30.0,
  },
  {
    metric: 'Lead Conversion Rate',
    value: 42.5,
    change: -1.5,
    trend: 'down',
    benchmark: 45.0,
  },
  {
    metric: 'Premium Growth Rate',
    value: 12.3,
    change: +3.1,
    trend: 'up',
    benchmark: 10.0,
  },
  {
    metric: 'Claims Ratio',
    value: 58.2,
    change: -2.8,
    trend: 'down',
    benchmark: 60.0,
  },
  {
    metric: 'Referral Rate',
    value: 28.6,
    change: +1.4,
    trend: 'up',
    benchmark: 25.0,
  },
];

export const policyPerformanceByMonth = [
  {
    month: 'Jan',
    policyGroups: [
      { type: 'Home', new: 2, renewed: 1, lapsed: 0, totalPremium: 3850 },
      { type: 'Auto', new: 1, renewed: 1, lapsed: 0, totalPremium: 2250 },
      { type: 'Life', new: 0, renewed: 1, lapsed: 0, totalPremium: 830 },
      { type: 'Commercial', new: 0, renewed: 2, lapsed: 1, totalPremium: 4600 },
    ],
  },
  {
    month: 'Feb',
    policyGroups: [
      { type: 'Home', new: 1, renewed: 2, lapsed: 0, totalPremium: 3550 },
      { type: 'Auto', new: 0, renewed: 1, lapsed: 0, totalPremium: 1400 },
      { type: 'Life', new: 1, renewed: 0, lapsed: 0, totalPremium: 1850 },
      { type: 'Commercial', new: 1, renewed: 1, lapsed: 0, totalPremium: 4150 },
    ],
  },
  {
    month: 'Mar',
    policyGroups: [
      { type: 'Home', new: 2, renewed: 1, lapsed: 1, totalPremium: 5300 },
      { type: 'Auto', new: 1, renewed: 2, lapsed: 0, totalPremium: 3920 },
      { type: 'Life', new: 0, renewed: 1, lapsed: 0, totalPremium: 650 },
      { type: 'Commercial', new: 2, renewed: 1, lapsed: 0, totalPremium: 6430 },
    ],
  },
];
