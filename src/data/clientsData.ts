// src/data/clientsData.ts
export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  dateOfBirth: string;
  activePolicies: number;
  lastContactDate: string;
  totalPremium: number;
  notes?: string;
  status: 'active' | 'inactive' | 'pending';
  avatar?: string;
}

export interface Filters {
status: string[];
policies: string[];
searchTerm?: string;
}

export const clientsData: Client[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    dateOfBirth: "1980-05-15",
    activePolicies: 3,
    lastContactDate: "2025-03-01",
    totalPremium: 2450,
    notes: "Interested in bundling home and auto insurance",
    status: 'active'
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "(555) 987-6543",
    address: "456 Oak Ave",
    city: "Somewhere",
    state: "NY",
    zipCode: "67890",
    dateOfBirth: "1975-10-20",
    activePolicies: 2,
    lastContactDate: "2025-02-15",
    totalPremium: 1850,
    status: 'active'
  },
  {
    id: "3",
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.johnson@example.com",
    phone: "(555) 246-8101",
    address: "789 Pine Rd",
    city: "Elsewhere",
    state: "TX",
    zipCode: "45678",
    dateOfBirth: "1990-03-08",
    activePolicies: 1,
    lastContactDate: "2025-02-28",
    totalPremium: 950,
    status: 'active'
  },
  {
    id: "4",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.williams@example.com",
    phone: "(555) 369-8521",
    address: "321 Cedar Ln",
    city: "Nowhere",
    state: "FL",
    zipCode: "23456",
    dateOfBirth: "1985-12-10",
    activePolicies: 4,
    lastContactDate: "2025-03-05",
    totalPremium: 3200,
    notes: "Looking to increase life insurance coverage",
    status: 'active'
  },
  {
    id: "5",
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@example.com",
    phone: "(555) 741-9632",
    address: "654 Maple St",
    city: "Smalltown",
    state: "IL",
    zipCode: "34567",
    dateOfBirth: "1978-07-22",
    activePolicies: 2,
    lastContactDate: "2025-02-10",
    totalPremium: 1650,
    status: 'inactive'
  },
  {
    id: "6",
    firstName: "Jennifer",
    lastName: "Garcia",
    email: "jennifer.garcia@example.com",
    phone: "(555) 852-7413",
    address: "987 Elm Dr",
    city: "Bigcity",
    state: "WA",
    zipCode: "56789",
    dateOfBirth: "1982-09-30",
    activePolicies: 3,
    lastContactDate: "2025-03-03",
    totalPremium: 2100,
    status: 'active'
  },
  {
    id: "7",
    firstName: "Robert",
    lastName: "Martinez",
    email: "robert.martinez@example.com",
    phone: "(555) 963-8520",
    address: "159 Birch Ave",
    city: "Metropolis",
    state: "GA",
    zipCode: "67891",
    dateOfBirth: "1988-04-12",
    activePolicies: 0,
    lastContactDate: "2025-01-20",
    totalPremium: 0,
    notes: "New client, scheduling initial consultation",
    status: 'pending'
  },
  {
    id: "8",
    firstName: "Jessica",
    lastName: "Lee",
    email: "jessica.lee@example.com",
    phone: "(555) 159-7536",
    address: "753 Willow Blvd",
    city: "Townsville",
    state: "OR",
    zipCode: "78901",
    dateOfBirth: "1992-11-05",
    activePolicies: 1,
    lastContactDate: "2025-02-25",
    totalPremium: 875,
    status: 'active'
  },
  {
    id: "9",
    firstName: "Thomas",
    lastName: "Wilson",
    email: "thomas.wilson@example.com",
    phone: "(555) 357-1598",
    address: "258 Sycamore St",
    city: "Countryside",
    state: "MI",
    zipCode: "89012",
    dateOfBirth: "1970-01-25",
    activePolicies: 2,
    lastContactDate: "2025-02-05",
    totalPremium: 1950,
    status: 'active'
  },
  {
    id: "10",
    firstName: "Maria",
    lastName: "Rodriguez",
    email: "maria.rodriguez@example.com",
    phone: "(555) 486-9213",
    address: "426 Spruce Ct",
    city: "Riverside",
    state: "AZ",
    zipCode: "90123",
    dateOfBirth: "1983-06-18",
    activePolicies: 3,
    lastContactDate: "2025-03-02",
    totalPremium: 2750,
    notes: "Referred by John Doe",
    status: 'active'
  }
];