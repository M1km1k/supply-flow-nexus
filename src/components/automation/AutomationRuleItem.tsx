
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Package, Users, Plus, Settings, Mail, Bell, Edit, Trash2 } from 'lucide-react';
import { AutomationRule } from './AutomationRuleDialog';

interface AutomationRuleItemProps {
  rule: AutomationRule;
  index: number;
  onToggle: (ruleId: string) => void;
  onEdit: (rule: AutomationRule) => void;
  onDelete: (rule: AutomationRule) => void;
}

export const AutomationRuleItem: React.FC<AutomationRuleItemProps> = ({
  rule,
  index,
  onToggle,
  onEdit,
  onDelete
}) => {
  const getTriggerIcon = (trigger: string) => {
    switch (trigger) {
      case 'low_stock': return <Package className="w-4 h-4" />;
      case 'out_of_stock': return <Package className="w-4 h-4" />;
      case 'supplier_delay': return <Users className="w-4 h-4" />;
      case 'new_item': return <Plus className="w-4 h-4" />;
      case 'scheduled': return <Settings className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
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
    <div 
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
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(rule)}
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(rule)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
        <Switch
          checked={rule.isActive}
          onCheckedChange={() => onToggle(rule.id)}
        />
      </div>
    </div>
  );
};
