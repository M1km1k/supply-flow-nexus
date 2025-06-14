
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { User } from 'lucide-react';
import { BasicInfoSection } from './userInfo/BasicInfoSection';
import { NotificationSection } from './userInfo/NotificationSection';
import { SystemPreferencesSection } from './userInfo/SystemPreferencesSection';
import { useUserInfo } from './userInfo/useUserInfo';

export const UserInfoCard: React.FC = () => {
  const {
    userInfo,
    updateUserInfo,
    updateNotification,
    updatePreference,
    saveUserInfo,
    getRoleBadgeColor
  } = useUserInfo();

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-none rounded-none h-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
          <User className="w-5 h-5 mr-2" />
          User Information & Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <BasicInfoSection
          userInfo={userInfo}
          onUserInfoChange={updateUserInfo}
          getRoleBadgeColor={getRoleBadgeColor}
        />

        <Separator />

        <NotificationSection
          notifications={userInfo.notifications}
          onNotificationChange={updateNotification}
        />

        <Separator />

        <SystemPreferencesSection
          preferences={userInfo.preferences}
          onPreferenceChange={updatePreference}
        />

        <Button onClick={saveUserInfo} className="w-full">
          Save User Information & Preferences
        </Button>
      </CardContent>
    </Card>
  );
};
