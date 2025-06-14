
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { ResponsiveContainer, ComposedChart, Area, Bar, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { inventoryFlowData } from './data/dashboardData';
import { CustomTooltip } from './utils/chartUtils';

export const InventoryFlowChart: React.FC = () => {
  return (
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
  );
};
