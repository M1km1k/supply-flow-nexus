
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AutomationRule } from './AutomationRuleDialog';

interface DeleteRuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rule: AutomationRule | null;
  onConfirm: () => void;
}

export const DeleteRuleDialog: React.FC<DeleteRuleDialogProps> = ({
  open,
  onOpenChange,
  rule,
  onConfirm
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Automation Rule</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the rule "{rule?.name}"? This action cannot be undone.
            {rule?.isActive && (
              <span className="block mt-2 text-orange-600 dark:text-orange-400 font-medium">
                This rule is currently active and will stop running immediately.
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete Rule
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
