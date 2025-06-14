
import React, { useState } from 'react';
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
  const [systemPreferences, setSystemPreferences] = useState({
    fontFamily: 'inter',
    animationStyle: 'smooth'
  });

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value);
    applyFontSizeChanges(value[0], toast);
  };

  const handleSaveSystemPreferences = () => {
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

    document.documentElement.style.fontFamily = getFontFamily(systemPreferences.fontFamily);
    document.documentElement.setAttribute('data-animation-style', systemPreferences.animationStyle);
    toast({ title: "Success", description: "System preferences updated successfully!" });
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
          <Label>Font Family</Label>
          <Select 
            value={systemPreferences.fontFamily} 
            onValueChange={(value) => setSystemPreferences(prev => ({ ...prev, fontFamily: value }))}
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
        </div>

        <div className="space-y-3">
          <Label>Animation Style</Label>
          <Select 
            value={systemPreferences.animationStyle} 
            onValueChange={(value) => setSystemPreferences(prev => ({ ...prev, animationStyle: value }))}
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
        </div>
      </CardContent>
    </Card>
  );
};
