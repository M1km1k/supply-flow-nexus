
import React, { useEffect } from 'react';

export const LoginSpeedController: React.FC = () => {
  useEffect(() => {
    // Apply saved animation speed when styles component mounts
    const savedAnimationSpeed = parseFloat(localStorage.getItem('animation-speed') || '1');
    const durationMultiplier = 1 / savedAnimationSpeed;
    
    // Create or update speed style rules for login animations
    const existingLoginSpeedStyles = document.getElementById('login-speed-styles');
    if (existingLoginSpeedStyles) {
      existingLoginSpeedStyles.remove();
    }
    
    const loginSpeedStyles = document.createElement('style');
    loginSpeedStyles.id = 'login-speed-styles';
    
    const cssRules = `
      .animate-card-float {
        animation-duration: ${12 * durationMultiplier}s !important;
      }
      
      .animate-card-hover {
        animation-duration: ${8 * durationMultiplier}s !important;
      }
      
      .animate-header-slide-in {
        animation-duration: ${1.5 * durationMultiplier}s !important;
      }
      
      .animate-title-glow {
        animation-duration: ${10 * durationMultiplier}s !important;
      }
      
      .animate-content-fade-in {
        animation-duration: ${2 * durationMultiplier}s !important;
      }
      
      .animate-field-slide-up {
        animation-duration: ${1.2 * durationMultiplier}s !important;
      }
      
      .animate-input-focus {
        animation-duration: ${0.5 * durationMultiplier}s !important;
      }
      
      .animate-icon-bounce {
        animation-duration: ${0.8 * durationMultiplier}s !important;
      }
      
      .animate-button-3d {
        animation-duration: ${1 * durationMultiplier}s !important;
      }
      
      .animate-logo-3d {
        animation-duration: ${10 * durationMultiplier}s !important;
      }
      
      .animate-logo-glow {
        animation-duration: ${8 * durationMultiplier}s !important;
      }
      
      .animate-text-3d {
        animation-duration: ${12 * durationMultiplier}s !important;
      }
      
      .animate-fade-in-3d {
        animation-duration: ${4 * durationMultiplier}s !important;
      }
      
      .animate-gradient-3d {
        animation-duration: ${25 * durationMultiplier}s !important;
      }
      
      .animate-cube-float {
        animation-duration: ${16 * durationMultiplier}s !important;
      }
      
      .animate-cube-bounce {
        animation-duration: ${14 * durationMultiplier}s !important;
      }
      
      .animate-cube-spin {
        animation-duration: ${22 * durationMultiplier}s !important;
      }
      
      .animate-pyramid-float {
        animation-duration: ${18 * durationMultiplier}s !important;
      }
      
      .animate-pyramid-spin {
        animation-duration: ${16 * durationMultiplier}s !important;
      }
      
      .animate-diamond-rotate {
        animation-duration: ${14 * durationMultiplier}s !important;
      }
      
      .animate-diamond-float {
        animation-duration: ${15 * durationMultiplier}s !important;
      }
      
      .animate-particle-3d-0 {
        animation-duration: ${20 * durationMultiplier}s !important;
      }
      
      .animate-particle-3d-1 {
        animation-duration: ${18 * durationMultiplier}s !important;
      }
      
      .animate-particle-3d-2 {
        animation-duration: ${22 * durationMultiplier}s !important;
      }
      
      .animate-particle-3d-3 {
        animation-duration: ${19 * durationMultiplier}s !important;
      }
    `;
    
    loginSpeedStyles.textContent = cssRules;
    document.head.appendChild(loginSpeedStyles);
    
    // Cleanup function
    return () => {
      const speedStyles = document.getElementById('login-speed-styles');
      if (speedStyles) {
        speedStyles.remove();
      }
    };
  }, []);

  return null;
};
