
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <Button onClick={() => setShowTutorial(!showTutorial)} variant="outline" className="animate-bounce-in">
          <BookOpen className="w-4 h-4 mr-2" />
          {showTutorial ? 'Hide Tutorial' : 'Show Tutorial'}
        </Button>
      </div>

      <TutorialGuide isVisible={showTutorial} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserInfoCard />
        <AppearanceCard />
        <SystemPreferencesCard />
        <HelpInfoCard />
      </div>
    </div>
  );
};
