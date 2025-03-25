/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  MessageSquare,
  X,
  Send,
  Loader2,
  Trash2,
  MessageCircle,
  Bot,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clientsData, Client } from '@/data/clientsData';
import {
  policiesData,
  Policy,
  getPoliciesByClientId,
} from '@/data/policiesData';
import { tasksData, Task, getTasksByClientId } from '@/data/tasksData';
import {
  getOpportunitiesByClientId,
  opportunitiesData,
  Opportunity,
} from '@/data/opportunitiesData';
import { formatCurrency } from '@/lib/formatters';
import LlamaAI from 'llamaai';

type Message = {
  id: string;
  content: string | React.ReactNode;
  sender: 'user' | 'bot';
  timestamp: Date;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content:
        "Hi there! I'm your LynIQ assistant. How can I help you with your insurance CRM today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [useLlamaApi, setUseLlamaApi] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const llamaAPI = new LlamaAI(process.env.NEXT_PUBLIC_LLAMA_API_KEY);
  const LLAMA_MODEL = 'llama3.2-3b';

  const presetQuestions = [
    { id: 'p1', text: 'Show me a dashboard summary' },
    { id: 'p2', text: 'What policies are expiring soon?' },
    { id: 'p3', text: 'What tasks do I have today?' },
    { id: 'p4', text: 'Show high priority opportunities' },
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        content: 'How can I help you today?',
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  };

  const handlePresetQuestion = (question: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: question,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsProcessing(true);

    if (useLlamaApi) {
      handleLlamaApiResponse(question);
    } else {
      setTimeout(() => {
        const botResponse = generateBotResponse(question);
        const newBotMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: botResponse,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, newBotMessage]);
        setIsProcessing(false);
      }, 800);
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsProcessing(true);

    if (useLlamaApi) {
      handleLlamaApiResponse(inputValue);
    } else {
      setTimeout(() => {
        const botResponse = generateBotResponse(inputValue);
        const newBotMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: botResponse,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, newBotMessage]);
        setIsProcessing(false);
      }, 800);
    }
  };

  const handleLlamaApiResponse = async (userMessage: string) => {
    try {
      setIsProcessing(true);
      
      const messageContext = `You are an AI assistant for an insurance CRM. The system has ${clientsData.length} clients, ${policiesData.length} policies, ${tasksData.length} tasks, and ${opportunitiesData.length} opportunities.`;
      
      let specificClientInfo = "";
      const lowercaseMessage = userMessage.toLowerCase();
      
      if (lowercaseMessage.includes('jamal')) {
        const jamalClient = clientsData.find(c => 
          c.firstName.toLowerCase() === 'jamal' || 
          c.lastName.toLowerCase() === 'jamal'
        );
        
        if (jamalClient) {
          specificClientInfo = `Client information for ${jamalClient.firstName} ${jamalClient.lastName}:
- Email: ${jamalClient.email}
- Phone: ${jamalClient.phone}
- Status: ${jamalClient.status}
- Active Policies: ${jamalClient.activePolicies}
- Total Premium: $${jamalClient.totalPremium}
- Occupation: ${jamalClient.occupation || 'N/A'}`;
        }
      }
      
      const recentMessages = messages
        .filter(msg => typeof msg.content === 'string')
        .slice(-3)
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.content as string
        }));
      
      const apiMessages = [
        {
          role: 'system',
          content: 'You are LynIQ, an AI assistant for insurance advisors. Only respond to insurance, financial advising, or CRM questions.'
        },
        {
          role: 'system',
          content: messageContext + (specificClientInfo ? '\n\n' + specificClientInfo : '')
        },
        ...recentMessages,
        {
          role: 'user',
          content: userMessage
        }
      ];

      const apiRequestJson = {
        model: LLAMA_MODEL,
        messages: apiMessages,
        temperature: 0.7
      };

      const response = await llamaAPI.run(apiRequestJson);
      const content = response.choices[0].message.content;

      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: content,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newBotMessage]);
    } catch (error) {
      console.error('Error getting Llama API response:', error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm having trouble connecting to my AI brain right now. You can try a simpler question or switch to local processing mode.",
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  function extractEntitiesFromQuery(query: string) {
    const clientNamePattern =
      /(?:find|about|for|from|to|with|client|customer|insured)\s+([A-Z][a-z]+(\s+[A-Z][a-z]+)?)/g;
    const policyTypePattern =
      /(home|auto|life|health|business|renters|umbrella|commercial|professional|cyber)\s+(?:insurance|policy|policies)/gi;
    const datePattern =
      /(?:in|by|before|after|on|since)\s+(\w+\s+\d{1,2}(?:st|nd|rd|th)?(?:,\s+\d{4})?|\d{1,2}\/\d{1,2}(?:\/\d{2,4})?)/gi;

    const nameMatches = [...query.matchAll(clientNamePattern)];
    const potentialNames = nameMatches.map((match) => match[1]);

    const policyMatches = [...query.matchAll(policyTypePattern)];
    const potentialPolicyTypes = policyMatches.map((match) =>
      match[1].toLowerCase()
    );

    const dateMatches = [...query.matchAll(datePattern)];
    const potentialDates = dateMatches.map((match) => match[1]);

    return {
      potentialNames,
      potentialPolicyTypes,
      potentialDates,
      containsWord: {
        client: /client/i.test(query),
        policy: /policy|policies|insurance|coverage/i.test(query),
        task: /task|meeting|call|reminder/i.test(query),
        opportunity: /opportunity|opportunities|lead|prospect|potential/i.test(
          query
        ),
      },
    };
  }

  function prepareQuerySpecificData(
    query: string,
    entities: {
      potentialNames: any;
      potentialPolicyTypes: any;
      potentialDates?: any[];
      containsWord?: {
        client: boolean;
        policy: boolean;
        task: boolean;
        opportunity: boolean;
      };
    }
  ) {
    let relevantData: {
      clients?: Client[];
      policies?: Policy[];
      tasks?: Task[];
      opportunities?: Opportunity[];
      policyTypeCounts?: { type: string; count: number }[];
      policiesByType?: Policy[];
      summary?: {
        clientCount: number;
        activeClientCount: number;
        policyCount: number;
        activePolicyCount: number;
        taskCount: number;
        pendingTaskCount: number;
        opportunityCount: number;
        highPriorityOpportunityCount: number;
        totalPremium: number;
        potentialRevenue: number;
      };
      policyDistribution?: { type: string; count: number; premium: number }[];
      expiringPolicies?: Policy[];
      systemOverview?: {
        clientCount: number;
        policyCount: number;
        taskCount: number;
        opportunityCount: number;
        description: string;
      };
    } = {};
    const queryLower = query.toLowerCase();

    if (entities.potentialNames.length > 0) {
      const matchedClients = findClientsByNames(entities.potentialNames);
      if (matchedClients.length > 0) {
        relevantData.clients = matchedClients;

        if (
          queryLower.includes('policy') ||
          queryLower.includes('policies') ||
          queryLower.includes('coverage') ||
          queryLower.includes('insurance')
        ) {
          relevantData.policies = matchedClients.flatMap((client) =>
            getPoliciesByClientId(client.id)
          );
        }

        if (
          queryLower.includes('task') ||
          queryLower.includes('meeting') ||
          queryLower.includes('follow') ||
          queryLower.includes('due')
        ) {
          relevantData.tasks = matchedClients.flatMap((client) =>
            getTasksByClientId(client.id)
          );
        }

        if (
          queryLower.includes('opportunity') ||
          queryLower.includes('potential') ||
          queryLower.includes('prospect')
        ) {
          relevantData.opportunities = matchedClients.flatMap((client) =>
            getOpportunitiesByClientId(client.id)
          );
        }
      }
    }

    if (entities.potentialPolicyTypes.length > 0) {
      const policyTypes = entities.potentialPolicyTypes;
      relevantData.policyTypeCounts = policyTypes.map((type: string) => {
        const count = policiesData.filter((p) => p.type.includes(type)).length;
        return { type, count };
      });

      relevantData.policiesByType = policyTypes.flatMap((type: string) =>
        policiesData.filter((p) => p.type.includes(type))
      );
    }

    if (
      queryLower.includes('summary') ||
      queryLower.includes('overview') ||
      queryLower.includes('dashboard') ||
      queryLower.includes('all')
    ) {
      relevantData.summary = {
        clientCount: clientsData.length,
        activeClientCount: clientsData.filter((c) => c.status === 'active')
          .length,
        policyCount: policiesData.length,
        activePolicyCount: policiesData.filter((p) => p.status === 'active')
          .length,
        taskCount: tasksData.length,
        pendingTaskCount: tasksData.filter((t) => t.status !== 'completed')
          .length,
        opportunityCount: opportunitiesData.length,
        highPriorityOpportunityCount: opportunitiesData.filter(
          (o) => o.priority === 'high'
        ).length,
        totalPremium: policiesData.reduce(
          (sum, policy) => sum + policy.premium,
          0
        ),
        potentialRevenue: opportunitiesData.reduce(
          (sum, opp) => sum + (opp.potentialRevenue || 0),
          0
        ),
      };

      relevantData.policyDistribution = [];
      const policyTypes = [...new Set(policiesData.map((p) => p.type))];
      policyTypes.forEach((type) => {
        const typeCount = policiesData.filter((p) => p.type === type).length;
        const typePremium = policiesData
          .filter((p) => p.type === type)
          .reduce((sum, p) => sum + p.premium, 0);
        relevantData.policyDistribution?.push({
          type,
          count: typeCount,
          premium: typePremium,
        });
      });
    }

    if (queryLower.includes('expir') || queryLower.includes('renew')) {
      const today = new Date();
      const nextMonth = new Date();
      nextMonth.setMonth(today.getMonth() + 1);

      relevantData.expiringPolicies = policiesData.filter((policy) => {
        const endDate = new Date(policy.endDate);
        return (
          endDate >= today && endDate <= nextMonth && policy.status === 'active'
        );
      });
    }

    if (Object.keys(relevantData).length === 0) {
      relevantData.systemOverview = {
        clientCount: clientsData.length,
        policyCount: policiesData.length,
        taskCount: tasksData.length,
        opportunityCount: opportunitiesData.length,
        description:
          'The LynIQ CRM system contains client information, policies, tasks, and business opportunities for insurance advisors.',
      };
    }

    return JSON.stringify(relevantData, null, 2);
  }

  function findClientsByNames(potentialNames: string[]) {
    let matchedClients: Client[] = [];

    potentialNames.forEach((nameString: string) => {
      const nameParts = nameString.split(' ');

      clientsData.forEach((client) => {
        if (nameParts.length > 1) {
          if (
            client.firstName.toLowerCase() === nameParts[0].toLowerCase() &&
            client.lastName.toLowerCase() === nameParts[1].toLowerCase()
          ) {
            if (!matchedClients.some((c) => c.id === client.id)) {
              matchedClients.push(client);
            }
          }
        } else {
          if (
            client.firstName.toLowerCase() === nameParts[0].toLowerCase() ||
            client.lastName.toLowerCase() === nameParts[0].toLowerCase()
          ) {
            if (!matchedClients.some((c) => c.id === client.id)) {
              matchedClients.push(client);
            }
          }
        }
      });

      if (matchedClients.length === 0) {
        clientsData.forEach((client) => {
          const fullName =
            `${client.firstName} ${client.lastName}`.toLowerCase();
          if (fullName.includes(nameString.toLowerCase())) {
            if (!matchedClients.some((c) => c.id === client.id)) {
              matchedClients.push(client);
            }
          }
        });
      }
    });

    return matchedClients;
  }

  const generateBotResponse = (
    userMessage: string
  ): string | React.ReactNode => {
    const message = userMessage.toLowerCase();

    if (message.includes('dashboard summary') || message.includes('overview')) {
      return (
        <div className="space-y-3">
          <p className="font-medium">CRM Dashboard Summary:</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-blue-50 p-2 rounded">
              <p className="font-medium text-blue-700">Clients</p>
              <p>{clientsData.length} total</p>
              <p>
                {clientsData.filter((c) => c.status === 'active').length} active
              </p>
            </div>
            <div className="bg-green-50 p-2 rounded">
              <p className="font-medium text-green-700">Policies</p>
              <p>{policiesData.length} total</p>
              <p>
                {policiesData.filter((p) => p.status === 'active').length}{' '}
                active
              </p>
            </div>
            <div className="bg-yellow-50 p-2 rounded">
              <p className="font-medium text-yellow-700">Tasks</p>
              <p>
                {tasksData.filter((t) => t.status !== 'completed').length}{' '}
                pending
              </p>
              <p>
                {tasksData.filter((t) => t.priority === 'high').length} high
                priority
              </p>
            </div>
            <div className="bg-purple-50 p-2 rounded">
              <p className="font-medium text-purple-700">Opportunities</p>
              <p>
                {
                  opportunitiesData.filter(
                    (o) => o.status !== 'completed' && o.status !== 'rejected'
                  ).length
                }{' '}
                open
              </p>
              <p>
                {formatCurrency(
                  opportunitiesData.reduce(
                    (sum, opp) => sum + (opp.potentialRevenue || 0),
                    0
                  )
                )}{' '}
                potential
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (message.includes('how many clients')) {
      return `There are ${clientsData.length} clients in the system.`;
    }

    if (message.includes('active clients')) {
      const activeClients = clientsData.filter(
        (client) => client.status === 'active'
      );
      return `There are ${activeClients.length} active clients in the system.`;
    }

    if (message.includes('client with highest premium')) {
      const sortedClients = [...clientsData].sort(
        (a, b) => b.totalPremium - a.totalPremium
      );
      const topClient = sortedClients[0];
      return `The client with the highest premium is ${topClient.firstName} ${topClient.lastName} with a total premium of ${formatCurrency(topClient.totalPremium)}.`;
    }

    if (
      message.includes('find client') ||
      message.includes('search client') ||
      message.includes('look up client') ||
      message.includes('show client')
    ) {
      const searchTerms = message
        .replace('find client', '')
        .replace('search client', '')
        .replace('look up client', '')
        .replace('show client', '')
        .trim();

      if (!searchTerms) {
        return 'Please provide a name or email to search for a client.';
      }

      const matchedClients = clientsData.filter(
        (client) =>
          `${client.firstName.toLowerCase()} ${client.lastName.toLowerCase()}`.includes(
            searchTerms
          ) || client.email.toLowerCase().includes(searchTerms)
      );

      if (matchedClients.length === 0) {
        return `No clients found matching "${searchTerms}".`;
      }

      if (matchedClients.length === 1) {
        const client = matchedClients[0];
        const clientPolicies = getPoliciesByClientId(client.id);

        return (
          <div className="space-y-2">
            <p>I found 1 client:</p>
            <div className="bg-white p-3 rounded border">
              <p className="font-medium">
                {client.firstName} {client.lastName}
              </p>
              <p className="text-sm">Email: {client.email}</p>
              <p className="text-sm">Phone: {client.phone}</p>
              <p className="text-sm">
                Active Policies: {client.activePolicies}
              </p>
              <p className="text-sm">
                Total Premium: {formatCurrency(client.totalPremium)}
              </p>
              <p className="text-sm">
                Last Contact:{' '}
                {new Date(client.lastContactDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Status: {client.status}
              </p>
            </div>
          </div>
        );
      }

      return (
        <div className="space-y-2">
          <p>
            I found {matchedClients.length} clients matching "{searchTerms}":
          </p>
          <div className="max-h-40 overflow-y-auto space-y-2">
            {matchedClients.slice(0, 3).map((client) => (
              <div key={client.id} className="bg-white p-2 rounded border">
                <p className="font-medium">
                  {client.firstName} {client.lastName}
                </p>
                <p className="text-sm">Email: {client.email}</p>
                <p className="text-sm">
                  Active Policies: {client.activePolicies}
                </p>
              </div>
            ))}
            {matchedClients.length > 3 && (
              <p className="text-sm text-gray-500">
                + {matchedClients.length - 3} more clients match your search
              </p>
            )}
          </div>
        </div>
      );
    }

    if (
      message.includes('policies expiring') ||
      message.includes('expiring policies') ||
      message.includes('what policies are expiring') ||
      message === 'what policies are expiring soon?'
    ) {
      const today = new Date();
      const nextMonth = new Date();
      nextMonth.setMonth(today.getMonth() + 1);

      const expiringPolicies = policiesData.filter((policy) => {
        const endDate = new Date(policy.endDate);
        return (
          endDate >= today && endDate <= nextMonth && policy.status === 'active'
        );
      });

      if (expiringPolicies.length === 0) {
        return 'There are no policies expiring in the next 30 days.';
      }

      return (
        <div className="space-y-2">
          <p>
            There are {expiringPolicies.length} policies expiring in the next 30
            days:
          </p>
          <div className="max-h-40 overflow-y-auto space-y-2">
            {expiringPolicies.slice(0, 3).map((policy) => {
              const client = clientsData.find((c) => c.id === policy.clientId);
              return (
                <div key={policy.id} className="bg-white p-2 rounded border">
                  <p className="font-medium">
                    {client?.firstName} {client?.lastName}
                  </p>
                  <p className="text-sm">
                    Policy: {policy.type} ({policy.policyNumber})
                  </p>
                  <p className="text-sm">
                    Expires: {new Date(policy.endDate).toLocaleDateString()}
                  </p>
                </div>
              );
            })}
            {expiringPolicies.length > 3 && (
              <p className="text-sm text-gray-500">
                + {expiringPolicies.length - 3} more policies expiring soon
              </p>
            )}
          </div>
        </div>
      );
    }

    if (
      message.includes('policies for client') ||
      (message.includes('policies') &&
        message.includes('for') &&
        (message.includes('has') || message.includes('have')))
    ) {
      const clientNameMatch =
        message.match(/policies for client\s+(.+)/i) ||
        message.match(/what policies does\s+(.+)\s+have/i) ||
        message.match(/policies does\s+(.+)\s+have/i);

      if (!clientNameMatch || !clientNameMatch[1]) {
        return 'Please specify a client name to check their policies.';
      }

      const clientName = clientNameMatch[1].trim().toLowerCase();
      const matchedClients = clientsData.filter((client) =>
        `${client.firstName.toLowerCase()} ${client.lastName.toLowerCase()}`.includes(
          clientName
        )
      );

      if (matchedClients.length === 0) {
        return `No clients found matching "${clientName}".`;
      }

      if (matchedClients.length > 1) {
        return `Found multiple clients matching "${clientName}". Please be more specific.`;
      }

      const client = matchedClients[0];
      const policies = getPoliciesByClientId(client.id);

      if (policies.length === 0) {
        return `${client.firstName} ${client.lastName} doesn't have any policies.`;
      }

      return (
        <div className="space-y-2">
          <p>
            {client.firstName} {client.lastName} has {policies.length} policies:
          </p>
          <div className="max-h-40 overflow-y-auto space-y-2">
            {policies.map((policy) => (
              <div key={policy.id} className="bg-white p-2 rounded border">
                <p className="font-medium">
                  {policy.type.charAt(0).toUpperCase() + policy.type.slice(1)}{' '}
                  Insurance
                </p>
                <p className="text-sm">Policy #: {policy.policyNumber}</p>
                <p className="text-sm">Status: {policy.status}</p>
                <p className="text-sm">
                  Premium: {formatCurrency(policy.premium)}
                </p>
                <p className="text-sm">
                  Coverage: {formatCurrency(policy.coverageAmount)}
                </p>
                <p className="text-sm">
                  Expires: {new Date(policy.endDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (
      (message.includes('task') || message.includes('tasks')) &&
      (message.includes('due today') || message.includes('today'))
    ) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const dueTodayTasks = tasksData.filter((task) => {
        const dueDate = new Date(task.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        return (
          dueDate.getTime() === today.getTime() && task.status !== 'completed'
        );
      });

      if (dueTodayTasks.length === 0) {
        return 'You have no tasks due today.';
      }

      return (
        <div className="space-y-2">
          <p>You have {dueTodayTasks.length} tasks due today:</p>
          <div className="max-h-40 overflow-y-auto space-y-2">
            {dueTodayTasks.map((task) => {
              const client = task.clientId
                ? clientsData.find((c) => c.id === task.clientId)
                : null;
              return (
                <div key={task.id} className="bg-white p-2 rounded border">
                  <p className="font-medium">{task.title}</p>
                  {client && (
                    <p className="text-sm">
                      Client: {client.firstName} {client.lastName}
                    </p>
                  )}
                  <p className="text-sm">Priority: {task.priority}</p>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (
      message.includes('high priority opportunities') ||
      message.includes('best opportunities')
    ) {
      const highPriorityOpps = opportunitiesData.filter(
        (opp) =>
          opp.priority === 'high' &&
          (opp.status === 'eligible' || opp.status === 'pending_review')
      );

      if (highPriorityOpps.length === 0) {
        return 'There are no high priority opportunities that need attention.';
      }

      return (
        <div className="space-y-2">
          <p>
            There are {highPriorityOpps.length} high priority opportunities:
          </p>
          <div className="max-h-40 overflow-y-auto space-y-2">
            {highPriorityOpps.slice(0, 3).map((opp) => {
              const client = clientsData.find((c) => c.id === opp.clientId);
              return (
                <div key={opp.id} className="bg-white p-2 rounded border">
                  <p className="font-medium">
                    {client?.firstName} {client?.lastName}
                  </p>
                  <p className="text-sm">{opp.type.replace('_', ' ')}</p>
                  <p className="text-sm">{opp.description}</p>
                </div>
              );
            })}
            {highPriorityOpps.length > 3 && (
              <p className="text-sm text-gray-500">
                + {highPriorityOpps.length - 3} more high priority opportunities
              </p>
            )}
          </div>
        </div>
      );
    }

    if (
      message.includes('revenue summary') ||
      message.includes('premium summary') ||
      message.includes('total revenue') ||
      message.includes('total premium')
    ) {
      const activePolicies = policiesData.filter((p) => p.status === 'active');
      const totalPremium = activePolicies.reduce(
        (sum, policy) => sum + policy.premium,
        0
      );

      const premiumByType: Record<string, number> = {};
      activePolicies.forEach((policy) => {
        premiumByType[policy.type] =
          (premiumByType[policy.type] || 0) + policy.premium;
      });

      const sortedTypes = Object.entries(premiumByType)
        .sort((a, b) => b[1] - a[1])
        .map(([type, premium]) => ({ type, premium }));

      return (
        <div className="space-y-2">
          <p className="font-medium">Revenue Summary</p>
          <p>Total annual premium: {formatCurrency(totalPremium)}</p>
          <p className="text-sm text-gray-600 mt-1">Premium by policy type:</p>
          <div className="max-h-40 overflow-y-auto space-y-1">
            {sortedTypes.map((item) => (
              <div key={item.type} className="flex justify-between text-sm">
                <span className="capitalize">{item.type} Insurance:</span>
                <span className="font-medium">
                  {formatCurrency(item.premium)}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (message.includes('help') || message.includes('what can you do')) {
      return (
        <div className="space-y-2">
          <p>I can help you with:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Finding client information</li>
            <li>Checking expiring policies</li>
            <li>Viewing tasks due today</li>
            <li>Identifying high priority opportunities</li>
            <li>Summarizing your CRM data</li>
          </ul>
          <p className="mt-2">Try asking questions like:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm italic">
            <li>Show me a dashboard summary</li>
            <li>How many active clients do we have?</li>
            <li>Find client John Doe</li>
            <li>What policies does Jane Smith have?</li>
            <li>Are there any policies expiring soon?</li>
            <li>What tasks do I have due today?</li>
            <li>Show me high priority opportunities</li>
            <li>Give me a revenue summary</li>
          </ul>
        </div>
      );
    }

    return (
      <div>
        <p>
          I'm not sure I understand your question. Can you try rephrasing it?
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Try asking about clients, policies, tasks, or opportunities.
        </p>
      </div>
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-xl w-[350px] h-[500px] mb-4 flex flex-col border"
          >
            <div className="p-4 border-b flex justify-between items-center bg-primary text-white rounded-t-lg">
              <h3 className="font-medium">LynIQ Assistant</h3>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearChat}
                  title="Clear chat"
                  className="text-white hover:bg-primary/80"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setUseLlamaApi(!useLlamaApi)}
                  title={
                    useLlamaApi
                      ? 'Switch to local processing'
                      : 'Switch to Llama API'
                  }
                  className="text-white hover:bg-primary/80"
                >
                  {useLlamaApi ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <MessageCircle className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggleChat}
                  title="Close"
                  className="text-white hover:bg-primary/80"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-primary text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="max-w-[75%] p-3 rounded-lg bg-gray-100 text-gray-800 rounded-bl-none flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin text-gray-500 mr-2" />
                    <span className="text-gray-500">Thinking...</span>
                  </div>
                </div>
              )}

              {messages.length <= 2 && !isProcessing && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">Try asking:</p>
                  <div className="space-y-2">
                    {presetQuestions.map((question) => (
                      <button
                        key={question.id}
                        onClick={() => handlePresetQuestion(question.text)}
                        className="block w-full text-left p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm transition-colors"
                      >
                        {question.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t flex items-center">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none h-10 leading-tight"
                disabled={isProcessing}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isProcessing}
                className="ml-2"
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <Button
          onClick={handleToggleChat}
          className="rounded-full h-14 shadow-lg relative overflow-hidden group"
          size="lg"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-90"></div>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>

          <div className="relative z-10 flex items-center">
            {!isOpen ? (
              <>
                <MessageSquare className="h-6 w-6 mr-2 text-white" />
                <span className="text-white text-sm font-medium">Chat</span>
              </>
            ) : (
              <X className="h-6 w-6 text-white" />
            )}
          </div>

          <motion.div
            className="absolute inset-0 bg-white opacity-0 z-0"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.2, 1],
              opacity: [0, 0.2, 0],
              transition: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 2,
                repeatDelay: 3,
              },
            }}
          />
        </Button>
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            transition: {
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 1,
            },
          }}
        />
      </motion.div>
    </div>
  );
}
