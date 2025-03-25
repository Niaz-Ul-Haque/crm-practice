// src/app/(auth)/documents/page.tsx
'use client';

import React from 'react';
import PageTitle from '@/components/shared/PageTitle';

export default function DocumentsPage() {
  return (
    <>
      <PageTitle title="Documents" subtitle="Manage client documents" />
      <div className="p-8 bg-white rounded-lg border shadow">
        <p className="text-gray-500">
          Document management will be implemented later (this will require more
          time lol).
        </p>
      </div>
    </>
  );
}
