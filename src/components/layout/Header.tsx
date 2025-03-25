// src/components/layout/Header.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Bell,
  ChevronDown,
  User,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppSelector } from '@/app/redux/hooks';
import { useLogout } from '@/app/actions/auth';
import Link from 'next/link';

const Header: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const logout = useLogout();

  const getInitials = () => {
    if (!user?.name) return 'U';
    const parts = user.name.split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-8 sticky top-0 z-10">
      <div className="flex-1 flex justify-between items-center">
        <div>{/* Page title will be inserted by individual pages */}</div>
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-4 font-medium border-b">Notifications</div>
              <div className="py-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <DropdownMenuItem
                    key={i}
                    className="cursor-pointer p-4 hover:bg-gray-50"
                  >
                    <div>
                      <p className="font-medium">Policy Expiring Soon</p>
                      <p className="text-sm text-gray-500">
                        John Doe&apos;s home insurance policy is expiring in 30
                        days.
                      </p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <div className="p-2 border-t text-center">
                <Button variant="ghost" size="sm" className="w-full">
                  View all notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-purple-500 font-bold">
                  {getInitials()}
                </div>
                <span className="hidden sm:inline">{user?.name || 'User'}</span>
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2 border-b">
                <p className="font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <Link href="/settings">
                <DropdownMenuItem className="cursor-pointer">
                  <User size={16} className="mr-2" />
                  Profile
                </DropdownMenuItem>
              </Link>
              <Link href="/settings">
                <DropdownMenuItem className="cursor-pointer">
                  <Settings size={16} className="mr-2" />
                  Settings
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="cursor-pointer">
                <HelpCircle size={16} className="mr-2" />
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-red-600"
                onClick={logout}
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
