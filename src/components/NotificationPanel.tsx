
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSupply } from '@/contexts/SupplyContext';

export const NotificationPanel: React.FC = () => {
  const { inventory, auditLogs } = useSupply();
  
  const lowStockItems = inventory.filter(item => item.status === 'Low Stock' || item.status === 'Out of Stock');
  const recentActivities = auditLogs.slice(0, 3);

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stock Alerts */}
        {lowStockItems.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">Stock Alerts</h4>
            <div className="space-y-2">
              {lowStockItems.slice(0, 2).map(item => (
                <div key={item.id} className="text-xs p-2 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
                  <p className="font-medium text-red-800 dark:text-red-300">{item.name}</p>
                  <p className="text-red-600 dark:text-red-400">{item.quantity} {item.unit} remaining</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activities */}
        <div>
          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Recent Activities</h4>
          <div className="space-y-2">
            {recentActivities.map(log => (
              <div key={log.id} className="text-xs p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <p className="font-medium text-gray-800 dark:text-white">{log.action}</p>
                <p className="text-gray-600 dark:text-gray-300">{log.details}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
