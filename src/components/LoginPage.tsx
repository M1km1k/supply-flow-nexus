
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield, User, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSampleAccounts, setShowSampleAccounts] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const sampleAccounts = [
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login(email, password);
    if (success) {
      toast({
        title: "Login Successful",
        description: "Welcome to InventOMatic!",
      });
      navigate('/');
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSampleLogin = (account: typeof sampleAccounts[0]) => {
    setEmail(account.email);
    setPassword(account.password);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 animate-gradient-x"></div>
      
      {/* Animated orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-blue-300/30 rounded-full blur-lg animate-bounce delay-300"></div>
        <div className="absolute bottom-32 left-40 w-40 h-40 bg-purple-300/20 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-pink-300/25 rounded-full blur-xl animate-bounce delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-20 h-20 bg-yellow-300/30 rounded-full blur-lg animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-10 w-36 h-36 bg-indigo-300/20 rounded-full blur-2xl animate-bounce delay-200"></div>
      </div>

      {/* Overlay for better content readability */}
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Logo and Title */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <img 
                src="/lovable-uploads/4322b65b-5e4b-43e8-b601-f7bd229fcd71.png" 
                alt="InventOMatic Logo" 
                className="w-20 h-20 rounded-2xl shadow-2xl animate-bounce"
              />
              <div className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse"></div>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-2">
              InventOMatic
            </h1>
            <p className="text-white/90 drop-shadow-md">Sign in to your account</p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="shadow-2xl backdrop-blur-md bg-white/95 border-white/20">
          <CardHeader>
            <CardTitle className="text-center text-gray-800">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/80 border-gray-200 focus:border-blue-400"
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white/80 border-gray-200 focus:border-blue-400"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Sample Accounts Toggle */}
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowSampleAccounts(!showSampleAccounts)}
            className="mb-4 bg-white/90 hover:bg-white border-white/30 text-gray-700 shadow-lg backdrop-blur-sm"
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
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/95 backdrop-blur-md border-white/30"
                  onClick={() => handleSampleLogin(account)}
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
      </div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% {
            transform: translateX(-50%) translateY(-50%) rotate(0deg);
            background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899);
          }
          33% {
            transform: translateX(-50%) translateY(-50%) rotate(120deg);
            background: linear-gradient(45deg, #8b5cf6, #ec4899, #f59e0b);
          }
          66% {
            transform: translateX(-50%) translateY(-50%) rotate(240deg);
            background: linear-gradient(45deg, #ec4899, #f59e0b, #3b82f6);
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 12s ease-in-out infinite;
          background-size: 400% 400%;
        }
        
        .animate-bounce {
          animation-duration: 4s;
        }
        
        .animate-pulse {
          animation-duration: 6s;
        }
      `}</style>
    </div>
  );
};
