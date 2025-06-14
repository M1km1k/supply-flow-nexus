
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Background3D } from './login/Background3D';
import { LoginForm } from './login/LoginForm';
import { SampleAccounts } from './login/SampleAccounts';
import { LoginStyles } from './login/LoginStyles';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSampleAccounts, setShowSampleAccounts] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const handleSampleLogin = (account: { email: string; password: string }) => {
    setEmail(account.email);
    setPassword(account.password);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden perspective-1000">
      <Background3D />

      <div className="w-full max-w-md space-y-6 relative z-20 transform-gpu">
        {/* Logo and Title with 3D effect */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative transform-gpu">
              <img 
                src="/lovable-uploads/4322b65b-5e4b-43e8-b601-f7bd229fcd71.png" 
                alt="InventOMatic Logo" 
                className="w-20 h-20 rounded-2xl shadow-3d animate-logo-3d transform-gpu"
              />
              <div className="absolute inset-0 rounded-2xl bg-white/10 animate-logo-glow"></div>
            </div>
          </div>
          <div className="transform-gpu">
            <h1 className="text-4xl font-bold text-white drop-shadow-2xl mb-2 animate-text-3d">
              InventOMatic
            </h1>
            <p className="text-white/90 drop-shadow-lg animate-fade-in-3d">Sign in to your account</p>
          </div>
        </div>

        {/* Login Form */}
        <LoginForm
          email={email}
          password={password}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={handleLogin}
        />

        {/* Sample Accounts */}
        <SampleAccounts
          showSampleAccounts={showSampleAccounts}
          onToggle={() => setShowSampleAccounts(!showSampleAccounts)}
          onAccountSelect={handleSampleLogin}
        />
      </div>

      <LoginStyles />
    </div>
  );
};
