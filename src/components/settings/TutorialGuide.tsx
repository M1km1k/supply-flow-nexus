
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

const tutorialSteps = [
  {
    title: "Getting Started",
    content: "Welcome to InventOMatic! Navigate through different sections using the sidebar menu."
  },
  {
    title: "Dashboard",
    content: "View your inventory overview, analytics, and recent activities. Toggle widgets using the eye buttons."
  },
  {
    title: "Inventory Management",
    content: "Add, edit, and track your inventory items. Use filters and export options for better management."
  },
  {
    title: "Supplier Management",
    content: "Manage your suppliers' information, contact details, and lead times."
  },
  {
    title: "Transactions",
    content: "Log inbound and outbound items to automatically update your inventory levels."
  },
  {
    title: "Audit Trail",
    content: "Monitor all system activities and changes with detailed logs and analytics."
  }
];

interface TutorialGuideProps {
  isVisible: boolean;
}

export const TutorialGuide: React.FC<TutorialGuideProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800 animate-slide-down">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-blue-800 dark:text-blue-300 flex items-center">
          <BookOpen className="w-5 h-5 mr-2" />
          InventOMatic Tutorial Guide
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tutorialSteps.map((step, index) => (
            <div 
              key={index} 
              className="p-4 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-sm animate-fade-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">
                  {index + 1}
                </div>
                {step.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{step.content}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
