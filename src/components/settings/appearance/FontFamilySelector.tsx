
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { applyFontFamily } from '../utils/appearanceUtils';

interface FontFamilySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const FontFamilySelector: React.FC<FontFamilySelectorProps> = ({ value, onChange }) => {
  const { toast } = useToast();

  const handleChange = (newValue: string) => {
    onChange(newValue);
    applyFontFamily(newValue);
    toast({ 
      title: "Font Updated", 
      description: `Font family changed to ${newValue.charAt(0).toUpperCase() + newValue.slice(1)}` 
    });
  };

  return (
    <div className="space-y-3">
      <Label>Font Family (Auto-applied)</Label>
      <Select value={value} onValueChange={handleChange}>
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
  );
};
