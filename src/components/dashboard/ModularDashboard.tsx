
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSupply } from '@/contexts/SupplyContext';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardWidgets } from './DashboardWidgets';
import { DashboardStats } from './DashboardStats';
import { SystemStatusFooter } from './SystemStatusFooter';
import { InventoryFlowChart } from './InventoryFlowChart';
import { StockDistributionChart } from './StockDistributionChart';
import { CategoryPerformanceChart } from './CategoryPerformanceChart';
import { SupplierPerformanceChart } from './SupplierPerformanceChart';
import { NotificationSidebar } from './NotificationSidebar';
import { NotificationToggle } from './NotificationToggle';

export const ModularDashboard: React.FC = () => {
  const { inventory, suppliers, transactions } = useSupply();
  const { user, hasPermission, isAdmin, isStaff } = useAuth();
  const [visibleWidgets, setVisibleWidgets] = useState<string[]>(
    isStaff() ? [] : ['predictive-analytics']
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isNotificationSidebarOpen, setIsNotificationSidebarOpen] = useState(false);

  const toggleWidget = (widgetId: string) => {
    setVisibleWidgets(prev => 
      prev.includes(widgetId) 
        ? prev.filter(id => id !== widgetId)
        : [...prev, widgetId]
    );
  };

  // Calculate notification count (low stock items)
  const notificationCount = inventory.filter(item => 
    item.status === 'Low Stock' || item.status === 'Out of Stock'
  ).length;

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Header with User Info and Notification Toggle */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white animate-slide-right">
            Welcome back, {user?.name}
          </h1>
          <div className="flex items-center space-x-2 mt-2">
            <Badge variant="secondary" className="animate-slide-right" style={{ animationDelay: '0.1s' }}>
              {user?.role?.toUpperCase()}
            </Badge>
            <Badge variant="outline" className="animate-slide-right" style={{ animationDelay: '0.2s' }}>
              {user?.department}
            </Badge>
            {isStaff() && (
              <Badge variant="destructive" className="animate-slide-right" style={{ animationDelay: '0.3s' }}>
                LIMITED ACCESS
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <NotificationToggle 
            onClick={() => setIsNotificationSidebarOpen(true)}
            notificationCount={notificationCount}
          />
          
          {/* Widget Controls - Hidden for staff */}
          {!isStaff() && (
            <div className="flex space-x-1">
              {['all', 'analytics', 'operations', 'management', 'security'].map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="animate-bounce-in"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <DashboardStats 
        inventory={inventory}
        suppliers={suppliers}
        hasPermission={hasPermission}
        isAdmin={isAdmin}
      />

      {/* Dashboard Widgets - Hidden for staff */}
      {!isStaff() && (
        <DashboardWidgets
          visibleWidgets={visibleWidgets}
          selectedCategory={selectedCategory}
          userRole={user?.role || ''}
          onToggleWidget={toggleWidget}
        />
      )}

      {/* Charts Section - Limited for staff */}
      {!isStaff() && (
        <>
          {/* Charts Section - Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InventoryFlowChart />
            <StockDistributionChart />
          </div>

          {/* Charts Section - Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CategoryPerformanceChart />
            <SupplierPerformanceChart />
          </div>
        </>
      )}

      {/* Staff get a simple message instead of charts */}
      {isStaff() && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Limited Access Account</h3>
          <p className="text-yellow-700">
            As a staff member, you have read-only access to inventory and can create transactions. 
            Contact your administrator for additional permissions.
          </p>
        </div>
      )}

      {/* System Status Footer */}
      <SystemStatusFooter />

      {/* Notification Sidebar */}
      <NotificationSidebar 
        isOpen={isNotificationSidebarOpen}
        onClose={() => setIsNotificationSidebarOpen(false)}
      />
    </div>
  );
};
