
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
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
    <div className="space-y-6">
      <BasicInfoSection
        userInfo={userInfo}
        onUserInfoChange={updateUserInfo}
        getRoleBadgeColor={getRoleBadgeColor}
      />

      <Separator className="bg-gray-200 dark:bg-gray-700" />

      <NotificationSection
        notifications={userInfo.notifications}
        onNotificationChange={updateNotification}
      />

      <Separator className="bg-gray-200 dark:bg-gray-700" />

      <SystemPreferencesSection
        preferences={userInfo.preferences}
        onPreferenceChange={updatePreference}
      />

      <Button onClick={saveUserInfo} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200">
        Save User Information & Preferences
      </Button>
    </div>
  );
};
