
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Grid, Eye, EyeOff } from 'lucide-react';
import { PredictiveAnalytics } from '@/components/analytics/PredictiveAnalytics';
import { AutomationRules } from '@/components/automation/AutomationRules';
import { CalendarWidget } from '@/components/CalendarWidget';
import { MiniChatbot } from '@/components/MiniChatbot';
import { 
  TrendingUp, Zap, Calendar, MessageSquare
} from 'lucide-react';

interface DashboardWidget {
  id: string;
  title: string;
  component: React.ComponentType;
  icon: React.ComponentType<any>;
  size: 'small' | 'medium' | 'large';
  category: 'analytics' | 'operations' | 'management' | 'security';
  requiredRole?: string[];
}

const availableWidgets: DashboardWidget[] = [
  {
    id: 'predictive-analytics',
    title: 'Predictive Analytics',
    component: PredictiveAnalytics,
    icon: TrendingUp,
    size: 'large',
    category: 'analytics',
    requiredRole: ['admin', 'manager']
  },
  {
    id: 'automation-rules',
    title: 'Automation Rules',
    component: AutomationRules,
    icon: Zap,
    size: 'large',
    category: 'operations',
    requiredRole: ['admin', 'manager']
  },
  {
    id: 'delivery-calendar',
    title: 'Delivery Calendar',
    component: CalendarWidget,
    icon: Calendar,
    size: 'medium',
    category: 'operations',
    requiredRole: ['admin', 'manager']
  },
  {
    id: 'system-chatbot',
    title: 'System Assistant',
    component: MiniChatbot,
    icon: MessageSquare,
    size: 'medium',
    category: 'management',
    requiredRole: ['admin', 'manager']
  }
];

interface DashboardWidgetsProps {
  visibleWidgets: string[];
  selectedCategory: string;
  userRole: string;
  onToggleWidget: (widgetId: string) => void;
}

export const DashboardWidgets: React.FC<DashboardWidgetsProps> = ({
  visibleWidgets,
  selectedCategory,
  userRole,
  onToggleWidget
}) => {
  // Staff users should not see any widgets
  if (userRole === 'staff') {
    return null;
  }

  const filteredWidgets = availableWidgets.filter(widget => {
    const hasRole = !widget.requiredRole || widget.requiredRole.includes(userRole);
    const matchesCategory = selectedCategory === 'all' || widget.category === selectedCategory;
    return hasRole && matchesCategory;
  });

  return (
    <>
      {/* Widget Toggle Controls */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Grid className="w-5 h-5" />
            <span>Dashboard Widgets</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {filteredWidgets.map((widget) => (
              <Button
                key={widget.id}
                variant={visibleWidgets.includes(widget.id) ? 'default' : 'outline'}
                size="sm"
                onClick={() => onToggleWidget(widget.id)}
                className="animate-bounce-in"
              >
                {visibleWidgets.includes(widget.id) ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                <widget.icon className="w-4 h-4 mr-2" />
                {widget.title}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dynamic Widget Rendering */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredWidgets
          .filter(widget => visibleWidgets.includes(widget.id))
          .map((widget) => {
            const WidgetComponent = widget.component;
            return (
              <div 
                key={widget.id} 
                className={`animate-slide-up ${
                  widget.size === 'large' ? 'lg:col-span-2 xl:col-span-3' : 
                  widget.size === 'medium' ? 'lg:col-span-1' : 
                  'lg:col-span-1'
                }`}
              >
                <WidgetComponent />
              </div>
            );
          })}
      </div>
    </>
  );
};
