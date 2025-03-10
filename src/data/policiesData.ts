// src/data/policiesData.ts
import { Client, clientsData } from "./clientsData";

export type PolicyType = 
  | "home" 
  | "auto" 
  | "life" 
  | "health" 
  | "business" 
  | "renters"
  | "umbrella";

export type PolicyStatus = 
  | "active" 
  | "pending" 
  | "expired" 
  | "cancelled";

export interface Policy {
  id: string;
  policyNumber: string;
  clientId: string;
  type: PolicyType;
  provider: string;
  status: PolicyStatus;
  startDate: string;
  endDate: string;
  premium: number;
  coverageAmount: number;
  description?: string;
  documents?: string[];
  paymentFrequency: "monthly" | "quarterly" | "semiannual" | "annual";
  lastUpdated: string;
}

export const policyProviders = [
  "ABC Insurance", 
  "SafeGuard Insurance", 
  "National Insurance Group", 
  "Liberty Shield", 
  "Pinnacle Insurance"
];

export const policiesData: Policy[] = [
  {
    id: "1",
    policyNumber: "HOM-10001",
    clientId: "1", // John Doe
    type: "home",
    provider: "ABC Insurance",
    status: "active",
    startDate: "2024-01-01",
    endDate: "2025-01-01",
    premium: 1200,
    coverageAmount: 350000,
    description: "Comprehensive home insurance with flood coverage",
    paymentFrequency: "annual",
    lastUpdated: "2024-01-01",
  },
  {
    id: "2",
    policyNumber: "AUT-20001",
    clientId: "1", // John Doe
    type: "auto",
    provider: "SafeGuard Insurance",
    status: "active",
    startDate: "2024-02-15",
    endDate: "2025-02-15",
    premium: 850,
    coverageAmount: 50000,
    description: "Full coverage auto insurance with roadside assistance",
    paymentFrequency: "semiannual",
    lastUpdated: "2024-02-15",
  },
  {
    id: "3",
    policyNumber: "LIF-30001",
    clientId: "1", // John Doe
    type: "life",
    provider: "National Insurance Group",
    status: "active",
    startDate: "2023-11-10",
    endDate: "2043-11-10",
    premium: 400,
    coverageAmount: 500000,
    description: "Term life insurance, 20-year term",
    paymentFrequency: "annual",
    lastUpdated: "2023-11-10",
  },
  {
    id: "4",
    policyNumber: "HOM-10002",
    clientId: "2", // Jane Smith
    type: "home",
    provider: "Liberty Shield",
    status: "active",
    startDate: "2024-03-01",
    endDate: "2025-03-01",
    premium: 1400,
    coverageAmount: 425000,
    paymentFrequency: "annual",
    lastUpdated: "2024-03-01",
  },
  {
    id: "5",
    policyNumber: "AUT-20002",
    clientId: "2", // Jane Smith
    type: "auto",
    provider: "Pinnacle Insurance",
    status: "active",
    startDate: "2023-12-05",
    endDate: "2024-12-05",
    premium: 950,
    coverageAmount: 75000,
    description: "Comprehensive coverage for two vehicles",
    paymentFrequency: "monthly",
    lastUpdated: "2023-12-05",
  },
  {
    id: "6",
    policyNumber: "HOM-10003",
    clientId: "3", // Michael Johnson
    type: "home",
    provider: "ABC Insurance",
    status: "active",
    startDate: "2024-02-01",
    endDate: "2025-02-01",
    premium: 1150,
    coverageAmount: 300000,
    description: "Standard home insurance policy",
    paymentFrequency: "annual",
    lastUpdated: "2024-02-01",
  },
  {
    id: "7",
    policyNumber: "RNT-50001",
    clientId: "8", // Jessica Lee
    type: "renters",
    provider: "SafeGuard Insurance",
    status: "active",
    startDate: "2024-01-15",
    endDate: "2025-01-15",
    premium: 350,
    coverageAmount: 30000,
    description: "Renters insurance for personal property",
    paymentFrequency: "annual",
    lastUpdated: "2024-01-15",
  },
  {
    id: "8",
    policyNumber: "AUT-20003",
    clientId: "4", // Sarah Williams
    type: "auto",
    provider: "National Insurance Group",
    status: "active",
    startDate: "2023-10-20",
    endDate: "2024-10-20",
    premium: 1100,
    coverageAmount: 100000,
    description: "Premium auto insurance with additional coverage",
    paymentFrequency: "quarterly",
    lastUpdated: "2023-10-20",
  },
  {
    id: "9",
    policyNumber: "UMB-60001",
    clientId: "4", // Sarah Williams
    type: "umbrella",
    provider: "Liberty Shield",
    status: "active",
    startDate: "2024-01-05",
    endDate: "2025-01-05",
    premium: 300,
    coverageAmount: 1000000,
    description: "Umbrella policy for additional liability coverage",
    paymentFrequency: "annual",
    lastUpdated: "2024-01-05",
  },
  {
    id: "10",
    policyNumber: "BUS-70001",
    clientId: "9", // Thomas Wilson
    type: "business",
    provider: "Pinnacle Insurance",
    status: "active",
    startDate: "2023-09-15",
    endDate: "2024-09-15",
    premium: 2500,
    coverageAmount: 750000,
    description: "Small business insurance policy",
    paymentFrequency: "quarterly",
    lastUpdated: "2023-09-15",
  },
  {
    id: "11",
    policyNumber: "HEA-40001",
    clientId: "10", // Maria Rodriguez
    type: "health",
    provider: "ABC Insurance",
    status: "active",
    startDate: "2024-01-01",
    endDate: "2025-01-01",
    premium: 450,
    coverageAmount: 1000000,
    description: "Family health insurance plan",
    paymentFrequency: "monthly",
    lastUpdated: "2024-01-01",
  },
  {
    id: "12",
    policyNumber: "AUT-20004",
    clientId: "6", // Jennifer Garcia
    type: "auto",
    provider: "SafeGuard Insurance",
    status: "pending",
    startDate: "2024-04-01",
    endDate: "2025-04-01",
    premium: 900,
    coverageAmount: 60000,
    description: "Pending approval - new auto policy",
    paymentFrequency: "monthly",
    lastUpdated: "2024-03-15",
  },
  {
    id: "13",
    policyNumber: "LIF-30002",
    clientId: "5", // David Brown
    type: "life",
    provider: "National Insurance Group",
    status: "expired",
    startDate: "2022-03-01",
    endDate: "2023-03-01",
    premium: 350,
    coverageAmount: 400000,
    description: "Expired term life insurance",
    paymentFrequency: "annual",
    lastUpdated: "2023-03-01",
  },
];

export const getClientNameById = (clientId: string): string => {
  const client = clientsData.find(c => c.id === clientId);
  if (!client) return "Unknown Client";
  return `${client.firstName} ${client.lastName}`;
};

export const getPoliciesByClientId = (clientId: string): Policy[] => {
  return policiesData.filter(policy => policy.clientId === clientId);
};

export const getPolicyById = (policyId: string): Policy | undefined => {
  return policiesData.find(policy => policy.id === policyId);
};

export const getClientByPolicyId = (policyId: string): Client | undefined => {
  const policy = getPolicyById(policyId);
  if (!policy) return undefined;
  
  return clientsData.find(client => client.id === policy.clientId);
};