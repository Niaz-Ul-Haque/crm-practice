// src/components/communication/CommunicationList.tsx
"use client";

import React from "react";
import { Communication } from "../../data/communicationData";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  FileText,
  Clock,
} from "lucide-react";

interface CommunicationListProps {
  communications: Communication[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

const CommunicationList: React.FC<CommunicationListProps> = ({
  communications,
  activeId,
  onSelect,
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail size={16} className="text-purple-500" />;
      case "call":
        return <Phone size={16} className="text-green-500" />;
      case "sms":
        return <MessageSquare size={16} className="text-purple-500" />;
      case "meeting":
        return <Calendar size={16} className="text-amber-500" />;
      case "note":
        return <FileText size={16} className="text-gray-500" />;
      default:
        return <Mail size={16} className="text-purple-500" />;
    }
  };

  const getRecipientDisplay = (communication: Communication) => {
    if (communication.recipient === "internal") return "Internal Note";

    if (communication.type === "sms") return "SMS: " + communication.recipient;
    return communication.recipient;
  };

  return (
    <div className="overflow-y-auto h-[calc(100vh-220px)] border rounded-md divide-y">
      {communications.map((communication, index) => (
        <motion.div
          key={communication.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.03 }}
          className={`p-4 cursor-pointer hover:bg-gray-50 ${
            activeId === communication.id
              ? "bg-blue-50 border-l-4 border-blue-500"
              : ""
          }`}
          onClick={() => onSelect(communication.id)}
        >
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center">
              {getTypeIcon(communication.type)}
              <h3
                className={`font-medium ml-2 ${
                  !communication.isRead && communication.status === "sent"
                    ? "text-black"
                    : "text-gray-700"
                }`}
              >
                {communication.subject}
              </h3>
            </div>
            <div className="flex items-center">
              {communication.status === "draft" && (
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded mr-2">
                  Draft
                </span>
              )}
              {communication.status === "scheduled" && (
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded mr-2 flex items-center">
                  <Clock size={12} className="mr-1" /> Scheduled
                </span>
              )}
              <span className="text-xs text-gray-500">
                {formatDate(new Date(communication.sentAt))}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-500 truncate">
            {getRecipientDisplay(communication)}
          </p>
          <p
            className={`text-sm ${
              !communication.isRead && communication.status === "sent"
                ? "text-black"
                : "text-gray-600"
            } mt-1 line-clamp-2`}
          >
            {communication.content.split("\n")[0]}
          </p>
          {communication.attachments &&
            communication.attachments.length > 0 && (
              <div className="mt-2 flex items-center">
                <FileText size={14} className="text-gray-400 mr-1" />
                <span className="text-xs text-gray-500">
                  {communication.attachments.length} attachment
                  {communication.attachments.length > 1 ? "s" : ""}
                </span>
              </div>
            )}
        </motion.div>
      ))}

      {communications.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          No communications found.
        </div>
      )}
    </div>
  );
};

export default CommunicationList;
