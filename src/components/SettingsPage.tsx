
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { UserInfoCard } from './settings/UserInfoCard';
import { AppearanceCard } from './settings/AppearanceCard';
import { SystemPreferencesCard } from './settings/SystemPreferencesCard';
import { HelpInfoCard } from './settings/HelpInfoCard';
import { TutorialGuide } from './settings/TutorialGuide';

export const SettingsPage: React.FC = () => {
  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <div className="space-y-0 animate-fade-in">
      <div className="flex justify-between items-center animate-slide-down mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white hover:scale-105 transition-transform duration-300 hover:text-blue-600">
          Settings
        </h1>
        <Button 
          onClick={() => setShowTutorial(!showTutorial)} 
          variant="outline" 
          className="animate-bounce-in hover:scale-110 transition-all duration-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600"
        >
          <BookOpen className="w-4 h-4 mr-2 hover:rotate-12 transition-transform duration-200" />
          {showTutorial ? 'Hide Tutorial' : 'Show Tutorial'}
        </Button>
      </div>

      <div className="animate-slide-up mb-0">
        <TutorialGuide isVisible={showTutorial} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div className="animate-slide-right hover:scale-105 transition-transform duration-300 border-r border-b border-gray-200 dark:border-gray-700">
          <UserInfoCard />
        </div>
        <div className="animate-slide-left hover:scale-105 transition-transform duration-300 border-b border-gray-200 dark:border-gray-700" style={{ animationDelay: '0.1s' }}>
          <AppearanceCard />
        </div>
        <div className="animate-slide-right hover:scale-105 transition-transform duration-300 border-r border-gray-200 dark:border-gray-700" style={{ animationDelay: '0.2s' }}>
          <SystemPreferencesCard />
        </div>
        <div className="animate-slide-left hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.3s' }}>
          <HelpInfoCard />
        </div>
      </div>
    </div>
  );
};
