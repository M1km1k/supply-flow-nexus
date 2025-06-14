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
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden perspective-1000">
      {/* 3D Animated gradient background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 animate-gradient-3d transform-gpu"></div>
      
      {/* 3D Floating geometric shapes with depth */}
      <div className="absolute inset-0 transform-style-preserve-3d">
        {/* Large 3D cubes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 animate-cube-float transform-gpu rotate-x-45 rotate-y-45 shadow-2xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-blue-300/20 animate-cube-bounce delay-300 transform-gpu rotate-x-30 rotate-y-60 shadow-xl"></div>
        <div className="absolute bottom-32 left-40 w-40 h-40 bg-purple-300/15 animate-cube-spin delay-700 transform-gpu rotate-x-60 rotate-y-30 shadow-2xl"></div>
        
        {/* Medium 3D pyramids */}
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-pink-300/15 animate-pyramid-float delay-1000 transform-gpu rotate-x-20 rotate-y-45 shadow-xl"></div>
        <div className="absolute top-1/2 left-10 w-20 h-20 bg-yellow-300/20 animate-pyramid-spin delay-500 transform-gpu rotate-x-45 rotate-y-20 shadow-lg"></div>
        
        {/* Small 3D diamonds */}
        <div className="absolute top-1/3 right-10 w-16 h-16 bg-indigo-300/15 animate-diamond-rotate delay-200 transform-gpu rotate-x-30 rotate-y-60 shadow-lg"></div>
        <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-green-300/20 animate-diamond-float delay-800 transform-gpu rotate-x-60 rotate-y-15 shadow-md"></div>
      </div>

      {/* 3D Particle field */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-white/30 rounded-full animate-particle-3d-${i % 4} shadow-sm`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              transform: `translateZ(${Math.random() * 100 - 50}px)`,
            }}
          />
        ))}
      </div>

      {/* Enhanced overlay with depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>

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

        {/* Login Form with enhanced 3D styling */}
        <Card className="shadow-3d backdrop-blur-xl bg-white/90 border-white/30 transform-gpu hover:shadow-4xl transition-all duration-300">
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

        {/* Sample Accounts Toggle with 3D effects */}
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowSampleAccounts(!showSampleAccounts)}
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
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        .rotate-x-45 { transform: rotateX(45deg); }
        .rotate-y-45 { transform: rotateY(45deg); }
        .rotate-x-30 { transform: rotateX(30deg); }
        .rotate-y-60 { transform: rotateY(60deg); }
        .rotate-x-60 { transform: rotateX(60deg); }
        .rotate-y-30 { transform: rotateY(30deg); }
        .rotate-x-20 { transform: rotateX(20deg); }
        .rotate-y-20 { transform: rotateY(20deg); }
        .rotate-y-15 { transform: rotateY(15deg); }
        .hover\\:rotate-y-2:hover { transform: rotateY(2deg); }
        
        .shadow-3d {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .shadow-4xl {
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3), 0 15px 30px rgba(0, 0, 0, 0.15);
        }
        
        @keyframes gradient-3d {
          0%, 100% {
            transform: translateZ(0) rotateZ(0deg);
            background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899);
            filter: hue-rotate(0deg);
          }
          25% {
            transform: translateZ(10px) rotateZ(90deg);
            background: linear-gradient(135deg, #8b5cf6, #ec4899, #f59e0b);
            filter: hue-rotate(90deg);
          }
          50% {
            transform: translateZ(20px) rotateZ(180deg);
            background: linear-gradient(225deg, #ec4899, #f59e0b, #10b981);
            filter: hue-rotate(180deg);
          }
          75% {
            transform: translateZ(10px) rotateZ(270deg);
            background: linear-gradient(315deg, #f59e0b, #10b981, #3b82f6);
            filter: hue-rotate(270deg);
          }
        }
        
        @keyframes cube-float {
          0%, 100% { 
            transform: rotateX(45deg) rotateY(45deg) translateZ(0px) translateY(0px);
          }
          50% { 
            transform: rotateX(45deg) rotateY(45deg) translateZ(30px) translateY(-20px);
          }
        }
        
        @keyframes cube-bounce {
          0%, 100% { 
            transform: rotateX(30deg) rotateY(60deg) translateZ(0px) scale(1);
          }
          50% { 
            transform: rotateX(30deg) rotateY(60deg) translateZ(20px) scale(1.1);
          }
        }
        
        @keyframes cube-spin {
          0% { 
            transform: rotateX(60deg) rotateY(30deg) rotateZ(0deg);
          }
          100% { 
            transform: rotateX(60deg) rotateY(30deg) rotateZ(360deg);
          }
        }
        
        @keyframes pyramid-float {
          0%, 100% { 
            transform: rotateX(20deg) rotateY(45deg) translateZ(0px) translateY(0px);
          }
          33% { 
            transform: rotateX(20deg) rotateY(45deg) translateZ(15px) translateY(-10px);
          }
          66% { 
            transform: rotateX(20deg) rotateY(45deg) translateZ(25px) translateY(-15px);
          }
        }
        
        @keyframes pyramid-spin {
          0% { 
            transform: rotateX(45deg) rotateY(20deg) rotateZ(0deg);
          }
          100% { 
            transform: rotateX(45deg) rotateY(20deg) rotateZ(360deg);
          }
        }
        
        @keyframes diamond-rotate {
          0% { 
            transform: rotateX(30deg) rotateY(60deg) rotateZ(0deg);
          }
          100% { 
            transform: rotateX(30deg) rotateY(60deg) rotateZ(360deg);
          }
        }
        
        @keyframes diamond-float {
          0%, 100% { 
            transform: rotateX(60deg) rotateY(15deg) translateZ(0px);
          }
          50% { 
            transform: rotateX(60deg) rotateY(15deg) translateZ(20px);
          }
        }
        
        @keyframes particle-3d-0 {
          0%, 100% { 
            transform: translateZ(0px) translateX(0px) translateY(0px);
            opacity: 0.3;
          }
          50% { 
            transform: translateZ(50px) translateX(20px) translateY(-20px);
            opacity: 0.8;
          }
        }
        
        @keyframes particle-3d-1 {
          0%, 100% { 
            transform: translateZ(10px) translateX(10px) translateY(10px);
            opacity: 0.4;
          }
          50% { 
            transform: translateZ(40px) translateX(-15px) translateY(25px);
            opacity: 0.9;
          }
        }
        
        @keyframes particle-3d-2 {
          0%, 100% { 
            transform: translateZ(-10px) translateX(-10px) translateY(-10px);
            opacity: 0.2;
          }
          50% { 
            transform: translateZ(30px) translateX(25px) translateY(-15px);
            opacity: 0.7;
          }
        }
        
        @keyframes particle-3d-3 {
          0%, 100% { 
            transform: translateZ(5px) translateX(-5px) translateY(5px);
            opacity: 0.5;
          }
          50% { 
            transform: translateZ(45px) translateX(10px) translateY(30px);
            opacity: 1;
          }
        }
        
        @keyframes logo-3d {
          0%, 100% { 
            transform: rotateY(0deg) rotateX(0deg) translateZ(0px);
          }
          50% { 
            transform: rotateY(10deg) rotateX(5deg) translateZ(10px);
          }
        }
        
        @keyframes logo-glow {
          0%, 100% { 
            opacity: 0.2;
            transform: scale(1);
          }
          50% { 
            opacity: 0.4;
            transform: scale(1.05);
          }
        }
        
        @keyframes text-3d {
          0%, 100% { 
            transform: rotateX(0deg) translateZ(0px);
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          }
          50% { 
            transform: rotateX(2deg) translateZ(5px);
            text-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
          }
        }
        
        @keyframes fade-in-3d {
          0% {
            opacity: 0;
            transform: translateZ(-20px) translateY(10px);
          }
          100% {
            opacity: 0.9;
            transform: translateZ(0px) translateY(0px);
          }
        }
        
        .animate-gradient-3d {
          animation: gradient-3d 15s ease-in-out infinite;
          background-size: 400% 400%;
        }
        
        .animate-cube-float {
          animation: cube-float 8s ease-in-out infinite;
        }
        
        .animate-cube-bounce {
          animation: cube-bounce 6s ease-in-out infinite;
        }
        
        .animate-cube-spin {
          animation: cube-spin 12s linear infinite;
        }
        
        .animate-pyramid-float {
          animation: pyramid-float 10s ease-in-out infinite;
        }
        
        .animate-pyramid-spin {
          animation: pyramid-spin 8s linear infinite;
        }
        
        .animate-diamond-rotate {
          animation: diamond-rotate 6s linear infinite;
        }
        
        .animate-diamond-float {
          animation: diamond-float 7s ease-in-out infinite;
        }
        
        .animate-particle-3d-0 {
          animation: particle-3d-0 12s ease-in-out infinite;
        }
        
        .animate-particle-3d-1 {
          animation: particle-3d-1 10s ease-in-out infinite;
        }
        
        .animate-particle-3d-2 {
          animation: particle-3d-2 14s ease-in-out infinite;
        }
        
        .animate-particle-3d-3 {
          animation: particle-3d-3 11s ease-in-out infinite;
        }
        
        .animate-logo-3d {
          animation: logo-3d 4s ease-in-out infinite;
        }
        
        .animate-logo-glow {
          animation: logo-glow 3s ease-in-out infinite;
        }
        
        .animate-text-3d {
          animation: text-3d 5s ease-in-out infinite;
        }
        
        .animate-fade-in-3d {
          animation: fade-in-3d 2s ease-out;
        }
      `}</style>
    </div>
  );
};
