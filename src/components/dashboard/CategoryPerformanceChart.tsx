
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { categoryPerformanceData } from './data/dashboardData';
import { CustomTooltip } from './utils/chartUtils';

export const CategoryPerformanceChart: React.FC = () => {
  return (
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
  );
};
