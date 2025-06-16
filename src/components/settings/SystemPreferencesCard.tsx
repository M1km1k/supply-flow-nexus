import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useSupply } from '@/contexts/SupplyContext';
import { useToast } from '@/hooks/use-toast';

export const SystemPreferencesCard: React.FC = () => {
  const { lowStockThreshold, setLowStockThreshold } = useSupply();
  const { toast } = useToast();
  
  const [systemPreferences, setSystemPreferences] = useState({
    defaultUnit: 'pieces',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
    autoSave: true,
    notifications: true,
    soundEffects: false,
    autoRefresh: 30,
    compactView: false,
    showTooltips: true,
    language: 'en'
  });

  // Load preferences from localStorage on component mount
  useEffect(() => {
    const savedPrefs = localStorage.getItem('system-preferences');
    if (savedPrefs) {
      const parsed = JSON.parse(savedPrefs);
      setSystemPreferences(prev => ({ ...prev, ...parsed }));
      
      // Apply loaded preferences
      applySystemPreferences(parsed);
    }
  }, []);

  const applySystemPreferences = (prefs: typeof systemPreferences) => {
    // Apply compact view
    if (prefs.compactView) {
      document.documentElement.classList.add('compact-view');
    } else {
      document.documentElement.classList.remove('compact-view');
    }

    // Apply tooltips setting
    const tooltipElements = document.querySelectorAll('[title]');
    tooltipElements.forEach(el => {
      if (prefs.showTooltips) {
        el.removeAttribute('data-tooltip-disabled');
      } else {
        el.setAttribute('data-tooltip-disabled', 'true');
      }
    });

    // Apply auto-refresh interval
    if (prefs.autoRefresh > 0) {
      const event = new CustomEvent('autoRefreshChange', { 
        detail: { interval: prefs.autoRefresh * 1000 } 
      });
      window.dispatchEvent(event);
    }

    // Apply sound effects setting
    const soundEvent = new CustomEvent('soundEffectsChange', { 
      detail: { enabled: prefs.soundEffects } 
    });
    window.dispatchEvent(soundEvent);
  };

  const handleThresholdChange = (value: number[]) => {
    setLowStockThreshold(value[0]);
  };

  const handlePreferenceChange = (key: string, value: any) => {
    const newPrefs = { ...systemPreferences, [key]: value };
    setSystemPreferences(newPrefs);
    
    // Save to localStorage
    localStorage.setItem('system-preferences', JSON.stringify(newPrefs));
    
    // Apply changes immediately
    applySystemPreferences(newPrefs);

    // Dispatch currency change event for system-wide updates
    if (key === 'currency') {
      const currencyEvent = new CustomEvent('currencyChange', { 
        detail: { currency: value } 
      });
      window.dispatchEvent(currencyEvent);
    }
  };

  const handleSaveSystemPreferences = () => {
    localStorage.setItem('system-preferences', JSON.stringify(systemPreferences));
    applySystemPreferences(systemPreferences);
    
    toast({ 
      title: "Success", 
      description: "System preferences updated and applied successfully!" 
    });
  };

  const resetToDefaults = () => {
    const defaults = {
      defaultUnit: 'pieces',
      dateFormat: 'MM/DD/YYYY',
      currency: 'USD',
      autoSave: true,
      notifications: true,
      soundEffects: false,
      autoRefresh: 30,
      compactView: false,
      showTooltips: true,
      language: 'en'
    };
    
    setSystemPreferences(defaults);
    setLowStockThreshold(10);
    localStorage.setItem('system-preferences', JSON.stringify(defaults));
    applySystemPreferences(defaults);
    
    toast({ 
      title: "Reset Complete", 
      description: "All system preferences reset to defaults!" 
    });
  };

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-none rounded-none h-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
          System Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-96 overflow-y-auto">
        <div>
          <Label htmlFor="defaultUnit">Default Unit</Label>
          <Select 
            value={systemPreferences.defaultUnit} 
            onValueChange={(value) => handlePreferenceChange('defaultUnit', value)}
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
            onValueChange={(value) => handlePreferenceChange('dateFormat', value)}
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

        <div>
          <Label htmlFor="currency">Currency</Label>
          <Select 
            value={systemPreferences.currency} 
            onValueChange={(value) => handlePreferenceChange('currency', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD ($)</SelectItem>
              <SelectItem value="EUR">EUR (€)</SelectItem>
              <SelectItem value="GBP">GBP (£)</SelectItem>
              <SelectItem value="JPY">JPY (¥)</SelectItem>
              <SelectItem value="CAD">CAD ($)</SelectItem>
              <SelectItem value="PHP">PHP (₱)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="language">Language</Label>
          <Select 
            value={systemPreferences.language} 
            onValueChange={(value) => handlePreferenceChange('language', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
              <SelectItem value="it">Italiano</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Auto Refresh Interval: {systemPreferences.autoRefresh}s</Label>
          <Slider
            value={[systemPreferences.autoRefresh]}
            onValueChange={(value) => handlePreferenceChange('autoRefresh', value[0])}
            max={300}
            min={10}
            step={10}
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="autoSave">Auto Save</Label>
          <Switch
            id="autoSave"
            checked={systemPreferences.autoSave}
            onCheckedChange={(checked) => handlePreferenceChange('autoSave', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="notifications">Enable Notifications</Label>
          <Switch
            id="notifications"
            checked={systemPreferences.notifications}
            onCheckedChange={(checked) => handlePreferenceChange('notifications', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="soundEffects">Sound Effects</Label>
          <Switch
            id="soundEffects"
            checked={systemPreferences.soundEffects}
            onCheckedChange={(checked) => handlePreferenceChange('soundEffects', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="compactView">Compact View</Label>
          <Switch
            id="compactView"
            checked={systemPreferences.compactView}
            onCheckedChange={(checked) => handlePreferenceChange('compactView', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="showTooltips">Show Tooltips</Label>
          <Switch
            id="showTooltips"
            checked={systemPreferences.showTooltips}
            onCheckedChange={(checked) => handlePreferenceChange('showTooltips', checked)}
          />
        </div>

        <div className="flex space-x-2 pt-4">
          <Button onClick={handleSaveSystemPreferences} className="flex-1">
            Save All Preferences
          </Button>
          <Button onClick={resetToDefaults} variant="outline" className="flex-1">
            Reset to Defaults
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
