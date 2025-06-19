
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TreePine } from 'lucide-react';

interface PredictionsTableProps {
  predictions: any[];
}

export const PredictionsTable: React.FC<PredictionsTableProps> = ({ predictions }) => {
  const riskLevelColors = {
    'High': '#ef4444',
    'Medium': '#f59e0b', 
    'Low': '#10b981'
  };

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TreePine className="w-5 h-5 text-green-600" />
          <span>Decision Tree Predictions</span>
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          AI predictions based on decision-making tree algorithm analysis
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {predictions?.slice(0, 10).map((prediction: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border-l-4" 
                 style={{ borderLeftColor: riskLevelColors[prediction.riskLevel as keyof typeof riskLevelColors] }}>
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">{prediction.itemName}</h4>
                  <Badge 
                    variant={prediction.riskLevel === 'High' ? 'destructive' : 
                            prediction.riskLevel === 'Medium' ? 'secondary' : 'default'}
                  >
                    {prediction.riskLevel} Risk
                  </Badge>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {prediction.confidence}% confidence
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Stock: {prediction.currentStock} | Stockout: {prediction.predictedStockout}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  {prediction.recommendation}
                </p>
                {prediction.factors && prediction.factors.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Decision Path:</p>
                    <div className="flex flex-wrap gap-1">
                      {prediction.factors.slice(0, 2).map((factor: string, idx: number) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {factor}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
