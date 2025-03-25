// src/app/(auth)/policies/[id]/edit/page.tsx
'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import PolicyForm from '@/components/policies/PolicyForm';
import { getPolicyById } from '@/data/policiesData';

export default function EditPolicyPage() {
  const params = useParams();
  const router = useRouter();
  const policyId = params.id as string;

  const policy = getPolicyById(policyId);

  if (!policy) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Policy Not Found</h1>
        <p className="mb-6">
          The policy you are trying to edit does not exist.
        </p>
        <Button onClick={() => router.push('/policies')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Policies
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
          title={`Edit Policy ${policy.policyNumber}`}
          subtitle="Modify policy details"
        />
      </div>

      <PolicyForm policy={policy} isEditing={true} />
    </>
  );
}
