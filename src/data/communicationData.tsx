// src/data/communicationsData.ts
import { clientsData } from "./clientsData";

export type CommunicationType = "email" | "call" | "sms" | "meeting" | "note";

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
  status: "sent" | "draft" | "scheduled";
  scheduledFor?: string;
}

export interface CommunicationFilters {
  searchTerm?: string;
  types: string[];
  statuses: string[];
  hasAttachments: boolean;
}

export const communicationsData: Communication[] = [
  {
    id: "1",
    clientId: "1", // John Doe
    type: "email",
    subject: "Policy Renewal Notice",
    content:
      "Dear John,\n\nYour home insurance policy is scheduled to expire on January 1, 2025. We'd like to discuss your renewal options to ensure you continue to have the best coverage for your needs.\n\nPlease let me know when would be a convenient time to discuss.\n\nBest regards,\nJane Smith",
    sentAt: "2025-03-05T14:30:00Z",
    sender: "jane.smith@insurance.com",
    recipient: "john.doe@example.com",
    attachments: ["Renewal_Options.pdf"],
    isRead: true,
    status: "sent",
  },
  {
    id: "2",
    clientId: "1", // John Doe
    type: "call",
    subject: "Policy Renewal Discussion",
    content:
      "Discussed renewal options for home insurance policy. Client is interested in increasing coverage amount and adding flood protection. Will send quote tomorrow.",
    sentAt: "2025-03-06T10:15:00Z",
    sender: "jane.smith@insurance.com",
    recipient: "john.doe@example.com",
    isRead: true,
    status: "sent",
  },
  {
    id: "3",
    clientId: "2", // Jane Smith
    type: "email",
    subject: "Premium Adjustment Confirmation",
    content:
      "Dear Jane,\n\nI'm pleased to confirm that your premium adjustment has been processed. Your new monthly payment amount will be $125, reflecting a savings of $15 per month.\n\nThe change will take effect starting with your next payment cycle.\n\nBest regards,\nJane Smith",
    sentAt: "2025-03-01T16:45:00Z",
    sender: "jane.smith@insurance.com",
    recipient: "jane.smith@example.com",
    isRead: true,
    status: "sent",
  },
  {
    id: "4",
    clientId: "3", // Michael Johnson
    type: "sms",
    subject: "Meeting Confirmation",
    content:
      "Hi Michael, just confirming our meeting tomorrow at 2pm to review your policies. Please let me know if you need to reschedule. Thanks!",
    sentAt: "2025-03-04T17:30:00Z",
    sender: "jane.smith@insurance.com",
    recipient: "+15551234567",
    isRead: true,
    status: "sent",
  },
  {
    id: "5",
    clientId: "4", // Sarah Williams
    type: "email",
    subject: "New Policy Quote",
    content:
      "Dear Sarah,\n\nAttached is the quote for the umbrella policy we discussed. This policy would provide additional liability coverage of $1,000,000 at an annual premium of $300.\n\nPlease review and let me know if you have any questions.\n\nBest regards,\nJane Smith",
    sentAt: "2025-03-03T11:20:00Z",
    sender: "jane.smith@insurance.com",
    recipient: "sarah.williams@example.com",
    attachments: ["Umbrella_Policy_Quote.pdf"],
    isRead: false,
    status: "sent",
  },
  {
    id: "6",
    clientId: "5", // David Brown
    type: "note",
    subject: "Follow-up Needed",
    content:
      "David's auto policy expires next month. Need to follow up about renewal options and discuss possibility of bundling with home insurance for additional discount.",
    sentAt: "2025-03-02T09:45:00Z",
    sender: "jane.smith@insurance.com",
    recipient: "internal",
    isRead: true,
    status: "sent",
  },
  {
    id: "7",
    clientId: "6", // Jennifer Garcia
    type: "meeting",
    subject: "Annual Policy Review",
    content:
      "Met with Jennifer for annual policy review. Discussed current coverage and identified potential gaps in liability protection. Recommended umbrella policy. She will review materials and get back to me next week.",
    sentAt: "2025-02-28T15:00:00Z",
    sender: "jane.smith@insurance.com",
    recipient: "jennifer.garcia@example.com",
    attachments: ["Policy_Review_Summary.pdf"],
    isRead: true,
    status: "sent",
  },
  {
    id: "8",
    clientId: "7", // Robert Martinez
    type: "email",
    subject: "Welcome to Our Agency",
    content:
      "Dear Robert,\n\nWelcome to our insurance agency! We're delighted to have you as a new client and look forward to helping you with all your insurance needs.\n\nI've attached our welcome packet which includes important contact information and details about our services.\n\nPlease don't hesitate to reach out if you have any questions.\n\nBest regards,\nJane Smith",
    sentAt: "2025-03-01T10:00:00Z",
    sender: "jane.smith@insurance.com",
    recipient: "robert.martinez@example.com",
    attachments: ["Welcome_Packet.pdf"],
    isRead: true,
    status: "sent",
  },
  {
    id: "9",
    clientId: "8", // Jessica Lee
    type: "email",
    subject: "Claim Status Update",
    content:
      "Dear Jessica,\n\nI wanted to provide an update on your recent claim. The adjuster has completed their assessment and your claim has been approved. You can expect to receive the settlement within 5-7 business days.\n\nIf you have any questions, please don't hesitate to contact me.\n\nBest regards,\nJane Smith",
    sentAt: "2025-03-06T13:10:00Z",
    sender: "jane.smith@insurance.com",
    recipient: "jessica.lee@example.com",
    isRead: false,
    status: "sent",
  },
  {
    id: "10",
    clientId: "9", // Thomas Wilson
    type: "email",
    subject: "Business Insurance Review",
    content:
      "Hi Thomas,\n\nAs we discussed in our call last week, I've reviewed your business insurance coverage and have some recommendations to better protect your growing business.\n\nI've prepared a summary of suggested changes and would like to schedule a time to discuss them in detail.\n\nWould you be available sometime next week?\n\nBest regards,\nJane Smith",
    sentAt: "2025-03-04T09:30:00Z",
    sender: "jane.smith@insurance.com",
    recipient: "thomas.wilson@example.com",
    attachments: ["Business_Insurance_Review.pdf"],
    isRead: true,
    status: "sent",
  },
  {
    id: "11",
    clientId: "1", // John Doe
    type: "email",
    subject: "Updated Quote for Home Insurance",
    content:
      "Dear John,\n\nFollowing our conversation, I'm pleased to provide you with an updated quote for your home insurance with increased coverage and added flood protection.\n\nThe new annual premium would be $1,350, which represents an increase of $150 from your current premium.\n\nPlease review the attached details and let me know if you'd like to proceed with this update.\n\nBest regards,\nJane Smith",
    sentAt: "2025-03-07T11:00:00Z",
    sender: "jane.smith@insurance.com",
    recipient: "john.doe@example.com",
    attachments: ["Updated_Home_Insurance_Quote.pdf"],
    isRead: false,
    status: "sent",
  },
  {
    id: "12",
    clientId: "10", // Maria Rodriguez
    type: "email",
    subject: "Family Health Insurance Options",
    content:
      "Dear Maria,\n\nThank you for inquiring about family health insurance options. I've researched several plans that would provide comprehensive coverage for your family at competitive rates.\n\nI've attached a comparison of the top three options for your review.\n\nWhen you've had a chance to look them over, I'd be happy to answer any questions and help you select the best plan for your needs.\n\nBest regards,\nJane Smith",
    sentAt: "2025-03-05T16:20:00Z",
    sender: "jane.smith@insurance.com",
    recipient: "maria.rodriguez@example.com",
    attachments: ["Health_Insurance_Comparison.pdf"],
    isRead: true,
    status: "sent",
  },
  {
    id: "13",
    clientId: "2", // Jane Smith
    type: "sms",
    subject: "Document Receipt Confirmation",
    content:
      "Hi Jane, just confirming that we received your signed policy documents. Thank you! Your updated insurance cards will be mailed within 3-5 business days.",
    sentAt: "2025-03-06T14:15:00Z",
    sender: "jane.smith@insurance.com",
    recipient: "+15559876543",
    isRead: true,
    status: "sent",
  },
  {
    id: "14",
    clientId: "4", // Sarah Williams
    type: "email",
    subject: "Response to Your Questions",
    content:
      "Dear Sarah,\n\nThank you for your questions about the umbrella policy quote I sent earlier. To address your concerns:\n\n1. Yes, the policy would cover incidents both at home and while traveling.\n2. The deductible is $1,000 per incident.\n3. Legal defense costs are covered in addition to the policy limit.\n\nPlease let me know if you have any other questions.\n\nBest regards,\nJane Smith",
    sentAt: "2025-03-07T09:45:00Z",
    sender: "jane.smith@insurance.com",
    recipient: "sarah.williams@example.com",
    isRead: false,
    status: "sent",
  },
  {
    id: "15",
    clientId: "1", // John Doe - Draft email
    type: "email",
    subject: "Policy Bundle Options",
    content:
      "Dear John,\n\nI wanted to follow up on our discussion about bundling your home and auto insurance policies.\n\nBased on your current coverage, bundling these policies could save you approximately $240 annually while providing more comprehensive protection.\n\nI've outlined the details of this bundle option in the attached document.\n\nPlease let me know if you're interested in proceeding with this change or if you have any questions.\n\nBest regards,\nJane Smith",
    sentAt: "2025-03-07T14:00:00Z",
    sender: "jane.smith@insurance.com",
    recipient: "john.doe@example.com",
    attachments: ["Bundle_Options.pdf"],
    status: "draft",
  },
];

// Helper functions
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
