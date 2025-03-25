// src/data/communicationsData.ts
import { clientsData } from './clientsData';

export type CommunicationType =
  | 'email'
  | 'call'
  | 'sms'
  | 'meeting'
  | 'note'
  | 'video'
  | 'letter'
  | 'draft';

export interface Communication {
  id: string;
  clientId: string;
  type: CommunicationType;
  subject: string;
  content: string;
  sentAt: string;
  sender: string;
  recipient: string;
  attachments?: string[];
  isRead?: boolean;
  status: 'sent' | 'draft' | 'scheduled';
  scheduledFor?: string;
  duration?: number; // in minutes for calls/meetings
  location?: string; // for meetings
  followUpDate?: string;
  linkedPolicyId?: string;
  linkedOpportunityId?: string;
  tags?: string[];
}

export interface CommunicationFilters {
  searchTerm?: string;
  types: string[];
  statuses: string[];
  hasAttachments: boolean;
  dateRange?: { start: string; end: string };
  clientIds?: string[];
}

export const communicationsData: Communication[] = [
  {
    id: '1',
    clientId: '1', // Jamal Haija
    type: 'email',
    subject: 'Upcoming Policy Renewal and Portfolio Review',
    content:
      "Dear Jamal,\n\nI hope this message finds you well. Your home insurance policy is scheduled to expire on January 15, 2025, and I wanted to reach out to discuss your renewal options.\n\nGiven the recent renovations to your Yorkville property and the expansion of your art collection, this would be an ideal time for a comprehensive portfolio review to ensure your coverage remains optimally aligned with your current assets and lifestyle.\n\nI've prepared some preliminary renewal options and would like to schedule a meeting to review them in detail. Would you be available for a meeting at our downtown office next Tuesday at 2:00 PM? Alternatively, I can arrange a video conference if that would be more convenient with your schedule.\n\nPlease let me know what works best for you.\n\nBest regards,\nYour Insurance Advisor",
    sentAt: '2025-03-05T14:30:00Z',
    sender: 'advisor@lyniq.com',
    recipient: 'jamal.haija@gmail.com',
    attachments: [
      'Haija_RenewalOptions_2025.pdf',
      'LynIQ_ArtCollection_Coverage.pdf',
    ],
    isRead: true,
    status: 'sent',
    linkedPolicyId: '1',
    linkedOpportunityId: '1',
    tags: ['policy renewal', 'high value client', 'follow-up required'],
  },
  {
    id: '2',
    clientId: '1', // Jamal Haija
    type: 'call',
    subject: 'Policy Renewal Discussion',
    content:
      "Spoke with Jamal about his upcoming home insurance renewal. He expressed interest in increasing coverage for his growing art collection which now includes several new acquisitions from emerging Canadian artists. He mentioned renovations to his wine cellar that should be documented for insurance purposes.\n\nHe also inquired about education savings policies for his children. I'll prepare information on RESP options and insurance policies that include education components.\n\nJamal confirmed availability for in-person meeting on Tuesday at 2:00 PM at our office. He prefers comprehensive reviews in person rather than video calls.",
    sentAt: '2025-03-06T10:15:00Z',
    sender: 'advisor@lyniq.com',
    recipient: 'jamal.haija@gmail.com',
    isRead: true,
    status: 'sent',
    duration: 22,
    followUpDate: '2025-03-11T14:00:00Z',
    linkedPolicyId: '1',
    linkedOpportunityId: '1',
    tags: [
      'art collection',
      'wine cellar',
      "children's education",
      'in-person meeting',
    ],
  },
  {
    id: '3',
    clientId: '2', // Niaz Haque
    type: 'email',
    subject: 'Umbrella Policy Proposal for Enhanced Protection',
    content:
      "Dear Niaz,\n\nFollowing our recent conversation about your growing tech company and personal assets, I've put together a comprehensive umbrella liability insurance proposal to provide you with enhanced protection beyond your standard policies.\n\nAs your success in the tech industry continues to grow, so does your potential liability exposure. The attached proposal outlines a $3 million umbrella policy that would provide crucial additional coverage.\n\nKey benefits include:\n• Extended liability protection beyond your existing home and auto policies\n• Coverage for legal fees and court costs in liability cases\n• Protection for future earnings against large judgments\n• Worldwide coverage for international travel and business activities\n\nI've also included a case study showing how similar tech entrepreneurs have benefited from umbrella coverage.\n\nWould you have time for a 30-minute video call next week to review this proposal in detail? I'm available Wednesday or Thursday afternoon.\n\nBest regards,\nYour Insurance Advisor",
    sentAt: '2025-03-01T16:45:00Z',
    sender: 'advisor@lyniq.com',
    recipient: 'niaz.h@techsphere.io',
    attachments: [
      'Haque_Umbrella_Proposal.pdf',
      'TechEntrepreneur_CaseStudy.pdf',
    ],
    isRead: true,
    status: 'sent',
    linkedOpportunityId: '2',
    tags: ['umbrella policy', 'tech entrepreneur', 'high net worth'],
  },
  {
    id: '4',
    clientId: '3', // Richard Bangyay
    type: 'sms',
    subject: 'Meeting Confirmation - Construction Business Review',
    content:
      "Hi Richard, just confirming our meeting tomorrow at 9am to review your construction business insurance needs. I'll bring the risk assessment documents we discussed. Please let me know if you need to reschedule. Thanks!",
    sentAt: '2025-03-04T17:30:00Z',
    sender: 'advisor@lyniq.com',
    recipient: '+16475559036',
    isRead: true,
    status: 'sent',
    linkedPolicyId: '6',
    linkedOpportunityId: '4',
    tags: ['construction business', 'meeting confirmation', 'risk assessment'],
  },
  {
    id: '5',
    clientId: '4', // Lyndsay MacDermott
    type: 'email',
    subject: 'Updated Life Insurance Coverage Options',
    content:
      "Dear Dr. MacDermott,\n\nThank you for our recent discussion about updating your life insurance coverage following your promotion and recent life changes.\n\nAttached is a proposal for increasing your term life coverage from $1.5M to $2.5M, which better aligns with your current income and financial obligations. I've also included information about the specialized critical illness rider specifically designed for medical professionals.\n\nThe proposal includes:\n• Detailed premium comparisons for different coverage levels\n• Physician-specific disability options with own-occupation provisions\n• Critical illness coverage with medical specialty considerations\n• Updated beneficiary options following your recent divorce\n\nWould you prefer to review these options at your office after hours, or would you like to schedule a lunch meeting? I understand your schedule at the hospital is demanding, so I'm happy to accommodate.\n\nBest regards,\nYour Insurance Advisor",
    sentAt: '2025-03-03T11:20:00Z',
    sender: 'advisor@lyniq.com',
    recipient: 'lyndsay.macdermott@medical.org',
    attachments: [
      'MacDermott_Life_Insurance_Options.pdf',
      'Physician_Critical_Illness_Rider.pdf',
    ],
    isRead: false,
    status: 'sent',
    linkedPolicyId: '12',
    linkedOpportunityId: '3',
    tags: ['life insurance increase', 'physician', 'critical illness'],
  },
  {
    id: '6',
    clientId: '5', // Akeem Herbert
    type: 'note',
    subject: 'Professional Athlete Policy Requirements',
    content:
      "Meeting with Akeem Herbert's financial manager revealed several specialized insurance needs for his professional basketball career:\n\n1. Need robust disability coverage that accounts for his $800K+ annual income\n2. International medical coverage is critical as he plays games in various countries\n3. Career-ending injury protection with appropriate payout structure\n4. Coverage for specialized training equipment valued at approximately $75K\n5. Considering signing a new contract next season which would significantly increase his income\n\nAnother insurance provider has offered a basic athlete package, but it lacks the customization needed for his specific situation. Our athlete-specific proposal should emphasize our experience with professional sports figures and custom policy structures.",
    sentAt: '2025-03-02T09:45:00Z',
    sender: 'advisor@lyniq.com',
    recipient: 'internal',
    isRead: true,
    status: 'sent',
    linkedOpportunityId: '5',
    tags: [
      'professional athlete',
      'competitor involved',
      'high income',
      'disability coverage',
    ],
  },
  {
    id: '7',
    clientId: '6', // Tamara Britton
    type: 'meeting',
    subject: 'Professional Liability Update and Cross-Selling Success',
    content:
      "Met with Tamara at her office to review her updated E&O policy. She appreciated the expanded coverage for her new financial planning services and confirmed she's satisfied with the premium despite the slight increase.\n\nShe mentioned adding three new high-net-worth clients to her financial advisory practice who might benefit from our premium insurance offerings. She's open to making introductions if I provide her with some materials to share with them.\n\nI'll prepare personalized introduction packets that she can share with these potential clients. Her referrals have consistently been excellent prospects in the past.\n\nTamara also inquired about our client appreciation event next quarter and confirmed she'll attend.",
    sentAt: '2025-02-28T15:00:00Z',
    sender: 'advisor@lyniq.com',
    recipient: 'tamara.britton@financeworks.ca',
    location: "Client's office - 27 Pine Avenue, Mississauga",
    duration: 55,
    isRead: true,
    status: 'sent',
    linkedPolicyId: '15',
    linkedOpportunityId: '14',
    tags: [
      'professional liability',
      'completed opportunity',
      'potential referrals',
    ],
  },
  {
    id: '8',
    clientId: '7', // Sofia Chen
    type: 'email',
    subject: 'Art Gallery Insurance Proposal',
    content:
      "Dear Sofia,\n\nThank you for our productive meeting yesterday to discuss your new art gallery's insurance needs. As promised, I've attached a comprehensive insurance proposal tailored specifically for your gallery.\n\nThe proposed coverage includes:\n• Protection for exhibited artwork (owned and on consignment)\n• Transit coverage for pieces moving between locations\n• Specialized theft and damage protection with appropriate valuation methods\n• Liability coverage for gallery visitors and events\n• Business interruption coverage specific to gallery operations\n\nI've highlighted the sections that address your specific concerns about the upcoming opening exhibition featuring those valuable contemporary pieces from overseas.\n\nPlease review the proposal at your convenience, and let's schedule a follow-up call next week to address any questions. I'm available for a gallery walk-through whenever you're ready to finalize the space layout.\n\nBest regards,\nYour Insurance Advisor",
    sentAt: '2025-03-06T10:00:00Z',
    sender: 'advisor@lyniq.com',
    recipient: 'sofia.chen@artgallery.com',
    attachments: [
      'Chen_Gallery_Insurance_Proposal.pdf',
      'Art_Exhibition_Coverage_Guide.pdf',
    ],
    isRead: true,
    status: 'sent',
    linkedOpportunityId: '7',
    tags: ['new client', 'art gallery', 'specialized coverage'],
  },
  {
    id: '9',
    clientId: '8', // Omar Al-Farsi
    type: 'email',
    subject: 'International Travel Coverage Options',
    content:
      "Dear Omar,\n\nWith your frequent international travel schedule for tech conferences, I wanted to provide some options for comprehensive travel insurance coverage.\n\nAs we discussed in our recent call, your current auto and renters policies provide limited coverage while you're abroad. The attached international travel insurance proposal addresses these gaps with:\n\n• Emergency medical coverage that works worldwide\n• Medical evacuation services if needed\n• Coverage for your high-value tech equipment during travel\n• Trip interruption protection for unexpected conference cancellations\n• Coverage that extends to both business and personal travel\n\nGiven your upcoming trip to Singapore next month, we should aim to have this in place within the next 2-3 weeks. Are you available for a quick call on Friday to review these options?\n\nBest regards,\nYour Insurance Advisor",
    sentAt: '2025-03-05T13:10:00Z',
    sender: 'advisor@lyniq.com',
    recipient: 'omar.alfarsi@gmail.com',
    attachments: ['AlFarsi_International_Travel_Coverage.pdf'],
    isRead: false,
    status: 'sent',
    linkedOpportunityId: '15',
    tags: ['international travel', 'tech equipment', 'frequent traveler'],
  },
  {
    id: '10',
    clientId: '9', // Priya Patel
    type: 'video',
    subject: 'Property Portfolio Review Discussion',
    content:
      "Conducted a 45-minute video call with Priya to discuss her property portfolio review. She shared photos of the extensive renovations to both her primary residence and Lake Simcoe vacation property.\n\nKey points covered:\n• Kitchen and bathroom renovations added approximately $175K in value to primary home\n• New dock and boathouse at vacation property ($120K investment)\n• New high-end appliances and smart home technology installations\n• Recently purchased artwork for both properties needs scheduled coverage\n\nShe's concerned about potential gaps in coverage given these substantial improvements. We agreed to schedule in-person assessments of both properties in the next two weeks.\n\nAction items: Prepare updated replacement cost worksheets, research specialized coverage for the boathouse and dock, and create policy consolidation options to simplify her coverage structure.",
    sentAt: '2025-03-04T09:30:00Z',
    sender: 'advisor@lyniq.com',
    recipient: 'priya.patel@hospitalgroup.org',
    duration: 45,
    isRead: true,
    status: 'sent',
    linkedPolicyId: '20',
    linkedOpportunityId: '12',
    tags: [
      'property review',
      'renovations',
      'vacation property',
      'scheduled assessment',
    ],
  },
  {
    id: '11',
    clientId: '10', // Marcus Williams
    type: 'email',
    subject: 'Enhanced Cyber Liability Protection for Your Law Practice',
    content:
      "Dear Marcus,\n\nFollowing our conversation about the recent cyber attacks targeting legal firms, I've prepared information about enhanced cyber liability coverage options for your practice.\n\nThe attached proposal outlines comprehensive protection beyond your current policy, including:\n\n• Advanced data breach response services\n• Expanded coverage for client notification costs\n• Regulatory defense and penalties coverage\n• Specialized protection for law firm trust accounts\n• Business interruption coverage specific to law practice downtime\n• Access to cybersecurity consultants specializing in legal industry threats\n\nI've also included a case study of how another Toronto law firm benefited from this coverage during a ransomware incident last year.\n\nWould you have time for a lunch meeting next Thursday to discuss these options in detail? I could come to your office or we could meet at The Capital Grille nearby.\n\nBest regards,\nYour Insurance Advisor",
    sentAt: '2025-03-07T11:00:00Z',
    sender: 'advisor@lyniq.com',
    recipient: 'marcus.williams@legalpartners.ca',
    attachments: [
      'Williams_Enhanced_Cyber_Proposal.pdf',
      'LawFirm_Cyber_CaseStudy.pdf',
    ],
    isRead: false,
    status: 'sent',
    linkedPolicyId: '24',
    linkedOpportunityId: '6',
    tags: ['cyber liability', 'law firm', 'data protection'],
  },
  {
    id: '12',
    clientId: '11', // Elena Kazan
    type: 'email',
    subject: 'Business Expansion Insurance Options',
    content:
      "Dear Elena,\n\nCongratulations again on the upcoming expansion of your interior design business to a commercial space! As promised during our call, I've prepared a comprehensive insurance package to protect your growing business.\n\nThe attached proposal covers:\n\n• Commercial property coverage for your new design studio\n• Business liability with increased limits appropriate for client visits\n• Workers' compensation for your new employees\n• Professional liability enhancements for larger projects\n• Business interruption coverage to protect revenue during potential disruptions\n• Coverage for design samples, materials, and specialized equipment\n\nI've structured this proposal to grow with your business over the next 3-5 years, with options to scale coverage as you add more employees and take on larger projects.\n\nI'd be happy to meet at your new space next week to review these options in person and address any specific concerns about the location.\n\nBest regards,\nYour Insurance Advisor",
    sentAt: '2025-03-05T16:20:00Z',
    sender: 'advisor@lyniq.com',
    recipient: 'elena.kazan@designstudio.co',
    attachments: [
      'Kazan_Business_Expansion_Package.pdf',
      'Workers_Comp_Guide.pdf',
    ],
    isRead: true,
    status: 'sent',
    linkedPolicyId: '28',
    linkedOpportunityId: '8',
    tags: ['business expansion', 'commercial space', 'workers comp'],
  },
  {
    id: '13',
    clientId: '12', // Devon Jackson
    type: 'sms',
    subject: 'Tesla Insurance Confirmation',
    content:
      "Hi Devon, I've prepared the auto insurance quote for your new Tesla Model 3. Bundling with your home policy saves you $275 annually. The quote includes the specialized EV coverage we discussed. When does your car arrive? I'll call tomorrow with details.",
    sentAt: '2025-03-06T14:15:00Z',
    sender: 'advisor@lyniq.com',
    recipient: '+14165557456',
    isRead: true,
    status: 'sent',
    linkedOpportunityId: '9',
    tags: ['auto insurance', 'tesla', 'bundle discount'],
  },
  {
    id: '14',
    clientId: '13', // Sanjay Gupta
    type: 'email',
    subject: 'New Restaurant Location Coverage Options',
    content:
      "Dear Sanjay,\n\nI'm looking forward to our meeting next week to discuss insurance needs for your new downtown restaurant location. In preparation, I've put together some preliminary materials outlining key coverage considerations.\n\nGiven the success of your existing locations and the premium positioning of this new downtown venue, I'd like to specifically discuss:\n\n• Enhanced business interruption coverage that accounts for the higher revenue projections of this location\n• Specialized food spoilage protection with increased limits\n• Liquor liability appropriate for the expanded bar service\n• Coverage for the custom kitchen equipment and imported fixtures\n• Employee practices liability given the larger staff at this location\n\nI've also included information about our specialized business interruption coverage that many restaurant owners have found valuable, especially given industry volatility.\n\nIs there anything specific about this new location that you'd like me to research before our meeting?\n\nBest regards,\nYour Insurance Advisor",
    sentAt: '2025-03-07T13:10:00Z',
    sender: 'advisor@lyniq.com',
    recipient: 'sanjay.gupta@restaurantgroup.com',
    attachments: [
      'Restaurant_Location_Coverage_Guide.pdf',
      'Business_Interruption_Options.pdf',
    ],
    isRead: false,
    status: 'sent',
    linkedPolicyId: '30',
    linkedOpportunityId: '11',
    tags: ['restaurant', 'new location', 'business interruption'],
  },
  {
    id: '15',
    clientId: '14', // Layla Thompson
    type: 'email',
    subject: 'Investment Property Portfolio Review',
    content:
      "Dear Layla,\n\nIn preparation for our meeting on March 15th to review your investment property portfolio, I've put together a preliminary analysis of your current coverage.\n\nBased on my initial review:\n• Your current blanket policy structure works well for administrative efficiency\n• However, the recent property value increases in the Parkdale neighborhood suggest we should reassess coverage limits for those two units\n• The new short-term rental approach for the waterfront property introduces additional liability considerations\n\nI'll bring complete documentation to our meeting, but wanted to give you time to gather any updated information on:\n• Recent renovations or improvements to any properties\n• Changes in tenant situations or rental approaches\n• Any new property acquisitions you're considering\n\nAlso, I'd love to discuss our referral program, as your connections in real estate could be valuable for both of us.\n\nLooking forward to our meeting!\n\nBest regards,\nYour Insurance Advisor",
    sentAt: '2025-03-07T09:45:00Z',
    sender: 'advisor@lyniq.com',
    recipient: 'layla.thompson@thompsonrealty.ca',
    isRead: true,
    status: 'sent',
    linkedPolicyId: '34',
    linkedOpportunityId: '13',
    tags: ['investment property', 'portfolio review', 'referral opportunity'],
  },
  {
    id: '16',
    clientId: '15', // Gabriel Morales
    type: 'draft',
    subject: 'Life Insurance Reinstatement Options',
    content:
      "Dear Gabriel,\n\nI hope this message finds you well, and congratulations on your new position as a school principal!\n\nI noticed that your life insurance policy lapsed during your recent career transition. This gives us an excellent opportunity to reassess your needs based on your new role and financial situation.\n\nI've prepared some options that include:\n• A term life policy with specialized features for education professionals\n• Modernized coverage tailored to your current age and health status\n• Options that include education-specific riders and benefits\n• More favorable rates than your previous policy\n\nWould you have time for a phone call next week to discuss these options? I'm available Tuesday or Wednesday afternoon.\n\nBest regards,\nYour Insurance Advisor",
    sentAt: '2025-03-07T14:00:00Z',
    sender: 'advisor@lyniq.com',
    recipient: 'gabriel.morales@academyschools.org',
    attachments: ['Morales_Life_Insurance_Options.pdf'],
    status: 'draft',
    linkedPolicyId: '35',
    linkedOpportunityId: '10',
    tags: ['lapsed policy', 'education professional', 'life insurance'],
  },
  {
    id: '17',
    clientId: '3', // Richard Bangyay
    type: 'meeting',
    subject: 'Construction Business Risk Assessment',
    content:
      "Met with Richard at his main office to conduct a comprehensive risk assessment for his expanding construction business. He shared details about several new large commercial projects that significantly increase his liability exposure.\n\nKey insights:\n• New government contracts require higher liability limits than currently in place\n• Subcontractor documentation needs more rigorous tracking and verification\n• Equipment values have increased substantially with recent purchases\n• International work is being considered for next year\n\nRichard was particularly concerned about the specialized equipment for the hospital renovation project and ensuring adequate protection while it's on-site.\n\nAction items: Prepare updated liability limits proposal, research specialized rider for the hospital project equipment, develop subcontractor insurance verification procedure, and schedule meeting with risk engineers to visit main project site.",
    sentAt: '2025-03-05T15:45:00Z',
    sender: 'advisor@lyniq.com',
    recipient: 'richard.bangyay@construct.ca',
    location: "Client's main office - 143 Lakeshore Blvd East, Toronto",
    duration: 90,
    isRead: true,
    status: 'sent',
    linkedPolicyId: '6',
    linkedOpportunityId: '4',
    tags: ['construction', 'risk assessment', 'liability limits', 'site visit'],
  },
  {
    id: '18',
    clientId: '1', // Jamal Haija
    type: 'call',
    subject: 'Art Collection Valuation Discussion',
    content:
      "Had a 15-minute call with Jamal to discuss the process for getting his art collection properly valued for insurance purposes. He has acquired several new pieces in the last year that need documentation.\n\nHe wants to know if we recommend any specific appraisers who specialize in contemporary Canadian art. I'll reach out to our fine art insurance partners for recommendations.\n\nHe also mentioned that he's considering acquiring a piece that would be his most valuable to date (potentially $175K) and wants to understand any special coverage considerations before finalizing the purchase.\n\nJamal confirmed he'll bring photos and existing documentation to our in-person meeting next week.",
    sentAt: '2025-03-07T11:15:00Z',
    sender: 'advisor@lyniq.com',
    recipient: 'jamal.haija@gmail.com',
    duration: 15,
    isRead: true,
    status: 'sent',
    linkedPolicyId: '1',
    linkedOpportunityId: '1',
    tags: ['art collection', 'appraisal', 'high-value item'],
  },
  {
    id: '19',
    clientId: '5', // Akeem Herbert
    type: 'video',
    subject: 'International Sports Coverage Details',
    content:
      "Conducted a detailed video call with Akeem and his financial manager to discuss his specialized insurance needs as a professional athlete with international play.\n\nWe went through the entire specialized athlete protection package, with particular focus on:\n• Income protection structured to accommodate his salary and endorsement revenue\n• Disability coverage with specialized own-occupation definition for professional athletes\n• Career-ending injury protection with optimal benefit structure\n• International medical coverage with private transportation options\n\nAkeem's financial manager asked detailed questions about how our offering compares to the competitor's proposal. I highlighted our experience with other professional athletes and the customization capabilities that the competitor lacks.\n\nAkeem seemed very engaged and especially appreciated the specialized travel medical component given his upcoming Asian exhibition games.\n\nNext steps: Finalize premium calculations based on upcoming contract negotiations and schedule follow-up meeting after he returns from his current road trip.",
    sentAt: '2025-03-06T16:30:00Z',
    sender: 'advisor@lyniq.com',
    recipient: 'akeem.herbert@gmail.com',
    duration: 55,
    isRead: true,
    status: 'sent',
    linkedOpportunityId: '5',
    tags: [
      'professional athlete',
      'international coverage',
      'competitor comparison',
    ],
  },
  {
    id: '20',
    clientId: '2', // Niaz Haque
    type: 'sms',
    subject: 'Video Call Confirmation',
    content:
      "Hi Niaz, I'm confirming our video call for Thursday at 3pm to review the umbrella policy proposal. I'll send a calendar invite with the meeting link shortly. Looking forward to discussing how this coverage can protect your growing assets.",
    sentAt: '2025-03-07T09:50:00Z',
    sender: 'advisor@lyniq.com',
    recipient: '+19055557214',
    isRead: true,
    status: 'sent',
    linkedOpportunityId: '2',
    tags: ['umbrella policy', 'meeting confirmation'],
  },
];

export const getCommunicationsByClientId = (
  clientId: string
): Communication[] => {
  return communicationsData.filter((comm) => comm.clientId === clientId);
};

export const getCommunicationById = (id: string): Communication | undefined => {
  return communicationsData.find((comm) => comm.id === id);
};

export const getClientForCommunication = (communicationId: string) => {
  const communication = getCommunicationById(communicationId);
  if (!communication) return null;

  return (
    clientsData.find((client) => client.id === communication.clientId) || null
  );
};

export const getRecentCommunications = (days: number = 7): Communication[] => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return communicationsData
    .filter((comm) => {
      const commDate = new Date(comm.sentAt);
      return commDate >= cutoffDate && comm.status === 'sent';
    })
    .sort((a, b) => {
      return new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime();
    });
};

export const getScheduledCommunications = (): Communication[] => {
  return communicationsData
    .filter((comm) => comm.status === 'scheduled')
    .sort((a, b) => {
      const dateA = a.scheduledFor ? new Date(a.scheduledFor) : new Date(0);
      const dateB = b.scheduledFor ? new Date(b.scheduledFor) : new Date(0);
      return dateA.getTime() - dateB.getTime();
    });
};

export const getCommunicationsByType = (
  type: CommunicationType
): Communication[] => {
  return communicationsData.filter((comm) => comm.type === type);
};
