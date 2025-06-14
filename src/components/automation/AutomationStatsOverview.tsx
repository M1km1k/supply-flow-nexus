
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Settings, Bell } from 'lucide-react';
import { AutomationRule } from './AutomationRuleDialog';

interface AutomationStatsOverviewProps {
  rules: AutomationRule[];
}

export const AutomationStatsOverview: React.FC<AutomationStatsOverviewProps> = ({ rules }) => {
  const activeRulesCount = rules.filter(r => r.isActive).length;
  const totalRulesCount = rules.length;
  const triggeredTodayCount = 3; // Mock data for now

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700 dark:text-green-300">Active Rules</p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                {activeRulesCount}
              </p>
            </div>
            <Zap className="w-8 h-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Rules</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{totalRulesCount}</p>
            </div>
            <Settings className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Triggered Today</p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{triggeredTodayCount}</p>
            </div>
            <Bell className="w-8 h-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
