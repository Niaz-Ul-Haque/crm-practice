// src/components/communication/CommunicationDetail.tsx
"use client";

import React from "react";
import { Communication } from "@/data/communicationData";
import { formatDate } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Download,
  File,
  Mail,
  MessageSquare,
  Phone,
  Reply,
  Trash,
  FileText,
  Forward,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Client } from "@/data/clientsData";
import { motion } from "framer-motion";
import Link from "next/link";

interface CommunicationDetailProps {
  communication: Communication;
  client?: Client | null;
  onBack?: () => void;
}

const CommunicationDetail: React.FC<CommunicationDetailProps> = ({
  communication,
  client,
  onBack,
}) => {
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "email":
        return "Email";
      case "call":
        return "Phone Call";
      case "sms":
        return "SMS";
      case "meeting":
        return "Meeting";
      case "note":
        return "Note";
      default:
        return "Communication";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail size={20} className="text-purple-500" />;
      case "call":
        return <Phone size={20} className="text-green-500" />;
      case "sms":
        return <MessageSquare size={20} className="text-purple-500" />;
      case "meeting":
        return <Calendar size={20} className="text-amber-500" />;
      case "note":
        return <FileText size={20} className="text-gray-500" />;
      default:
        return <Mail size={20} className="text-purple-500" />;
    }
  };

  const getRecipientDisplay = () => {
    if (
      communication.type === "note" &&
      communication.recipient === "internal"
    ) {
      return "Internal Note";
    }

    if (client) {
      return `${client.firstName} ${client.lastName} <${communication.recipient}>`;
    }

    return communication.recipient;
  };

  const formattedContent = communication.content
    .split("\n")
    .map((line: string, index: number) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full">
        <CardHeader className="flex flex-row items-start justify-between border-b">
          <div className="flex items-center">
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                className="mr-2"
                onClick={onBack}
              >
                <ArrowLeft size={16} />
              </Button>
            )}
            <div>
              <div className="flex items-center">
                {getTypeIcon(communication.type)}
                <CardTitle className="ml-2">{communication.subject}</CardTitle>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {getTypeLabel(communication.type)} •{" "}
                {formatDate(new Date(communication.sentAt))}
              </p>
            </div>
          </div>

          {(communication.status === "draft" ||
            communication.status === "scheduled") && (
            <div>
              {communication.status === "draft" && (
                <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">
                  Draft
                </span>
              )}
              {communication.status === "scheduled" && (
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded flex items-center">
                  <Clock size={14} className="mr-1" />
                  Scheduled for{" "}
                  {formatDate(new Date(communication.scheduledFor || ""))}
                </span>
              )}
            </div>
          )}
        </CardHeader>

        <CardContent className="pt-4">
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">From</p>
              <p>{communication.sender}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-500">To</p>
              <p>{getRecipientDisplay()}</p>
            </div>
          </div>

          {client && (
            <div className="mb-4 p-3 bg-gray-50 rounded-md border flex items-center">
              <Avatar className="h-10 w-10 bg-blue-100 text-purple-600">
                <AvatarFallback>
                  {client.firstName[0]}
                  {client.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="font-medium">
                  {client.firstName} {client.lastName}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{client.email}</span>
                  <span>{client.phone}</span>
                </div>
              </div>
              <div className="ml-auto">
                <Link href={`/clients/${client.id}`}>
                  <Button size="sm" variant="outline">
                    View Client
                  </Button>
                </Link>
              </div>
            </div>
          )}

          <div className="mt-6 text-gray-800 leading-relaxed min-h-[200px]">
            {formattedContent}
          </div>

          {communication.attachments &&
            communication.attachments.length > 0 && (
              <div className="mt-6 border-t pt-4">
                <h3 className="font-medium mb-2">Attachments</h3>
                <div className="space-y-2">
                  {communication.attachments.map(
                    (
                      attachment:
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactElement<
                            unknown,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Promise<
                            | string
                            | number
                            | bigint
                            | boolean
                            | React.ReactPortal
                            | React.ReactElement<
                                unknown,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | null
                            | undefined
                          >
                        | null
                        | undefined,
                      index: React.Key | null | undefined
                    ) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 border rounded-md"
                      >
                        <div className="flex items-center">
                          <File size={16} className="text-purple-500 mr-2" />
                          <span>{attachment}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download size={16} className="mr-1" />
                          Download
                        </Button>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
        </CardContent>

        <CardFooter className="border-t flex justify-between pt-4">
          <Button variant="outline" size="sm">
            <Trash size={16} className="mr-2" />
            Delete
          </Button>

          <div className="flex space-x-2">
            {communication.type === "email" && (
              <>
                <Button variant="outline" size="sm">
                  <Reply size={16} className="mr-2" />
                  Reply
                </Button>
                <Button variant="outline" size="sm">
                  <Forward size={16} className="mr-2" />
                  Forward
                </Button>
              </>
            )}
            <Button size="sm">
              {communication.status === "draft" ? "Send" : "New Message"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CommunicationDetail;
