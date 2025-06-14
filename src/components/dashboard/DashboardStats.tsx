
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Package, Users, TrendingUp, AlertTriangle, Zap } from 'lucide-react';
import { convertUSDtoPHP, formatPHP } from '@/lib/utils';

interface DashboardStatsProps {
  inventory: any[];
  suppliers: any[];
  hasPermission: (resource: string, action: string) => boolean;
  isAdmin: () => boolean;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  inventory,
  suppliers,
  hasPermission,
  isAdmin
}) => {
  const stats = [
    {
      title: 'Total Inventory Value',
      value: formatPHP(convertUSDtoPHP(125430)),
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      change: '+15.2%',
      visible: hasPermission('inventory', 'read')
    },
    {
      title: 'Active Suppliers',
      value: suppliers.length.toString(),
      icon: Users,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      change: '+3',
      visible: hasPermission('suppliers', 'read')
    },
    {
      title: 'Automation Rules',
      value: '8 Active',
      icon: Zap,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      change: '+2',
      visible: isAdmin()
    },
    {
      title: 'System Alerts',
      value: '3 Critical',
      icon: AlertTriangle,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100',
      change: '-1',
      visible: true
    }
  ].filter(stat => stat.visible);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card 
          key={stat.title} 
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up" 
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white animate-number-roll">{stat.value}</p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">{stat.change} from last month</p>
              </div>
              <div className={`p-3 rounded-full bg-gradient-to-br ${stat.bgColor} dark:from-gray-700 dark:to-gray-600`}>
                <stat.icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent animate-pulse`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
