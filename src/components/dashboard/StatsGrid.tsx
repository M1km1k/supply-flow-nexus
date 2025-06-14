
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Package, ShoppingCart, AlertTriangle } from 'lucide-react';
import { inventoryFlowData, supplierPerformanceData } from './data/dashboardData';

interface StatsGridProps {
  inventory: any[];
  suppliers: any[];
}

export const StatsGrid: React.FC<StatsGridProps> = ({ inventory, suppliers }) => {
  const totalValue = inventoryFlowData[inventoryFlowData.length - 1]?.value || 0;
  const inStockItems = inventory.filter(item => item.status === 'In Stock').length;
  const lowStockItems = inventory.filter(item => item.status === 'Low Stock').length;
  const activeOrders = supplierPerformanceData.reduce((sum, supplier) => sum + supplier.totalOrders, 0);

  // Convert USD to PHP (approximate conversion rate: 1 USD = 56 PHP)
  const convertToPHP = (usdValue: number) => Math.round(usdValue * 56);

  const stats = [
    {
      title: 'Total Inventory Value',
      value: `₱${convertToPHP(totalValue).toLocaleString()}`,
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      change: '+8.4%',
      description: 'Total asset value'
    },
    {
      title: 'Active Items',
      value: inStockItems.toString(),
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      change: '+12.3%',
      description: 'Items in stock'
    },
    {
      title: 'Active Orders',
      value: activeOrders.toString(),
      icon: ShoppingCart,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      change: '+15.7%',
      description: 'Pending orders'
    },
    {
      title: 'Low Stock Alerts',
      value: lowStockItems.toString(),
      icon: AlertTriangle,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100',
      change: '-18.2%',
      description: 'Items need reorder'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={stat.title} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white animate-number-roll mb-1">{stat.value}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">{stat.change}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{stat.description}</span>
                </div>
              </div>
              <div className={`p-4 rounded-xl bg-gradient-to-br ${stat.bgColor} dark:from-gray-700 dark:to-gray-600`}>
                <stat.icon className={`w-8 h-8 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
