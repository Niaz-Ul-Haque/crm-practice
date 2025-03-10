// src/app/(auth)/clients/[id]/page.tsx (updated)
"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import PageTitle from "@/components/shared/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { clientsData } from "@/data/clientsData";
import { formatDate } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";
import ClientAvatar from "@/components/clients/ClientAvatar";
import ClientNotes from "@/components/clients/ClientNotes";
import ClientTimeline from "@/components/clients/ClientTimeline";
import ClientQuickActions from "@/components/clients/ClientQuickActions";
import NextPolicyRenewal from "@/components/clients/NextPolicyRenewal";
import { ArrowLeft, Mail, Phone, Edit, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { generateTimelineData, generateClientNotes } from "@/data/timelineData";
import ContactForm from "@/components/clients/ContactForm";

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.id as string;

  const client = clientsData.find((c) => c.id === clientId);

  const timelineActivities = generateTimelineData(clientId);

  const clientNotes = generateClientNotes(clientId);

  const nextPolicyRenewal = {
    id: "policy-1",
    type: "Home Insurance",
    expirationDate: "2025-04-15",
    premium: 1200,
  };

  if (!client) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Client Not Found</h1>
        <p className="mb-6">The client you are looking for does not exist.</p>
        <Button onClick={() => router.push("/clients")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Clients
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="mr-4"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <PageTitle
          title={`${client.firstName} ${client.lastName}`}
          subtitle="Client Details"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Client Header */}
        <Card className="mb-6">
          <CardContent className="pt-6 pb-6">
            <div className="flex justify-between">
              <div className="flex items-center">
                <ClientAvatar
                  firstName={client.firstName}
                  lastName={client.lastName}
                  size="lg"
                />
                <div className="ml-4">
                  <h2 className="text-2xl font-bold">
                    {client.firstName} {client.lastName}
                  </h2>
                  <div className="flex flex-col sm:flex-row sm:space-x-4 text-gray-500 mt-1">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      {client.email}
                    </div>
                    <div className="flex items-center mt-1 sm:mt-0">
                      <Phone className="w-4 h-4 mr-1" />
                      {client.phone}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" /> Message
                </Button>
                <Button size="sm">Schedule Call</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Details Tabs */}
        <Tabs defaultValue="profile">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Full Name
                        </p>
                        <p>
                          {client.firstName} {client.lastName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Email
                        </p>
                        <p>{client.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Phone
                        </p>
                        <p>{client.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Date of Birth
                        </p>
                        <p>
                          {client.dateOfBirth
                            ? formatDate(new Date(client.dateOfBirth))
                            : "Not provided"}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm font-medium text-gray-500">
                          Address
                        </p>
                        <p>
                          {client.address}, {client.city}, {client.state}{" "}
                          {client.zipCode}
                        </p>
                      </div>
                      {client.notes && (
                        <div className="col-span-2">
                          <p className="text-sm font-medium text-gray-500">
                            Notes
                          </p>
                          <p>{client.notes}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <ClientNotes clientId={clientId} initialNotes={clientNotes} />

                <ClientTimeline activities={timelineActivities} />
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Client Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Client Since
                        </p>
                        <p>March 2023</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Status
                        </p>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            client.status === "active"
                              ? "bg-green-100 text-green-800"
                              : client.status === "inactive"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {client.status.charAt(0).toUpperCase() +
                            client.status.slice(1)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Active Policies
                        </p>
                        <p>{client.activePolicies}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Total Annual Premium
                        </p>
                        <p className="text-lg font-semibold">
                          {formatCurrency(client.totalPremium)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Last Contact
                        </p>
                        <p>{formatDate(new Date(client.lastContactDate))}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <ClientQuickActions
                  clientName={`${client.firstName} ${client.lastName}`}
                />

                {client.activePolicies > 0 && (
                  <NextPolicyRenewal
                    client={{
                      firstName: client.firstName,
                      lastName: client.lastName,
                    }}
                    policy={nextPolicyRenewal}
                  />
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="policies" className="mt-0">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Policies</CardTitle>
                <Button>Add Policy</Button>
              </CardHeader>
              <CardContent>
                {client.activePolicies > 0 ? (
                  <div className="space-y-4">
                    {Array.from({ length: client.activePolicies }).map(
                      (_, index) => (
                        <div
                          key={index}
                          className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium">
                                {index === 0
                                  ? "Home Insurance"
                                  : index === 1
                                  ? "Auto Insurance"
                                  : "Life Insurance"}
                              </h3>
                              <p className="text-sm text-gray-500">
                                Policy #{(10000 + index).toString()}
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-sm mt-4">
                            <div>
                              <p className="text-gray-500">Coverage</p>
                              <p className="font-medium">
                                {formatCurrency(250000 * (index + 1))}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Premium</p>
                              <p className="font-medium">
                                {formatCurrency(
                                  client.totalPremium / client.activePolicies
                                )}
                                /year
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Expires</p>
                              <p className="font-medium">Dec 31, 2025</p>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500 mb-4">
                      This client has no active policies.
                    </p>
                    <Button>Add First Policy</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communication" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Communication History</CardTitle>
                    <Button>Send Message</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((_, index) => (
                        <div
                          key={index}
                          className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium">
                                {index === 0
                                  ? "Policy Renewal Discussion"
                                  : index === 1
                                  ? "Follow-up Call"
                                  : "Welcome Email"}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {index === 0
                                  ? "Email"
                                  : index === 1
                                  ? "Phone Call"
                                  : "Email"}{" "}
                                • March {5 - index}, 2025
                              </p>
                            </div>
                          </div>
                          <p className="text-sm mt-2">
                            {index === 0
                              ? "Discussed options for home insurance renewal. Client interested in increasing coverage."
                              : index === 1
                              ? "Called to follow up on recent policy changes. Client confirmed satisfaction with new terms."
                              : "Sent welcome email with policy documentation and next steps."}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <ContactForm
                  clientName={`${client.firstName} ${client.lastName}`}
                  clientEmail={client.email}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </>
  );
}
