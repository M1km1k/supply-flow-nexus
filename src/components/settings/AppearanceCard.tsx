import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useTheme } from '@/components/ThemeProvider';
import { useToast } from '@/hooks/use-toast';
import { applyFontSizeChanges } from '@/utils/fontSizeUtils';

export const AppearanceCard: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [fontSize, setFontSize] = useState([16]);
  const [animationSpeed, setAnimationSpeed] = useState([1]);
  const [systemPreferences, setSystemPreferences] = useState({
    fontFamily: 'inter',
    animationStyle: 'smooth',
    backgroundAnimation: 'gradient'
  });

  // Load preferences from localStorage on component mount
  useEffect(() => {
    const savedFontFamily = localStorage.getItem('font-family') || 'inter';
    const savedAnimationStyle = localStorage.getItem('animation-style') || 'smooth';
    const savedBackgroundAnimation = localStorage.getItem('background-animation') || 'gradient';
    const savedFontSize = parseInt(localStorage.getItem('font-size') || '16');
    const savedAnimationSpeed = parseFloat(localStorage.getItem('animation-speed') || '1');

    setSystemPreferences({
      fontFamily: savedFontFamily,
      animationStyle: savedAnimationStyle,
      backgroundAnimation: savedBackgroundAnimation
    });
    setFontSize([savedFontSize]);
    setAnimationSpeed([savedAnimationSpeed]);

    // Apply saved preferences
    applyFontFamily(savedFontFamily);
    applyAnimationStyle(savedAnimationStyle);
    applyAnimationSpeed(savedAnimationSpeed);
    applyFontSizeChanges(savedFontSize, toast);
  }, []);

  // Auto-apply font family changes
  const applyFontFamily = (fontFamily: string) => {
    const getFontFamily = (font: string) => {
      const fonts = {
        'inter': 'Inter, system-ui, -apple-system, sans-serif',
        'roboto': 'Roboto, system-ui, -apple-system, sans-serif',
        'poppins': 'Poppins, system-ui, -apple-system, sans-serif',
        'montserrat': 'Montserrat, system-ui, -apple-system, sans-serif',
        'opensans': 'Open Sans, system-ui, -apple-system, sans-serif'
      };
      return fonts[font as keyof typeof fonts] || fonts.inter;
    };

    document.documentElement.style.fontFamily = getFontFamily(fontFamily);
    localStorage.setItem('font-family', fontFamily);
  };

  // Auto-apply animation speed changes
  const applyAnimationSpeed = (speed: number) => {
    const root = document.documentElement;
    
    // Create or update speed style rules
    const existingSpeedStyles = document.getElementById('dynamic-speed-styles');
    if (existingSpeedStyles) {
      existingSpeedStyles.remove();
    }
    
    const speedStyles = document.createElement('style');
    speedStyles.id = 'dynamic-speed-styles';
    
    // Calculate duration multiplier (inverse of speed)
    const durationMultiplier = 1 / speed;
    
    const cssRules = `
      * {
        animation-duration: calc(var(--original-duration, 0.3s) * ${durationMultiplier}) !important;
        transition-duration: calc(var(--original-transition, 0.2s) * ${durationMultiplier}) !important;
      }
      
      .animate-fade-in {
        animation-duration: ${0.3 * durationMultiplier}s !important;
      }
      
      .animate-slide-right {
        animation-duration: ${0.8 * durationMultiplier}s !important;
      }
      
      .animate-bounce {
        animation-duration: ${1 * durationMultiplier}s !important;
      }
      
      .animate-pulse {
        animation-duration: ${2 * durationMultiplier}s !important;
      }
      
      canvas {
        animation-duration: ${1 * durationMultiplier}s !important;
      }
      
      button, .hover\\:scale-105 {
        transition-duration: ${0.2 * durationMultiplier}s !important;
      }
      
      .accordion-down {
        animation-duration: ${0.2 * durationMultiplier}s !important;
      }
      
      .accordion-up {
        animation-duration: ${0.2 * durationMultiplier}s !important;
      }
    `;
    
    speedStyles.textContent = cssRules;
    document.head.appendChild(speedStyles);
    
    localStorage.setItem('animation-speed', speed.toString());
  };

  // Auto-apply animation style changes
  const applyAnimationStyle = (style: string) => {
    const root = document.documentElement;
    
    // Remove existing animation classes
    root.classList.remove('animation-smooth', 'animation-bouncy', 'animation-minimal', 'animation-energetic');
    
    // Add new animation class
    root.classList.add(`animation-${style}`);
    
    // Create or update animation style rules
    const existingAnimationStyles = document.getElementById('dynamic-animation-styles');
    if (existingAnimationStyles) {
      existingAnimationStyles.remove();
    }
    
    const animationStyles = document.createElement('style');
    animationStyles.id = 'dynamic-animation-styles';
    
    let cssRules = '';
    
    switch (style) {
      case 'bouncy':
        cssRules = `
          .animation-bouncy * {
            animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55) !important;
            transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55) !important;
          }
          .animation-bouncy .animate-fade-in {
            animation: fade-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }
          .animation-bouncy .animate-slide-right {
            animation: slide-right 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }
          .animation-bouncy button:hover {
            transform: scale(1.1) !important;
          }
        `;
        break;
      case 'minimal':
        cssRules = `
          .animation-minimal * {
            animation-duration: 0.15s !important;
            transition-duration: 0.1s !important;
          }
          .animation-minimal .animate-bounce {
            animation: none !important;
          }
          .animation-minimal .animate-pulse {
            animation: none !important;
          }
          .animation-minimal button:hover {
            transform: scale(1.02) !important;
          }
        `;
        break;
      case 'energetic':
        cssRules = `
          .animation-energetic * {
            animation-duration: 0.3s !important;
            transition-duration: 0.2s !important;
            animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
          }
          .animation-energetic .animate-float {
            animation: float 1.2s ease-in-out infinite;
          }
          .animation-energetic .animate-glow {
            animation: glow 0.8s ease-in-out infinite alternate;
          }
          .animation-energetic button:hover {
            transform: scale(1.15) rotate(2deg) !important;
          }
          .animation-energetic .animate-fade-in {
            animation: fade-in 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
        `;
        break;
      default: // smooth
        cssRules = `
          .animation-smooth * {
            animation-timing-function: ease-out !important;
            transition-timing-function: ease-out !important;
          }
          .animation-smooth button:hover {
            transform: scale(1.05) !important;
          }
        `;
    }
    
    animationStyles.textContent = cssRules;
    document.head.appendChild(animationStyles);
    
    localStorage.setItem('animation-style', style);
  };

  // Auto-apply background animation changes
  useEffect(() => {
    // Store background preference in localStorage
    localStorage.setItem('background-animation', systemPreferences.backgroundAnimation);
    
    // Dispatch custom event to notify background change
    window.dispatchEvent(new CustomEvent('backgroundAnimationChange', {
      detail: { style: systemPreferences.backgroundAnimation }
    }));
  }, [systemPreferences.backgroundAnimation]);

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value);
    localStorage.setItem('font-size', value[0].toString());
    applyFontSizeChanges(value[0], toast);
  };

  const handleAnimationSpeedChange = (value: number[]) => {
    setAnimationSpeed(value);
    applyAnimationSpeed(value[0]);
    toast({ 
      title: "Animation Speed Updated", 
      description: `Animation speed set to ${value[0]}x` 
    });
  };

  const handleFontFamilyChange = (value: string) => {
    setSystemPreferences(prev => ({ ...prev, fontFamily: value }));
    applyFontFamily(value);
    toast({ 
      title: "Font Updated", 
      description: `Font family changed to ${value.charAt(0).toUpperCase() + value.slice(1)}` 
    });
  };

  const handleAnimationStyleChange = (value: string) => {
    setSystemPreferences(prev => ({ ...prev, animationStyle: value }));
    applyAnimationStyle(value);
    toast({ 
      title: "Animation Updated", 
      description: `Animation style changed to ${value.charAt(0).toUpperCase() + value.slice(1)}` 
    });
  };

  const handleBackgroundAnimationChange = (value: string) => {
    setSystemPreferences(prev => ({ ...prev, backgroundAnimation: value }));
    toast({ 
      title: "Background Updated", 
      description: `Background animation changed to ${value.charAt(0).toUpperCase() + value.slice(1)}` 
    });
  };

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
          Appearance Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label>Theme</Label>
            <p className="text-sm text-gray-500">Choose your preferred theme</p>
          </div>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Background Animation (Auto-applied)</Label>
          <Select 
            value={systemPreferences.backgroundAnimation} 
            onValueChange={handleBackgroundAnimationChange}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gradient">Gradient Orbs</SelectItem>
              <SelectItem value="particles">Connected Particles</SelectItem>
              <SelectItem value="floating">Floating Particles</SelectItem>
              <SelectItem value="geometric">Geometric Shapes</SelectItem>
              <SelectItem value="waves">Wave Pattern</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500">
            Changes are applied instantly across the entire application
          </p>
        </div>

        <div className="space-y-3">
          <Label>Font Size: {fontSize[0]}px (Auto-adjusts all spacing & layout)</Label>
          <Slider
            value={fontSize}
            onValueChange={handleFontSizeChange}
            max={24}
            min={12}
            step={1}
            className="w-full"
          />
          <p className="text-xs text-gray-500">
            Changing font size will automatically adjust header height, spacing, padding, and all layout elements
          </p>
        </div>

        <div className="space-y-3">
          <Label>Animation Speed: {animationSpeed[0]}x (Auto-applied)</Label>
          <Slider
            value={animationSpeed}
            onValueChange={handleAnimationSpeedChange}
            max={3}
            min={0.1}
            step={0.1}
            className="w-full"
          />
          <p className="text-xs text-gray-500">
            Adjust how fast or slow animations play throughout the application (0.1x = very slow, 3x = very fast)
          </p>
        </div>

        <div className="space-y-3">
          <Label>Font Family (Auto-applied)</Label>
          <Select 
            value={systemPreferences.fontFamily} 
            onValueChange={handleFontFamilyChange}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inter">Inter</SelectItem>
              <SelectItem value="roboto">Roboto</SelectItem>
              <SelectItem value="poppins">Poppins</SelectItem>
              <SelectItem value="montserrat">Montserrat</SelectItem>
              <SelectItem value="opensans">Open Sans</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500">
            Changes are applied instantly across the entire application
          </p>
        </div>

        <div className="space-y-3">
          <Label>Animation Style (Auto-applied)</Label>
          <Select 
            value={systemPreferences.animationStyle} 
            onValueChange={handleAnimationStyleChange}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="smooth">Smooth</SelectItem>
              <SelectItem value="bouncy">Bouncy</SelectItem>
              <SelectItem value="minimal">Minimal</SelectItem>
              <SelectItem value="energetic">Energetic</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500">
            Changes are applied instantly across the entire application
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
