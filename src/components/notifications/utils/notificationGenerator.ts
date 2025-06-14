
import { Notification } from '../types';

export const generateNotifications = (inventory: any[], suppliers: any[], auditLogs: any[]): Notification[] => {
  const newNotifications: Notification[] = [];

  // Inventory notifications
  const lowStockItems = inventory.filter(item => item.quantity < 50);
  const outOfStockItems = inventory.filter(item => item.quantity === 0);

  if (lowStockItems.length > 0) {
    newNotifications.push({
      id: 'low-stock',
      type: 'warning',
      title: 'Low Stock Alert',
      message: `${lowStockItems.length} items are running low`,
      timestamp: new Date(),
      page: 'inventory',
      read: false,
      dismissible: true
    });
  }

  if (outOfStockItems.length > 0) {
    newNotifications.push({
      id: 'out-of-stock',
      type: 'error',
      title: 'Out of Stock',
      message: `${outOfStockItems.length} items are out of stock`,
      timestamp: new Date(),
      page: 'inventory',
      read: false,
      dismissible: true
    });
  }

  // Supplier notifications
  if (suppliers.length > 0) {
    newNotifications.push({
      id: 'suppliers-info',
      type: 'info',
      title: 'Supplier Status',
      message: `${suppliers.length} suppliers in system`,
      timestamp: new Date(),
      page: 'suppliers',
      read: false,
      dismissible: true
    });
  }

  // Recent audit activity
  const recentAudits = auditLogs.slice(0, 3);
  if (recentAudits.length > 0) {
    newNotifications.push({
      id: 'recent-activity',
      type: 'info',
      title: 'Recent Activity',
      message: `${recentAudits.length} recent transactions recorded`,
      timestamp: new Date(),
      page: 'audit',
      read: false,
      dismissible: true
    });
  }

  // System status
  newNotifications.push({
    id: 'system-status',
    type: 'success',
    title: 'System Status',
    message: 'All systems operational',
    timestamp: new Date(),
    page: 'dashboard',
    read: false,
    dismissible: false
  });

  return newNotifications;
};
