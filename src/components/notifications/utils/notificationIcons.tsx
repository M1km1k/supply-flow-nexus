
import { AlertTriangle, CheckCircle, Bell, Package, Users, ArrowUpDown, FileText } from 'lucide-react';

export const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
    case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
    default: return <Bell className="w-4 h-4 text-blue-500" />;
  }
};

export const getPageIcon = (page: string) => {
  switch (page) {
    case 'inventory': return <Package className="w-3 h-3" />;
    case 'suppliers': return <Users className="w-3 h-3" />;
    case 'transactions': return <ArrowUpDown className="w-3 h-3" />;
    case 'audit': return <FileText className="w-3 h-3" />;
    default: return <Bell className="w-3 h-3" />;
  }
};
