
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, User, Key } from 'lucide-react';

interface SampleAccount {
  email: string;
  password: string;
  role: string;
  name: string;
  permissions: string;
}

interface SampleAccountsProps {
  showSampleAccounts: boolean;
  onToggle: () => void;
  onAccountSelect: (account: SampleAccount) => void;
}

const sampleAccounts: SampleAccount[] = [
  {
    email: 'admin@institution.edu',
    password: 'admin123',
    role: 'Admin',
    name: 'John Administrator',
    permissions: 'Full access to all features'
  },
  {
    email: 'staff@institution.edu',
    password: 'staff123',
    role: 'Staff',
    name: 'Mike Staff',
    permissions: 'View inventory, create transactions'
  }
];

export const SampleAccounts: React.FC<SampleAccountsProps> = ({
  showSampleAccounts,
  onToggle,
  onAccountSelect
}) => {
  return (
    <div className="text-center">
      <Button
        variant="outline"
        onClick={onToggle}
        className="mb-4 bg-white/80 hover:bg-white border-white/40 text-gray-700 shadow-3d backdrop-blur-md transform-gpu hover:scale-105 transition-all duration-300"
      >
        {showSampleAccounts ? 'Hide' : 'Show'} Sample Accounts
      </Button>
      
      {showSampleAccounts && (
        <div className="space-y-3">
          <p className="text-sm text-white/90 drop-shadow-md mb-3">
            Click on any account to auto-fill the login form:
          </p>
          {sampleAccounts.map((account, index) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-3d transition-all duration-500 hover:scale-105 bg-white/90 backdrop-blur-xl border-white/40 transform-gpu hover:rotate-y-2"
              onClick={() => onAccountSelect(account)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    {account.role === 'Admin' ? (
                      <Shield className="w-5 h-5 text-blue-600" />
                    ) : (
                      <User className="w-5 h-5 text-green-600" />
                    )}
                    <div className="text-left">
                      <p className="font-medium text-gray-800">{account.name}</p>
                      <p className="text-sm text-gray-600">{account.email}</p>
                    </div>
                  </div>
                  <Badge variant={account.role === 'Admin' ? 'default' : 'secondary'}>
                    {account.role}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                  <Key className="w-3 h-3" />
                  <span className="font-mono">Password: {account.password}</span>
                </div>
                <p className="text-xs text-gray-500">{account.permissions}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
