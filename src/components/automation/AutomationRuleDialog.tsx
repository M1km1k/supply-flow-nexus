import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface AutomationRule {
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

interface AutomationRuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rule?: AutomationRule;
  onSave: (rule: Omit<AutomationRule, 'id'> | AutomationRule) => void;
}

export const AutomationRuleDialog: React.FC<AutomationRuleDialogProps> = ({
  open,
  onOpenChange,
  rule,
  onSave
}) => {
  const [formData, setFormData] = useState({
    name: '',
    trigger: 'low_stock' as AutomationRule['trigger'],
    threshold: 10,
    category: '',
    supplier: '',
    actions: [] as AutomationRule['actions'],
    isActive: true
  });
  const [newAction, setNewAction] = useState({
    type: 'email_alert' as AutomationRule['actions'][0]['type'],
    recipients: '',
    message: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    if (rule) {
      setFormData({
        name: rule.name,
        trigger: rule.trigger,
        threshold: rule.condition.threshold || 10,
        category: rule.condition.category || '',
        supplier: rule.condition.supplier || '',
        actions: rule.actions,
        isActive: rule.isActive
      });
    } else {
      setFormData({
        name: '',
        trigger: 'low_stock',
        threshold: 10,
        category: '',
        supplier: '',
        actions: [],
        isActive: true
      });
    }
  }, [rule, open]);

  const handleAddAction = () => {
    if (newAction.type) {
      const action: AutomationRule['actions'][0] = {
        type: newAction.type,
        ...(newAction.recipients && { recipients: newAction.recipients.split(',').map(r => r.trim()) }),
        ...(newAction.message && { message: newAction.message })
      };
      setFormData(prev => ({
        ...prev,
        actions: [...prev.actions, action]
      }));
      setNewAction({ type: 'email_alert', recipients: '', message: '' });
    }
  };

  const handleRemoveAction = (index: number) => {
    setFormData(prev => ({
      ...prev,
      actions: prev.actions.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Rule name is required",
        variant: "destructive"
      });
      return;
    }

    if (formData.actions.length === 0) {
      toast({
        title: "Error", 
        description: "At least one action is required",
        variant: "destructive"
      });
      return;
    }

    const ruleData = {
      ...(rule && { id: rule.id }),
      name: formData.name,
      trigger: formData.trigger,
      condition: {
        ...(formData.threshold && { threshold: formData.threshold }),
        ...(formData.category && { category: formData.category }),
        ...(formData.supplier && { supplier: formData.supplier })
      },
      actions: formData.actions,
      isActive: formData.isActive
    };

    onSave(ruleData);
    onOpenChange(false);
    toast({
      title: "Success",
      description: rule ? "Rule updated successfully" : "Rule created successfully"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{rule ? 'Edit Automation Rule' : 'Add New Automation Rule'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Rule Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter rule name"
              />
            </div>

            <div>
              <Label htmlFor="trigger">Trigger</Label>
              <Select value={formData.trigger} onValueChange={(value) => setFormData(prev => ({ ...prev, trigger: value as AutomationRule['trigger'] }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low_stock">Low Stock</SelectItem>
                  <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                  <SelectItem value="supplier_delay">Supplier Delay</SelectItem>
                  <SelectItem value="new_item">New Item</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Conditions */}
          <div className="space-y-4">
            <h4 className="font-medium">Conditions</h4>
            
            {(formData.trigger === 'low_stock' || formData.trigger === 'out_of_stock') && (
              <div>
                <Label htmlFor="threshold">Stock Threshold</Label>
                <Input
                  id="threshold"
                  type="number"
                  value={formData.threshold}
                  onChange={(e) => setFormData(prev => ({ ...prev, threshold: Number(e.target.value) }))}
                />
              </div>
            )}

            <div>
              <Label htmlFor="category">Category (Optional)</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                placeholder="Filter by category"
              />
            </div>

            <div>
              <Label htmlFor="supplier">Supplier (Optional)</Label>
              <Input
                id="supplier"
                value={formData.supplier}
                onChange={(e) => setFormData(prev => ({ ...prev, supplier: e.target.value }))}
                placeholder="Filter by supplier"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <h4 className="font-medium">Actions</h4>
            
            {/* Existing Actions */}
            <div className="space-y-2">
              {formData.actions.map((action, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{action.type.replace('_', ' ')}</Badge>
                    {action.recipients && (
                      <span className="text-sm text-gray-600">{action.recipients.join(', ')}</span>
                    )}
                    {action.message && (
                      <span className="text-sm text-gray-600">"{action.message}"</span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveAction(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Add New Action */}
            <div className="border rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>Action Type</Label>
                  <Select value={newAction.type} onValueChange={(value) => setNewAction(prev => ({ ...prev, type: value as AutomationRule['actions'][0]['type'] }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email_alert">Email Alert</SelectItem>
                      <SelectItem value="reorder">Auto Reorder</SelectItem>
                      <SelectItem value="notify_admin">Notify Admin</SelectItem>
                      <SelectItem value="update_status">Update Status</SelectItem>
                      <SelectItem value="generate_report">Generate Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {newAction.type === 'email_alert' && (
                  <div>
                    <Label>Recipients (comma-separated)</Label>
                    <Input
                      value={newAction.recipients}
                      onChange={(e) => setNewAction(prev => ({ ...prev, recipients: e.target.value }))}
                      placeholder="email1@example.com, email2@example.com"
                    />
                  </div>
                )}
              </div>

              {newAction.type === 'email_alert' && (
                <div>
                  <Label>Message (Optional)</Label>
                  <Input
                    value={newAction.message}
                    onChange={(e) => setNewAction(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Custom message"
                  />
                </div>
              )}

              <Button onClick={handleAddAction} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Action
              </Button>
            </div>
          </div>

          {/* Active Status */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: !!checked }))}
            />
            <Label htmlFor="isActive">Rule is active</Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {rule ? 'Update Rule' : 'Create Rule'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
