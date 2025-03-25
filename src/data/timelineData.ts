// src/data/timelineData.ts

export interface TimelineItem {
  id: string;
  type:
    | 'message'
    | 'document'
    | 'call'
    | 'email'
    | 'policy_renewal'
    | 'policy_update'
    | 'policy_added'
    | 'payment'
    | 'meeting'
    | 'note'
    | 'opportunity'
    | 'task'
    | 'claim'
    | 'client_added'
    | 'sms'
    | 'video';
  title: string;
  description?: string;
  date: string;
  clientId: string;
  policyId?: string;
  opportunityId?: string;
  taskId?: string;
  communicationId?: string;
  tags?: string[];
  amount?: number;
  status?: string;
  assignedTo?: string;
  attachments?: string[];
  location?: string;
}

export const generateTimelineData = (clientId: string): TimelineItem[] => {
  const clientTimelines: { [key: string]: TimelineItem[] } = {
    '1': [
      {
        id: 'jh-1',
        type: 'email',
        title: 'Email: Upcoming Policy Renewal and Portfolio Review',
        description:
          'Initial outreach about upcoming home insurance renewal and portfolio review.',
        date: '2025-03-05T14:30:00Z',
        clientId: '1',
        policyId: '1',
        communicationId: '1',
        opportunityId: '1',
        tags: ['policy renewal', 'high value client'],
      },
      {
        id: 'jh-2',
        type: 'call',
        title: 'Call: Policy Renewal Discussion',
        description:
          "Discussed home insurance renewal, art collection coverage, and children's education options.",
        date: '2025-03-06T10:15:00Z',
        clientId: '1',
        policyId: '1',
        communicationId: '2',
        opportunityId: '1',
        tags: ['art collection', "children's education"],
      },
      {
        id: 'jh-3',
        type: 'call',
        title: 'Call: Art Collection Valuation Discussion',
        description:
          'Discussed process for art collection valuation and potential high-value acquisition.',
        date: '2025-03-07T11:15:00Z',
        clientId: '1',
        policyId: '1',
        communicationId: '18',
        tags: ['art collection', 'appraisal'],
      },
      {
        id: 'jh-4',
        type: 'task',
        title: 'Task Created: Quarterly Review Meeting',
        description:
          'Scheduled comprehensive portfolio review meeting for March 15.',
        date: '2025-03-01T10:30:00Z',
        clientId: '1',
        taskId: '1',
        opportunityId: '1',
        tags: ['meeting', 'high priority'],
      },
      {
        id: 'jh-5',
        type: 'policy_update',
        title: 'Auto Insurance Premium Payment',
        description:
          'Annual premium payment processed for Tesla and Range Rover coverage.',
        date: '2025-02-08T09:00:00Z',
        clientId: '1',
        policyId: '2',
        amount: 1850,
        tags: ['payment', 'auto insurance'],
      },
      {
        id: 'jh-6',
        type: 'opportunity',
        title: 'Opportunity Created: Home Policy Renewal',
        description:
          'Identified opportunity to review coverage limits for home and art collection.',
        date: '2025-03-01T10:00:00Z',
        clientId: '1',
        policyId: '1',
        opportunityId: '1',
        tags: ['policy renewal', 'high priority'],
      },
    ],

    '2': [
      {
        id: 'nh-1',
        type: 'email',
        title: 'Email: Umbrella Policy Proposal',
        description:
          'Sent comprehensive umbrella liability proposal for tech entrepreneur.',
        date: '2025-03-01T16:45:00Z',
        clientId: '2',
        communicationId: '3',
        opportunityId: '2',
        tags: ['umbrella policy', 'high net worth'],
        attachments: [
          'Haque_Umbrella_Proposal.pdf',
          'TechEntrepreneur_CaseStudy.pdf',
        ],
      },
      {
        id: 'nh-2',
        type: 'sms',
        title: 'SMS: Video Call Confirmation',
        description: 'Confirmed video call to review umbrella policy proposal.',
        date: '2025-03-07T09:50:00Z',
        clientId: '2',
        communicationId: '20',
        opportunityId: '2',
        tags: ['meeting confirmation'],
      },
      {
        id: 'nh-3',
        type: 'policy_renewal',
        title: 'Home Insurance Renewal',
        description:
          'Annual renewal of home insurance policy with updated coverage for home automation system.',
        date: '2025-03-01T00:00:00Z',
        clientId: '2',
        policyId: '4',
        amount: 1850,
        tags: ['home insurance', 'renewal'],
      },
      {
        id: 'nh-4',
        type: 'opportunity',
        title: 'Opportunity: New Umbrella Policy',
        description:
          'Created opportunity for comprehensive umbrella liability protection.',
        date: '2025-02-15T15:30:00Z',
        clientId: '2',
        opportunityId: '2',
        tags: ['new policy', 'high priority'],
      },
      {
        id: 'nh-5',
        type: 'task',
        title: 'Task Created: Send Umbrella Policy Documents',
        description:
          'Prepare and send updated umbrella policy proposal documents.',
        date: '2025-03-02T09:15:00Z',
        clientId: '2',
        taskId: '2',
        opportunityId: '2',
        tags: ['document', 'medium priority'],
      },
    ],

    '3': [
      {
        id: 'rb-1',
        type: 'sms',
        title: 'SMS: Meeting Confirmation',
        description:
          'Confirmed meeting to review construction business insurance needs.',
        date: '2025-03-04T17:30:00Z',
        clientId: '3',
        communicationId: '4',
        tags: ['meeting confirmation', 'construction business'],
      },
      {
        id: 'rb-2',
        type: 'meeting',
        title: 'Meeting: Construction Business Risk Assessment',
        description:
          'Conducted comprehensive risk assessment for expanding construction operations.',
        date: '2025-03-05T15:45:00Z',
        clientId: '3',
        communicationId: '17',
        opportunityId: '4',
        location: "Client's main office - 143 Lakeshore Blvd East, Toronto",
        tags: ['risk assessment', 'liability limits'],
      },
      {
        id: 'rb-3',
        type: 'task',
        title: 'Task Created: Review Liability Coverage',
        description:
          'Annual review of liability coverage for construction businesses.',
        date: '2025-03-02T13:45:00Z',
        clientId: '3',
        taskId: '3',
        opportunityId: '4',
        policyId: '6',
        tags: ['review', 'high priority'],
      },
      {
        id: 'rb-4',
        type: 'opportunity',
        title: 'Opportunity: Business Liability Expansion',
        description:
          'Identified need for expanded business liability coverage for larger projects.',
        date: '2025-03-02T11:15:00Z',
        clientId: '3',
        opportunityId: '4',
        policyId: '6',
        tags: ['risk assessment', 'high priority'],
      },
      {
        id: 'rb-5',
        type: 'policy_update',
        title: 'Umbrella Policy Update',
        description:
          'Increased umbrella policy coverage for expanded business operations.',
        date: '2025-01-10T11:00:00Z',
        clientId: '3',
        policyId: '9',
        tags: ['policy update', 'liability coverage'],
      },
    ],

    '4': [
      {
        id: 'lm-1',
        type: 'email',
        title: 'Email: Updated Life Insurance Coverage Options',
        description:
          'Proposal for increased term life coverage and physician-specific riders.',
        date: '2025-03-03T11:20:00Z',
        clientId: '4',
        communicationId: '5',
        opportunityId: '3',
        policyId: '12',
        tags: ['life insurance increase', 'physician'],
      },
      {
        id: 'lm-2',
        type: 'task',
        title: 'Task Created: Follow Up on Disability Insurance',
        description:
          'Follow up regarding supplemental disability coverage for specialized procedures.',
        date: '2025-03-03T10:00:00Z',
        clientId: '4',
        taskId: '4',
        opportunityId: '3',
        tags: ['follow-up', 'medium priority'],
      },
      {
        id: 'lm-3',
        type: 'policy_update',
        title: 'Life Insurance Beneficiary Update',
        description:
          'Updated beneficiary information following recent divorce.',
        date: '2025-02-28T14:30:00Z',
        clientId: '4',
        policyId: '12',
        tags: ['policy update', 'beneficiary change'],
      },
      {
        id: 'lm-4',
        type: 'opportunity',
        title: 'Opportunity: Life Insurance Coverage Increase',
        description:
          'Created opportunity to adjust life insurance based on income increase and changed circumstances.',
        date: '2025-02-20T09:45:00Z',
        clientId: '4',
        opportunityId: '3',
        policyId: '12',
        tags: ['coverage increase', 'medium priority'],
      },
      {
        id: 'lm-5',
        type: 'payment',
        title: 'Home Insurance Premium Payment',
        description:
          'Monthly premium payment processed for urban condo coverage.',
        date: '2025-03-01T00:00:00Z',
        clientId: '4',
        policyId: '11',
        amount: 141.67,
        tags: ['payment', 'home insurance'],
      },
    ],

    '5': [
      {
        id: 'ah-1',
        type: 'note',
        title: 'Note: Professional Athlete Policy Requirements',
        description:
          'Documented specialized insurance needs for professional basketball career.',
        date: '2025-03-02T09:45:00Z',
        clientId: '5',
        communicationId: '6',
        opportunityId: '5',
        tags: ['professional athlete', 'competitor involved'],
      },
      {
        id: 'ah-2',
        type: 'video',
        title: 'Video Call: International Sports Coverage',
        description:
          'Detailed discussion of specialized athlete protection package.',
        date: '2025-03-06T16:30:00Z',
        clientId: '5',
        communicationId: '19',
        opportunityId: '5',
        tags: ['international coverage', 'competitor comparison'],
      },
      {
        id: 'ah-3',
        type: 'task',
        title: 'Task Created: International Coverage Proposal',
        description:
          'Prepare specialized proposal for international coverage during overseas games.',
        date: '2025-03-03T16:20:00Z',
        clientId: '5',
        taskId: '5',
        opportunityId: '5',
        tags: ['proposal', 'high priority'],
      },
      {
        id: 'ah-4',
        type: 'opportunity',
        title: 'Opportunity: Specialized Athlete Coverage',
        description:
          'Created opportunity for comprehensive athlete protection package.',
        date: '2025-02-10T13:30:00Z',
        clientId: '5',
        opportunityId: '5',
        tags: ['new policy', 'high priority'],
      },
      {
        id: 'ah-5',
        type: 'payment',
        title: 'Life Insurance Annual Premium',
        description: 'Annual premium payment for high-value term life policy.',
        date: '2025-01-05T09:30:00Z',
        clientId: '5',
        policyId: '13',
        amount: 1850,
        tags: ['payment', 'life insurance'],
      },
    ],

    '7': [
      {
        id: 'sc-1',
        type: 'email',
        title: 'Email: Art Gallery Insurance Proposal',
        description: 'Comprehensive insurance proposal for new art gallery.',
        date: '2025-03-06T10:00:00Z',
        clientId: '7',
        communicationId: '8',
        opportunityId: '7',
        tags: ['new client', 'art gallery'],
      },
      {
        id: 'sc-2',
        type: 'client_added',
        title: 'New Client: Sofia Chen',
        description: 'Art gallery owner with specialized insurance needs.',
        date: '2025-03-06T15:45:00Z',
        clientId: '7',
        tags: ['new client', 'art gallery'],
      },
      {
        id: 'sc-3',
        type: 'task',
        title: 'Initial Consultation Completed',
        description:
          'Discussed specialized art gallery insurance needs and exhibition coverage.',
        date: '2025-03-05T11:20:00Z',
        clientId: '7',
        taskId: '7',
        tags: ['meeting', 'high priority'],
      },
      {
        id: 'sc-4',
        type: 'opportunity',
        title: 'Opportunity: Gallery Insurance Package',
        description:
          'Created opportunity for specialized art gallery coverage.',
        date: '2025-02-25T10:30:00Z',
        clientId: '7',
        opportunityId: '7',
        tags: ['new policy', 'high priority'],
      },
      {
        id: 'sc-5',
        type: 'policy_added',
        title: 'Business Insurance Application Pending',
        description:
          'Business insurance application submitted for gallery opening next month.',
        date: '2025-03-06T16:30:00Z',
        clientId: '7',
        policyId: '17',
        tags: ['new policy', 'pending'],
      },
    ],
  };

  return clientTimelines[clientId] || generateGenericTimeline(clientId);
};

const generateGenericTimeline = (clientId: string): TimelineItem[] => {
  return [
    {
      id: 'gen-1',
      type: 'policy_renewal',
      title: 'Policy Renewal',
      description: 'Annual policy renewal processed with standard updates.',
      date: '2025-02-15T10:30:00Z',
      clientId: clientId,
    },
    {
      id: 'gen-2',
      type: 'call',
      title: 'Follow-up Call',
      description: 'Routine check-in call to discuss coverage needs.',
      date: '2025-02-10T14:45:00Z',
      clientId: clientId,
    },
    {
      id: 'gen-3',
      type: 'email',
      title: 'Policy Documents Sent',
      description: 'Policy documents emailed to client for review.',
      date: '2025-02-01T09:15:00Z',
      clientId: clientId,
    },
    {
      id: 'gen-4',
      type: 'payment',
      title: 'Premium Payment Received',
      description: 'Regular premium payment processed.',
      date: '2025-01-15T11:30:00Z',
      clientId: clientId,
      amount: 1200,
    },
    {
      id: 'gen-5',
      type: 'note',
      title: 'Account Review Note',
      description: 'Internal note about upcoming annual review.',
      date: '2025-01-05T15:20:00Z',
      clientId: clientId,
    },
  ];
};

export const generateClientNotes = (clientId: string) => {
  const clientNotes: { [key: string]: any[] } = {
    '1': [
      {
        id: 'jh-note-1',
        content:
          "Jamal has expressed interest in restructuring his family's insurance portfolio following his children starting private school. We should discuss education funding options and ensure adequate protection for their future.",
        createdAt: '2025-03-02T14:30:00Z',
        updatedAt: '2025-03-02T14:30:00Z',
        tags: ['family planning', 'education', 'high value client'],
      },
      {
        id: 'jh-note-2',
        content:
          'Art collection has grown substantially in the past year. Need recent appraisals for all pieces valued over $25,000. Client expressed interest in specialized art collection rider with international transit coverage for upcoming exhibition loans.',
        createdAt: '2025-02-15T11:45:00Z',
        updatedAt: '2025-02-15T11:45:00Z',
        tags: ['art collection', 'high value assets', 'appraisal needed'],
      },
      {
        id: 'jh-note-3',
        content:
          'Annual review scheduled for March 15th. Will need to discuss recent home renovations, wine cellar expansion, and potential for umbrella policy increase given rising net worth and executive position.',
        createdAt: '2025-01-20T09:15:00Z',
        updatedAt: '2025-01-20T09:15:00Z',
        tags: ['annual review', 'renovations', 'umbrella policy'],
      },
    ],

    '2': [
      {
        id: 'nh-note-1',
        content:
          "Niaz's tech startup just closed a significant Series B funding round. This creates new liability exposure that needs to be addressed quickly. Umbrella coverage is essential given his increased public profile.",
        createdAt: '2025-02-20T13:45:00Z',
        updatedAt: '2025-02-20T13:45:00Z',
        tags: ['tech entrepreneur', 'funding round', 'liability exposure'],
      },
      {
        id: 'nh-note-2',
        content:
          'Client is considering purchasing a vacation property in Muskoka next year. Should proactively prepare coverage options and information about seasonal property protection for our next meeting.',
        createdAt: '2025-01-30T10:20:00Z',
        updatedAt: '2025-01-30T10:20:00Z',
        tags: ['vacation property', 'future purchase', 'proactive planning'],
      },
    ],

    '3': [
      {
        id: 'rb-note-1',
        content:
          "Richard's construction business is expanding rapidly with three major new government contracts. Current liability limits are likely insufficient given the scale of new projects. Risk assessment visit to main project site needed.",
        createdAt: '2025-03-01T15:30:00Z',
        updatedAt: '2025-03-01T15:30:00Z',
        tags: ['business expansion', 'liability limits', 'risk assessment'],
      },
      {
        id: 'rb-note-2',
        content:
          'Client has concerns about subcontractor insurance verification process. Current manual system is becoming unmanageable with growth. Discuss implementing our digital verification system during next meeting.',
        createdAt: '2025-02-22T09:45:00Z',
        updatedAt: '2025-02-22T09:45:00Z',
        tags: ['subcontractors', 'process improvement', 'digital tools'],
      },
      {
        id: 'rb-note-3',
        content:
          'Richard mentioned potential international project opportunities in the Caribbean next year. Will need to research international coverage options and prepare information about cross-border business operations.',
        createdAt: '2025-02-10T11:30:00Z',
        updatedAt: '2025-02-10T11:30:00Z',
        tags: ['international expansion', 'research needed', 'future planning'],
      },
    ],

    '4': [
      {
        id: 'lm-note-1',
        content:
          "Lyndsay's recent promotion to department head substantially increases her income and professional liability exposure. Life insurance and disability coverage should be adjusted accordingly. She's particularly concerned about specialized surgical procedure coverage.",
        createdAt: '2025-02-28T14:15:00Z',
        updatedAt: '2025-02-28T14:15:00Z',
        tags: ['promotion', 'income increase', 'disability coverage'],
      },
      {
        id: 'lm-note-2',
        content:
          'Recent divorce finalized. All beneficiary designations have been updated. Should discuss financial planning implications during next review and explore increased retirement savings options.',
        createdAt: '2025-02-15T09:30:00Z',
        updatedAt: '2025-02-15T09:30:00Z',
        tags: ['divorce', 'beneficiary changes', 'financial planning'],
      },
    ],
  };

  return clientNotes[clientId] || generateGenericClientNotes();
};

const generateGenericClientNotes = () => {
  return [
    {
      id: 'gen-note-1',
      content:
        "Annual review completed. Client's coverage remains appropriate for current needs. Follow up in six months for mid-year check-in.",
      createdAt: '2025-02-15T11:45:00Z',
      updatedAt: '2025-02-15T11:45:00Z',
    },
    {
      id: 'gen-note-2',
      content:
        'Client expressed interest in policy bundling options for potential savings. Prepare comparison for next contact.',
      createdAt: '2025-01-20T09:15:00Z',
      updatedAt: '2025-01-20T09:15:00Z',
    },
    {
      id: 'gen-note-3',
      content:
        'Standard coverage review scheduled for next quarter. No significant changes in client situation noted.',
      createdAt: '2024-12-10T14:30:00Z',
      updatedAt: '2024-12-10T14:30:00Z',
    },
  ];
};
