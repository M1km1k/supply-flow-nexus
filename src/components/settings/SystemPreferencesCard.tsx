
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useSupply } from '@/contexts/SupplyContext';
import { useToast } from '@/hooks/use-toast';

export const SystemPreferencesCard: React.FC = () => {
  const { lowStockThreshold, setLowStockThreshold } = useSupply();
  const { toast } = useToast();
  
  const [systemPreferences, setSystemPreferences] = useState({
    defaultUnit: 'pieces',
    dateFormat: 'MM/DD/YYYY'
  });

  const handleThresholdChange = (value: number[]) => {
    setLowStockThreshold(value[0]);
  };

  const handleSaveSystemPreferences = () => {
    toast({ title: "Success", description: "System preferences updated successfully!" });
  };

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
          System Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="defaultUnit">Default Unit</Label>
          <Select 
            value={systemPreferences.defaultUnit} 
            onValueChange={(value) => setSystemPreferences(prev => ({ ...prev, defaultUnit: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pieces">Pieces</SelectItem>
              <SelectItem value="bottles">Bottles</SelectItem>
              <SelectItem value="sheets">Sheets</SelectItem>
              <SelectItem value="boxes">Boxes</SelectItem>
              <SelectItem value="kg">Kilograms</SelectItem>
              <SelectItem value="liters">Liters</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Low Stock Threshold: {lowStockThreshold}</Label>
          <Slider
            value={[lowStockThreshold]}
            onValueChange={handleThresholdChange}
            max={100}
            min={1}
            step={1}
            className="w-full"
          />
        </div>
        
        <div>
          <Label htmlFor="dateFormat">Date Format</Label>
          <Select 
            value={systemPreferences.dateFormat} 
            onValueChange={(value) => setSystemPreferences(prev => ({ ...prev, dateFormat: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleSaveSystemPreferences} className="w-full">
          Save System Preferences
        </Button>
      </CardContent>
    </Card>
  );
};
