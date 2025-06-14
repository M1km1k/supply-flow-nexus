
import React, { useState, useEffect, useMemo, memo } from 'react';
import { useSupply } from '@/contexts/SupplyContext';
import { usePerformance } from '@/hooks/usePerformance';
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

const MemoizedStatsGrid = memo(StatsGrid);
const MemoizedInventoryFlowChart = memo(InventoryFlowChart);
const MemoizedStockDistributionChart = memo(StockDistributionChart);
const MemoizedCategoryPerformanceChart = memo(CategoryPerformanceChart);
const MemoizedWeeklyTransactionChart = memo(WeeklyTransactionChart);
const MemoizedSupplierPerformanceChart = memo(SupplierPerformanceChart);
const MemoizedRecentTransactions = memo(RecentTransactions);
const MemoizedCalendarWidget = memo(CalendarWidget);
const MemoizedMiniChatbot = memo(MiniChatbot);

export const Dashboard: React.FC = memo(() => {
  const { inventory, suppliers, transactions, refreshData } = useSupply();
  const { measureRender } = usePerformance();
  
  const [widgetVisibility, setWidgetVisibility] = useState({
    notifications: true,
    chatbot: true,
    calendar: true
  });
  const [isNotificationSidebarOpen, setIsNotificationSidebarOpen] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Performance monitoring
  useEffect(() => {
    const cleanup = measureRender('Dashboard');
    return cleanup;
  });

  // Optimized auto-refresh with user activity detection
  useEffect(() => {
    let isActive = true;
    
    const handleVisibilityChange = () => {
      isActive = !document.hidden;
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    const interval = setInterval(() => {
      if (refreshData && isActive) {
        refreshData();
        setLastRefresh(new Date());
        console.log('Dashboard: Auto-refreshed data at', new Date().toLocaleTimeString());
      }
    }, 30000);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [refreshData]);

  // Memoized toggle function
  const toggleWidget = useMemo(() => 
    (widget: keyof typeof widgetVisibility) => {
      setWidgetVisibility(prev => ({
        ...prev,
        [widget]: !prev[widget]
      }));
    }, []
  );

  // Memoized sidebar handlers
  const handleNotificationSidebarClose = useMemo(() => 
    () => setIsNotificationSidebarOpen(false), []
  );

  return (
    <div className="space-y-6 animate-fade-in relative">
      <DashboardHeader widgetVisibility={widgetVisibility} toggleWidget={toggleWidget} />

      <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
        Last updated: {lastRefresh.toLocaleTimeString()}
      </div>

      <MemoizedStatsGrid inventory={inventory} suppliers={suppliers} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MemoizedInventoryFlowChart />
        <MemoizedStockDistributionChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MemoizedCategoryPerformanceChart />
        <MemoizedWeeklyTransactionChart />
      </div>

      <MemoizedSupplierPerformanceChart />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {widgetVisibility.chatbot && (
          <div className="animate-slide-up">
            <MemoizedMiniChatbot />
          </div>
        )}
        {widgetVisibility.calendar && (
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <MemoizedCalendarWidget />
          </div>
        )}
      </div>

      <MemoizedRecentTransactions transactions={transactions} inventory={inventory} />

      <ModernNotificationSidebar 
        isOpen={isNotificationSidebarOpen}
        onClose={handleNotificationSidebarClose}
      />
    </div>
  );
});

Dashboard.displayName = 'Dashboard';
