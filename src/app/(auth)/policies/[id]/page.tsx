// src/app/(auth)/policies/[id]/page.tsx
'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowLeft,
  User,
  Calendar,
  RefreshCw,
  Trash,
  Mail,
  FileText,
  Edit,
} from 'lucide-react';
import { getPolicyById, getClientByPolicyId } from '@/data/policiesData';
import { formatDate } from '@/lib/utils';
import PolicyDetails from '@/components/policies/PolicyDetails';
import ClientAvatar from '@/components/clients/ClientAvatar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import BestOpportunityAlert from '@/components/policies/BestOpportunityAlert';

export default function PolicyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const policyId = params.id as string;

  const policy = getPolicyById(policyId);
  const client = getClientByPolicyId(policyId);

  if (!policy || !client) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Policy Not Found</h1>
        <p className="mb-6">The policy you are looking for does not exist.</p>
        <Button onClick={() => router.push('/policies')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Policies
        </Button>
      </div>
    );
  }

  const today = new Date();
  const expirationDate = new Date(policy.endDate);
  const daysUntilExpiration = Math.round(
    (expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

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
          title={`Policy ${policy.policyNumber}`}
          subtitle="Policy Details"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <PolicyDetails policy={policy} />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Policy Documents</CardTitle>
              </CardHeader>
              <CardContent>
                {policy.documents && policy.documents.length > 0 ? (
                  <div className="space-y-2">
                    {policy.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-md"
                      >
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-purple-500 mr-2" />
                          <span>{doc}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500 mb-4">
                      No documents have been uploaded for this policy.
                    </p>
                    <Button>Upload Document</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <ClientAvatar
                    firstName={client.firstName}
                    lastName={client.lastName}
                    size="md"
                  />
                  <div className="ml-3">
                    <h3 className="font-medium">
                      {client.firstName} {client.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">{client.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <Link href={`/clients/${client.id}`}>
                    <Button variant="outline" size="sm">
                      <User className="w-4 h-4 mr-2" />
                      View Client
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                </div>
                <div className="border-t pt-4 space-y-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Client Since
                    </p>
                    <p>March 2023</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Active Policies
                    </p>
                    <p>{client.activePolicies}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card
              className={
                daysUntilExpiration <= 30 ? 'bg-amber-50 border-amber-100' : ''
              }
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Policy Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Start Date
                    </p>
                    <p>{formatDate(new Date(policy.startDate))}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Expiration Date
                    </p>
                    <p className="font-medium">
                      {formatDate(new Date(policy.endDate))}
                    </p>
                    {daysUntilExpiration <= 30 && (
                      <p className="text-amber-600 text-sm mt-1">
                        Expires in {daysUntilExpiration} days
                      </p>
                    )}
                  </div>
                  {daysUntilExpiration <= 60 && (
                    <Button size="sm" className="w-full">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Initiate Renewal
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Renewal Notice
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Process Renewal
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Edit className="w-4 h-4 mr-2" />
                  Modify Coverage
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash className="w-4 h-4 mr-2" />
                  Cancel Policy
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {policy.type === 'home' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mt-6"
            >
              <BestOpportunityAlert
                policy={policy}
                opportunity={{
                  type: 'bundle discount',
                  description:
                    'This client has a home policy but no auto policy. Recommending a bundle could save them up to 15% on their premiums and increase retention.',
                  potentialSavings: Math.round(policy.premium * 0.15),
                }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
