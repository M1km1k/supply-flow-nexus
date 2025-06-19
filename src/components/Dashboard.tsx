
import React, { useState } from 'react';
import { useSupply } from '@/contexts/SupplyContext';
import { CalendarWidget } from '@/components/CalendarWidget';
import { MiniChatbot } from '@/components/MiniChatbot';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { InventoryFlowChart } from '@/components/dashboard/InventoryFlowChart';
import { StockDistributionChart } from '@/components/dashboard/StockDistributionChart';
import { CategoryPerformanceChart } from '@/components/dashboard/CategoryPerformanceChart';
import { WeeklyTransactionChart } from '@/components/dashboard/WeeklyTransactionChart';
import { SupplierPerformanceChart } from '@/components/dashboard/SupplierPerformanceChart';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { NotificationToggle } from '@/components/dashboard/NotificationToggle';
import { ModernNotificationSidebar } from '@/components/notifications/ModernNotificationSidebar';
import { ObjectivesOverview } from '@/components/dashboard/ObjectivesOverview';

export const Dashboard: React.FC = () => {
  const { inventory, suppliers, transactions } = useSupply();
  const [widgetVisibility, setWidgetVisibility] = useState({
    notifications: true,
    chatbot: true,
    calendar: true,
    objectives: true
  });
  const [isNotificationSidebarOpen, setIsNotificationSidebarOpen] = useState(false);

  const toggleWidget = (widget: keyof typeof widgetVisibility) => {
    setWidgetVisibility(prev => ({
      ...prev,
      [widget]: !prev[widget]
    }));
  };

  // Calculate notification count (low stock items)
  const notificationCount = inventory.filter(item => 
    item.status === 'Low Stock' || item.status === 'Out of Stock'
  ).length;

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Header with Notification Toggle positioned on the right */}
      <div className="flex justify-between items-center">
        <DashboardHeader widgetVisibility={widgetVisibility} toggleWidget={toggleWidget} />
        <div className="flex justify-end">
          <NotificationToggle 
            onClick={() => setIsNotificationSidebarOpen(true)}
            notificationCount={notificationCount}
          />
        </div>
      </div>

      <StatsGrid inventory={inventory} suppliers={suppliers} />

      {/* Study Objectives Overview */}
      {widgetVisibility.objectives && (
        <div className="animate-slide-up">
          <ObjectivesOverview />
        </div>
      )}

      {/* Enhanced Charts Section - Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InventoryFlowChart />
        <StockDistributionChart />
      </div>

      {/* Enhanced Charts Section - Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryPerformanceChart />
        <WeeklyTransactionChart />
      </div>

      <SupplierPerformanceChart />

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {widgetVisibility.chatbot && (
          <div className="animate-slide-up">
            <MiniChatbot />
          </div>
        )}
        {widgetVisibility.calendar && (
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CalendarWidget />
          </div>
        )}
      </div>

      <RecentTransactions transactions={transactions} inventory={inventory} />

      {/* Modern Notification Sidebar */}
      <ModernNotificationSidebar 
        isOpen={isNotificationSidebarOpen}
        onClose={() => setIsNotificationSidebarOpen(false)}
      />
    </div>
  );
};
