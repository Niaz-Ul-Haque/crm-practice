// src/data/opportunitiesData.ts
import { clientsData } from './clientsData';
import { policiesData, PolicyType } from './policiesData';
import { formatCurrency } from '@/lib/formatters';

export type OpportunityType =
  | 'policy_renewal'
  | 'coverage_increase'
  | 'bundle_discount'
  | 'premium_adjustment'
  | 'new_policy'
  | 'policy_review'
  | 'cross_sell'
  | 'referral_request'
  | 'risk_assessment'
  | 'cyber';

export type OpportunityStatus =
  | 'eligible'
  | 'pending_review'
  | 'in_progress'
  | 'recommended'
  | 'rejected'
  | 'completed';

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
  priority: 'high' | 'medium' | 'low';
  recommendedAction: string;
  nextSteps?: string[];
  competitorInvolved?: boolean;
  estimatedCloseDate?: string;
}

const getClientName = (clientId: string) => {
  const client = clientsData.find((c) => c.id === clientId);
  if (!client) return 'Unknown Client';
  return `${client.firstName} ${client.lastName}`;
};

const getPolicyTypeName = (type: PolicyType): string => {
  const mapping: Record<PolicyType, string> = {
    home: 'Home Insurance',
    auto: 'Auto Insurance',
    life: 'Life Insurance',
    health: 'Health Insurance',
    business: 'Business Insurance',
    renters: 'Renters Insurance',
    umbrella: 'Umbrella Insurance',
    commercial_property: 'Commercial Property Insurance',
    professional_liability: 'Professional Liability Insurance',
    cyber: 'Cyber Insurance',
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
    case 'policy_renewal':
      return `${clientName}'s ${policyType ? getPolicyTypeName(policyType) : 'policy'} is expiring soon. Reach out to discuss renewal options and potential coverage adjustments.`;
    case 'coverage_increase':
      return `${clientName} may benefit from increased coverage based on recent asset acquisition and risk assessment. Current protection may be insufficient for their needs.`;
    case 'bundle_discount':
      return `${clientName} has multiple separate policies. Bundle opportunity could save them ${savings ? formatCurrency(savings) : 'up to 15%'} annually while improving coverage.`;
    case 'premium_adjustment':
      return `${clientName}'s risk profile and claims history suggests they may qualify for a premium reduction on their ${policyType ? getPolicyTypeName(policyType) : 'policy'}.`;
    case 'new_policy':
      return `${clientName} has a coverage gap in ${policyType ? getPolicyTypeName(policyType) : 'an important area'}. A new policy would address exposure and provide comprehensive protection.`;
    case 'policy_review':
      return `${clientName} hasn't had a comprehensive policy review in over a year. Schedule a review to identify gaps and optimization opportunities.`;
    case 'cross_sell':
      return `${clientName} is an excellent candidate for our ${policyType ? getPolicyTypeName(policyType) : 'additional products'} based on their profile and current coverage.`;
    case 'referral_request':
      return `${clientName} has expressed high satisfaction with our services. Opportunity to request referrals to their professional network.`;
    case 'risk_assessment':
      return `${clientName}'s risk profile has changed due to recent life events. Comprehensive risk assessment needed to ensure proper coverage.`;
    default:
      return "Opportunity to improve client's insurance coverage and strengthen relationship.";
  }
};

export const opportunitiesData: Opportunity[] = [
  {
    id: '1',
    clientId: '1', // Jamal Haija
    relatedPolicyId: '1', // Home insurance
    type: 'policy_renewal',
    status: 'eligible',
    description:
      "Jamal's home insurance policy expires next month. Review coverage limits to ensure they accurately reflect current home value and recent renovations. Opportunity to discuss additional riders for art collection which has increased in value.",
    potentialRevenue: 2400,
    createdAt: '2025-03-01T10:00:00Z',
    updatedAt: '2025-03-01T10:00:00Z',
    expiresAt: '2025-04-15T00:00:00Z',
    priority: 'high',
    recommendedAction:
      'Schedule comprehensive review meeting before renewal to discuss home insurance updates and art collection valuation.',
    nextSteps: [
      'Prepare current policy summary',
      'Research premium trends for luxury properties',
      'Gather information on specialized art collection coverage',
    ],
    estimatedCloseDate: '2025-04-10T00:00:00Z',
  },
  {
    id: '2',
    clientId: '2', // Niaz Haque
    type: 'new_policy',
    status: 'in_progress',
    description:
      'Niaz has significant liability exposure due to his high net worth and tech company leadership. An umbrella policy would provide crucial protection beyond standard coverage limits.',
    potentialRevenue: 950,
    createdAt: '2025-02-15T15:30:00Z',
    updatedAt: '2025-03-05T15:30:00Z',
    priority: 'high',
    recommendedAction:
      'Finalize umbrella insurance proposal with $3M coverage to address liability gaps for tech entrepreneur with growing asset base.',
    nextSteps: [
      'Complete premium calculation',
      'Prepare presentation highlighting liability scenarios',
      'Schedule video call for proposal review',
    ],
    estimatedCloseDate: '2025-03-20T00:00:00Z',
  },
  {
    id: '3',
    clientId: '4', // Lyndsay MacDermott
    relatedPolicyId: '12', // Life insurance
    type: 'coverage_increase',
    status: 'in_progress',
    description:
      "Lyndsay's recent promotion and income increase warrants revisiting her life insurance coverage. Current policy doesn't align with her higher income and updated financial obligations following her divorce.",
    potentialRevenue: 650,
    createdAt: '2025-02-20T09:45:00Z',
    updatedAt: '2025-03-06T14:20:00Z',
    priority: 'medium',
    recommendedAction:
      'Propose increasing term life coverage from $1.5M to $2.5M and adding critical illness rider specific to her medical specialty.',
    nextSteps: [
      'Prepare updated income protection analysis',
      'Research specialty physician disability options',
      'Schedule in-person review meeting',
    ],
    estimatedCloseDate: '2025-03-25T00:00:00Z',
  },
  {
    id: '4',
    clientId: '3', // Richard Bangyay
    relatedPolicyId: '6', // Business insurance
    type: 'risk_assessment',
    status: 'eligible',
    description:
      "Richard's construction business has expanded to larger commercial projects. Current business liability limits may be insufficient given the increased scale and complexity of new contracts.",
    potentialRevenue: 1850,
    createdAt: '2025-03-02T11:15:00Z',
    updatedAt: '2025-03-02T11:15:00Z',
    priority: 'high',
    recommendedAction:
      'Conduct comprehensive risk assessment of new construction operations and revise coverage limits accordingly.',
    nextSteps: [
      'Analyze new project contracts for liability requirements',
      'Review subcontractor insurance documentation',
      'Prepare specialized construction risk report',
    ],
  },
  {
    id: '5',
    clientId: '5', // Akeem Herbert
    type: 'new_policy',
    status: 'recommended',
    description:
      'Akeem needs specialized insurance that protects his career as a professional athlete. Coverage should include disability with high-value income protection, international travel for games, and specialized medical care.',
    potentialRevenue: 3200,
    createdAt: '2025-02-10T13:30:00Z',
    updatedAt: '2025-03-04T16:45:00Z',
    priority: 'high',
    recommendedAction:
      'Present comprehensive athlete protection package including custom disability, international medical, and career-ending injury coverage.',
    nextSteps: [
      'Finalize athlete-specific insurance proposal',
      'Coordinate with league benefits specialist',
      'Schedule meeting around training schedule',
    ],
    competitorInvolved: true,
    estimatedCloseDate: '2025-03-18T00:00:00Z',
  },
  {
    id: '6',
    clientId: '10', // Marcus Williams
    type: 'cyber',
    status: 'eligible',
    description:
      "Marcus's law firm would benefit from enhanced cyber liability coverage. Recent high-profile law firm breaches make this a timely discussion about data protection for sensitive client information.",
    potentialRevenue: 2100,
    createdAt: '2025-03-03T14:00:00Z',
    updatedAt: '2025-03-03T14:00:00Z',
    priority: 'medium',
    recommendedAction:
      'Present enhanced cyber liability package with data breach response, regulatory defense, and client notification services.',
    nextSteps: [
      'Prepare law firm cyber risk assessment',
      'Compile recent legal industry breach statistics',
      'Develop specialized law firm protection proposal',
    ],
  },
  {
    id: '7',
    clientId: '7', // Sofia Chen
    type: 'new_policy',
    status: 'in_progress',
    description:
      'Sofia needs specialized art gallery insurance that covers exhibited works, transit between locations, theft, damage, and visitor liability. Her new gallery opens next month and requires comprehensive protection.',
    potentialRevenue: 2800,
    createdAt: '2025-02-25T10:30:00Z',
    updatedAt: '2025-03-06T09:15:00Z',
    priority: 'high',
    recommendedAction:
      'Finalize specialized art gallery package including exhibited works coverage, transit insurance, and visitor liability protection.',
    nextSteps: [
      'Complete gallery space assessment',
      'Finalize fine art valuation method',
      'Prepare opening exhibition coverage details',
    ],
    estimatedCloseDate: '2025-03-28T00:00:00Z',
  },
  {
    id: '8',
    clientId: '11', // Elena Kazan
    relatedPolicyId: '28', // Business insurance
    type: 'coverage_increase',
    status: 'eligible',
    description:
      "Elena's design business is expanding from home-based to a commercial space with employees. Her current business insurance doesn't adequately cover the upcoming expansion, new equipment, and employer liability.",
    potentialSavings: 0,
    potentialRevenue: 1200,
    createdAt: '2025-03-04T16:20:00Z',
    updatedAt: '2025-03-04T16:20:00Z',
    priority: 'medium',
    recommendedAction:
      "Prepare business expansion insurance package with workers' comp, increased liability, and commercial property coverage.",
    nextSteps: [
      'Gather details on new commercial space',
      'Determine employee hiring timeline',
      'Research design studio-specific risks',
    ],
  },
  {
    id: '9',
    clientId: '12', // Devon Jackson
    type: 'bundle_discount',
    status: 'eligible',
    description:
      'Devon is purchasing a new Tesla Model 3. This presents an excellent opportunity to bundle with his existing home policy for approximately 12% savings while providing comprehensive vehicle coverage.',
    potentialSavings: 275,
    potentialRevenue: 1450,
    createdAt: '2025-03-07T09:30:00Z',
    updatedAt: '2025-03-07T09:30:00Z',
    priority: 'medium',
    recommendedAction:
      'Present auto insurance quote with bundling discount and EV-specific coverages including charging equipment and battery protection.',
    nextSteps: [
      'Confirm Tesla delivery date',
      'Prepare bundling savings analysis',
      'Research EV-specific coverage options',
    ],
    estimatedCloseDate: '2025-03-25T00:00:00Z',
  },
  {
    id: '10',
    clientId: '15', // Gabriel Morales
    type: 'policy_renewal',
    status: 'eligible',
    description:
      "Gabriel's life insurance policy lapsed during his job transition. His new position as school principal presents an opportunity to reinstate coverage with updated beneficiaries and terms that reflect his current situation.",
    potentialRevenue: 850,
    createdAt: '2025-03-01T09:30:00Z',
    updatedAt: '2025-03-01T09:30:00Z',
    priority: 'medium',
    recommendedAction:
      'Propose new life insurance policy with education profession-specific features and modernized terms.',
    relatedPolicyId: '35',
    nextSteps: [
      'Prepare comparison to lapsed policy',
      'Research educator-specific coverage options',
      'Schedule initial re-engagement call',
    ],
  },
  {
    id: '11',
    clientId: '13', // Sanjay Gupta
    relatedPolicyId: '30', // Commercial property
    type: 'cross_sell',
    status: 'pending_review',
    description:
      'Sanjay is opening a new restaurant location. While he has property coverage, he would benefit from specialized business interruption insurance given the volatile nature of the restaurant industry.',
    potentialRevenue: 1800,
    createdAt: '2025-03-05T13:15:00Z',
    updatedAt: '2025-03-05T13:15:00Z',
    priority: 'high',
    recommendedAction:
      'Present specialized business interruption coverage for restaurant operations with food spoilage, equipment breakdown, and reputation protection.',
    nextSteps: [
      'Analyze current business interruption exposure',
      'Calculate revenue protection needs',
      'Prepare restaurant-specific case studies',
    ],
    estimatedCloseDate: '2025-04-01T00:00:00Z',
  },
  {
    id: '12',
    clientId: '9', // Priya Patel
    type: 'policy_review',
    status: 'eligible',
    description:
      'Priya has recently completed significant renovations to both her primary and vacation properties. A comprehensive review will ensure coverage accurately reflects these improvements and current replacement values.',
    potentialRevenue: 750,
    createdAt: '2025-03-06T10:45:00Z',
    updatedAt: '2025-03-06T10:45:00Z',
    priority: 'medium',
    recommendedAction:
      'Conduct comprehensive property review including updated replacement cost assessment and documentation of high-value renovations.',
    relatedPolicyId: '20',
    nextSteps: [
      'Request renovation documentation',
      'Schedule property assessment visits',
      'Prepare policy consolidation options',
    ],
  },
  {
    id: '13',
    clientId: '14', // Layla Thompson
    type: 'referral_request',
    status: 'eligible',
    description:
      "Layla is highly satisfied with her comprehensive coverage and has a vast network of real estate professionals. She's an ideal candidate for referrals to high-value prospects in real estate and property management.",
    potentialRevenue: 0,
    createdAt: '2025-03-07T14:30:00Z',
    updatedAt: '2025-03-07T14:30:00Z',
    priority: 'low',
    recommendedAction:
      'Schedule appreciation lunch to discuss referral program and identify potential real estate network connections.',
    nextSteps: [
      'Prepare client appreciation gift',
      'Develop real estate agent referral program outline',
      'Research potential networking events',
    ],
  },
  {
    id: '14',
    clientId: '6', // Tamara Britton
    relatedPolicyId: '15', // Professional liability
    type: 'cross_sell',
    status: 'completed',
    description:
      'Tamara has added new financial planning services to her practice. Successfully cross-sold enhanced E&O coverage to protect against expanded service offerings.',
    potentialRevenue: 850,
    createdAt: '2025-01-20T11:00:00Z',
    updatedAt: '2025-03-06T15:45:00Z',
    priority: 'medium',
    recommendedAction:
      'Completed: Updated professional liability coverage with expanded protection for new financial planning services.',
    competitorInvolved: false,
  },
  {
    id: '15',
    clientId: '8', // Omar Al-Farsi
    type: 'new_policy',
    status: 'pending_review',
    description:
      'Omar travels internationally at least once a month for tech conferences. A global travel insurance policy would provide critical protection for medical emergencies, evacuation, and business equipment while abroad.',
    potentialRevenue: 625,
    createdAt: '2025-03-07T11:45:00Z',
    updatedAt: '2025-03-07T11:45:00Z',
    priority: 'medium',
    recommendedAction:
      'Propose international travel insurance package with medical evacuation, equipment coverage, and trip interruption protection.',
    nextSteps: [
      'Analyze upcoming travel schedule',
      'Research tech equipment protection options',
      'Prepare global coverage comparison',
    ],
    estimatedCloseDate: '2025-03-30T00:00:00Z',
  },
];

export const getClientForOpportunity = (opportunityId: string) => {
  const opportunity = opportunitiesData.find((o) => o.id === opportunityId);
  if (!opportunity) return null;

  return clientsData.find((c) => c.id === opportunity.clientId) || null;
};

export const getPolicyForOpportunity = (opportunityId: string) => {
  const opportunity = opportunitiesData.find((o) => o.id === opportunityId);
  if (!opportunity || !opportunity.relatedPolicyId) return null;

  return policiesData.find((p) => p.id === opportunity.relatedPolicyId) || null;
};

export const getOpportunitiesByClientId = (clientId: string) => {
  return opportunitiesData.filter((o) => o.clientId === clientId);
};

export const getOpportunityById = (opportunityId: string) => {
  return opportunitiesData.find((o) => o.id === opportunityId) || null;
};

export const getHighPriorityOpportunities = () => {
  return opportunitiesData.filter(
    (o) =>
      o.priority === 'high' &&
      (o.status === 'eligible' ||
        o.status === 'pending_review' ||
        o.status === 'in_progress')
  );
};

export const getExpiringPolicyOpportunities = (daysThreshold: number = 30) => {
  const today = new Date();
  const threshold = new Date();
  threshold.setDate(today.getDate() + daysThreshold);

  return opportunitiesData.filter((o) => {
    if (o.type !== 'policy_renewal' || !o.expiresAt) return false;
    const expiryDate = new Date(o.expiresAt);
    return expiryDate >= today && expiryDate <= threshold;
  });
};
