
import React, { useState, useEffect, useMemo, memo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSupply } from '@/contexts/SupplyContext';
import { useAuth } from '@/contexts/AuthContext';
import { usePerformance } from '@/hooks/usePerformance';
import { DashboardWidgets } from './DashboardWidgets';
import { DashboardStats } from './DashboardStats';
import { SystemStatusFooter } from './SystemStatusFooter';
import { InventoryFlowChart } from './InventoryFlowChart';
import { StockDistributionChart } from './StockDistributionChart';
import { CategoryPerformanceChart } from './CategoryPerformanceChart';
import { SupplierPerformanceChart } from './SupplierPerformanceChart';
import { NotificationSidebar } from './NotificationSidebar';
import { NotificationToggle } from './NotificationToggle';

const MemoizedDashboardStats = memo(DashboardStats);
const MemoizedDashboardWidgets = memo(DashboardWidgets);
const MemoizedInventoryFlowChart = memo(InventoryFlowChart);
const MemoizedStockDistributionChart = memo(StockDistributionChart);
const MemoizedCategoryPerformanceChart = memo(CategoryPerformanceChart);
const MemoizedSupplierPerformanceChart = memo(SupplierPerformanceChart);

export const ModularDashboard: React.FC = memo(() => {
  const { inventory, suppliers, transactions, refreshData } = useSupply();
  const { user, hasPermission, isAdmin, isStaff } = useAuth();
  const { measureRender } = usePerformance();
  
  const [visibleWidgets, setVisibleWidgets] = useState<string[]>(
    isStaff() ? [] : ['predictive-analytics']
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isNotificationSidebarOpen, setIsNotificationSidebarOpen] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Performance monitoring
  useEffect(() => {
    const cleanup = measureRender('ModularDashboard');
    return cleanup;
  });

  // Optimized auto-refresh
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
        console.log('ModularDashboard: Auto-refreshed data at', new Date().toLocaleTimeString());
      }
    }, 30000);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [refreshData]);

  // Memoized toggle functions
  const toggleWidget = useCallback((widgetId: string) => {
    setVisibleWidgets(prev => 
      prev.includes(widgetId) 
        ? prev.filter(id => id !== widgetId)
        : [...prev, widgetId]
    );
  }, []);

  const handleNotificationToggle = useCallback(() => {
    setIsNotificationSidebarOpen(true);
  }, []);

  const handleNotificationClose = useCallback(() => {
    setIsNotificationSidebarOpen(false);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  // Memoized notification count
  const notificationCount = useMemo(() => 
    inventory.filter(item => 
      item.status === 'Low Stock' || item.status === 'Out of Stock'
    ).length,
    [inventory]
  );

  // Memoized user badges
  const userBadges = useMemo(() => (
    <div className="flex items-center space-x-2 mt-2">
      <Badge variant="secondary" className="animate-slide-right" style={{ animationDelay: '0.1s' }}>
        {user?.role?.toUpperCase() || 'USER'}
      </Badge>
      <Badge variant="outline" className="animate-slide-right" style={{ animationDelay: '0.2s' }}>
        {user?.department || 'General'}
      </Badge>
      {isStaff() && (
        <Badge variant="destructive" className="animate-slide-right" style={{ animationDelay: '0.3s' }}>
          LIMITED ACCESS
        </Badge>
      )}
    </div>
  ), [user, isStaff]);

  // Memoized category buttons
  const categoryButtons = useMemo(() => 
    !isStaff() && (
      <div className="flex space-x-1">
        {['all', 'analytics', 'operations', 'management', 'security'].map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleCategoryChange(category)}
            className="animate-bounce-in"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>
    ),
    [isStaff, selectedCategory, handleCategoryChange]
  );

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white animate-slide-right">
            Welcome back, {user?.name || 'User'}
          </h1>
          {userBadges}
        </div>

        <div className="flex items-center space-x-4">
          <NotificationToggle 
            onClick={handleNotificationToggle}
            notificationCount={notificationCount}
          />
          {categoryButtons}
        </div>
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
        Last updated: {lastRefresh.toLocaleTimeString()}
      </div>

      <MemoizedDashboardStats 
        inventory={inventory}
        suppliers={suppliers}
        hasPermission={hasPermission}
        isAdmin={isAdmin}
      />

      {!isStaff() && (
        <MemoizedDashboardWidgets
          visibleWidgets={visibleWidgets}
          selectedCategory={selectedCategory}
          userRole={user?.role || ''}
          onToggleWidget={toggleWidget}
        />
      )}

      {!isStaff() && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MemoizedInventoryFlowChart />
            <MemoizedStockDistributionChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MemoizedCategoryPerformanceChart />
            <MemoizedSupplierPerformanceChart />
          </div>
        </>
      )}

      {isStaff() && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Limited Access Account</h3>
          <p className="text-yellow-700">
            As a staff member, you have read-only access to inventory and can create transactions. 
            Contact your administrator for additional permissions.
          </p>
        </div>
      )}

      <SystemStatusFooter />

      <NotificationSidebar 
        isOpen={isNotificationSidebarOpen}
        onClose={handleNotificationClose}
      />
    </div>
  );
});

ModularDashboard.displayName = 'ModularDashboard';
