
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface AnalyticsChartsProps {
  trends: any[];
  report: {
    predictions: any[];
  };
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ trends, report }) => {
  const riskLevelColors = {
    'High': '#ef4444',
    'Medium': '#f59e0b', 
    'Low': '#10b981'
  };

  const riskDistribution = report?.predictions?.reduce((acc: any, pred: any) => {
    acc[pred.riskLevel] = (acc[pred.riskLevel] || 0) + 1;
    return acc;
  }, {}) || {};

  const riskChartData = Object.entries(riskDistribution).map(([level, count]) => ({
    name: level,
    value: count,
    color: riskLevelColors[level as keyof typeof riskLevelColors]
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Inventory Trends */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span>Inventory Flow Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="inbound" stroke="#10b981" strokeWidth={2} name="Inbound" />
              <Line type="monotone" dataKey="outbound" stroke="#ef4444" strokeWidth={2} name="Outbound" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Risk Distribution */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <span>Risk Level Distribution</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {riskChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
