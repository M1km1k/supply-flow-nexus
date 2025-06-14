
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

export const ModularDashboard: React.FC = () => {
  const { inventory, suppliers, transactions } = useSupply();
  const { user, hasPermission, isAdmin } = useAuth();
  const [visibleWidgets, setVisibleWidgets] = useState<string[]>(['predictive-analytics']);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleWidget = (widgetId: string) => {
    setVisibleWidgets(prev => 
      prev.includes(widgetId) 
        ? prev.filter(id => id !== widgetId)
        : [...prev, widgetId]
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with User Info */}
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
          </div>
        </div>

        {/* Widget Controls */}
        <div className="flex space-x-2">
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
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <DashboardStats 
        inventory={inventory}
        suppliers={suppliers}
        hasPermission={hasPermission}
        isAdmin={isAdmin}
      />

      {/* Dashboard Widgets */}
      <DashboardWidgets
        visibleWidgets={visibleWidgets}
        selectedCategory={selectedCategory}
        userRole={user?.role || ''}
        onToggleWidget={toggleWidget}
      />

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

      {/* System Status Footer */}
      <SystemStatusFooter />
    </div>
  );
};
