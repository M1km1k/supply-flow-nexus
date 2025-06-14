
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Package, ShoppingCart, AlertTriangle } from 'lucide-react';

interface StatsGridProps {
  inventory: any[];
  suppliers: any[];
}

export const StatsGrid: React.FC<StatsGridProps> = ({ inventory, suppliers }) => {
  const totalValue = inventory.reduce((sum, item) => sum + (item.quantity * (item.unitPrice || 0)), 0);
  const inStockItems = inventory.filter(item => item.status === 'In Stock').length;
  const lowStockItems = inventory.filter(item => item.status === 'Low Stock').length;
  const outOfStockItems = inventory.filter(item => item.status === 'Out of Stock').length;

  const stats = [
    {
      title: 'Total Inventory Value',
      value: `₱${totalValue.toLocaleString()}`,
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      change: '+0%',
      description: 'Total asset value'
    },
    {
      title: 'Active Items',
      value: inStockItems.toString(),
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      change: '+0%',
      description: 'Items in stock'
    },
    {
      title: 'Total Items',
      value: inventory.length.toString(),
      icon: ShoppingCart,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      change: '+0%',
      description: 'All inventory items'
    },
    {
      title: 'Low Stock Alerts',
      value: lowStockItems.toString(),
      icon: AlertTriangle,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100',
      change: '+0%',
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
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.change}</span>
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
