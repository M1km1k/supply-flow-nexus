
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Package } from 'lucide-react';
import { useSupply } from '@/contexts/SupplyContext';
import { Button } from '@/components/ui/button';

type DeliveryEvent = {
  date: Date;
  details: string;
  status: 'pending' | 'in-progress' | 'completed';
};

export const CalendarWidget: React.FC = () => {
  const [currentDate] = useState(new Date());
  const { transactions, suppliers } = useSupply();
  const [deliveries, setDeliveries] = useState<DeliveryEvent[]>([]);
  
  useEffect(() => {
    // Simulate upcoming deliveries based on transactions
    // In a real app, this would come from an API or database
    const inboundTransactions = transactions
      .filter(t => t.type === "inbound")
      .slice(0, 3);
    
    const upcomingDeliveries = inboundTransactions.map((t, index) => {
      // Create delivery dates (some in the past, some in the future)
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + (index - 1)); // -1, 0, +1 days
      
      return {
        date: deliveryDate,
        details: `${t.itemName} (${t.quantity} ${t.unitOfMeasure})`,
        status: index === 1 ? 'in-progress' : index === 0 ? 'completed' : 'pending'
      } as DeliveryEvent;
    });
    
    setDeliveries(upcomingDeliveries);
  }, [transactions]);
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const today = new Date().getDate();

  const days = [];
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="p-2"></div>);
  }

  // Find deliveries for the current month
  const currentMonthDeliveries = deliveries.filter(delivery => 
    delivery.date.getMonth() === currentDate.getMonth() && 
    delivery.date.getFullYear() === currentDate.getFullYear()
  );
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = day === today && 
      currentDate.getMonth() === new Date().getMonth() && 
      currentDate.getFullYear() === new Date().getFullYear();
    
    // Check if there's a delivery on this day
    const dayDelivery = currentMonthDeliveries.find(d => d.date.getDate() === day);
    
    let bgColorClass = '';
    if (isToday) {
      bgColorClass = 'bg-blue-500 text-white';
    } else if (dayDelivery) {
      switch (dayDelivery.status) {
        case 'pending':
          bgColorClass = 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border-2 border-yellow-300 dark:border-yellow-700';
          break;
        case 'in-progress':
          bgColorClass = 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-2 border-green-300 dark:border-green-700 animate-pulse';
          break;
        case 'completed':
          bgColorClass = 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-2 border-blue-300 dark:border-blue-700';
          break;
      }
    }
    
    days.push(
      <div
        key={day}
        className={`p-1 text-center text-sm cursor-pointer rounded-md transition-colors relative ${
          bgColorClass || 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
        }`}
      >
        {dayDelivery && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full transform -translate-y-1 translate-x-1"></span>
        )}
        {day}
      </div>
    );
  }

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white flex items-center space-x-2">
          <Calendar className="w-5 h-5" />
          <span>Calendar</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="p-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
        
        {/* Delivery Legend */}
        <div className="mt-4 border-t border-gray-200 dark:border-gray-600 pt-3">
          <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300 flex items-center">
            <Package className="w-4 h-4 mr-1" /> 
            Upcoming Deliveries
          </h4>
          <div className="space-y-2 text-xs">
            {deliveries.map((delivery, idx) => (
              <div 
                key={idx} 
                className={`p-1.5 rounded ${
                  delivery.status === 'in-progress' 
                    ? 'bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500 animate-pulse' 
                    : delivery.status === 'completed'
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500'
                      : 'bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500'
                }`}
              >
                <div className="font-medium text-gray-800 dark:text-white">
                  {delivery.details}
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-gray-600 dark:text-gray-400">
                    {delivery.date.toLocaleDateString()}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded text-xs ${
                    delivery.status === 'in-progress'
                      ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
                      : delivery.status === 'completed'
                        ? 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
                        : 'bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200'
                  }`}>
                    {delivery.status === 'in-progress' 
                      ? 'In Progress' 
                      : delivery.status === 'completed' 
                        ? 'Completed'
                        : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
