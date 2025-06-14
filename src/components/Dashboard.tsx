
import React, { useState, useEffect } from 'react';
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
import { ModernNotificationSidebar } from '@/components/notifications/ModernNotificationSidebar';

export const Dashboard: React.FC = () => {
  const { inventory, suppliers, transactions, refreshData } = useSupply();
  const [widgetVisibility, setWidgetVisibility] = useState({
    notifications: true,
    chatbot: true,
    calendar: true
  });
  const [isNotificationSidebarOpen, setIsNotificationSidebarOpen] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (refreshData) {
        refreshData();
        setLastRefresh(new Date());
        console.log('Dashboard: Auto-refreshed data at', new Date().toLocaleTimeString());
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [refreshData]);

  const toggleWidget = (widget: keyof typeof widgetVisibility) => {
    setWidgetVisibility(prev => ({
      ...prev,
      [widget]: !prev[widget]
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Header without Notification Toggle */}
      <DashboardHeader widgetVisibility={widgetVisibility} toggleWidget={toggleWidget} />

      {/* Auto-refresh indicator */}
      <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
        Last updated: {lastRefresh.toLocaleTimeString()}
      </div>

      <StatsGrid inventory={inventory} suppliers={suppliers} />

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
