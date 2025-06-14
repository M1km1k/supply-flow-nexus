
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { User, Settings, Shield, Mail, Phone, MapPin, Clock } from 'lucide-react';

export const UserInfoCard: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState({
    fullName: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    role: user?.role || 'staff',
    department: user?.department || 'Operations',
    phoneNumber: '+1 (555) 123-4567',
    location: 'Building A, Room 101',
    workShift: 'day',
    notifications: {
      emailAlerts: true,
      lowStockAlerts: true,
      expiryAlerts: true,
      systemUpdates: false
    },
    preferences: {
      defaultView: 'dashboard',
      itemsPerPage: '25',
      autoRefresh: true
    }
  });

  useEffect(() => {
    if (user) {
      setUserInfo(prev => ({
        ...prev,
        fullName: user.name,
        email: user.email,
        role: user.role,
        department: user.department
      }));
    }
  }, [user]);

  const handleSaveUserInfo = () => {
    // In a real application, this would update the user profile in the backend
    toast({ 
      title: "Success", 
      description: "User information and preferences updated successfully!" 
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'manager': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'staff': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-none rounded-none h-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
          <User className="w-5 h-5 mr-2" />
          User Information & Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Basic Information</h3>
            <Badge className={getRoleBadgeColor(userInfo.role)}>
              <Shield className="w-3 h-3 mr-1" />
              {userInfo.role.charAt(0).toUpperCase() + userInfo.role.slice(1)}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={userInfo.fullName}
                onChange={(e) => setUserInfo(prev => ({ ...prev, fullName: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={userInfo.email}
                  className="pl-10"
                  onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="department">Department</Label>
              <Select value={userInfo.department} onValueChange={(value) => setUserInfo(prev => ({ ...prev, department: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Procurement">Procurement</SelectItem>
                  <SelectItem value="IT Services">IT Services</SelectItem>
                  <SelectItem value="Facilities">Facilities</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Administration">Administration</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="phoneNumber"
                  value={userInfo.phoneNumber}
                  className="pl-10"
                  onChange={(e) => setUserInfo(prev => ({ ...prev, phoneNumber: e.target.value }))}
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Work Location</Label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="location"
                  value={userInfo.location}
                  className="pl-10"
                  onChange={(e) => setUserInfo(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="workShift">Work Shift</Label>
              <div className="relative">
                <Clock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Select value={userInfo.workShift} onValueChange={(value) => setUserInfo(prev => ({ ...prev, workShift: value }))}>
                  <SelectTrigger className="pl-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Day Shift (8AM - 5PM)</SelectItem>
                    <SelectItem value="evening">Evening Shift (2PM - 11PM)</SelectItem>
                    <SelectItem value="night">Night Shift (10PM - 7AM)</SelectItem>
                    <SelectItem value="flexible">Flexible Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Notification Preferences */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Notification Preferences
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-xs text-gray-500">Receive email alerts for important updates</p>
              </div>
              <Switch
                checked={userInfo.notifications.emailAlerts}
                onCheckedChange={(checked) => 
                  setUserInfo(prev => ({ 
                    ...prev, 
                    notifications: { ...prev.notifications, emailAlerts: checked }
                  }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Low Stock Alerts</Label>
                <p className="text-xs text-gray-500">Get notified when items are running low</p>
              </div>
              <Switch
                checked={userInfo.notifications.lowStockAlerts}
                onCheckedChange={(checked) => 
                  setUserInfo(prev => ({ 
                    ...prev, 
                    notifications: { ...prev.notifications, lowStockAlerts: checked }
                  }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Expiry Alerts</Label>
                <p className="text-xs text-gray-500">Receive alerts for items nearing expiry</p>
              </div>
              <Switch
                checked={userInfo.notifications.expiryAlerts}
                onCheckedChange={(checked) => 
                  setUserInfo(prev => ({ 
                    ...prev, 
                    notifications: { ...prev.notifications, expiryAlerts: checked }
                  }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>System Updates</Label>
                <p className="text-xs text-gray-500">Get notified about system maintenance</p>
              </div>
              <Switch
                checked={userInfo.notifications.systemUpdates}
                onCheckedChange={(checked) => 
                  setUserInfo(prev => ({ 
                    ...prev, 
                    notifications: { ...prev.notifications, systemUpdates: checked }
                  }))
                }
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* System Preferences */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">System Preferences</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="defaultView">Default Landing Page</Label>
              <Select value={userInfo.preferences.defaultView} onValueChange={(value) => 
                setUserInfo(prev => ({ 
                  ...prev, 
                  preferences: { ...prev.preferences, defaultView: value }
                }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dashboard">Dashboard</SelectItem>
                  <SelectItem value="inventory">Inventory</SelectItem>
                  <SelectItem value="transactions">Transactions</SelectItem>
                  <SelectItem value="suppliers">Suppliers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="itemsPerPage">Items Per Page</Label>
              <Select value={userInfo.preferences.itemsPerPage} onValueChange={(value) => 
                setUserInfo(prev => ({ 
                  ...prev, 
                  preferences: { ...prev.preferences, itemsPerPage: value }
                }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 items</SelectItem>
                  <SelectItem value="25">25 items</SelectItem>
                  <SelectItem value="50">50 items</SelectItem>
                  <SelectItem value="100">100 items</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Auto-refresh Data</Label>
              <p className="text-xs text-gray-500">Automatically update data every 30 seconds</p>
            </div>
            <Switch
              checked={userInfo.preferences.autoRefresh}
              onCheckedChange={(checked) => 
                setUserInfo(prev => ({ 
                  ...prev, 
                  preferences: { ...prev.preferences, autoRefresh: checked }
                }))
              }
            />
          </div>
        </div>

        <Button onClick={handleSaveUserInfo} className="w-full">
          Save User Information & Preferences
        </Button>
      </CardContent>
    </Card>
  );
};
