// src/app/(auth)/communication/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import PageTitle from "@/components/shared/PageTitle";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CommunicationList from "@/components/communication/CommunicationList";
import CommunicationDetail from "@/components/communication/CommunicationDetail";
import NewMessageForm from "@/components/communication/NewMessageForm";
import CommunicationFilters from "@/components/communication/CommunicationFilters";
import {
  communicationsData,
  Communication,
  getClientForCommunication,
} from "@/data/communicationData";
import { motion } from "framer-motion";

export default function CommunicationPage() {
  const [communications, setCommunications] =
    useState<Communication[]>(communicationsData);
  const [filteredCommunications, setFilteredCommunications] =
    useState<Communication[]>(communicationsData);
  const [selectedCommunicationId, setSelectedCommunicationId] = useState<
    string | null
  >(null);
  const [isComposing, setIsComposing] = useState(false);
  const [filters, setFilters] = useState({
    searchTerm: "",
    types: [] as string[],
    statuses: [] as string[],
    hasAttachments: false,
  });

  useEffect(() => {
    let result = [...communications];

    if (filters.searchTerm) {
      const search = filters.searchTerm.toLowerCase();
      result = result.filter(
        (comm) =>
          comm.subject.toLowerCase().includes(search) ||
          comm.content.toLowerCase().includes(search) ||
          comm.recipient.toLowerCase().includes(search)
      );
    }

    if (filters.types.length > 0) {
      result = result.filter((comm) => filters.types.includes(comm.type));
    }

    if (filters.statuses.length > 0) {
      result = result.filter((comm) => filters.statuses.includes(comm.status));
    }

    if (filters.hasAttachments) {
      result = result.filter(
        (comm) => comm.attachments && comm.attachments.length > 0
      );
    }

    result.sort(
      (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
    );

    setFilteredCommunications(result);
  }, [communications, filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleSelectCommunication = (id: string) => {
    setSelectedCommunicationId(id);
    setIsComposing(false);

    setCommunications((comms) =>
      comms.map((comm) => (comm.id === id ? { ...comm, isRead: true } : comm))
    );
  };

  const selectedCommunication = selectedCommunicationId
    ? communications.find((c) => c.id === selectedCommunicationId)
    : null;

  const client = selectedCommunicationId
    ? getClientForCommunication(selectedCommunicationId)
    : null;

  const handleNewMessage = () => {
    setSelectedCommunicationId(null);
    setIsComposing(true);
  };

  const handleCancelCompose = () => {
    setIsComposing(false);

    if (!selectedCommunicationId) {
      setSelectedCommunicationId(null);
    }
  };

  const handleSendMessage = (message: any) => {
    console.log("Sending message:", message);

    const newMessage: Communication = {
      id: Date.now().toString(),
      clientId: message.clientId,
      type: message.type,
      subject: message.subject,
      content: message.message,
      sentAt: new Date().toISOString(),
      sender: "jane.smith@insurance.com",
      recipient: "client@example.com",
      attachments:
        message.attachments.length > 0 ? message.attachments : undefined,
      isRead: true,
      status: message.schedule ? "scheduled" : "sent",
      scheduledFor: message.schedule
        ? `${message.scheduledDate}T${message.scheduledTime}:00Z`
        : undefined,
    };

    setCommunications((prev) => [newMessage, ...prev]);
    setIsComposing(false);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <PageTitle
          title="Communication"
          subtitle="Manage client communications"
        />
        <Button onClick={handleNewMessage}>
          <Plus size={16} className="mr-2" />
          New Message
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-160px)]">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="md:col-span-1 overflow-hidden flex flex-col"
        >
          <CommunicationFilters onFilterChange={handleFilterChange} />
          <CommunicationList
            communications={filteredCommunications}
            activeId={selectedCommunicationId}
            onSelect={handleSelectCommunication}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="md:col-span-2"
        >
          {isComposing ? (
            <NewMessageForm
              onCancel={handleCancelCompose}
              onSend={handleSendMessage}
            />
          ) : selectedCommunication ? (
            <CommunicationDetail
              communication={selectedCommunication}
              client={client}
              onBack={() => setSelectedCommunicationId(null)}
            />
          ) : (
            <div className="h-full flex items-center justify-center border rounded-md bg-gray-50">
              <div className="text-center p-6">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  No Message Selected
                </h3>
                <p className="text-gray-500 mb-4">
                  Select a message from the list or create a new one.
                </p>
                <Button onClick={handleNewMessage}>
                  <Plus size={16} className="mr-2" />
                  New Message
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}
