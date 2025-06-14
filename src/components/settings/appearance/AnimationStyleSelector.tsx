
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { applyAnimationStyle } from '../utils/appearanceUtils';

interface AnimationStyleSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const AnimationStyleSelector: React.FC<AnimationStyleSelectorProps> = ({ value, onChange }) => {
  const { toast } = useToast();

  const handleChange = (newValue: string) => {
    onChange(newValue);
    applyAnimationStyle(newValue);
    toast({ 
      title: "Animation Updated", 
      description: `Animation style changed to ${newValue.charAt(0).toUpperCase() + newValue.slice(1)}` 
    });
  };

  return (
    <div className="space-y-3">
      <Label>Animation Style (Auto-applied)</Label>
      <Select value={value} onValueChange={handleChange}>
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
  );
};
