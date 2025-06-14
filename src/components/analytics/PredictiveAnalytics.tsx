
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, BarChart, Bar } from 'recharts';
import { TrendingUp, AlertTriangle, Package, Calendar } from 'lucide-react';
import { useSupply } from '@/contexts/SupplyContext';

// Mock predictive data - in real implementation, this would come from ML models
const generatePredictiveData = (inventory: any[]) => {
  const currentMonth = new Date().getMonth();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return Array.from({ length: 6 }, (_, i) => {
    const monthIndex = (currentMonth + i + 1) % 12;
    const baseConsumption = Math.floor(Math.random() * 100) + 50;
    const seasonalFactor = Math.sin((monthIndex / 12) * 2 * Math.PI) * 20 + 100;
    
    return {
      month: months[monthIndex],
      predicted: Math.floor(baseConsumption * (seasonalFactor / 100)),
      confidence: Math.floor(Math.random() * 20) + 80,
      reorderPoint: Math.floor(baseConsumption * 0.3),
    };
  });
};

const generateStockoutRisk = (inventory: any[]) => {
  return inventory
    .filter(item => item.status === 'Low Stock' || item.quantity <= (item.minThreshold || 10))
    .map(item => ({
      name: item.name,
      currentStock: item.quantity,
      predicted7Days: Math.max(0, item.quantity - Math.floor(Math.random() * 15) - 5),
      predicted30Days: Math.max(0, item.quantity - Math.floor(Math.random() * 40) - 10),
      riskLevel: item.quantity <= 5 ? 'High' : item.quantity <= 15 ? 'Medium' : 'Low'
    }))
    .slice(0, 5);
};

export const PredictiveAnalytics: React.FC = () => {
  const { inventory } = useSupply();
  const predictiveData = generatePredictiveData(inventory);
  const stockoutRisks = generateStockoutRisk(inventory);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center space-x-2">
        <TrendingUp className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Predictive Analytics</h2>
      </div>

      {/* Demand Forecasting */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>6-Month Demand Forecast</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={predictiveData}>
              <defs>
                <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                formatter={(value: any, name: any) => [
                  `${value}${name === 'confidence' ? '%' : ' units'}`, 
                  name === 'predicted' ? 'Predicted Demand' : 'Confidence Level'
                ]}
              />
              <Area 
                type="monotone" 
                dataKey="predicted" 
                stroke="#3B82F6" 
                fill="url(#demandGradient)"
                strokeWidth={3}
              />
              <Line 
                type="monotone" 
                dataKey="confidence" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Stockout Risk Analysis */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <span>Stockout Risk Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stockoutRisks.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg animate-slide-right" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{item.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Current: {item.currentStock} units</p>
                </div>
                <div className="text-center px-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">7 Days</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{item.predicted7Days}</p>
                </div>
                <div className="text-center px-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">30 Days</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{item.predicted30Days}</p>
                </div>
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(item.riskLevel)}`}>
                    {item.riskLevel} Risk
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reorder Recommendations */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-green-600" />
            <span>Smart Reorder Points</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={predictiveData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Bar dataKey="predicted" fill="#3B82F6" name="Predicted Demand" />
              <Bar dataKey="reorderPoint" fill="#EF4444" name="Reorder Point" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
