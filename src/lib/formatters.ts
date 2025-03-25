// src/lib/formatters.ts
import { PolicyType, PolicyStatus } from '@/data/policiesData';

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPhoneNumber = (value: string): string => {
  if (value.length !== 10) return value;
  return `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
};

export const formatPolicyType = (type: PolicyType): string => {
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

export const formatPolicyStatus = (
  status: PolicyStatus
): { text: string; color: string } => {
  const mapping: Record<PolicyStatus, { text: string; color: string }> = {
    active: { text: 'Active', color: 'bg-green-100 text-green-800' },
    pending: { text: 'Pending', color: 'bg-amber-100 text-amber-800' },
    expired: { text: 'Expired', color: 'bg-red-100 text-red-800' },
    cancelled: { text: 'Cancelled', color: 'bg-gray-100 text-gray-800' },
  };

  return (
    mapping[status] || { text: status, color: 'bg-gray-100 text-gray-800' }
  );
};
