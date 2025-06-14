
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface FontWeightSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const FontWeightSelector: React.FC<FontWeightSelectorProps> = ({ value, onChange }) => {
  const { toast } = useToast();

  const handleChange = (newValue: string) => {
    onChange(newValue);
    
    // Apply font weight immediately
    document.documentElement.style.setProperty('--font-weight', newValue);
    localStorage.setItem('font-weight', newValue);
    
    // Add CSS rule to apply font weight globally
    const existingFontWeightStyles = document.getElementById('dynamic-font-weight-styles');
    if (existingFontWeightStyles) {
      existingFontWeightStyles.remove();
    }
    
    const fontWeightStyles = document.createElement('style');
    fontWeightStyles.id = 'dynamic-font-weight-styles';
    fontWeightStyles.textContent = `
      * {
        font-weight: ${newValue} !important;
      }
      
      .font-bold, .font-semibold, .font-medium {
        font-weight: ${newValue} !important;
      }
      
      h1, h2, h3, h4, h5, h6 {
        font-weight: ${newValue} !important;
      }
    `;
    document.head.appendChild(fontWeightStyles);
    
    const weightNames = {
      '100': 'Thin',
      '200': 'Extra Light',
      '300': 'Light',
      '400': 'Normal',
      '500': 'Medium',
      '600': 'Semi Bold',
      '700': 'Bold',
      '800': 'Extra Bold',
      '900': 'Black'
    };
    
    toast({ 
      title: "Font Weight Updated", 
      description: `Font weight changed to ${weightNames[newValue as keyof typeof weightNames]}` 
    });
  };

  return (
    <div className="space-y-3">
      <Label>Font Weight (Auto-applied)</Label>
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="100">Thin (100)</SelectItem>
          <SelectItem value="200">Extra Light (200)</SelectItem>
          <SelectItem value="300">Light (300)</SelectItem>
          <SelectItem value="400">Normal (400)</SelectItem>
          <SelectItem value="500">Medium (500)</SelectItem>
          <SelectItem value="600">Semi Bold (600)</SelectItem>
          <SelectItem value="700">Bold (700)</SelectItem>
          <SelectItem value="800">Extra Bold (800)</SelectItem>
          <SelectItem value="900">Black (900)</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-xs text-gray-500">
        Adjusts how thick or thin the font appears across the application
      </p>
    </div>
  );
};
