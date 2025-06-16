
import React, { useState, useEffect } from 'react';
import { ThemeSelector } from './appearance/ThemeSelector';
import { BackgroundSelector } from './appearance/BackgroundSelector';
import { FontSizeSlider } from './appearance/FontSizeSlider';
import { AnimationSpeedSlider } from './appearance/AnimationSpeedSlider';
import { FontFamilySelector } from './appearance/FontFamilySelector';
import { FontWeightSelector } from './appearance/FontWeightSelector';
import { AnimationStyleSelector } from './appearance/AnimationStyleSelector';
import { DepartmentThemeSelector } from './appearance/DepartmentThemeSelector';
import { applyFontFamily, applyAnimationStyle, applyAnimationSpeed } from './utils/appearanceUtils';
import { applyFontSizeChanges } from '@/utils/fontSizeUtils';
import { useToast } from '@/hooks/use-toast';

export const AppearanceCard: React.FC = () => {
  const { toast } = useToast();
  const [fontSize, setFontSize] = useState([16]);
  const [animationSpeed, setAnimationSpeed] = useState([0.6]);
  const [systemPreferences, setSystemPreferences] = useState({
    fontFamily: 'inter',
    fontWeight: '400',
    animationStyle: 'smooth',
    backgroundAnimation: 'gradient',
    departmentTheme: 'default'
  });

  useEffect(() => {
    const savedFontFamily = localStorage.getItem('font-family') || 'inter';
    const savedFontWeight = localStorage.getItem('font-weight') || '400';
    const savedAnimationStyle = localStorage.getItem('animation-style') || 'smooth';
    const savedBackgroundAnimation = localStorage.getItem('background-animation') || 'gradient';
    const savedDepartmentTheme = localStorage.getItem('department-theme') || 'default';
    const savedFontSize = parseInt(localStorage.getItem('font-size') || '16');
    const savedAnimationSpeed = parseFloat(localStorage.getItem('animation-speed') || '0.6');

    const validDepartmentTheme = ['default', 'ccs', 'cba'].includes(savedDepartmentTheme) ? savedDepartmentTheme : 'default';

    setSystemPreferences({
      fontFamily: savedFontFamily,
      fontWeight: savedFontWeight,
      animationStyle: savedAnimationStyle,
      backgroundAnimation: savedBackgroundAnimation,
      departmentTheme: validDepartmentTheme
    });
    setFontSize([savedFontSize]);
    setAnimationSpeed([savedAnimationSpeed]);

    applyFontFamily(savedFontFamily);
    applyAnimationStyle(savedAnimationStyle);
    applyAnimationSpeed(savedAnimationSpeed);
    applyFontSizeChanges(savedFontSize, toast);

    // Apply saved font weight
    if (savedFontWeight !== '400') {
      document.documentElement.style.setProperty('--font-weight', savedFontWeight);
      
      const fontWeightStyles = document.createElement('style');
      fontWeightStyles.id = 'dynamic-font-weight-styles';
      fontWeightStyles.textContent = `
        * {
          font-weight: ${savedFontWeight} !important;
        }
        
        .font-bold, .font-semibold, .font-medium {
          font-weight: ${savedFontWeight} !important;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-weight: ${savedFontWeight} !important;
        }
      `;
      document.head.appendChild(fontWeightStyles);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('background-animation', systemPreferences.backgroundAnimation);
    
    window.dispatchEvent(new CustomEvent('backgroundAnimationChange', {
      detail: { style: systemPreferences.backgroundAnimation }
    }));
  }, [systemPreferences.backgroundAnimation]);

  const handleFontFamilyChange = (value: string) => {
    setSystemPreferences(prev => ({ ...prev, fontFamily: value }));
  };

  const handleFontWeightChange = (value: string) => {
    setSystemPreferences(prev => ({ ...prev, fontWeight: value }));
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
    <div className="space-y-6">
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

      <FontWeightSelector 
        value={systemPreferences.fontWeight}
        onChange={handleFontWeightChange}
      />

      <AnimationStyleSelector 
        value={systemPreferences.animationStyle}
        onChange={handleAnimationStyleChange}
      />
    </div>
  );
};
