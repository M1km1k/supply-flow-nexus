
import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TreePine, RefreshCw } from 'lucide-react';

interface AnalyticsHeaderProps {
  accuracy: number;
  isGenerating: boolean;
  onRegenerate: () => void;
}

export const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({ 
  accuracy, 
  isGenerating, 
  onRegenerate 
}) => {
  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TreePine className="w-6 h-6 text-purple-600" />
            <div>
              <CardTitle>Decision-Making Tree Analytics</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AI-powered inventory forecasting with decision tree algorithm
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">Model Accuracy</p>
              <p className="text-lg font-bold text-purple-600">
                {Math.round(accuracy)}%
              </p>
            </div>
            <Button onClick={onRegenerate} variant="outline" size="sm" disabled={isGenerating}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
              Retrain
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
