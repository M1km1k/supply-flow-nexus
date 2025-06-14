
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Loading..." 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <img 
            src="/lovable-uploads/4322b65b-5e4b-43e8-b601-f7bd229fcd71.png" 
            alt="InventOMatic Logo" 
            className="w-16 h-16 rounded-xl animate-pulse"
          />
        </div>
        
        <div className="space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-700">
            {message}
          </h2>
          <p className="text-gray-500">
            Please wait while we set up your dashboard...
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
