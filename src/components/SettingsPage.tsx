
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BookOpen, FileText, Settings, Palette, User, HelpCircle } from 'lucide-react';
import { UserInfoCard } from './settings/UserInfoCard';
import { AppearanceCard } from './settings/AppearanceCard';
import { SystemPreferencesCard } from './settings/SystemPreferencesCard';
import { HelpInfoCard } from './settings/HelpInfoCard';
import { TutorialGuide } from './settings/TutorialGuide';
import { ManualGuide } from './settings/ManualGuide';

export const SettingsPage: React.FC = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [showManual, setShowManual] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Settings className="w-8 h-8 text-blue-600" />
              Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your account, preferences, and system configuration
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={() => setShowManual(!showManual)} 
              variant="outline" 
              size="sm"
              className="hover:bg-green-50 hover:border-green-300 hover:text-green-600 transition-all duration-200"
            >
              <FileText className="w-4 h-4 mr-2" />
              {showManual ? 'Hide Manual' : 'User Manual'}
            </Button>
            <Button 
              onClick={() => setShowTutorial(!showTutorial)} 
              variant="outline" 
              size="sm"
              className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              {showTutorial ? 'Hide Tutorial' : 'Tutorial Guide'}
            </Button>
          </div>
        </div>

        <Separator />

        {/* Guides Section */}
        {(showManual || showTutorial) && (
          <div className="space-y-4">
            <ManualGuide isVisible={showManual} />
            <TutorialGuide isVisible={showTutorial} />
            <Separator />
          </div>
        )}

        {/* Settings Cards Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* User Information Section */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                User Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="px-6 pb-6">
                <UserInfoCard />
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings Section */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-600" />
                Appearance & Display
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="px-6 pb-6">
                <AppearanceCard />
              </div>
            </CardContent>
          </Card>

          {/* System Preferences Section */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-green-600" />
                System Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="px-6 pb-6">
                <SystemPreferencesCard />
              </div>
            </CardContent>
          </Card>

          {/* Help & Support Section */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-orange-600" />
                Help & Support
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="px-6 pb-6">
                <HelpInfoCard />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
