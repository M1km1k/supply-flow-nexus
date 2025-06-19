
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSupply } from '@/contexts/SupplyContext';
import { InventoryDecisionTree } from '@/utils/decisionTree';
import { Brain, TreePine, RefreshCw } from 'lucide-react';
import { MetricsDashboard } from './MetricsDashboard';
import { AnalyticsCharts } from './AnalyticsCharts';
import { PredictionsTable } from './PredictionsTable';
import { AnalyticsHeader } from './AnalyticsHeader';

export const PredictiveAnalyticsEnhanced: React.FC = () => {
  const { inventory, getInventoryTrends } = useSupply();
  const [report, setReport] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [decisionTree] = useState(() => new InventoryDecisionTree());

  useEffect(() => {
    generateReport();
  }, []);

  const generateReport = async () => {
    setIsGenerating(true);
    try {
      console.log('Generating predictive report with decision tree algorithm...');
      
      // Generate predictions using decision tree
      const predictions = decisionTree.generatePredictions(inventory);
      
      const newReport = {
        generatedAt: new Date().toISOString(),
        algorithm: 'Decision-Making Tree',
        predictions,
        accuracy: 85 + Math.random() * 10, // Simulated accuracy
        modelMetrics: {
          precision: 0.82 + Math.random() * 0.15,
          recall: 0.78 + Math.random() * 0.15,
          f1Score: 0.80 + Math.random() * 0.12
        }
      };
      
      setReport(newReport);
      console.log('Decision tree analysis complete:', newReport);
    } catch (error) {
      console.error('Error generating predictive report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const trends = getInventoryTrends();

  if (!report) {
    return (
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <span>Decision-Making Tree Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Button onClick={generateReport} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Training Decision Tree...
              </>
            ) : (
              <>
                <TreePine className="w-4 h-4 mr-2" />
                Generate Tree Analysis
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <AnalyticsHeader 
        accuracy={report.accuracy}
        isGenerating={isGenerating}
        onRegenerate={generateReport}
      />

      <MetricsDashboard report={report} />

      <AnalyticsCharts trends={trends} report={report} />

      <PredictionsTable predictions={report.predictions} />
    </div>
  );
};
