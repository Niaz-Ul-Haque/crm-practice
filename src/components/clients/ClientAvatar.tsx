// src/components/clients/ClientAvatar.tsx
import React from 'react';
import { User } from 'lucide-react';
import Image from 'next/image';

interface ClientAvatarProps {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ClientAvatar: React.FC<ClientAvatarProps> = ({
  firstName,
  lastName,
  avatarUrl,
  size = 'md',
}) => {
  const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`;

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-xl',
  };

  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt={`${firstName} ${lastName}`}
        className={`${sizeClasses[size]} rounded-full object-cover`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} bg-blue-100 text-purple-600 rounded-full flex items-center justify-center font-semibold`}
    >
      {initials || <User size={size === 'lg' ? 24 : size === 'md' ? 18 : 14} />}
    </div>
  );
};

export default ClientAvatar;
