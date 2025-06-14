
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSupply } from '@/contexts/SupplyContext';
import { Package, Users, TrendingUp, AlertTriangle, Eye, EyeOff, Calendar, BarChart3 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { CalendarWidget } from '@/components/CalendarWidget';
import { NotificationPanel } from '@/components/NotificationPanel';
import { MiniChatbot } from '@/components/MiniChatbot';

// Enhanced inventory data with more detail
const inventoryData = [
  { name: 'Jan', inbound: 120, outbound: 80, net: 40, total: 1200 },
  { name: 'Feb', inbound: 150, outbound: 90, net: 60, total: 1260 },
  { name: 'Mar', inbound: 180, outbound: 120, net: 60, total: 1320 },
  { name: 'Apr', inbound: 140, outbound: 110, net: 30, total: 1350 },
  { name: 'May', inbound: 200, outbound: 95, net: 105, total: 1455 },
  { name: 'Jun', inbound: 250, outbound: 130, net: 120, total: 1575 },
  { name: 'Jul', inbound: 220, outbound: 140, net: 80, total: 1655 },
  { name: 'Aug', inbound: 280, outbound: 160, net: 120, total: 1775 },
];

// Enhanced status data with more categories
const statusData = [
  { name: 'In Stock', value: 65, color: '#10B981', count: 156 },
  { name: 'Low Stock', value: 25, color: '#F59E0B', count: 60 },
  { name: 'Out of Stock', value: 6, color: '#EF4444', count: 14 },
  { name: 'Overstocked', value: 4, color: '#8B5CF6', count: 10 },
];

// Category-wise inventory distribution
const categoryData = [
  { category: 'Electronics', inStock: 45, lowStock: 8, outOfStock: 2, total: 55 },
  { category: 'Clothing', inStock: 38, lowStock: 12, outOfStock: 3, total: 53 },
  { category: 'Home & Garden', inStock: 42, lowStock: 15, outOfStock: 5, total: 62 },
  { category: 'Sports', inStock: 31, lowStock: 10, outOfStock: 4, total: 45 },
];

// Supplier performance data
const supplierPerformanceData = [
  { name: 'TechCorp Ltd', onTime: 95, quality: 92, cost: 88, overall: 92 },
  { name: 'Global Supplies', onTime: 88, quality: 95, cost: 90, overall: 91 },
  { name: 'QuickDelivery Co', onTime: 92, quality: 85, cost: 95, overall: 91 },
  { name: 'Premium Parts', onTime: 85, quality: 98, cost: 82, overall: 88 },
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

  // Custom tooltip for enhanced charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
          <p className="font-semibold text-gray-900 dark:text-white mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

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

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Flow Chart */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg animate-slide-left">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Inventory Flow Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={inventoryData}>
                <defs>
                  <linearGradient id="inboundGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="outboundGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="inbound" 
                  stackId="1"
                  stroke="#10B981" 
                  fill="url(#inboundGradient)" 
                  name="Inbound"
                />
                <Area 
                  type="monotone" 
                  dataKey="outbound" 
                  stackId="2"
                  stroke="#EF4444" 
                  fill="url(#outboundGradient)" 
                  name="Outbound"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Enhanced Stock Status Distribution */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg animate-slide-right">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Stock Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any, name: any, props: any) => [
                    `${value}% (${props.payload.count} items)`, 
                    name
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* New Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Performance */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg animate-slide-up">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Category Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="category" stroke="#6B7280" fontSize={11} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="inStock" stackId="a" fill="#10B981" name="In Stock" />
                <Bar dataKey="lowStock" stackId="a" fill="#F59E0B" name="Low Stock" />
                <Bar dataKey="outOfStock" stackId="a" fill="#EF4444" name="Out of Stock" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Supplier Performance */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Supplier Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={supplierPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="name" stroke="#6B7280" fontSize={10} />
                <YAxis stroke="#6B7280" fontSize={12} domain={[75, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="onTime" stroke="#10B981" strokeWidth={3} dot={{ r: 5 }} name="On-Time %" />
                <Line type="monotone" dataKey="quality" stroke="#3B82F6" strokeWidth={3} dot={{ r: 5 }} name="Quality %" />
                <Line type="monotone" dataKey="cost" stroke="#F59E0B" strokeWidth={3} dot={{ r: 5 }} name="Cost Efficiency %" />
                <Line type="monotone" dataKey="overall" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 5 }} name="Overall Score %" />
              </LineChart>
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
