'use client';

import React, { useState, useCallback } from 'react';
import LeftNavigation from './LeftNavigation';
import Header from './Header';
import { usePathname } from 'next/navigation';
import ChatWidget from '../chat/ChatWidget';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      <LeftNavigation
        collapsed={sidebarCollapsed}
        toggleSidebar={toggleSidebar}
        currentPath={pathname}
      />
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-200 ${
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <Header />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
      <ChatWidget />
    </div>
  );
};

export default React.memo(MainLayout);
