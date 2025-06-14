
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export const UserInfoCard: React.FC = () => {
  const { toast } = useToast();
  const [userInfo, setUserInfo] = useState({
    fullName: 'John Doe',
    role: 'Supply Manager',
    department: 'Operations'
  });

  const handleSaveUserInfo = () => {
    toast({ title: "Success", description: "User information updated successfully!" });
  };

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
          User Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={userInfo.fullName}
            onChange={(e) => setUserInfo(prev => ({ ...prev, fullName: e.target.value }))}
          />
        </div>
        
        <div>
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            value={userInfo.role}
            onChange={(e) => setUserInfo(prev => ({ ...prev, role: e.target.value }))}
          />
        </div>
        
        <div>
          <Label htmlFor="department">Department</Label>
          <Input
            id="department"
            value={userInfo.department}
            onChange={(e) => setUserInfo(prev => ({ ...prev, department: e.target.value }))}
          />
        </div>

        <Button onClick={handleSaveUserInfo} className="w-full">
          Save User Information
        </Button>
      </CardContent>
    </Card>
  );
};
