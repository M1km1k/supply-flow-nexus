import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Plus } from 'lucide-react';
import { useSupply } from '@/contexts/SupplyContext';
import { useToast } from '@/hooks/use-toast';
import { AutomationRuleDialog, AutomationRule } from './AutomationRuleDialog';
import { AutomationStatsOverview } from './AutomationStatsOverview';
import { AutomationRuleItem } from './AutomationRuleItem';
import { DeleteRuleDialog } from './DeleteRuleDialog';

const defaultRules: AutomationRule[] = [];

export const AutomationRules: React.FC = () => {
  const [rules, setRules] = useState<AutomationRule[]>(defaultRules);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<AutomationRule | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ruleToDelete, setRuleToDelete] = useState<AutomationRule | null>(null);
  const { inventory, suppliers } = useSupply();
  const { toast } = useToast();

  const toggleRule = (ruleId: string) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule
    ));
    toast({ title: "Rule updated", description: "Automation rule status changed successfully." });
  };

  const handleSaveRule = (ruleData: Omit<AutomationRule, 'id'> | AutomationRule) => {
    if ('id' in ruleData) {
      // Editing existing rule
      setRules(prev => prev.map(rule => 
        rule.id === ruleData.id ? ruleData as AutomationRule : rule
      ));
      toast({ title: "Rule updated", description: "Automation rule updated successfully." });
    } else {
      // Adding new rule
      const newRule: AutomationRule = {
        ...ruleData,
        id: Math.random().toString(36).substr(2, 9)
      };
      setRules(prev => [...prev, newRule]);
      toast({ title: "Rule created", description: "New automation rule created successfully." });
    }
    setEditingRule(undefined);
  };

  const handleEditRule = (rule: AutomationRule) => {
    setEditingRule(rule);
    setDialogOpen(true);
  };

  const handleAddRule = () => {
    setEditingRule(undefined);
    setDialogOpen(true);
  };

  const handleDeleteRule = (rule: AutomationRule) => {
    setRuleToDelete(rule);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteRule = () => {
    if (ruleToDelete) {
      setRules(prev => prev.filter(rule => rule.id !== ruleToDelete.id));
      toast({ 
        title: "Rule deleted", 
        description: `Automation rule "${ruleToDelete.name}" has been deleted.` 
      });
      setRuleToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Zap className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Automation Rules</h2>
        </div>
        <Button onClick={handleAddRule} className="animate-bounce-in">
          <Plus className="w-4 h-4 mr-2" />
          Add Rule
        </Button>
      </div>

      <AutomationStatsOverview rules={rules} />

      {/* Rules List */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Automation Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rules.length > 0 ? (
              rules.map((rule, index) => (
                <AutomationRuleItem
                  key={rule.id}
                  rule={rule}
                  index={index}
                  onToggle={toggleRule}
                  onEdit={handleEditRule}
                  onDelete={handleDeleteRule}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No automation rules configured yet.</p>
                <p className="text-sm">Click "Add Rule" to create your first automation rule.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AutomationRuleDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        rule={editingRule}
        onSave={handleSaveRule}
      />

      <DeleteRuleDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        rule={ruleToDelete}
        onConfirm={confirmDeleteRule}
      />
    </div>
  );
};
