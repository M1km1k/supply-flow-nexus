
import React from 'react';

export const CalendarLegend: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-2 mb-4 text-xs">
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 bg-yellow-200 border border-yellow-400 rounded"></div>
        <span className="text-gray-600 dark:text-gray-400">Pending</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 bg-green-200 border border-green-400 rounded animate-pulse"></div>
        <span className="text-gray-600 dark:text-gray-400">In Progress</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 bg-blue-200 border border-blue-400 rounded"></div>
        <span className="text-gray-600 dark:text-gray-400">Completed</span>
      </div>
    </div>
  );
};
