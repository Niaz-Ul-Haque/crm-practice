// src/data/tasksData.ts
import { clientsData } from "./clientsData";

export type TaskPriority = "high" | "medium" | "low";
export type TaskStatus = "pending" | "in_progress" | "completed" | "cancelled";
export type TaskType = "call" | "meeting" | "email" | "follow_up" | "review" | "other";

export interface Task {
  id: string;
  title: string;
  description?: string;
  clientId?: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  type: TaskType;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  reminderAt?: string;
}

export const tasksData: Task[] = [
  {
    id: "1",
    title: "Call John Doe about policy renewal",
    description: "Discuss upcoming home insurance renewal options and potential coverage increases",
    clientId: "1", // John Doe
    dueDate: "2025-03-15T14:00:00Z",
    priority: "high",
    status: "pending",
    type: "call",
    assignedTo: "user1",
    createdAt: "2025-03-01T10:30:00Z",
    updatedAt: "2025-03-01T10:30:00Z",
    reminderAt: "2025-03-15T13:30:00Z"
  },
  {
    id: "2",
    title: "Send policy documents to Jane Smith",
    description: "Email the updated policy documents for signature",
    clientId: "2", // Jane Smith
    dueDate: "2025-03-10T16:00:00Z",
    priority: "medium",
    status: "in_progress",
    type: "email",
    assignedTo: "user1",
    createdAt: "2025-03-02T09:15:00Z",
    updatedAt: "2025-03-03T14:20:00Z"
  },
  {
    id: "3",
    title: "Schedule annual review with Michael Johnson",
    description: "Annual policy review meeting to discuss coverage and potential changes",
    clientId: "3", // Michael Johnson
    dueDate: "2025-03-22T11:00:00Z",
    priority: "medium",
    status: "pending",
    type: "meeting",
    assignedTo: "user1",
    createdAt: "2025-03-02T13:45:00Z",
    updatedAt: "2025-03-02T13:45:00Z"
  },
  {
    id: "4",
    title: "Follow up with Sarah Williams about umbrella policy",
    description: "Check if she's had time to review the quote and has any questions",
    clientId: "4", // Sarah Williams
    dueDate: "2025-03-12T15:30:00Z",
    priority: "medium",
    status: "pending",
    type: "follow_up",
    assignedTo: "user1",
    createdAt: "2025-03-03T10:00:00Z",
    updatedAt: "2025-03-03T10:00:00Z",
    reminderAt: "2025-03-12T10:30:00Z"
  },
  {
    id: "5",
    title: "Review David Brown's auto policy before renewal",
    description: "Review coverage and rates to prepare renewal options",
    clientId: "5", // David Brown
    dueDate: "2025-03-16T13:00:00Z",
    priority: "low",
    status: "pending",
    type: "review",
    assignedTo: "user1",
    createdAt: "2025-03-03T16:20:00Z",
    updatedAt: "2025-03-03T16:20:00Z"
  },
  {
    id: "6",
    title: "Complete application for Jennifer Garcia's auto policy",
    description: "Finish processing the new auto insurance application",
    clientId: "6", // Jennifer Garcia
    dueDate: "2025-03-08T17:00:00Z",
    priority: "high",
    status: "completed",
    type: "other",
    assignedTo: "user1",
    createdAt: "2025-02-28T11:30:00Z",
    updatedAt: "2025-03-06T15:45:00Z",
    completedAt: "2025-03-06T15:45:00Z"
  },
  {
    id: "7",
    title: "Welcome call to Robert Martinez",
    description: "Introductory call to welcome new client and discuss insurance needs",
    clientId: "7", // Robert Martinez
    dueDate: "2025-03-09T10:30:00Z",
    priority: "high",
    status: "completed",
    type: "call",
    assignedTo: "user1",
    createdAt: "2025-03-01T09:45:00Z",
    updatedAt: "2025-03-05T11:20:00Z",
    completedAt: "2025-03-05T11:20:00Z"
  },
  {
    id: "8",
    title: "Discuss bundling options with Jessica Lee",
    description: "Call to discuss potential discount by bundling renters and auto insurance",
    clientId: "8", // Jessica Lee
    dueDate: "2025-03-18T14:30:00Z",
    priority: "medium",
    status: "pending",
    type: "call",
    assignedTo: "user1",
    createdAt: "2025-03-04T10:15:00Z",
    updatedAt: "2025-03-04T10:15:00Z"
  },
  {
    id: "9",
    title: "Schedule meeting with Thomas Wilson for business insurance review",
    description: "Set up in-person meeting to review and update business coverage",
    clientId: "9", // Thomas Wilson
    dueDate: "2025-03-25T15:00:00Z",
    priority: "low",
    status: "pending",
    type: "meeting",
    assignedTo: "user1",
    createdAt: "2025-03-05T09:30:00Z",
    updatedAt: "2025-03-05T09:30:00Z"
  },
  {
    id: "10",
    title: "Follow up with Maria Rodriguez about health insurance",
    description: "Check if she's made a decision on the health insurance options",
    clientId: "10", // Maria Rodriguez
    dueDate: "2025-03-13T11:30:00Z",
    priority: "medium",
    status: "pending",
    type: "follow_up",
    assignedTo: "user1",
    createdAt: "2025-03-05T14:00:00Z",
    updatedAt: "2025-03-05T14:00:00Z"
  },
  {
    id: "11",
    title: "Update CRM with new client information",
    description: "Enter details for new clients acquired this week",
    dueDate: "2025-03-08T16:00:00Z",
    priority: "low",
    status: "cancelled",
    type: "other",
    assignedTo: "user1",
    createdAt: "2025-03-02T15:30:00Z",
    updatedAt: "2025-03-04T10:00:00Z"
  },
  {
    id: "12",
    title: "Team meeting - monthly review",
    description: "Monthly team meeting to discuss progress and goals",
    dueDate: "2025-03-31T13:00:00Z",
    priority: "medium",
    status: "pending",
    type: "meeting",
    assignedTo: "user1",
    createdAt: "2025-03-01T11:00:00Z",
    updatedAt: "2025-03-01T11:00:00Z"
  }
];

export const getTasksByClientId = (clientId: string): Task[] => {
  return tasksData.filter(task => task.clientId === clientId);
};

export const getTaskById = (id: string): Task | undefined => {
  return tasksData.find(task => task.id === id);
};

export const getClientForTask = (taskId: string) => {
  const task = getTaskById(taskId);
  if (!task || !task.clientId) return null;
  
  return clientsData.find(client => client.id === task.clientId) || null;
};