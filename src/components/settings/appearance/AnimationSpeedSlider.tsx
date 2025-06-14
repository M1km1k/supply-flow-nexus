
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { applyAnimationSpeed } from '../utils/appearanceUtils';

interface AnimationSpeedSliderProps {
  value: number[];
  onChange: (value: number[]) => void;
}

export const AnimationSpeedSlider: React.FC<AnimationSpeedSliderProps> = ({ value, onChange }) => {
  const { toast } = useToast();

  const handleChange = (newValue: number[]) => {
    onChange(newValue);
    applyAnimationSpeed(newValue[0]);
    toast({ 
      title: "Animation Speed Updated", 
      description: `Animation speed set to ${newValue[0]}x` 
    });
  };

  return (
    <div className="space-y-3">
      <Label>Animation Speed: {value[0]}x (Auto-applied)</Label>
      <Slider
        value={value}
        onValueChange={handleChange}
        max={3}
        min={0.1}
        step={0.1}
        defaultValue={[0.6]}
        className="w-full"
      />
      <p className="text-xs text-gray-500">
        Adjust how fast or slow animations play throughout the application (0.1x = very slow, 3x = very fast). Default is 0.6x for natural motion.
      </p>
    </div>
  );
};
