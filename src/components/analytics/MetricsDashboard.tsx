
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Target, Zap, Calendar } from 'lucide-react';

interface MetricsDashboardProps {
  report: {
    predictions: any[];
    accuracy: number;
    modelMetrics: {
      precision: number;
      recall: number;
      f1Score: number;
    };
    generatedAt: string;
  };
}

export const MetricsDashboard: React.FC<MetricsDashboardProps> = ({ report }) => {
  const highRiskCount = report.predictions?.filter((p: any) => p.riskLevel === 'High').length || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">High Risk Items</p>
              <p className="text-2xl font-bold text-red-600">{highRiskCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Precision Score</p>
              <p className="text-2xl font-bold text-orange-600">
                {Math.round(report.modelMetrics.precision * 100)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">F1-Score</p>
              <p className="text-2xl font-bold text-green-600">
                {Math.round(report.modelMetrics.f1Score * 100)}%
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
              <p className="text-sm text-gray-600 dark:text-gray-400">Last Training</p>
              <p className="text-sm font-semibold text-blue-600">
                {new Date(report.generatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
