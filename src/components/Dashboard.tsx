
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSupply } from '@/contexts/SupplyContext';
import { Calendar, Check, Users, ArrowUp, ArrowDown, TrendingUp, Package, AlertTriangle } from 'lucide-react';
import { CalendarWidget } from '@/components/CalendarWidget';
import { NotificationPanel } from '@/components/NotificationPanel';
import { MiniChatbot } from '@/components/MiniChatbot';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export const Dashboard = () => {
  const { inventory, suppliers, transactions, auditLogs } = useSupply();
  const [animatedCounts, setAnimatedCounts] = useState({
    totalItems: 0,
    inStock: 0,
    lowStock: 0,
    totalSuppliers: 0
  });

  const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const inStockItems = inventory.filter(item => item.status === 'In Stock').length;
  const lowStockItems = inventory.filter(item => item.status === 'Low Stock').length;
  const totalSuppliers = suppliers.length;

  const recentTransactions = transactions.slice(0, 5);
  const upcomingDeliveries = inventory.filter(item => item.status === 'Low Stock');

  // Chart data
  const inventoryByCategory = inventory.reduce((acc, item) => {
    const category = item.category || 'Other';
    acc[category] = (acc[category] || 0) + item.quantity;
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.entries(inventoryByCategory).map(([name, value]) => ({
    name,
    value
  }));

  const transactionData = transactions.slice(0, 7).map((transaction, index) => ({
    day: `Day ${7 - index}`,
    inbound: transaction.type === 'inbound' ? transaction.quantity : 0,
    outbound: transaction.type === 'outbound' ? transaction.quantity : 0,
  }));

  const statusData = [
    { name: 'In Stock', value: inStockItems, color: '#10B981' },
    { name: 'Low Stock', value: lowStockItems, color: '#F59E0B' },
    { name: 'Out of Stock', value: inventory.filter(item => item.status === 'Out of Stock').length, color: '#EF4444' },
  ];

  // Animate counters
  useEffect(() => {
    const animateCounter = (target: number, key: keyof typeof animatedCounts) => {
      let start = 0;
      const increment = target / 50;
      
      const animate = () => {
        start += increment;
        if (start < target) {
          setAnimatedCounts(prev => ({ ...prev, [key]: Math.floor(start) }));
          requestAnimationFrame(animate);
        } else {
          setAnimatedCounts(prev => ({ ...prev, [key]: target }));
        }
      };
      animate();
    };

    animateCounter(totalItems, 'totalItems');
    animateCounter(inStockItems, 'inStock');
    animateCounter(lowStockItems, 'lowStock');
    animateCounter(totalSuppliers, 'totalSuppliers');
  }, [totalItems, inStockItems, lowStockItems, totalSuppliers]);

  return (
    <div className="relative min-h-full animate-fade-in">
      <div className="relative z-10 space-y-8">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Dashboard Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-300">Monitor your supply chain performance</p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-bounce-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Items</CardTitle>
              <Package className="h-6 w-6 text-blue-600 animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 animate-number-roll">{animatedCounts.totalItems}</div>
              <p className="text-xs text-gray-500 mt-1 animate-slide-up">Across all categories</p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-bounce-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">In Stock Items</CardTitle>
              <Check className="h-6 w-6 text-green-600 animate-bounce" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 animate-number-roll">{animatedCounts.inStock}</div>
              <p className="text-xs text-gray-500 mt-1 animate-slide-up">Ready for use</p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-bounce-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Low Stock Alerts</CardTitle>
              <AlertTriangle className="h-6 w-6 text-red-600 animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600 animate-number-roll">{animatedCounts.lowStock}</div>
              <p className="text-xs text-gray-500 mt-1 animate-slide-up">Need attention</p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-bounce-in" style={{ animationDelay: '0.4s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Active Suppliers</CardTitle>
              <Users className="h-6 w-6 text-purple-600 animate-spin-slow" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600 animate-number-roll">{animatedCounts.totalSuppliers}</div>
              <p className="text-xs text-gray-500 mt-1 animate-slide-up">Trusted partners</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inventory by Category Bar Chart */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 animate-slide-right">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Inventory by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Stock Status Pie Chart */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 animate-slide-left">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <Package className="h-5 w-5 text-green-600" />
                Stock Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1000}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                {statusData.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{entry.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction Trends */}
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 animate-slide-up">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <ArrowUp className="h-5 w-5 text-purple-600" />
              Transaction Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={transactionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="inbound" stroke="#10B981" strokeWidth={3} dot={{ r: 6 }} />
                <Line type="monotone" dataKey="outbound" stroke="#EF4444" strokeWidth={3} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 animate-slide-right">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.length > 0 ? recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full animate-pulse ${transaction.type === 'inbound' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">{transaction.itemName}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{transaction.type === 'inbound' ? 'Received' : 'Dispatched'} {transaction.quantity} units</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 font-medium">{new Date(transaction.date).toLocaleDateString()}</span>
                    </div>
                  )) : (
                    <p className="text-gray-500 text-center py-12 animate-pulse">No recent transactions</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 animate-slide-right" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">Items Requiring Attention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingDeliveries.length > 0 ? upcomingDeliveries.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl border-l-4 border-red-500 hover:scale-105 transition-transform duration-300">
                      <div>
                        <p className="font-semibold text-red-800 dark:text-red-300">{item.name}</p>
                        <p className="text-sm text-red-600 dark:text-red-400">Only {item.quantity} {item.unit} remaining</p>
                      </div>
                      <span className="text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 px-3 py-1 rounded-full font-medium animate-pulse">
                        Low Stock
                      </span>
                    </div>
                  )) : (
                    <p className="text-gray-500 text-center py-12 animate-pulse">All items are well stocked</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Widgets */}
          <div className="space-y-6 animate-slide-left">
            <div className="animate-bounce-in" style={{ animationDelay: '0.1s' }}>
              <CalendarWidget />
            </div>
            <div className="animate-bounce-in" style={{ animationDelay: '0.2s' }}>
              <NotificationPanel />
            </div>
            <div className="animate-bounce-in" style={{ animationDelay: '0.3s' }}>
              <MiniChatbot />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
