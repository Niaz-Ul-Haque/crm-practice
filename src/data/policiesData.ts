// src/data/policiesData.ts
import { Client, clientsData } from './clientsData';

export type PolicyType =
  | 'home'
  | 'auto'
  | 'life'
  | 'health'
  | 'business'
  | 'renters'
  | 'umbrella'
  | 'commercial_property'
  | 'professional_liability'
  | 'cyber';

export type PolicyStatus = 'active' | 'pending' | 'expired' | 'cancelled';

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
  paymentFrequency: 'monthly' | 'quarterly' | 'semiannual' | 'annual';
  lastUpdated: string;
  deductible?: number;
  riders?: string[];
}

export const policyProviders = [
  'Meridian Insurance',
  'National Shield',
  'Dominion Protection',
  'Maple Financial Group',
  'Guardian Mutual',
  'Capital Coverage',
  'Frontier Insurance',
];

export const policiesData: Policy[] = [
  {
    id: '1',
    policyNumber: 'HOM-785392',
    clientId: '1', // Jamal Haija
    type: 'home',
    provider: 'Meridian Insurance',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    premium: 2100,
    coverageAmount: 1250000,
    description:
      'Executive home in Yorkville with premium finishes and security system. Includes additional coverage for art collection and wine cellar.',
    paymentFrequency: 'annual',
    lastUpdated: '2024-01-15',
    deductible: 2500,
    riders: ['Scheduled Personal Property', 'Water Backup', 'Home Business'],
  },
  {
    id: '2',
    policyNumber: 'AUT-629174',
    clientId: '1', // Jamal Haija
    type: 'auto',
    provider: 'National Shield',
    status: 'active',
    startDate: '2024-02-08',
    endDate: '2025-02-08',
    premium: 1850,
    coverageAmount: 2000000,
    description:
      'Tesla Model S Plaid and Range Rover Sport with comprehensive coverage and gap insurance.',
    paymentFrequency: 'annual',
    lastUpdated: '2024-02-08',
    deductible: 1000,
    riders: ['Rental Car Coverage', 'New Car Replacement'],
  },
  {
    id: '3',
    policyNumber: 'LIF-438521',
    clientId: '1', // Jamal Haija
    type: 'life',
    provider: 'Maple Financial Group',
    status: 'active',
    startDate: '2023-11-20',
    endDate: '2043-11-20',
    premium: 830,
    coverageAmount: 3000000,
    description:
      'Term life insurance policy for 20 years with comprehensive coverage and accelerated death benefit.',
    paymentFrequency: 'quarterly',
    lastUpdated: '2023-11-20',
    riders: ["Children's Term", 'Waiver of Premium', 'Accidental Death'],
  },
  {
    id: '4',
    policyNumber: 'HOM-562897',
    clientId: '2', // Niaz Haque
    type: 'home',
    provider: 'Guardian Mutual',
    status: 'active',
    startDate: '2024-03-01',
    endDate: '2025-03-01',
    premium: 1850,
    coverageAmount: 950000,
    description:
      'Modern home with home automation system. Additional coverage for electronics and home office equipment.',
    paymentFrequency: 'annual',
    lastUpdated: '2024-03-01',
    deductible: 2000,
    riders: ['Identity Theft Protection', 'Home Electronics'],
  },
  {
    id: '5',
    policyNumber: 'AUT-745123',
    clientId: '2', // Niaz Haque
    type: 'auto',
    provider: 'Capital Coverage',
    status: 'active',
    startDate: '2023-12-10',
    endDate: '2024-12-10',
    premium: 1400,
    coverageAmount: 1000000,
    description:
      'BMW i4 with comprehensive coverage including specialized electric vehicle coverage.',
    paymentFrequency: 'monthly',
    lastUpdated: '2023-12-10',
    deductible: 750,
    riders: ['Roadside Assistance Plus', 'Custom Equipment'],
  },
  {
    id: '6',
    policyNumber: 'BUS-329815',
    clientId: '3', // Richard Bangyay
    type: 'business',
    provider: 'Dominion Protection',
    status: 'active',
    startDate: '2024-02-01',
    endDate: '2025-02-01',
    premium: 2850,
    coverageAmount: 2000000,
    description:
      'Commercial general liability for construction business with three locations.',
    paymentFrequency: 'quarterly',
    lastUpdated: '2024-02-01',
    deductible: 5000,
    riders: ['Professional Liability', 'Equipment Breakdown'],
  },
  {
    id: '7',
    policyNumber: 'COM-987124',
    clientId: '3', // Richard Bangyay
    type: 'commercial_property',
    provider: 'Meridian Insurance',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    premium: 1750,
    coverageAmount: 1500000,
    description: 'Coverage for main office building and warehouse facilities.',
    paymentFrequency: 'quarterly',
    lastUpdated: '2024-01-15',
    deductible: 3500,
  },
  {
    id: '8',
    policyNumber: 'AUT-654328',
    clientId: '3', // Richard Bangyay
    type: 'auto',
    provider: 'National Shield',
    status: 'active',
    startDate: '2023-10-20',
    endDate: '2024-10-20',
    premium: 920,
    coverageAmount: 750000,
    description:
      'Commercial vehicle fleet insurance for 5 construction vehicles.',
    paymentFrequency: 'quarterly',
    lastUpdated: '2023-10-20',
    deductible: 1500,
  },
  {
    id: '9',
    policyNumber: 'UMB-234519',
    clientId: '3', // Richard Bangyay
    type: 'umbrella',
    provider: 'Guardian Mutual',
    status: 'active',
    startDate: '2024-01-10',
    endDate: '2025-01-10',
    premium: 600,
    coverageAmount: 5000000,
    description:
      'Umbrella policy covering business and personal liability beyond standard policies.',
    paymentFrequency: 'annual',
    lastUpdated: '2024-01-10',
  },
  {
    id: '10',
    policyNumber: 'PRO-781539',
    clientId: '4', // Lyndsay MacDermott
    type: 'professional_liability',
    provider: 'Capital Coverage',
    status: 'active',
    startDate: '2024-01-20',
    endDate: '2025-01-20',
    premium: 1850,
    coverageAmount: 2000000,
    description: 'Medical malpractice insurance for private practice.',
    paymentFrequency: 'semiannual',
    lastUpdated: '2024-01-20',
    deductible: 10000,
  },
  {
    id: '11',
    policyNumber: 'HOM-342617',
    clientId: '4', // Lyndsay MacDermott
    type: 'home',
    provider: 'Meridian Insurance',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2025-01-01',
    premium: 1700,
    coverageAmount: 1100000,
    description:
      'Urban condo with high-end finishes. Includes additional coverage for medical equipment and home office.',
    paymentFrequency: 'monthly',
    lastUpdated: '2024-01-01',
    deductible: 2000,
    riders: ['Special Personal Property', 'Business Property Increased Limit'],
  },
  {
    id: '12',
    policyNumber: 'LIF-923756',
    clientId: '4', // Lyndsay MacDermott
    type: 'life',
    provider: 'Guardian Mutual',
    status: 'active',
    startDate: '2023-09-15',
    endDate: '2043-09-15',
    premium: 800,
    coverageAmount: 1500000,
    description:
      'Term life policy with options for conversion to permanent insurance. Recent beneficiary updates.',
    paymentFrequency: 'annual',
    lastUpdated: '2025-02-28',
    riders: ['Disability Income', 'Critical Illness'],
  },
  {
    id: '13',
    policyNumber: 'LIF-763829',
    clientId: '5', // Akeem Herbert
    type: 'life',
    provider: 'Maple Financial Group',
    status: 'active',
    startDate: '2024-01-05',
    endDate: '2044-01-05',
    premium: 1850,
    coverageAmount: 5000000,
    description:
      'High-value term life insurance policy with custom clauses for professional athlete.',
    paymentFrequency: 'annual',
    lastUpdated: '2024-01-05',
    riders: ['Disability Income Rider', 'Return of Premium'],
  },
  {
    id: '14',
    policyNumber: 'HOM-192735',
    clientId: '6', // Tamara Britton
    type: 'home',
    provider: 'National Shield',
    status: 'active',
    startDate: '2023-08-15',
    endDate: '2024-08-15',
    premium: 2200,
    coverageAmount: 1300000,
    description:
      'Primary residence with extensive security system and high-value contents coverage.',
    paymentFrequency: 'annual',
    lastUpdated: '2023-08-15',
    deductible: 2500,
    riders: ['Identity Fraud Expense', 'Valuable Items Plus'],
  },
  {
    id: '15',
    policyNumber: 'PRO-845627',
    clientId: '6', // Tamara Britton
    type: 'professional_liability',
    provider: 'Dominion Protection',
    status: 'active',
    startDate: '2023-11-10',
    endDate: '2024-11-10',
    premium: 1350,
    coverageAmount: 1000000,
    description:
      'Errors and omissions coverage for financial advisory practice.',
    paymentFrequency: 'quarterly',
    lastUpdated: '2023-11-10',
    deductible: 5000,
  },
  {
    id: '16',
    policyNumber: 'AUT-587432',
    clientId: '6', // Tamara Britton
    type: 'auto',
    provider: 'Guardian Mutual',
    status: 'active',
    startDate: '2024-02-20',
    endDate: '2025-02-20',
    premium: 1570,
    coverageAmount: 1000000,
    description:
      'Mercedes GLE 450 with comprehensive coverage and additional gap insurance.',
    paymentFrequency: 'monthly',
    lastUpdated: '2024-02-20',
    deductible: 1000,
    riders: ['Original Parts Replacement', 'Accident Forgiveness'],
  },
  {
    id: '17',
    policyNumber: 'BUS-647291',
    clientId: '7', // Sofia Chen
    type: 'business',
    provider: 'Capital Coverage',
    status: 'pending',
    startDate: '2025-04-01',
    endDate: '2026-04-01',
    premium: 1250,
    coverageAmount: 1000000,
    description:
      'Art gallery liability and property insurance, including specialized coverage for exhibited artwork.',
    paymentFrequency: 'quarterly',
    lastUpdated: '2025-03-06',
    deductible: 2500,
  },
  {
    id: '18',
    policyNumber: 'RNT-391754',
    clientId: '8', // Omar Al-Farsi
    type: 'renters',
    provider: 'Frontier Insurance',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    premium: 780,
    coverageAmount: 100000,
    description:
      'High-value renters insurance with electronics coverage and international personal property protection.',
    paymentFrequency: 'annual',
    lastUpdated: '2024-01-15',
    deductible: 500,
    riders: ['Away From Home Protection', 'Electronics Coverage'],
  },
  {
    id: '19',
    policyNumber: 'AUT-287645',
    clientId: '8', // Omar Al-Farsi
    type: 'auto',
    provider: 'Meridian Insurance',
    status: 'active',
    startDate: '2023-09-10',
    endDate: '2024-09-10',
    premium: 2000,
    coverageAmount: 1000000,
    description:
      'Audi e-tron with comprehensive international coverage for frequent traveler.',
    paymentFrequency: 'semiannual',
    lastUpdated: '2023-09-10',
    deductible: 750,
    riders: ['Trip Interruption', 'Enhanced Roadside Assistance'],
  },
  {
    id: '20',
    policyNumber: 'HOM-462391',
    clientId: '9', // Priya Patel
    type: 'home',
    provider: 'Dominion Protection',
    status: 'active',
    startDate: '2023-11-01',
    endDate: '2024-11-01',
    premium: 2350,
    coverageAmount: 900000,
    description:
      'Primary residence with expansive property and swimming pool. Additional liability coverage for home-based entertaining.',
    paymentFrequency: 'annual',
    lastUpdated: '2023-11-01',
    deductible: 2000,
    riders: ['Water Backup', 'Pool and Spa'],
  },
  {
    id: '21',
    policyNumber: 'HOM-592174',
    clientId: '9', // Priya Patel
    type: 'home',
    provider: 'Dominion Protection',
    status: 'active',
    startDate: '2023-12-15',
    endDate: '2024-12-15',
    premium: 1600,
    coverageAmount: 600000,
    description:
      'Vacation property on Lake Simcoe with boat dock and recreational equipment coverage.',
    paymentFrequency: 'annual',
    lastUpdated: '2023-12-15',
    deductible: 2000,
    riders: ['Watercraft', 'Recreational Equipment'],
  },
  {
    id: '22',
    policyNumber: 'LIF-781526',
    clientId: '9', // Priya Patel
    type: 'life',
    provider: 'National Shield',
    status: 'active',
    startDate: '2024-01-10',
    endDate: '2044-01-10',
    premium: 1000,
    coverageAmount: 1500000,
    description:
      'Term life insurance with additional riders for children and critical illness.',
    paymentFrequency: 'annual',
    lastUpdated: '2024-01-10',
    riders: ['Child Term', 'Critical Illness', 'Disability Waiver'],
  },
  {
    id: '23',
    policyNumber: 'PRO-635129',
    clientId: '10', // Marcus Williams
    type: 'professional_liability',
    provider: 'Guardian Mutual',
    status: 'active',
    startDate: '2024-01-20',
    endDate: '2025-01-20',
    premium: 2850,
    coverageAmount: 3000000,
    description:
      'Legal professional liability coverage for senior law partner.',
    paymentFrequency: 'quarterly',
    lastUpdated: '2024-01-20',
    deductible: 10000,
  },
  {
    id: '24',
    policyNumber: 'CYB-471598',
    clientId: '10', // Marcus Williams
    type: 'cyber',
    provider: 'Frontier Insurance',
    status: 'active',
    startDate: '2024-02-05',
    endDate: '2025-02-05',
    premium: 1800,
    coverageAmount: 1000000,
    description:
      'Cyber liability insurance for law firm covering data breach, ransomware, and client information protection.',
    paymentFrequency: 'annual',
    lastUpdated: '2024-02-05',
    deductible: 5000,
  },
  {
    id: '25',
    policyNumber: 'HOM-295718',
    clientId: '10', // Marcus Williams
    type: 'home',
    provider: 'Meridian Insurance',
    status: 'active',
    startDate: '2023-10-15',
    endDate: '2024-10-15',
    premium: 2400,
    coverageAmount: 1800000,
    description:
      'Luxury townhome in Forest Hill with extensive valuables coverage and home office.',
    paymentFrequency: 'annual',
    lastUpdated: '2023-10-15',
    deductible: 3000,
    riders: ['Valuable Articles', 'Home Business'],
  },
  {
    id: '26',
    policyNumber: 'UMB-163847',
    clientId: '10', // Marcus Williams
    type: 'umbrella',
    provider: 'Capital Coverage',
    status: 'active',
    startDate: '2023-11-10',
    endDate: '2024-11-10',
    premium: 800,
    coverageAmount: 5000000,
    description:
      'High-limit umbrella policy for comprehensive liability protection.',
    paymentFrequency: 'annual',
    lastUpdated: '2023-11-10',
  },
  {
    id: '27',
    policyNumber: 'HOM-743921',
    clientId: '11', // Elena Kazan
    type: 'home',
    provider: 'National Shield',
    status: 'active',
    startDate: '2023-12-01',
    endDate: '2024-12-01',
    premium: 1650,
    coverageAmount: 750000,
    description:
      'Urban loft with specialized coverage for home-based design business and sample materials.',
    paymentFrequency: 'monthly',
    lastUpdated: '2023-12-01',
    deductible: 1500,
    riders: ['Home Business', 'Business Property'],
  },
  {
    id: '28',
    policyNumber: 'BUS-518726',
    clientId: '11', // Elena Kazan
    type: 'business',
    provider: 'Dominion Protection',
    status: 'active',
    startDate: '2024-02-10',
    endDate: '2025-02-10',
    premium: 1800,
    coverageAmount: 500000,
    description:
      'Professional liability and business property for interior design firm.',
    paymentFrequency: 'quarterly',
    lastUpdated: '2024-02-10',
    deductible: 2000,
  },
  {
    id: '29',
    policyNumber: 'HOM-682451',
    clientId: '12', // Devon Jackson
    type: 'home',
    provider: 'Guardian Mutual',
    status: 'active',
    startDate: '2024-01-20',
    endDate: '2025-01-20',
    premium: 1280,
    coverageAmount: 550000,
    description:
      'First home purchase, condo with modern finishes and appliances. Includes content coverage for high-end electronics.',
    paymentFrequency: 'monthly',
    lastUpdated: '2024-01-20',
    deductible: 1000,
    riders: ['Electronics Protection', 'Identity Theft'],
  },
  {
    id: '30',
    policyNumber: 'COM-395728',
    clientId: '13', // Sanjay Gupta
    type: 'commercial_property',
    provider: 'Meridian Insurance',
    status: 'active',
    startDate: '2023-10-05',
    endDate: '2024-10-05',
    premium: 4850,
    coverageAmount: 2500000,
    description: 'Commercial property insurance for 3 restaurant locations.',
    paymentFrequency: 'quarterly',
    lastUpdated: '2023-10-05',
    deductible: 5000,
  },
  {
    id: '31',
    policyNumber: 'BUS-724915',
    clientId: '13', // Sanjay Gupta
    type: 'business',
    provider: 'Capital Coverage',
    status: 'active',
    startDate: '2023-11-15',
    endDate: '2024-11-15',
    premium: 4830,
    coverageAmount: 3000000,
    description:
      'Business liability, workers comp, and food service specialized coverage.',
    paymentFrequency: 'quarterly',
    lastUpdated: '2023-11-15',
    deductible: 10000,
  },
  {
    id: '32',
    policyNumber: 'HOM-246813',
    clientId: '14', // Layla Thompson
    type: 'home',
    provider: 'National Shield',
    status: 'active',
    startDate: '2023-09-10',
    endDate: '2024-09-10',
    premium: 1950,
    coverageAmount: 1200000,
    description:
      'Primary residence with high-end finishes and extensive home office for real estate business.',
    paymentFrequency: 'annual',
    lastUpdated: '2023-09-10',
    deductible: 2500,
    riders: ['Home Business Liability', 'Scheduled Jewelry'],
  },
  {
    id: '33',
    policyNumber: 'PRO-592471',
    clientId: '14', // Layla Thompson
    type: 'professional_liability',
    provider: 'Dominion Protection',
    status: 'active',
    startDate: '2024-02-01',
    endDate: '2025-02-01',
    premium: 1850,
    coverageAmount: 1000000,
    description: 'Errors and omissions coverage for real estate brokerage.',
    paymentFrequency: 'quarterly',
    lastUpdated: '2024-02-01',
    deductible: 5000,
  },
  {
    id: '34',
    policyNumber: 'INV-724816',
    clientId: '14', // Layla Thompson
    type: 'home',
    provider: 'Guardian Mutual',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    premium: 2040,
    coverageAmount: 850000,
    description: 'Coverage for investment property portfolio (3 rental units).',
    paymentFrequency: 'monthly',
    lastUpdated: '2024-01-15',
    deductible: 2500,
  },
  {
    id: '35',
    policyNumber: 'LIF-371924',
    clientId: '15', // Gabriel Morales
    type: 'life',
    provider: 'Maple Financial Group',
    status: 'expired',
    startDate: '2023-01-01',
    endDate: '2024-01-01',
    premium: 650,
    coverageAmount: 750000,
    description:
      'Term life policy that expired during job transition. Good candidate for new policy.',
    paymentFrequency: 'annual',
    lastUpdated: '2024-01-01',
  },
];

export const getClientNameById = (clientId: string): string => {
  const client = clientsData.find((c) => c.id === clientId);
  if (!client) return 'Unknown Client';
  return `${client.firstName} ${client.lastName}`;
};

export const getPoliciesByClientId = (clientId: string): Policy[] => {
  return policiesData.filter((policy) => policy.clientId === clientId);
};

export const getPolicyById = (policyId: string): Policy | undefined => {
  return policiesData.find((policy) => policy.id === policyId);
};

export const getClientByPolicyId = (policyId: string): Client | undefined => {
  const policy = getPolicyById(policyId);
  if (!policy) return undefined;

  return clientsData.find((client) => client.id === policy.clientId);
};
