
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSupply } from '@/contexts/SupplyContext';
import { 
  TrendingUp, 
  AlertTriangle, 
  BarChart3, 
  Brain,
  Target,
  Calendar,
  Package,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const PredictiveAnalyticsEnhanced: React.FC = () => {
  const { inventory, generatePredictiveReport, getInventoryTrends } = useSupply();
  const [report, setReport] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    generateReport();
  }, []);

  const generateReport = async () => {
    setIsGenerating(true);
    try {
      const newReport = generatePredictiveReport();
      setReport(newReport);
    } catch (error) {
      console.error('Error generating predictive report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const trends = getInventoryTrends();
  
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

  if (!report) {
    return (
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <span>Predictive Analytics Module</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Button onClick={generateReport} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating Analysis...
              </>
            ) : (
              <>
                <TrendingUp className="w-4 h-4 mr-2" />
                Generate Predictive Report
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-purple-600" />
              <div>
                <CardTitle>Predictive Analytics Module</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Decision-making tree algorithm for inventory forecasting
                </p>
              </div>
            </div>
            <Button onClick={generateReport} variant="outline" size="sm" disabled={isGenerating}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">High Risk Items</p>
                <p className="text-2xl font-bold text-red-600">
                  {report.predictions?.filter((p: any) => p.riskLevel === 'High').length || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Medium Risk</p>
                <p className="text-2xl font-bold text-orange-600">
                  {report.predictions?.filter((p: any) => p.riskLevel === 'Medium').length || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Low Risk</p>
                <p className="text-2xl font-bold text-green-600">
                  {report.predictions?.filter((p: any) => p.riskLevel === 'Low').length || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Analysis Date</p>
                <p className="text-sm font-semibold text-blue-600">
                  {new Date(report.generatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Trends */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span>Inventory Trends (6 Months)</span>
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

      {/* Predictions Table */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Stock-out Predictions</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Based on historical data analysis and decision-making tree algorithm
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {report.predictions?.slice(0, 10).map((prediction: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{prediction.itemName}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Current Stock: {prediction.currentStock} | Predicted Stockout: {prediction.predictedStockout}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={prediction.riskLevel === 'High' ? 'destructive' : 
                            prediction.riskLevel === 'Medium' ? 'secondary' : 'default'}
                  >
                    {prediction.riskLevel} Risk
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
