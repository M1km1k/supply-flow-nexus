
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { TermsAndConditions } from './TermsAndConditions';
import { sanitizeInput, isValidEmail, rateLimiter, logSecurityEvent } from '@/utils/securityUtils';

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
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const handleEmailChange = (value: string) => {
    const sanitized = sanitizeInput(value);
    onEmailChange(sanitized);
    
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const handlePasswordChange = (value: string) => {
    const sanitized = sanitizeInput(value);
    onPasswordChange(sanitized);
    
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];
    
    if (!email.trim()) {
      errors.push('Email is required');
    } else if (!isValidEmail(email)) {
      errors.push('Please enter a valid email address');
    }
    
    if (!password.trim()) {
      errors.push('Password is required');
    } else if (password.length < 6) {
      errors.push('Password must be at least 6 characters');
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check rate limiting
    const clientId = `login_${window.location.hostname}`;
    if (!rateLimiter.checkRateLimit(clientId, 5, 300000)) { // 5 attempts per 5 minutes
      setIsRateLimited(true);
      logSecurityEvent('rate_limit_exceeded', { email: email.substring(0, 5) + '***' });
      setTimeout(() => setIsRateLimited(false), 60000); // Reset after 1 minute
      return;
    }
    
    if (!validateForm()) {
      logSecurityEvent('form_validation_failed', { 
        email: email.substring(0, 5) + '***',
        errors: validationErrors 
      });
      return;
    }
    
    onSubmit(e);
  };

  return (
    <Card className="shadow-3d backdrop-blur-xl bg-white/90 border-white/30 transform-gpu hover:shadow-4xl transition-all duration-700 animate-card-float hover:animate-card-hover relative">
      <TermsAndConditions />
      
      <CardHeader className="animate-header-slide-in">
        <CardTitle className="text-center text-gray-800 animate-title-glow">Login</CardTitle>
      </CardHeader>
      <CardContent className="animate-content-fade-in">
        {validationErrors.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center space-x-2 text-red-800 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">Please fix the following errors:</span>
            </div>
            <ul className="text-xs text-red-700 space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}
        
        {isRateLimited && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <div className="flex items-center space-x-2 text-amber-800">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">Too many login attempts. Please wait before trying again.</span>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="animate-field-slide-up" style={{ animationDelay: '0.2s' }}>
            <Label htmlFor="email" className="text-gray-700">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              required
              autoComplete="email"
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
                onChange={(e) => handlePasswordChange(e.target.value)}
                required
                autoComplete="current-password"
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
              disabled={isRateLimited}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg transform-gpu hover:animate-button-3d transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRateLimited ? 'Please Wait...' : 'Sign In'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
