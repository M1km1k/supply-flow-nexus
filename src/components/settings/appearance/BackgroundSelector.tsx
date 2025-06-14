
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface BackgroundSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ value, onChange }) => {
  const { toast } = useToast();

  const handleChange = (newValue: string) => {
    onChange(newValue);
    toast({ 
      title: "Background Updated", 
      description: `Background animation changed to ${newValue.charAt(0).toUpperCase() + newValue.slice(1)}` 
    });
  };

  return (
    <div className="space-y-3">
      <Label>Background Animation (Auto-applied)</Label>
      <Select value={value} onValueChange={handleChange}>
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
  );
};
