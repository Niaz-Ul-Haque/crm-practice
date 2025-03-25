// src/components/layout/LeftNavigation.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  FileText,
  Star,
  FolderOpen,
  MessageSquare,
  CalendarCheck,
  BarChart,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Logo from '@/components/shared/Logo';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface LeftNavigationProps {
  collapsed: boolean;
  toggleSidebar: () => void;
  currentPath: string;
}

const LeftNavigation: React.FC<LeftNavigationProps> = ({
  collapsed,
  toggleSidebar,
}) => {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutDashboard size={18} />,
    },
    { name: 'Clients', href: '/clients', icon: <Users size={18} /> },
    { name: 'Policies', href: '/policies', icon: <FileText size={18} /> },
    {
      name: 'Opportunities',
      href: '/opportunities',
      icon: <Star size={18} />,
    },
    { name: 'Documents', href: '/documents', icon: <FolderOpen size={18} /> },
    {
      name: 'Communication',
      href: '/communication',
      icon: <MessageSquare size={18} />,
    },
    { name: 'Tasks', href: '/tasks', icon: <CalendarCheck size={18} /> },
    { name: 'Reports', href: '/reports', icon: <BarChart size={18} /> },
    { name: 'Settings', href: '/settings', icon: <Settings size={18} /> },
  ];

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 bg-white border-r border-gray-200 z-10 transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="h-full flex flex-col">
        <div
          className={cn(
            'flex items-center p-6',
            collapsed ? 'justify-center' : 'justify-between'
          )}
        >
          <Logo size="lg" collapsed={collapsed} />
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        <nav className="flex-1 px-4 pb-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center py-2 text-sm rounded-md transition-colors',
                  collapsed ? 'justify-center px-2' : 'px-4',
                  isActive
                    ? 'bg-blue-50 text-purple-600'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
                title={collapsed ? item.name : undefined}
              >
                <span className={collapsed ? '' : 'mr-3'}>{item.icon}</span>
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default LeftNavigation;
