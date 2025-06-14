import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface DepartmentTheme {
  id: string;
  name: string;
  department: string;
  primaryColor: string;
  secondaryColor: string;
  preview: string;
}

const departmentThemes: DepartmentTheme[] = [
  {
    id: 'ccs',
    name: 'CCS Theme',
    department: 'College of Computer Studies',
    primaryColor: '#8B5CF6', // Purple
    secondaryColor: '#FCD34D', // Yellow
    preview: 'bg-gradient-to-r from-purple-500 to-yellow-400'
  },
  {
    id: 'cba',
    name: 'CBA Theme',
    department: 'College of Business Accountancy',
    primaryColor: '#10B981', // Green
    secondaryColor: '#FFFFFF', // White
    preview: 'bg-gradient-to-r from-green-500 to-white'
  }
];

interface DepartmentThemeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const DepartmentThemeSelector: React.FC<DepartmentThemeSelectorProps> = ({
  value,
  onChange
}) => {
  const selectedTheme = departmentThemes.find(theme => theme.id === value) || departmentThemes[0];

  const applyDepartmentTheme = (themeId: string) => {
    const theme = departmentThemes.find(t => t.id === themeId);
    if (!theme) return;

    const root = document.documentElement;
    
    // Apply CSS custom properties for the department theme
    root.style.setProperty('--dept-primary', theme.primaryColor);
    root.style.setProperty('--dept-secondary', theme.secondaryColor);
    
    // Update existing color variables to match department theme
    const style = document.createElement('style');
    style.id = 'department-theme-styles';
    
    // Remove existing department theme styles
    const existingStyles = document.getElementById('department-theme-styles');
    if (existingStyles) {
      existingStyles.remove();
    }
    
    style.textContent = `
      :root {
        --primary: ${theme.primaryColor};
        --primary-foreground: ${theme.secondaryColor === '#FFFFFF' ? '#000000' : '#FFFFFF'};
        --accent: ${theme.secondaryColor};
        --accent-foreground: ${theme.primaryColor};
      }
      
      .bg-gradient-to-r.from-blue-600.via-purple-600.to-pink-600 {
        background: linear-gradient(to right, ${theme.primaryColor}, ${theme.secondaryColor}) !important;
      }
      
      .text-blue-600 {
        color: ${theme.primaryColor} !important;
      }
      
      .hover\\:bg-blue-50:hover {
        background-color: ${theme.primaryColor}10 !important;
      }
      
      .hover\\:border-blue-300:hover {
        border-color: ${theme.primaryColor}80 !important;
      }
      
      .hover\\:text-blue-600:hover {
        color: ${theme.primaryColor} !important;
      }
      
      .bg-blue-500 {
        background-color: ${theme.primaryColor} !important;
      }
      
      .from-blue-500 {
        --tw-gradient-from: ${theme.primaryColor} !important;
      }
      
      .to-blue-600 {
        --tw-gradient-to: ${theme.primaryColor} !important;
      }
    `;
    
    document.head.appendChild(style);
    localStorage.setItem('department-theme', themeId);
  };

  const handleThemeChange = (themeId: string) => {
    onChange(themeId);
    applyDepartmentTheme(themeId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label>Department Theme</Label>
          <p className="text-sm text-gray-500">Choose a theme based on your department</p>
        </div>
        <Select value={value} onValueChange={handleThemeChange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {departmentThemes.map((theme) => (
              <SelectItem key={theme.id} value={theme.id}>
                <div className="flex items-center space-x-2">
                  <div 
                    className={`w-4 h-4 rounded-full ${theme.preview}`}
                  />
                  <span>{theme.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Theme Preview */}
      <div className="p-4 rounded-lg border bg-white/50 dark:bg-gray-800/50">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium">{selectedTheme.name}</h4>
          <div className="flex space-x-2">
            <Badge 
              variant="outline" 
              className="text-xs"
              style={{ 
                borderColor: selectedTheme.primaryColor,
                color: selectedTheme.primaryColor 
              }}
            >
              Primary
            </Badge>
            <Badge 
              variant="outline" 
              className="text-xs"
              style={{ 
                borderColor: selectedTheme.secondaryColor === '#FFFFFF' ? '#E5E7EB' : selectedTheme.secondaryColor,
                color: selectedTheme.secondaryColor === '#FFFFFF' ? '#6B7280' : selectedTheme.secondaryColor 
              }}
            >
              Secondary
            </Badge>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {selectedTheme.department}
        </p>
        <div 
          className={`h-8 rounded ${selectedTheme.preview}`}
          title="Theme Preview"
        />
      </div>
    </div>
  );
};
