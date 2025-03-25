// src/app/(auth)/policies/new/page.tsx
'use client';

import React from 'react';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import PolicyForm from '@/components/policies/PolicyForm';

export default function NewPolicyPage() {
  const router = useRouter();

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
          title="Add New Policy"
          subtitle="Create a new insurance policy"
        />
      </div>

      <PolicyForm />
    </>
  );
}
