// src/app/(guest)/layout.tsx
import Logo from '@/components/shared/Logo';

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="h-16 flex items-center px-8 border-b bg-white">
        <Logo size="lg" />
      </header>
      <div className="flex-1 flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
}
