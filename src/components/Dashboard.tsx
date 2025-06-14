import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSupply } from '@/contexts/SupplyContext';
import { Package, Users, TrendingUp, AlertTriangle, Eye, EyeOff, Calendar, BarChart3, DollarSign, ShoppingCart, Clock, CheckCircle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Legend, ComposedChart } from 'recharts';
import { CalendarWidget } from '@/components/CalendarWidget';
import { NotificationPanel } from '@/components/NotificationPanel';
import { MiniChatbot } from '@/components/MiniChatbot';

// Enhanced inventory flow data with more realistic patterns
const inventoryFlowData = [
  { 
    month: 'Jan', 
    inbound: 120, 
    outbound: 80, 
    stockLevel: 1200, 
    value: 48000,
    reorderTriggers: 5,
    supplier1: 45, 
    supplier2: 35, 
    supplier3: 40 
  },
  { 
    month: 'Feb', 
    inbound: 150, 
    outbound: 90, 
    stockLevel: 1260, 
    value: 52000,
    reorderTriggers: 3,
    supplier1: 60, 
    supplier2: 45, 
    supplier3: 45 
  },
  { 
    month: 'Mar', 
    inbound: 180, 
    outbound: 120, 
    stockLevel: 1320, 
    value: 55000,
    reorderTriggers: 7,
    supplier1: 70, 
    supplier2: 55, 
    supplier3: 55 
  },
  { 
    month: 'Apr', 
    inbound: 140, 
    outbound: 110, 
    stockLevel: 1350, 
    value: 51000,
    reorderTriggers: 4,
    supplier1: 50, 
    supplier2: 45, 
    supplier3: 45 
  },
  { 
    month: 'May', 
    inbound: 200, 
    outbound: 95, 
    stockLevel: 1455, 
    value: 62000,
    reorderTriggers: 2,
    supplier1: 80, 
    supplier2: 60, 
    supplier3: 60 
  },
  { 
    month: 'Jun', 
    inbound: 250, 
    outbound: 130, 
    stockLevel: 1575, 
    value: 68000,
    reorderTriggers: 6,
    supplier1: 95, 
    supplier2: 75, 
    supplier3: 80 
  },
  { 
    month: 'Jul', 
    inbound: 220, 
    outbound: 140, 
    stockLevel: 1655, 
    value: 65000,
    reorderTriggers: 8,
    supplier1: 85, 
    supplier2: 70, 
    supplier3: 65 
  },
  { 
    month: 'Aug', 
    inbound: 280, 
    outbound: 160, 
    stockLevel: 1775, 
    value: 72000,
    reorderTriggers: 3,
    supplier1: 105, 
    supplier2: 85, 
    supplier3: 90 
  },
];

// Enhanced category performance data
const categoryPerformanceData = [
  { 
    category: 'Electronics', 
    inStock: 156, 
    lowStock: 23, 
    outOfStock: 8, 
    total: 187,
    value: 125000,
    turnoverRate: 2.4,
    avgDaysToRestock: 5.2
  },
  { 
    category: 'Office Supplies', 
    inStock: 234, 
    lowStock: 45, 
    outOfStock: 12, 
    total: 291,
    value: 45000,
    turnoverRate: 4.1,
    avgDaysToRestock: 3.1
  },
  { 
    category: 'Laboratory Equipment', 
    inStock: 89, 
    lowStock: 15, 
    outOfStock: 6, 
    total: 110,
    value: 280000,
    turnoverRate: 1.2,
    avgDaysToRestock: 12.5
  },
  { 
    category: 'Maintenance', 
    inStock: 145, 
    lowStock: 28, 
    outOfStock: 9, 
    total: 182,
    value: 32000,
    turnoverRate: 3.7,
    avgDaysToRestock: 4.8
  },
  { 
    category: 'Food & Beverage', 
    inStock: 67, 
    lowStock: 18, 
    outOfStock: 5, 
    total: 90,
    value: 18000,
    turnoverRate: 8.2,
    avgDaysToRestock: 2.1
  }
];

// Enhanced supplier performance with more metrics
const supplierPerformanceData = [
  { 
    name: 'TechCorp Solutions', 
    onTimeDelivery: 94, 
    qualityScore: 96, 
    costEfficiency: 88, 
    responseTime: 1.2,
    totalOrders: 45,
    completedOrders: 43,
    avgDeliveryDays: 3.2
  },
  { 
    name: 'Global Supplies Inc', 
    onTimeDelivery: 89, 
    qualityScore: 92, 
    costEfficiency: 95, 
    responseTime: 2.1,
    totalOrders: 38,
    completedOrders: 36,
    avgDeliveryDays: 4.1
  },
  { 
    name: 'QuickDelivery Co', 
    onTimeDelivery: 97, 
    qualityScore: 85, 
    costEfficiency: 92, 
    responseTime: 0.8,
    totalOrders: 52,
    completedOrders: 51,
    avgDeliveryDays: 2.1
  },
  { 
    name: 'Premium Equipment Ltd', 
    onTimeDelivery: 91, 
    qualityScore: 98, 
    costEfficiency: 82, 
    responseTime: 3.5,
    totalOrders: 28,
    completedOrders: 27,
    avgDeliveryDays: 7.2
  }
];

// Enhanced stock status data
const stockStatusData = [
  { name: 'In Stock', value: 65, color: '#10B981', count: 691, trend: '+5.2%' },
  { name: 'Low Stock', value: 25, color: '#F59E0B', count: 129, trend: '-2.1%' },
  { name: 'Out of Stock', value: 6, color: '#EF4444', count: 40, trend: '-8.3%' },
  { name: 'Overstocked', value: 4, color: '#8B5CF6', count: 25, trend: '+1.1%' },
];

// Weekly transaction patterns
const weeklyTransactionData = [
  { day: 'Mon', inbound: 25, outbound: 18, netChange: 7 },
  { day: 'Tue', inbound: 32, outbound: 24, netChange: 8 },
  { day: 'Wed', inbound: 28, outbound: 31, netChange: -3 },
  { day: 'Thu', inbound: 35, outbound: 22, netChange: 13 },
  { day: 'Fri', inbound: 41, outbound: 28, netChange: 13 },
  { day: 'Sat', inbound: 15, outbound: 12, netChange: 3 },
  { day: 'Sun', inbound: 8, outbound: 6, netChange: 2 },
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

  // Calculate enhanced statistics
  const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = inventoryFlowData[inventoryFlowData.length - 1]?.value || 0;
  const inStockItems = inventory.filter(item => item.status === 'In Stock').length;
  const lowStockItems = inventory.filter(item => item.status === 'Low Stock').length;
  const totalSuppliers = suppliers.length;
  const activeOrders = supplierPerformanceData.reduce((sum, supplier) => sum + supplier.totalOrders, 0);
  const recentTransactions = transactions.slice(0, 5);

  const stats = [
    {
      title: 'Total Inventory Value',
      value: `$${totalValue.toLocaleString()}`,
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

  // Enhanced tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600">
          <p className="font-semibold text-gray-900 dark:text-white mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between min-w-32">
              <span className="text-sm mr-4" style={{ color: entry.color }}>
                {entry.name}:
              </span>
              <span className="font-semibold" style={{ color: entry.color }}>
                {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white animate-slide-right">
            Supply Management Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Real-time insights and analytics for institutional inventory management
          </p>
        </div>
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

      {/* Enhanced Stats Grid */}
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

      {/* Enhanced Charts Section - Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Comprehensive Inventory Flow */}
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg animate-slide-left">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Inventory Flow & Value Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={inventoryFlowData}>
                <defs>
                  <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                <YAxis yAxisId="left" stroke="#6B7280" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="#6B7280" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="value" 
                  fill="url(#valueGradient)" 
                  stroke="#3B82F6"
                  name="Total Value ($)"
                />
                <Bar yAxisId="left" dataKey="inbound" fill="#10B981" name="Inbound" />
                <Bar yAxisId="left" dataKey="outbound" fill="#EF4444" name="Outbound" />
                <Line yAxisId="left" type="monotone" dataKey="stockLevel" stroke="#8B5CF6" strokeWidth={3} name="Stock Level" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Enhanced Stock Distribution */}
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg animate-slide-right">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Stock Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stockStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}\n${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stockStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any, name: any, props: any) => [
                    `${value}% (${props.payload.count} items)`, 
                    name
                  ]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {stockStatusData.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.count} items</p>
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${item.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {item.trend}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Charts Section - Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Performance Analysis */}
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg animate-slide-up">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Category Performance Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={categoryPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="category" stroke="#6B7280" fontSize={11} angle={-45} textAnchor="end" height={80} />
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

        {/* Weekly Transaction Patterns */}
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Weekly Transaction Patterns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={weeklyTransactionData}>
                <defs>
                  <linearGradient id="inboundGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="outboundGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="day" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="inbound" 
                  stackId="1"
                  stroke="#10B981" 
                  fill="url(#inboundGradient)" 
                  name="Inbound Transactions"
                />
                <Area 
                  type="monotone" 
                  dataKey="outbound" 
                  stackId="2"
                  stroke="#EF4444" 
                  fill="url(#outboundGradient)" 
                  name="Outbound Transactions"
                />
                <Line 
                  type="monotone" 
                  dataKey="netChange" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  name="Net Change"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Supplier Performance Dashboard */}
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Supplier Performance Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={supplierPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="name" stroke="#6B7280" fontSize={10} angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#6B7280" fontSize={12} domain={[70, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="onTimeDelivery" stroke="#10B981" strokeWidth={3} dot={{ r: 6 }} name="On-Time Delivery %" />
              <Line type="monotone" dataKey="qualityScore" stroke="#3B82F6" strokeWidth={3} dot={{ r: 6 }} name="Quality Score %" />
              <Line type="monotone" dataKey="costEfficiency" stroke="#F59E0B" strokeWidth={3} dot={{ r: 6 }} name="Cost Efficiency %" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

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

      {/* Recent Transactions with Enhanced Details */}
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg animate-fade-in">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Recent Transaction Activity
            </div>
            <Button variant="outline" size="sm">View All</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => {
              const inventoryItem = inventory.find(item => item.id === transaction.itemId);
              const unit = inventoryItem?.unit || 'units';
              
              return (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 animate-slide-right" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${transaction.type === "inbound" ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                      {transaction.type === "inbound" ? 
                        <Package className="w-5 h-5 text-green-600 dark:text-green-400" /> : 
                        <ShoppingCart className="w-5 h-5 text-red-600 dark:text-red-400" />
                      }
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{transaction.itemName}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {transaction.type === "inbound" ? 'Received' : 'Dispatched'} • {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white text-lg">{transaction.quantity} {unit}</p>
                    <p className={`text-sm font-medium ${transaction.type === "inbound" ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {transaction.type === "inbound" ? '+' : '-'}{transaction.quantity} {unit}
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
