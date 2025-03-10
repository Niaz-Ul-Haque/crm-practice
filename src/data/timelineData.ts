// src/data/timelineData.ts
export interface TimelineItem {
    id: string;
    type: "message" | "document" | "call" | "email" | "policy_renewal" | "policy_update" | "policy_added" | "payment";
    title: string;
    description?: string;
    date: string;
  }
  
  export const generateTimelineData = (clientId: string): TimelineItem[] => {
    return [
      {
        id: "1",
        type: "policy_renewal",
        title: "Home Insurance Policy Renewed",
        description: "Policy #10001 was renewed with a 5% premium increase",
        date: "2025-03-01T10:30:00Z",
      },
      {
        id: "2",
        type: "call",
        title: "Follow-up Call",
        description: "Discussed premium increase and additional coverage options",
        date: "2025-02-25T14:45:00Z",
      },
      {
        id: "3",
        type: "email",
        title: "Renewal Notice Sent",
        description: "Policy renewal documents sent via email",
        date: "2025-02-20T09:15:00Z",
      },
      {
        id: "4",
        type: "payment",
        title: "Premium Payment Received",
        description: "$1,200.00 annual premium payment",
        date: "2025-02-15T11:30:00Z",
      },
      {
        id: "5",
        type: "policy_update",
        title: "Coverage Update",
        description: "Increased home coverage value to $350,000",
        date: "2025-02-10T15:20:00Z",
      },
      {
        id: "6",
        type: "document",
        title: "Policy Documentation Uploaded",
        description: "Updated policy documents added to client file",
        date: "2025-02-05T13:45:00Z",
      },
      {
        id: "7",
        type: "message",
        title: "Client Message",
        description: "Client inquired about bundling auto insurance",
        date: "2025-01-28T10:15:00Z",
      },
    ];
  };
  
  export const generateClientNotes = (clientId: string) => {
    return [
      {
        id: "1",
        content: "Client expressed interest in bundling their auto insurance with their current home policy. Follow up in April when their current auto policy expires.",
        createdAt: "2025-03-02T14:30:00Z",
        updatedAt: "2025-03-02T14:30:00Z",
      },
      {
        id: "2",
        content: "Client mentioned they're planning to install a home security system, which could qualify them for a premium discount. Recommended they send documentation once installed.",
        createdAt: "2025-02-15T11:45:00Z",
        updatedAt: "2025-02-15T11:45:00Z",
      },
      {
        id: "3",
        content: "Annual review scheduled for June 15th. Will need to discuss inflation protection and possible coverage updates.",
        createdAt: "2025-01-20T09:15:00Z",
        updatedAt: "2025-01-20T09:15:00Z",
      },
    ];
  };