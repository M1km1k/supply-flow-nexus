
import React, { useEffect, useState } from 'react';
import { Background3D } from './login/Background3D';
import { LoginStyles } from './login/LoginStyles';
import { Progress } from '@/components/ui/progress';

interface LoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onComplete, 
  duration = 3000 
}) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Signing you in...');

  useEffect(() => {
    const steps = [
      { progress: 20, text: 'Authenticating...' },
      { progress: 50, text: 'Loading your data...' },
      { progress: 80, text: 'Setting up dashboard...' },
      { progress: 100, text: 'Welcome to InventOMatic!' }
    ];

    let currentStep = 0;
    const stepDuration = duration / steps.length;

    const progressInterval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].progress);
        setLoadingText(steps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(progressInterval);
        setTimeout(() => {
          onComplete?.();
        }, 500);
      }
    }, stepDuration);

    return () => clearInterval(progressInterval);
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden perspective-1000">
      <Background3D />
      
      <div className="w-full max-w-md space-y-8 relative z-20 transform-gpu">
        {/* Logo and Welcome Message */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative transform-gpu">
              <img 
                src="/lovable-uploads/4322b65b-5e4b-43e8-b601-f7bd229fcd71.png" 
                alt="InventOMatic Logo" 
                className="w-24 h-24 rounded-2xl shadow-3d animate-logo-3d transform-gpu"
              />
              <div className="absolute inset-0 rounded-2xl bg-white/10 animate-logo-glow"></div>
            </div>
          </div>
          
          <div className="transform-gpu">
            <h1 className="text-5xl font-bold text-white drop-shadow-2xl mb-4 animate-text-3d">
              InventOMatic
            </h1>
            <p className="text-white/90 drop-shadow-lg text-lg animate-fade-in-3d">
              {loadingText}
            </p>
          </div>
        </div>

        {/* Loading Progress */}
        <div className="space-y-4 animate-card-float">
          <div className="backdrop-blur-xl bg-white/20 rounded-2xl p-6 shadow-3d border border-white/30">
            <div className="space-y-4">
              <Progress 
                value={progress} 
                className="h-3 bg-white/20"
              />
              <div className="flex justify-between text-white/80 text-sm">
                <span>Loading...</span>
                <span>{progress}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Animation Dots */}
        <div className="flex justify-center space-x-2 animate-fade-in-3d">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-white/60 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>

      <LoginStyles />
      
      {/* Additional loading animation overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5 animate-pulse"></div>
    </div>
  );
};
