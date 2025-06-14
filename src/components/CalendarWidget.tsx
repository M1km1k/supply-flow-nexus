
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

export const CalendarWidget: React.FC = () => {
  const [currentDate] = useState(new Date());
  
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

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = day === today && 
      currentDate.getMonth() === new Date().getMonth() && 
      currentDate.getFullYear() === new Date().getFullYear();
    
    days.push(
      <div
        key={day}
        className={`p-2 text-center text-sm cursor-pointer rounded-md transition-colors ${
          isToday 
            ? 'bg-blue-500 text-white' 
            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
        }`}
      >
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
      </CardContent>
    </Card>
  );
};
