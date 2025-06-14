import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSupply } from '@/contexts/SupplyContext';
import { Package, Users, TrendingUp, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { CalendarWidget } from '@/components/CalendarWidget';
import { NotificationPanel } from '@/components/NotificationPanel';
import { MiniChatbot } from '@/components/MiniChatbot';

const inventoryData = [
  { name: 'Jan', value: 120 },
  { name: 'Feb', value: 150 },
  { name: 'Mar', value: 180 },
  { name: 'Apr', value: 140 },
  { name: 'May', value: 200 },
  { name: 'Jun', value: 250 },
];

const statusData = [
  { name: 'In Stock', value: 65, color: '#10B981' },
  { name: 'Low Stock', value: 25, color: '#F59E0B' },
  { name: 'Out of Stock', value: 10, color: '#EF4444' },
];

export const Dashboard: React.FC = () => {
  const { inventory, suppliers, transactions } = useSupply();
  const [widgetVisibility, setWidgetVisibility] = useState({
    notifications: true,
    chatbot: true,
    calendar: true
  });

  const toggleWidget = (widget: keyof typeof widgetVisibility) => {
    setWidgetVisibility(prev => ({
      ...prev,
      [widget]: !prev[widget]
    }));
  };

  const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const inStockItems = inventory.filter(item => item.status === 'In Stock').length;
  const lowStockItems = inventory.filter(item => item.status === 'Low Stock').length;
  const totalSuppliers = suppliers.length;
  const recentTransactions = transactions.slice(0, 5);

  const stats = [
    {
      title: 'Total Items',
      value: totalItems.toLocaleString(),
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      change: '+12%'
    },
    {
      title: 'In Stock',
      value: inStockItems.toString(),
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      change: '+8%'
    },
    {
      title: 'Low Stock Alerts',
      value: lowStockItems.toString(),
      icon: AlertTriangle,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100',
      change: '-3%'
    },
    {
      title: 'Active Suppliers',
      value: totalSuppliers.toString(),
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      change: '+5%'
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white animate-slide-right">
          Dashboard Overview
        </h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleWidget('notifications')}
            className="animate-bounce-in"
          >
            {widgetVisibility.notifications ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            Notifications
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleWidget('chatbot')}
            className="animate-bounce-in"
          >
            {widgetVisibility.chatbot ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            Assistant
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleWidget('calendar')}
            className="animate-bounce-in"
          >
            {widgetVisibility.calendar ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            Calendar
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg animate-slide-left">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">Inventory Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#8884d8" fill="url(#colorGradient)" />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg animate-slide-right">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">Stock Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {widgetVisibility.notifications && (
          <div className="animate-slide-up">
            <NotificationPanel />
          </div>
        )}
        {widgetVisibility.chatbot && (
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <MiniChatbot />
          </div>
        )}
        {widgetVisibility.calendar && (
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CalendarWidget />
          </div>
        )}
      </div>

      {/* Recent Transactions */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg animate-fade-in">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => {
              // Get unit from inventory item or use default
              const inventoryItem = inventory.find(item => item.id === transaction.itemId);
              const unit = inventoryItem?.unit || 'units';
              
              return (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors animate-slide-right" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{transaction.itemName}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{transaction.type} • {new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">{transaction.quantity} {unit}</p>
                    <p className={`text-sm ${transaction.type === "inbound" ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {transaction.type === "inbound" ? '+' : '-'}{transaction.quantity}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
