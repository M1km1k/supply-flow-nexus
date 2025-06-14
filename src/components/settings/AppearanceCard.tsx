
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeSelector } from './appearance/ThemeSelector';
import { BackgroundSelector } from './appearance/BackgroundSelector';
import { FontSizeSlider } from './appearance/FontSizeSlider';
import { AnimationSpeedSlider } from './appearance/AnimationSpeedSlider';
import { FontFamilySelector } from './appearance/FontFamilySelector';
import { AnimationStyleSelector } from './appearance/AnimationStyleSelector';
import { DepartmentThemeSelector } from './appearance/DepartmentThemeSelector';
import { applyFontFamily, applyAnimationStyle, applyAnimationSpeed } from './utils/appearanceUtils';
import { applyFontSizeChanges } from '@/utils/fontSizeUtils';
import { useToast } from '@/hooks/use-toast';

export const AppearanceCard: React.FC = () => {
  const { toast } = useToast();
  const [fontSize, setFontSize] = useState([16]);
  const [animationSpeed, setAnimationSpeed] = useState([0.6]); // Changed default to 0.6x for slower animations
  const [systemPreferences, setSystemPreferences] = useState({
    fontFamily: 'inter',
    animationStyle: 'smooth',
    backgroundAnimation: 'gradient',
    departmentTheme: 'default'
  });

  // Load preferences from localStorage on component mount
  useEffect(() => {
    const savedFontFamily = localStorage.getItem('font-family') || 'inter';
    const savedAnimationStyle = localStorage.getItem('animation-style') || 'smooth';
    const savedBackgroundAnimation = localStorage.getItem('background-animation') || 'gradient';
    const savedDepartmentTheme = localStorage.getItem('department-theme') || 'default';
    const savedFontSize = parseInt(localStorage.getItem('font-size') || '16');
    const savedAnimationSpeed = parseFloat(localStorage.getItem('animation-speed') || '0.6'); // Changed default to 0.6x

    // Validate department theme (only allow default, ccs or cba now)
    const validDepartmentTheme = ['default', 'ccs', 'cba'].includes(savedDepartmentTheme) ? savedDepartmentTheme : 'default';

    setSystemPreferences({
      fontFamily: savedFontFamily,
      animationStyle: savedAnimationStyle,
      backgroundAnimation: savedBackgroundAnimation,
      departmentTheme: validDepartmentTheme
    });
    setFontSize([savedFontSize]);
    setAnimationSpeed([savedAnimationSpeed]);

    // Apply saved preferences
    applyFontFamily(savedFontFamily);
    applyAnimationStyle(savedAnimationStyle);
    applyAnimationSpeed(savedAnimationSpeed);
    applyFontSizeChanges(savedFontSize, toast);
  }, []);

  // Auto-apply background animation changes
  useEffect(() => {
    localStorage.setItem('background-animation', systemPreferences.backgroundAnimation);
    
    window.dispatchEvent(new CustomEvent('backgroundAnimationChange', {
      detail: { style: systemPreferences.backgroundAnimation }
    }));
  }, [systemPreferences.backgroundAnimation]);

  const handleFontFamilyChange = (value: string) => {
    setSystemPreferences(prev => ({ ...prev, fontFamily: value }));
  };

  const handleAnimationStyleChange = (value: string) => {
    setSystemPreferences(prev => ({ ...prev, animationStyle: value }));
  };

  const handleBackgroundAnimationChange = (value: string) => {
    setSystemPreferences(prev => ({ ...prev, backgroundAnimation: value }));
  };

  const handleDepartmentThemeChange = (value: string) => {
    setSystemPreferences(prev => ({ ...prev, departmentTheme: value }));
  };

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
          Appearance Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ThemeSelector />

        <DepartmentThemeSelector 
          value={systemPreferences.departmentTheme}
          onChange={handleDepartmentThemeChange}
        />

        <BackgroundSelector 
          value={systemPreferences.backgroundAnimation}
          onChange={handleBackgroundAnimationChange}
        />

        <FontSizeSlider 
          value={fontSize}
          onChange={setFontSize}
        />

        <AnimationSpeedSlider 
          value={animationSpeed}
          onChange={setAnimationSpeed}
        />

        <FontFamilySelector 
          value={systemPreferences.fontFamily}
          onChange={handleFontFamilyChange}
        />

        <AnimationStyleSelector 
          value={systemPreferences.animationStyle}
          onChange={handleAnimationStyleChange}
        />
      </CardContent>
    </Card>
  );
};
