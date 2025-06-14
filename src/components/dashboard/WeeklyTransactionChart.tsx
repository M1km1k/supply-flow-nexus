
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { weeklyTransactionData } from './data/dashboardData';
import { CustomTooltip } from './utils/chartUtils';

export const WeeklyTransactionChart: React.FC = () => {
  return (
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
  );
};
