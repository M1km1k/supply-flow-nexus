
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  email: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card className="shadow-3d backdrop-blur-xl bg-white/90 border-white/30 transform-gpu hover:shadow-4xl transition-all duration-700 animate-card-float hover:animate-card-hover">
      <CardHeader className="animate-header-slide-in">
        <CardTitle className="text-center text-gray-800 animate-title-glow">Login</CardTitle>
      </CardHeader>
      <CardContent className="animate-content-fade-in">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="animate-field-slide-up" style={{ animationDelay: '0.2s' }}>
            <Label htmlFor="email" className="text-gray-700">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              required
              className="bg-white/80 border-gray-200 focus:border-blue-400 transform-gpu focus:animate-input-focus transition-all duration-300"
            />
          </div>
          
          <div className="animate-field-slide-up" style={{ animationDelay: '0.4s' }}>
            <Label htmlFor="password" className="text-gray-700">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                required
                className="bg-white/80 border-gray-200 focus:border-blue-400 transform-gpu focus:animate-input-focus transition-all duration-300"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:animate-icon-bounce"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="animate-field-slide-up" style={{ animationDelay: '0.6s' }}>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg transform-gpu hover:animate-button-3d transition-all duration-300"
            >
              Sign In
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
