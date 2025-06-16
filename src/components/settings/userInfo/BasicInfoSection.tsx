
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Shield, Mail, Phone, MapPin, Clock } from 'lucide-react';

interface BasicInfoSectionProps {
  userInfo: {
    fullName: string;
    email: string;
    role: string;
    department: string;
    phoneNumber: string;
    location: string;
    workShift: string;
  };
  onUserInfoChange: (updates: Partial<any>) => void;
  getRoleBadgeColor: (role: string) => string;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  userInfo,
  onUserInfoChange,
  getRoleBadgeColor
}) => {
  return (
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
            onChange={(e) => onUserInfoChange({ fullName: e.target.value })}
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
              onChange={(e) => onUserInfoChange({ email: e.target.value })}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="department">Department</Label>
          <Select value={userInfo.department} onValueChange={(value) => onUserInfoChange({ department: value })}>
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
              onChange={(e) => onUserInfoChange({ phoneNumber: e.target.value })}
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
              onChange={(e) => onUserInfoChange({ location: e.target.value })}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="workShift">Work Shift</Label>
          <div className="relative">
            <Clock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Select value={userInfo.workShift} onValueChange={(value) => onUserInfoChange({ workShift: value })}>
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
  );
};
