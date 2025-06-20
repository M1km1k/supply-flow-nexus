import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSupply } from '@/contexts/SupplyContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, Legend } from 'recharts';
import { Activity, TrendingUp, Users, FileText, Clock, AlertCircle } from 'lucide-react';

export const AuditTrailPage: React.FC = () => {
  const { auditLogs, inventory } = useSupply();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [animationKey, setAnimationKey] = useState(0);

  // Trigger re-animation when data changes
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [auditLogs.length]);

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (log.itemAffected && log.itemAffected.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || log.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Enhanced Analytics Data
  const actionTypeData = auditLogs.reduce((acc, log) => {
    acc[log.action] = (acc[log.action] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const actionChartData = Object.entries(actionTypeData).map(([action, count]) => ({
    action,
    count,
    percentage: ((count / auditLogs.length) * 100).toFixed(1)
  }));

  const categoryData = auditLogs.reduce((acc, log) => {
    acc[log.category] = (acc[log.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryChartData = Object.entries(categoryData).map(([category, count]) => ({
    category,
    count,
    percentage: ((count / auditLogs.length) * 100).toFixed(1)
  }));

  // Enhanced timeline data with more granular time periods
  const timelineData = auditLogs
    .reduce((acc, log) => {
      const date = new Date(log.timestamp).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const timelineChartData = Object.entries(timelineData)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .slice(-7) // Last 7 days
    .map(([date, count]) => ({
      date,
      actions: count,
      cumulative: Object.entries(timelineData)
        .filter(([d]) => new Date(d).getTime() <= new Date(date).getTime())
        .reduce((sum, [, c]) => sum + c, 0)
    }));

  const topModifiedItems = auditLogs
    .filter(log => log.itemAffected)
    .reduce((acc, log) => {
      if (log.itemAffected) {
        acc[log.itemAffected] = (acc[log.itemAffected] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

  const topItemsData = Object.entries(topModifiedItems)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 8)
    .map(([item, count]) => ({ 
      item: item.length > 20 ? item.substring(0, 20) + '...' : item, 
      count,
      fullName: item
    }));

  // User activity data
  const userActivityData = auditLogs.reduce((acc, log) => {
    acc[log.user] = (acc[log.user] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const userChartData = Object.entries(userActivityData)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([user, count]) => ({ user, count }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'];
  
  // Enhanced custom tooltip with animations
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 animate-fade-in transform transition-all duration-200 hover:scale-105">
          <p className="font-semibold text-gray-900 dark:text-white mb-2 animate-slide-down">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm animate-slide-up transition-colors hover:text-blue-600" style={{ color: entry.color, animationDelay: `${index * 0.1}s` }}>
              {`${entry.name}: ${entry.value}${entry.payload.percentage ? ` (${entry.payload.percentage}%)` : ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom wave-animated bar component
  const WaveAnimatedBar = (props: any) => {
    return (
      <Bar 
        {...props}
        className="animate-wave-rise hover:opacity-80 transition-opacity duration-300"
        style={{
          animation: `wave-rise 2s ease-out ${props.animationDelay || 0}s both, wave-pulse 3s ease-in-out infinite ${props.animationDelay || 0}s`
        }}
      />
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white animate-slide-right">
          Audit Trail & Analytics
        </h1>
        <Button onClick={() => window.print()} variant="outline" className="animate-bounce-in hover:animate-wiggle">
          <FileText className="w-4 h-4 mr-2 animate-float" />
          Print Report
        </Button>
      </div>

      {/* Enhanced Stats Cards with staggered animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Actions', value: auditLogs.length, icon: Activity, color: 'from-blue-500 to-blue-600', bgColor: 'from-blue-50 to-blue-100' },
          { title: 'Categories', value: Object.keys(categoryData).length, icon: TrendingUp, color: 'from-green-500 to-green-600', bgColor: 'from-green-50 to-green-100' },
          { title: 'Active Users', value: Object.keys(userActivityData).length, icon: Users, color: 'from-purple-500 to-purple-600', bgColor: 'from-purple-50 to-purple-100' },
          { title: 'Items Modified', value: Object.keys(topModifiedItems).length, icon: AlertCircle, color: 'from-orange-500 to-orange-600', bgColor: 'from-orange-50 to-orange-100' },
        ].map((stat, index) => (
          <Card key={stat.title} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:rotate-1 animate-slide-up cursor-pointer group" style={{ animationDelay: `${index * 0.15}s` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-blue-600 transition-colors duration-300">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white animate-bounce-in group-hover:animate-pulse" style={{ animationDelay: `${index * 0.1}s` }}>{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-gradient-to-br ${stat.bgColor} dark:from-gray-700 dark:to-gray-600 group-hover:animate-spin-slow transition-all duration-500`}>
                  <stat.icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent animate-pulse group-hover:animate-bounce`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Analytics Dashboard with wave animations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Action Type Distribution with Wave Animation */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg animate-slide-left hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center group-hover:text-blue-600 transition-colors duration-300">
              <Activity className="w-5 h-5 mr-2 animate-pulse group-hover:animate-spin" />
              Action Type Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={actionChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="actionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.4}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} className="animate-fade-in" />
                <XAxis dataKey="action" tick={{ fontSize: 11 }} stroke="#6B7280" className="animate-slide-up" />
                <YAxis stroke="#6B7280" fontSize={12} className="animate-slide-right" />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="count" 
                  fill="url(#actionGradient)" 
                  radius={[4, 4, 0, 0]}
                  className="wave-bar"
                  animationBegin={0}
                  animationDuration={2000}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Enhanced Category Distribution with pie animation */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg animate-slide-right hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center group-hover:text-green-600 transition-colors duration-300">
              <TrendingUp className="w-5 h-5 mr-2 animate-pulse group-hover:animate-bounce" />
              Activity by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={categoryChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percentage }) => `${category} ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  animationBegin={200}
                  animationDuration={2000}
                  className="hover:drop-shadow-lg transition-all duration-300"
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      className="hover:opacity-80 cursor-pointer transition-opacity duration-300"
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any, name: any, props: any) => [
                    `${value} actions (${props.payload.percentage}%)`, 
                    name
                  ]}
                  content={<CustomTooltip />}
                />
                <Legend className="animate-fade-in" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Enhanced User Activity with Wave Animations */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg animate-slide-up hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center group-hover:text-purple-600 transition-colors duration-300">
              <Users className="w-5 h-5 mr-2 animate-pulse group-hover:animate-wiggle" />
              User Activity Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userChartData} layout="horizontal" margin={{ top: 20, right: 30, left: 50, bottom: 5 }}>
                <defs>
                  <linearGradient id="userGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.4}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} className="animate-fade-in" />
                <XAxis type="number" stroke="#6B7280" fontSize={12} className="animate-slide-up" />
                <YAxis dataKey="user" type="category" stroke="#6B7280" fontSize={11} className="animate-slide-right" />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="count" 
                  fill="url(#userGradient)" 
                  radius={[0, 4, 4, 0]}
                  className="wave-bar-horizontal"
                  animationBegin={300}
                  animationDuration={2500}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Enhanced Activity Timeline with flowing animations */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg animate-slide-up hover:shadow-2xl transition-all duration-500 hover:scale-105 group" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center group-hover:text-purple-600 transition-colors duration-300">
              <Clock className="w-5 h-5 mr-2 animate-spin-slow group-hover:animate-pulse" />
              Activity Timeline (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={timelineChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="timelineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} className="animate-fade-in" />
                <XAxis dataKey="date" stroke="#6B7280" fontSize={10} className="animate-slide-up" />
                <YAxis stroke="#6B7280" fontSize={12} className="animate-slide-right" />
                <Tooltip content={<CustomTooltip />} />
                <Legend className="animate-fade-in" />
                <Area 
                  type="monotone" 
                  dataKey="actions" 
                  stroke="#8B5CF6" 
                  fill="url(#timelineGradient)" 
                  name="Daily Actions"
                  animationBegin={400}
                  animationDuration={2200}
                  className="hover:drop-shadow-lg transition-all duration-300"
                />
                <Line 
                  type="monotone" 
                  dataKey="cumulative" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  dot={{ r: 5, className: "animate-pulse hover:animate-bounce" }}
                  name="Cumulative"
                  animationBegin={600}
                  animationDuration={2000}
                  className="hover:drop-shadow-lg transition-all duration-300"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Top Modified Items with Wave Animations */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg animate-fade-in hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center group-hover:text-orange-600 transition-colors duration-300">
            <AlertCircle className="w-5 h-5 mr-2 animate-pulse group-hover:animate-bounce" />
            Most Modified Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={topItemsData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <defs>
                <linearGradient id="itemGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.4}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} className="animate-fade-in" />
              <XAxis 
                dataKey="item" 
                angle={-45} 
                textAnchor="end" 
                height={80}
                stroke="#6B7280" 
                fontSize={10}
                className="animate-slide-up"
              />
              <YAxis stroke="#6B7280" fontSize={12} className="animate-slide-right" />
              <Tooltip 
                formatter={(value: any, name: any, props: any) => [
                  `${value} modifications`, 
                  props.payload.fullName
                ]}
                content={<CustomTooltip />}
              />
              <Bar 
                dataKey="count" 
                fill="url(#itemGradient)" 
                radius={[4, 4, 0, 0]}
                className="wave-bar-staggered"
                animationBegin={500}
                animationDuration={3000}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Audit Log Table - keeping existing implementation with subtle animations */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg animate-fade-in hover:shadow-xl transition-all duration-300 group">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors duration-300">
              Audit Log ({filteredLogs.length} entries)
            </CardTitle>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-60 transition-all duration-300 focus:scale-105"
              />
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full sm:w-40 transition-all duration-300 hover:scale-105">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="inventory">Inventory</SelectItem>
                  <SelectItem value="supplier">Supplier</SelectItem>
                  <SelectItem value="transaction">Transaction</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 animate-slide-right">Timestamp</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 animate-slide-right" style={{ animationDelay: '0.1s' }}>User</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 animate-slide-right" style={{ animationDelay: '0.2s' }}>Action</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 animate-slide-right" style={{ animationDelay: '0.3s' }}>Details</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 animate-slide-right" style={{ animationDelay: '0.4s' }}>Category</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log, index) => (
                  <tr key={log.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 hover:scale-[1.01] hover:shadow-md animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                    <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors duration-300">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors duration-300">{log.user}</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 hover:scale-110 transition-transform duration-300 cursor-pointer">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors duration-300">{log.details}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium hover:scale-110 transition-transform duration-300 cursor-pointer ${
                        log.category === 'inventory' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                        log.category === 'supplier' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300' :
                        log.category === 'transaction' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                        'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                      }`}>
                        {log.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 animate-pulse">No audit logs found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
