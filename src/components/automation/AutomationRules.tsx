
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Zap, Plus, Settings, Bell, Package, Users, Mail } from 'lucide-react';
import { useSupply } from '@/contexts/SupplyContext';
import { useToast } from '@/hooks/use-toast';

interface AutomationRule {
  id: string;
  name: string;
  trigger: 'low_stock' | 'out_of_stock' | 'supplier_delay' | 'new_item' | 'scheduled';
  condition: {
    threshold?: number;
    category?: string;
    supplier?: string;
  };
  actions: {
    type: 'email_alert' | 'reorder' | 'notify_admin' | 'update_status' | 'generate_report';
    recipients?: string[];
    message?: string;
  }[];
  isActive: boolean;
  lastTriggered?: string;
}

const defaultRules: AutomationRule[] = [
  {
    id: '1',
    name: 'Low Stock Alert',
    trigger: 'low_stock',
    condition: { threshold: 10 },
    actions: [
      { type: 'email_alert', recipients: ['admin@institution.edu'], message: 'Low stock alert triggered' },
      { type: 'notify_admin' }
    ],
    isActive: true,
    lastTriggered: '2024-06-13T10:30:00Z'
  },
  {
    id: '2',
    name: 'Auto Reorder Electronics',
    trigger: 'low_stock',
    condition: { threshold: 5, category: 'Electronics' },
    actions: [
      { type: 'reorder' },
      { type: 'email_alert', recipients: ['procurement@institution.edu'] }
    ],
    isActive: true
  },
  {
    id: '3',
    name: 'Weekly Inventory Report',
    trigger: 'scheduled',
    condition: {},
    actions: [
      { type: 'generate_report' },
      { type: 'email_alert', recipients: ['management@institution.edu'] }
    ],
    isActive: false
  }
];

export const AutomationRules: React.FC = () => {
  const [rules, setRules] = useState<AutomationRule[]>(defaultRules);
  const [showAddForm, setShowAddForm] = useState(false);
  const { inventory, suppliers } = useSupply();
  const { toast } = useToast();

  const toggleRule = (ruleId: string) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule
    ));
    toast({ title: "Rule updated", description: "Automation rule status changed successfully." });
  };

  const getTriggerIcon = (trigger: string) => {
    switch (trigger) {
      case 'low_stock': return <Package className="w-4 h-4" />;
      case 'out_of_stock': return <Package className="w-4 h-4" />;
      case 'supplier_delay': return <Users className="w-4 h-4" />;
      case 'new_item': return <Plus className="w-4 h-4" />;
      case 'scheduled': return <Settings className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'email_alert': return <Mail className="w-3 h-3" />;
      case 'reorder': return <Package className="w-3 h-3" />;
      case 'notify_admin': return <Bell className="w-3 h-3" />;
      default: return <Settings className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Zap className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Automation Rules</h2>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="animate-bounce-in">
          <Plus className="w-4 h-4 mr-2" />
          Add Rule
        </Button>
      </div>

      {/* Active Rules Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 dark:text-green-300">Active Rules</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {rules.filter(r => r.isActive).length}
                </p>
              </div>
              <Zap className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Rules</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{rules.length}</p>
              </div>
              <Settings className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Triggered Today</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">3</p>
              </div>
              <Bell className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rules List */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Automation Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rules.map((rule, index) => (
              <div 
                key={rule.id} 
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getTriggerIcon(rule.trigger)}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{rule.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Trigger: {rule.trigger.replace('_', ' ').toUpperCase()}
                        {rule.condition.threshold && ` (threshold: ${rule.condition.threshold})`}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-1">
                    {rule.actions.map((action, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        <span className="flex items-center space-x-1">
                          {getActionIcon(action.type)}
                          <span>{action.type.replace('_', ' ')}</span>
                        </span>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {rule.lastTriggered && (
                    <p className="text-xs text-gray-500">
                      Last: {new Date(rule.lastTriggered).toLocaleDateString()}
                    </p>
                  )}
                  <Switch
                    checked={rule.isActive}
                    onCheckedChange={() => toggleRule(rule.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
