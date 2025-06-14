
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSupply } from '@/contexts/SupplyContext';
import { Calendar, Check, Users, ArrowUp, ArrowDown } from 'lucide-react';
import { ParticleBackground } from '@/components/ParticleBackground';
import { MiniChatbot } from '@/components/MiniChatbot';
import { CalendarWidget } from '@/components/CalendarWidget';
import { NotificationPanel } from '@/components/NotificationPanel';

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
    <div className="relative min-h-full">
      <ParticleBackground />
      
      <div className="relative z-10 space-y-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Items</CardTitle>
              <Check className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{animatedCounts.totalItems}</div>
              <p className="text-xs text-gray-500 mt-1">Across all categories</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">In Stock Items</CardTitle>
              <ArrowUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{animatedCounts.inStock}</div>
              <p className="text-xs text-gray-500 mt-1">Ready for use</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Low Stock Alerts</CardTitle>
              <ArrowDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{animatedCounts.lowStock}</div>
              <p className="text-xs text-gray-500 mt-1">Need attention</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Active Suppliers</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{animatedCounts.totalSuppliers}</div>
              <p className="text-xs text-gray-500 mt-1">Trusted partners</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.length > 0 ? recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${transaction.type === 'inbound' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">{transaction.itemName}</p>
                          <p className="text-sm text-gray-500">{transaction.type === 'inbound' ? 'Received' : 'Dispatched'} {transaction.quantity} units</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</span>
                    </div>
                  )) : (
                    <p className="text-gray-500 text-center py-8">No recent transactions</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">Items Requiring Attention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingDeliveries.length > 0 ? upcomingDeliveries.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                      <div>
                        <p className="font-medium text-red-800 dark:text-red-300">{item.name}</p>
                        <p className="text-sm text-red-600 dark:text-red-400">Only {item.quantity} {item.unit} remaining</p>
                      </div>
                      <span className="text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 px-2 py-1 rounded-full">
                        Low Stock
                      </span>
                    </div>
                  )) : (
                    <p className="text-gray-500 text-center py-8">All items are well stocked</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Widgets */}
          <div className="space-y-6">
            <CalendarWidget />
            <NotificationPanel />
            <MiniChatbot />
          </div>
        </div>
      </div>
    </div>
  );
};
