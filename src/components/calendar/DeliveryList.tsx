
import React from 'react';
import { Package, Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DeliveryEvent } from './types';

interface DeliveryListProps {
  deliveries: DeliveryEvent[];
  onDeliveryClick: (delivery: DeliveryEvent) => void;
}

export const DeliveryList: React.FC<DeliveryListProps> = ({
  deliveries,
  onDeliveryClick
}) => {
  // Get upcoming deliveries (next 7 days)
  const upcomingDeliveries = deliveries.filter(delivery => {
    const today = new Date();
    const weekFromNow = new Date();
    weekFromNow.setDate(today.getDate() + 7);
    return delivery.date >= today && delivery.date <= weekFromNow;
  });

  return (
    <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
      <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300 flex items-center">
        <Package className="w-4 h-4 mr-1" /> 
        Upcoming Deliveries ({upcomingDeliveries.length})
      </h4>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {upcomingDeliveries.map((delivery, idx) => (
          <div 
            key={delivery.id} 
            className={`p-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
              delivery.status === 'in-progress' 
                ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500' 
                : delivery.status === 'completed'
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500'
                  : 'bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500'
            }`}
            onClick={() => onDeliveryClick(delivery)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-medium text-gray-800 dark:text-white text-sm">
                  {delivery.itemName} ({delivery.quantity} {delivery.unit})
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center mt-1">
                  <User className="w-3 h-3 mr-1" />
                  {delivery.supplierName}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {delivery.date.toLocaleDateString()}
                </div>
              </div>
              <Badge 
                variant={delivery.status === 'in-progress' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {delivery.status === 'in-progress' 
                  ? 'In Progress' 
                  : delivery.status === 'completed' 
                    ? 'Completed'
                    : 'Pending'}
              </Badge>
            </div>
          </div>
        ))}
        {upcomingDeliveries.length === 0 && (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
            No upcoming deliveries in the next 7 days
          </div>
        )}
      </div>
    </div>
  );
};
