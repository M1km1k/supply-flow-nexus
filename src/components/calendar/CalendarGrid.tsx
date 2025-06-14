
import React from 'react';
import { Package } from 'lucide-react';
import { DeliveryEvent } from './types';

interface CalendarGridProps {
  currentDate: Date;
  deliveries: DeliveryEvent[];
  onDayClick: (delivery: DeliveryEvent) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  deliveries,
  onDayClick
}) => {
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
    
    // Check if there are deliveries on this day
    const dayDeliveries = currentMonthDeliveries.filter(d => d.date.getDate() === day);
    const hasDeliveries = dayDeliveries.length > 0;
    
    let bgColorClass = '';
    let pulseClass = '';
    
    if (isToday) {
      bgColorClass = 'bg-blue-500 text-white font-bold ring-2 ring-blue-300';
    } else if (hasDeliveries) {
      const highestPriorityStatus = dayDeliveries.find(d => d.status === 'in-progress') ? 'in-progress' :
                                   dayDeliveries.find(d => d.status === 'pending') ? 'pending' : 'completed';
      
      switch (highestPriorityStatus) {
        case 'pending':
          bgColorClass = 'bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/40 dark:to-yellow-800/40 text-yellow-800 dark:text-yellow-200 border-2 border-yellow-400 dark:border-yellow-600 shadow-md';
          break;
        case 'in-progress':
          bgColorClass = 'bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40 text-green-800 dark:text-green-200 border-2 border-green-400 dark:border-green-600 shadow-md';
          pulseClass = 'animate-pulse';
          break;
        case 'completed':
          bgColorClass = 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 text-blue-800 dark:text-blue-200 border-2 border-blue-400 dark:border-blue-600 shadow-md';
          break;
      }
    }
    
    days.push(
      <div
        key={day}
        className={`p-1 text-center text-sm cursor-pointer rounded-lg transition-all duration-300 hover:scale-105 relative ${
          bgColorClass || 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
        } ${pulseClass}`}
        onClick={() => hasDeliveries ? onDayClick(dayDeliveries[0]) : null}
      >
        {hasDeliveries && (
          <>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-bounce flex items-center justify-center">
              <span className="text-xs text-white font-bold">{dayDeliveries.length}</span>
            </span>
            <Package className="absolute top-0 left-0 w-3 h-3 text-blue-600 dark:text-blue-400" />
          </>
        )}
        <span className="relative z-10">{day}</span>
      </div>
    );
  }

  return (
    <>
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
      
      <div className="grid grid-cols-7 gap-1 mb-4">
        {days}
      </div>
    </>
  );
};
