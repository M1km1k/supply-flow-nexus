import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSupply } from '@/contexts/SupplyContext';
import { Trash2, Bell, Clock, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const NotificationPanel: React.FC = () => {
  const { inventory, auditLogs } = useSupply();
  const [showHistory, setShowHistory] = useState(false);
  const [notifications, setNotifications] = useState<{recent: any[], history: any[]}>({
    recent: [],
    history: []
  });
  
  useEffect(() => {
    // Get notifications from localStorage
    const storedNotifications = localStorage.getItem('inventomatic-notifications');
    if (storedNotifications) {
      try {
        const parsedNotifications = JSON.parse(storedNotifications);
        setNotifications(parsedNotifications);
      } catch (e) {
        console.error('Error parsing notifications:', e);
      }
    } else {
      // Initialize with current data
      const lowStockItems = inventory.filter(item => item.status === 'Low Stock' || item.status === 'Out of Stock');
      const recentActivities = auditLogs.slice(0, 3);
      
      // Create default notifications
      const newNotifications = {
        recent: [
          ...lowStockItems.slice(0, 2).map(item => ({
            id: `stock-${item.id}`,
            type: 'alert',
            title: `Low Stock: ${item.name}`,
            content: `${item.quantity} ${item.unit} remaining`,
            timestamp: new Date().toISOString()
          })),
          ...recentActivities.map(log => ({
            id: `activity-${log.id}`,
            type: 'activity',
            title: log.action,
            content: log.details,
            timestamp: log.timestamp
          }))
        ],
        history: []
      };
      
      setNotifications(newNotifications);
      localStorage.setItem('inventomatic-notifications', JSON.stringify(newNotifications));
    }
  }, [inventory, auditLogs]);
  
  const clearNotifications = () => {
    // Keep just one notification in recent
    const clearedNotifications = {
      recent: [{
        id: 'system-cleared',
        type: 'system',
        title: 'Notifications Cleared',
        content: 'All notifications have been cleared',
        timestamp: new Date().toISOString()
      }],
      history: []
    };
    
    setNotifications(clearedNotifications);
    localStorage.setItem('inventomatic-notifications', JSON.stringify(clearedNotifications));
  };

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notifications
          </CardTitle>
          {notifications.recent.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearNotifications}
              className="text-red-600 hover:text-red-800 hover:bg-red-100 dark:hover:bg-red-900/30"
            >
              <Trash2 className="w-4 h-4" />
              <span className="sr-only">Clear Notifications</span>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Notification Count */}
        {notifications.recent.length > 0 && (
          <div className="flex justify-between items-center mb-2 text-xs text-gray-600 dark:text-gray-400">
            <span>{notifications.recent.length} new notifications</span>
            {notifications.history.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-1 h-6"
                onClick={() => setShowHistory(!showHistory)}
              >
                <Clock className="w-3 h-3 mr-1" />
                {showHistory ? "Hide History" : "Show History"}
                <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${showHistory ? 'rotate-180' : ''}`} />
              </Button>
            )}
          </div>
        )}

        {/* Stock Alerts */}
        {notifications.recent.filter(n => n.type === 'alert').length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">Stock Alerts</h4>
            <div className="space-y-2">
              {notifications.recent
                .filter(n => n.type === 'alert')
                .map(notification => (
                  <div key={notification.id} className="text-xs p-2 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
                    <p className="font-medium text-red-800 dark:text-red-300">{notification.title}</p>
                    <p className="text-red-600 dark:text-red-400">{notification.content}</p>
                    <div className="text-right mt-1 text-xs text-red-500 dark:text-red-400">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {/* System Notifications */}
        {notifications.recent.filter(n => n.type === 'system').length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">System</h4>
            <div className="space-y-2">
              {notifications.recent
                .filter(n => n.type === 'system')
                .map(notification => (
                  <div key={notification.id} className="text-xs p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                    <p className="font-medium text-blue-800 dark:text-blue-300">{notification.title}</p>
                    <p className="text-blue-600 dark:text-blue-400">{notification.content}</p>
                    <div className="text-right mt-1 text-xs text-blue-500 dark:text-blue-400">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {/* Recent Activities */}
        {notifications.recent.filter(n => n.type === 'activity').length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Recent Activities</h4>
            <div className="space-y-2">
              {notifications.recent
                .filter(n => n.type === 'activity')
                .map(notification => (
                  <div key={notification.id} className="text-xs p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <p className="font-medium text-gray-800 dark:text-white">{notification.title}</p>
                    <p className="text-gray-600 dark:text-gray-300">{notification.content}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                ))
              }
            </div>
          </div>
        )}
        
        {/* History Section */}
        {showHistory && notifications.history.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 flex items-center">
              <Clock className="w-3 h-3 mr-1" /> Notification History
            </h4>
            <div className="space-y-2 opacity-70">
              {notifications.history.slice(0, 5).map(notification => (
                <div 
                  key={notification.id} 
                  className={`text-xs p-2 rounded ${
                    notification.type === 'alert' 
                      ? 'bg-red-50/70 dark:bg-red-900/10'
                      : notification.type === 'system'
                        ? 'bg-blue-50/70 dark:bg-blue-900/10'
                        : 'bg-gray-50/70 dark:bg-gray-800/50'
                  }`}
                >
                  <p className={`font-medium ${
                    notification.type === 'alert' 
                      ? 'text-red-800/90 dark:text-red-300/90'
                      : notification.type === 'system'
                        ? 'text-blue-800/90 dark:text-blue-300/90'
                        : 'text-gray-800 dark:text-white/90'
                  }`}>{notification.title}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                    {new Date(notification.timestamp).toLocaleDateString()}, 
                    {new Date(notification.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {notifications.recent.length === 0 && (
          <div className="text-center py-6">
            <Bell className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">No new notifications</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
