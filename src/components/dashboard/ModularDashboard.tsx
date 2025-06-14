
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSupply } from '@/contexts/SupplyContext';
import { useAuth } from '@/contexts/AuthContext';
import { PredictiveAnalytics } from '@/components/analytics/PredictiveAnalytics';
import { AutomationRules } from '@/components/automation/AutomationRules';
import { CalendarWidget } from '@/components/CalendarWidget';
import { MiniChatbot } from '@/components/MiniChatbot';
import { 
  Package, Users, TrendingUp, AlertTriangle, Settings, 
  Eye, EyeOff, Grid, BarChart3, Zap, Shield, Calendar,
  FileText, Bell, Activity, MessageSquare
} from 'lucide-react';

interface DashboardWidget {
  id: string;
  title: string;
  component: React.ComponentType;
  icon: React.ComponentType<any>;
  size: 'small' | 'medium' | 'large';
  category: 'analytics' | 'operations' | 'management' | 'security';
  requiredRole?: string[];
}

const availableWidgets: DashboardWidget[] = [
  {
    id: 'predictive-analytics',
    title: 'Predictive Analytics',
    component: PredictiveAnalytics,
    icon: TrendingUp,
    size: 'large',
    category: 'analytics',
    requiredRole: ['admin', 'manager']
  },
  {
    id: 'automation-rules',
    title: 'Automation Rules',
    component: AutomationRules,
    icon: Zap,
    size: 'large',
    category: 'operations',
    requiredRole: ['admin', 'manager']
  },
  {
    id: 'delivery-calendar',
    title: 'Delivery Calendar',
    component: CalendarWidget,
    icon: Calendar,
    size: 'medium',
    category: 'operations'
  },
  {
    id: 'system-chatbot',
    title: 'System Assistant',
    component: MiniChatbot,
    icon: MessageSquare,
    size: 'medium',
    category: 'management'
  }
];

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

  const filteredWidgets = availableWidgets.filter(widget => {
    const hasRole = !widget.requiredRole || widget.requiredRole.includes(user?.role || '');
    const matchesCategory = selectedCategory === 'all' || widget.category === selectedCategory;
    return hasRole && matchesCategory;
  });

  // Enhanced stats with role-based visibility
  const stats = [
    {
      title: 'Total Inventory Value',
      value: '$125,430',
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

      {/* Widget Toggle Controls */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Grid className="w-5 h-5" />
            <span>Dashboard Widgets</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {filteredWidgets.map((widget) => (
              <Button
                key={widget.id}
                variant={visibleWidgets.includes(widget.id) ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleWidget(widget.id)}
                className="animate-bounce-in"
              >
                {visibleWidgets.includes(widget.id) ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                <widget.icon className="w-4 h-4 mr-2" />
                {widget.title}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dynamic Widget Rendering */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredWidgets
          .filter(widget => visibleWidgets.includes(widget.id))
          .map((widget) => {
            const WidgetComponent = widget.component;
            return (
              <div 
                key={widget.id} 
                className={`animate-slide-up ${
                  widget.size === 'large' ? 'lg:col-span-2 xl:col-span-3' : 
                  widget.size === 'medium' ? 'lg:col-span-1' : 
                  'lg:col-span-1'
                }`}
              >
                <WidgetComponent />
              </div>
            );
          })}
      </div>

      {/* System Status Footer */}
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-0 shadow-lg animate-fade-in">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">System Status: Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Secure Connection</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
