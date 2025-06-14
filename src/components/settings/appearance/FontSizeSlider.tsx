
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { applyFontSizeChanges } from '@/utils/fontSizeUtils';

interface FontSizeSliderProps {
  value: number[];
  onChange: (value: number[]) => void;
}

export const FontSizeSlider: React.FC<FontSizeSliderProps> = ({ value, onChange }) => {
  const { toast } = useToast();

  const handleChange = (newValue: number[]) => {
    onChange(newValue);
    localStorage.setItem('font-size', newValue[0].toString());
    applyFontSizeChanges(newValue[0], toast);
  };

  return (
    <div className="space-y-3">
      <Label>Font Size: {value[0]}px (Auto-adjusts all spacing & layout)</Label>
      <Slider
        value={value}
        onValueChange={handleChange}
        max={24}
        min={12}
        step={1}
        className="w-full"
      />
      <p className="text-xs text-gray-500">
        Changing font size will automatically adjust header height, spacing, padding, and all layout elements
      </p>
    </div>
  );
};
