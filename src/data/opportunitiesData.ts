// src/data/opportunitiesData.ts
import { clientsData } from "./clientsData";
import { policiesData, PolicyType } from "./policiesData";
import { formatCurrency } from "@/lib/formatters";

export type OpportunityType = 
  | "policy_renewal" 
  | "coverage_increase" 
  | "bundle_discount" 
  | "premium_adjustment"
  | "new_policy"
  | "policy_review";

export type OpportunityStatus = 
  | "eligible" 
  | "pending_review" 
  | "in_progress"
  | "recommended"
  | "rejected"
  | "completed";

export interface Opportunity {
  id: string;
  clientId: string;
  relatedPolicyId?: string;
  type: OpportunityType;
  status: OpportunityStatus;
  description: string;
  potentialSavings?: number;
  potentialRevenue?: number;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
  priority: "high" | "medium" | "low";
  recommendedAction: string;
}

const getClientName = (clientId: string) => {
  const client = clientsData.find(c => c.id === clientId);
  if (!client) return "Unknown Client";
  return `${client.firstName} ${client.lastName}`;
};

const getPolicyTypeName = (type: PolicyType): string => {
  const mapping: Record<PolicyType, string> = {
    home: "Home Insurance",
    auto: "Auto Insurance",
    life: "Life Insurance",
    health: "Health Insurance",
    business: "Business Insurance",
    renters: "Renters Insurance",
    umbrella: "Umbrella Insurance"
  };
  
  return mapping[type] || type;
};

const generateDescription = (
  type: OpportunityType, 
  clientId: string, 
  policyType?: PolicyType, 
  savings?: number
): string => {
  const clientName = getClientName(clientId);
  
  switch (type) {
    case "policy_renewal":
      return `${clientName}'s ${policyType ? getPolicyTypeName(policyType) : "policy"} is expiring soon. Reach out to discuss renewal options.`;
    case "coverage_increase":
      return `${clientName} may benefit from increased coverage based on their property value and risk assessment.`;
    case "bundle_discount":
      return `${clientName} has multiple separate policies. Bundle opportunity could save them ${savings ? formatCurrency(savings) : "up to 15%"} annually.`;
    case "premium_adjustment":
      return `${clientName}'s risk profile suggests they may qualify for a premium reduction.`;
    case "new_policy":
      return `${clientName} has a coverage gap. Consider recommending a new ${policyType ? getPolicyTypeName(policyType) : "policy"}.`;
    case "policy_review":
      return `${clientName} hasn't had a policy review in over a year. Schedule a comprehensive review.`;
    default:
      return "Opportunity to improve client's insurance coverage.";
  }
};

export const opportunitiesData: Opportunity[] = [
  {
    id: "1",
    clientId: "1", // John Doe
    relatedPolicyId: "1", // Home insurance
    type: "policy_renewal",
    status: "eligible",
    description: generateDescription("policy_renewal", "1", "home"),
    potentialRevenue: 1200,
    createdAt: "2025-03-01T10:00:00Z",
    updatedAt: "2025-03-01T10:00:00Z",
    expiresAt: "2025-04-01T00:00:00Z",
    priority: "high",
    recommendedAction: "Contact client to discuss renewal options and potential coverage adjustments."
  },
  {
    id: "2",
    clientId: "1", // John Doe
    type: "bundle_discount",
    status: "pending_review",
    description: generateDescription("bundle_discount", "1", undefined, 300),
    potentialSavings: 300,
    potentialRevenue: 800,
    createdAt: "2025-02-15T15:30:00Z",
    updatedAt: "2025-02-15T15:30:00Z",
    priority: "medium",
    recommendedAction: "Recommend bundling home and auto insurance for premium discount."
  },
  {
    id: "3",
    clientId: "2", // Jane Smith
    relatedPolicyId: "4", // Home insurance
    type: "coverage_increase",
    status: "in_progress",
    description: generateDescription("coverage_increase", "2"),
    potentialRevenue: 400,
    createdAt: "2025-02-20T09:45:00Z",
    updatedAt: "2025-03-01T14:20:00Z",
    priority: "medium",
    recommendedAction: "Suggest increasing home coverage based on current property values in the area."
  },
  {
    id: "4",
    clientId: "3", // Michael Johnson
    relatedPolicyId: "6", // Home insurance
    type: "premium_adjustment",
    status: "eligible",
    description: generateDescription("premium_adjustment", "3"),
    potentialSavings: 150,
    createdAt: "2025-03-02T11:15:00Z",
    updatedAt: "2025-03-02T11:15:00Z",
    priority: "low",
    recommendedAction: "Review client's home security improvements for premium reduction eligibility."
  },
  {
    id: "5",
    clientId: "4", // Sarah Williams
    type: "new_policy",
    status: "recommended",
    description: generateDescription("new_policy", "4", "health"),
    potentialRevenue: 1500,
    createdAt: "2025-02-10T13:30:00Z",
    updatedAt: "2025-02-28T16:45:00Z",
    priority: "high",
    recommendedAction: "Propose health insurance policy for client and family members."
  },
  {
    id: "6",
    clientId: "5", // David Brown
    type: "policy_review",
    status: "eligible",
    description: generateDescription("policy_review", "5"),
    createdAt: "2025-03-03T14:00:00Z",
    updatedAt: "2025-03-03T14:00:00Z",
    priority: "low",
    recommendedAction: "Schedule annual policy review to ensure coverage remains adequate."
  },
  {
    id: "7",
    clientId: "6", // Jennifer Garcia
    relatedPolicyId: "12", // Auto insurance (pending)
    type: "new_policy",
    status: "in_progress",
    description: generateDescription("new_policy", "6", "auto"),
    potentialRevenue: 900,
    createdAt: "2025-02-25T10:30:00Z",
    updatedAt: "2025-03-01T09:15:00Z",
    priority: "high",
    recommendedAction: "Complete auto insurance application and send quote."
  },
  {
    id: "8",
    clientId: "8", // Jessica Lee
    relatedPolicyId: "7", // Renters insurance
    type: "bundle_discount",
    status: "eligible",
    description: generateDescription("bundle_discount", "8", undefined, 175),
    potentialSavings: 175,
    potentialRevenue: 600,
    createdAt: "2025-03-04T16:20:00Z",
    updatedAt: "2025-03-04T16:20:00Z",
    priority: "medium",
    recommendedAction: "Recommend bundling with auto insurance for premium savings."
  },
  {
    id: "9",
    clientId: "9", // Thomas Wilson
    relatedPolicyId: "10", // Business insurance
    type: "coverage_increase",
    status: "completed",
    description: generateDescription("coverage_increase", "9"),
    potentialRevenue: 750,
    createdAt: "2025-01-15T11:00:00Z",
    updatedAt: "2025-02-20T15:45:00Z",
    priority: "medium",
    recommendedAction: "Increase liability coverage for growing business operations."
  },
  {
    id: "10",
    clientId: "10", // Maria Rodriguez
    type: "new_policy",
    status: "rejected",
    description: generateDescription("new_policy", "10", "life"),
    potentialRevenue: 500,
    createdAt: "2025-02-05T09:30:00Z",
    updatedAt: "2025-02-25T14:10:00Z",
    priority: "low",
    recommendedAction: "Suggest life insurance policy for additional family protection."
  }
];

export const getClientForOpportunity = (opportunityId: string) => {
  const opportunity = opportunitiesData.find(o => o.id === opportunityId);
  if (!opportunity) return null;
  
  return clientsData.find(c => c.id === opportunity.clientId) || null;
};

export const getPolicyForOpportunity = (opportunityId: string) => {
  const opportunity = opportunitiesData.find(o => o.id === opportunityId);
  if (!opportunity || !opportunity.relatedPolicyId) return null;
  
  return policiesData.find(p => p.id === opportunity.relatedPolicyId) || null;
};

export const getOpportunitiesByClientId = (clientId: string) => {
  return opportunitiesData.filter(o => o.clientId === clientId);
};

export const getOpportunityById = (opportunityId: string) => {
  return opportunitiesData.find(o => o.id === opportunityId) || null;
};