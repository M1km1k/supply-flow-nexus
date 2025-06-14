
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { supplierPerformanceData } from './data/dashboardData';
import { CustomTooltip } from './utils/chartUtils';

export const SupplierPerformanceChart: React.FC = () => {
  return (
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
  );
};
