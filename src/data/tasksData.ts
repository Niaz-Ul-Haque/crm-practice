// src/data/tasksData.ts
import { clientsData } from './clientsData';

export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type TaskType =
  | 'call'
  | 'meeting'
  | 'email'
  | 'follow_up'
  | 'review'
  | 'document'
  | 'proposal'
  | 'other';

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
  linkedPolicyId?: string;
  linkedOpportunityId?: string;
}

export const tasksData: Task[] = [
  {
    id: '1',
    title: 'Quarterly review with Jamal Haija',
    description:
      "Comprehensive portfolio review. Discuss new investment property purchase and need for additional coverage. Also review children's education savings options.",
    clientId: '1', // Jamal Haija
    dueDate: '2025-03-15T14:00:00Z',
    priority: 'high',
    status: 'pending',
    type: 'meeting',
    assignedTo: 'user1',
    createdAt: '2025-03-01T10:30:00Z',
    updatedAt: '2025-03-01T10:30:00Z',
    reminderAt: '2025-03-15T13:30:00Z',
  },
  {
    id: '2',
    title: 'Send umbrella policy documents to Niaz Haque',
    description:
      'Email the updated umbrella policy proposal based on recent tech investments and increased net worth. Include comparison to current coverage.',
    clientId: '2', // Niaz Haque
    dueDate: '2025-03-10T16:00:00Z',
    priority: 'medium',
    status: 'in_progress',
    type: 'email',
    assignedTo: 'user1',
    createdAt: '2025-03-02T09:15:00Z',
    updatedAt: '2025-03-03T14:20:00Z',
    linkedOpportunityId: '2',
  },
  {
    id: '3',
    title: "Review Richard Bangyay's liability coverage",
    description:
      'Annual review of liability coverage across all construction businesses. Recent expansion requires reassessment of limits and coverage types.',
    clientId: '3', // Richard Bangyay
    dueDate: '2025-03-22T11:00:00Z',
    priority: 'high',
    status: 'pending',
    type: 'review',
    assignedTo: 'user1',
    createdAt: '2025-03-02T13:45:00Z',
    updatedAt: '2025-03-02T13:45:00Z',
    linkedPolicyId: '6',
  },
  {
    id: '4',
    title: 'Follow up with Lyndsay MacDermott about disability insurance',
    description:
      'She requested information about supplementing her existing coverage with additional disability protection for specialized surgical procedures.',
    clientId: '4', // Lyndsay MacDermott
    dueDate: '2025-03-12T15:30:00Z',
    priority: 'medium',
    status: 'pending',
    type: 'follow_up',
    assignedTo: 'user1',
    createdAt: '2025-03-03T10:00:00Z',
    updatedAt: '2025-03-03T10:00:00Z',
    reminderAt: '2025-03-12T10:30:00Z',
    linkedOpportunityId: '3',
  },
  {
    id: '5',
    title: 'Prepare international coverage proposal for Akeem Herbert',
    description:
      'Create comprehensive proposal for international coverage during overseas games and training. Include medical evacuation and specialized sports injury coverage.',
    clientId: '5', // Akeem Herbert
    dueDate: '2025-03-16T13:00:00Z',
    priority: 'high',
    status: 'in_progress',
    type: 'proposal',
    assignedTo: 'user1',
    createdAt: '2025-03-03T16:20:00Z',
    updatedAt: '2025-03-07T09:15:00Z',
    linkedOpportunityId: '5',
  },
  {
    id: '6',
    title: 'Send updated business policy documents to Tamara Britton',
    description:
      'Process the revised E&O policy with increased limits and include summary of changes.',
    clientId: '6', // Tamara Britton
    dueDate: '2025-03-08T17:00:00Z',
    priority: 'medium',
    status: 'completed',
    type: 'document',
    assignedTo: 'user1',
    createdAt: '2025-02-28T11:30:00Z',
    updatedAt: '2025-03-06T15:45:00Z',
    completedAt: '2025-03-06T15:45:00Z',
    linkedPolicyId: '15',
  },
  {
    id: '7',
    title: 'Initial consultation with Sofia Chen',
    description:
      'Discuss specialized art gallery insurance needs including exhibition coverage, transit insurance, and visitor liability.',
    clientId: '7', // Sofia Chen
    dueDate: '2025-03-09T10:30:00Z',
    priority: 'high',
    status: 'completed',
    type: 'meeting',
    assignedTo: 'user1',
    createdAt: '2025-03-01T09:45:00Z',
    updatedAt: '2025-03-05T11:20:00Z',
    completedAt: '2025-03-05T11:20:00Z',
    linkedOpportunityId: '7',
  },
  {
    id: '8',
    title: 'Review international travel coverage with Omar Al-Farsi',
    description:
      'Discuss comprehensive travel insurance options for frequent international business trips, especially technology conferences in Asia.',
    clientId: '8', // Omar Al-Farsi
    dueDate: '2025-03-18T14:30:00Z',
    priority: 'medium',
    status: 'pending',
    type: 'call',
    assignedTo: 'user1',
    createdAt: '2025-03-04T10:15:00Z',
    updatedAt: '2025-03-04T10:15:00Z',
    linkedPolicyId: '19',
  },
  {
    id: '9',
    title: 'Annual policy review with Priya Patel',
    description:
      'Comprehensive review of all policies including primary residence, vacation property, and life insurance. Focus on recent property renovations and impact on coverage.',
    clientId: '9', // Priya Patel
    dueDate: '2025-03-25T15:00:00Z',
    priority: 'medium',
    status: 'pending',
    type: 'meeting',
    assignedTo: 'user1',
    createdAt: '2025-03-05T09:30:00Z',
    updatedAt: '2025-03-05T09:30:00Z',
  },
  {
    id: '10',
    title: 'Follow up with Marcus Williams about cyber insurance enhancements',
    description:
      'Review recent cyber policy updates and discuss additional protection for client data given recent legal industry breaches.',
    clientId: '10', // Marcus Williams
    dueDate: '2025-03-13T11:30:00Z',
    priority: 'high',
    status: 'pending',
    type: 'follow_up',
    assignedTo: 'user1',
    createdAt: '2025-03-05T14:00:00Z',
    updatedAt: '2025-03-05T14:00:00Z',
    linkedPolicyId: '24',
  },
  {
    id: '11',
    title: 'Prepare business expansion coverage for Elena Kazan',
    description:
      'Create proposal for expanded business liability coverage as she prepares to move from home office to commercial space and hire employees.',
    clientId: '11', // Elena Kazan
    dueDate: '2025-03-19T16:00:00Z',
    priority: 'medium',
    status: 'in_progress',
    type: 'proposal',
    assignedTo: 'user1',
    createdAt: '2025-03-06T10:15:00Z',
    updatedAt: '2025-03-07T11:20:00Z',
    linkedPolicyId: '28',
    linkedOpportunityId: '8',
  },
  {
    id: '12',
    title: 'Auto insurance quote for Devon Jackson',
    description:
      'Prepare auto insurance quote for new Tesla Model 3 purchase. Opportunity to bundle with existing home policy for substantial savings.',
    clientId: '12', // Devon Jackson
    dueDate: '2025-03-14T13:45:00Z',
    priority: 'medium',
    status: 'pending',
    type: 'document',
    assignedTo: 'user1',
    createdAt: '2025-03-07T09:30:00Z',
    updatedAt: '2025-03-07T09:30:00Z',
    linkedOpportunityId: '9',
  },
  {
    id: '13',
    title: 'Review new restaurant location coverage with Sanjay Gupta',
    description:
      'Discuss insurance needs for the new downtown location opening next month. Include property, liability, business interruption, and specialized food service coverage.',
    clientId: '13', // Sanjay Gupta
    dueDate: '2025-03-21T10:00:00Z',
    priority: 'high',
    status: 'pending',
    type: 'meeting',
    assignedTo: 'user1',
    createdAt: '2025-03-06T15:30:00Z',
    updatedAt: '2025-03-06T15:30:00Z',
    linkedPolicyId: '30',
  },
  {
    id: '14',
    title: 'Investment property portfolio review for Layla Thompson',
    description:
      'Comprehensive review of coverage across all investment properties and discussion of new acquisition insurance needs.',
    clientId: '14', // Layla Thompson
    dueDate: '2025-03-15T09:30:00Z',
    priority: 'high',
    status: 'pending',
    type: 'review',
    assignedTo: 'user1',
    createdAt: '2025-03-01T14:45:00Z',
    updatedAt: '2025-03-01T14:45:00Z',
    linkedPolicyId: '34',
  },
  {
    id: '15',
    title: 'Re-engagement call with Gabriel Morales',
    description:
      'Reach out about reinstating lapsed life insurance policy and discuss new education leadership position insurance needs.',
    clientId: '15', // Gabriel Morales
    dueDate: '2025-03-11T11:00:00Z',
    priority: 'medium',
    status: 'pending',
    type: 'call',
    assignedTo: 'user1',
    createdAt: '2025-03-05T16:45:00Z',
    updatedAt: '2025-03-05T16:45:00Z',
    linkedPolicyId: '35',
    linkedOpportunityId: '10',
  },
  {
    id: '16',
    title: 'Prepare annual client retention report',
    description:
      'Analyze client retention rates, policy renewals, and identify at-risk accounts for proactive outreach.',
    dueDate: '2025-03-30T17:00:00Z',
    priority: 'medium',
    status: 'pending',
    type: 'other',
    assignedTo: 'user1',
    createdAt: '2025-03-01T08:30:00Z',
    updatedAt: '2025-03-01T08:30:00Z',
  },
  {
    id: '17',
    title: 'Team meeting - Q2 planning',
    description:
      'Quarterly planning meeting to review goals, discuss market trends, and align on outreach strategies.',
    dueDate: '2025-03-31T13:00:00Z',
    priority: 'medium',
    status: 'pending',
    type: 'meeting',
    assignedTo: 'user1',
    createdAt: '2025-03-01T11:00:00Z',
    updatedAt: '2025-03-01T11:00:00Z',
  },
  {
    id: '18',
    title: 'Professional liability webinar',
    description:
      'Attend industry webinar on evolving professional liability trends for healthcare and legal professionals.',
    dueDate: '2025-03-20T14:00:00Z',
    priority: 'low',
    status: 'pending',
    type: 'other',
    assignedTo: 'user1',
    createdAt: '2025-03-07T10:30:00Z',
    updatedAt: '2025-03-07T10:30:00Z',
  },
  {
    id: '19',
    title: 'Update life insurance illustrations',
    description:
      'Update standard life insurance illustrations and presentations with latest rate information.',
    dueDate: '2025-03-29T16:00:00Z',
    priority: 'low',
    status: 'pending',
    type: 'document',
    assignedTo: 'user1',
    createdAt: '2025-03-04T09:00:00Z',
    updatedAt: '2025-03-04T09:00:00Z',
  },
  {
    id: '20',
    title: 'Organize client appreciation event',
    description:
      'Plan Q2 client appreciation event for top clients. Finalize venue, speakers, and investment education theme.',
    dueDate: '2025-04-05T18:00:00Z',
    priority: 'medium',
    status: 'in_progress',
    type: 'other',
    assignedTo: 'user1',
    createdAt: '2025-03-03T13:15:00Z',
    updatedAt: '2025-03-06T11:30:00Z',
  },
];

export const getTasksByClientId = (clientId: string): Task[] => {
  return tasksData.filter((task) => task.clientId === clientId);
};

export const getTaskById = (id: string): Task | undefined => {
  return tasksData.find((task) => task.id === id);
};

export const getClientForTask = (taskId: string) => {
  const task = getTaskById(taskId);
  if (!task || !task.clientId) return null;

  return clientsData.find((client) => client.id === task.clientId) || null;
};

export const getTasksDueToday = (): Task[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return tasksData.filter((task) => {
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate.getTime() === today.getTime() && task.status !== 'completed';
  });
};

export const getTasksByPriority = (priority: TaskPriority): Task[] => {
  return tasksData.filter(
    (task) => task.priority === priority && task.status !== 'completed'
  );
};
