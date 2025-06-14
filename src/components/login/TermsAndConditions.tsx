
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Info } from 'lucide-react';

export const TermsAndConditions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 hover:bg-gray-100/50 transition-colors"
        >
          <Info className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Terms and Conditions - System Use Guidelines</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm text-gray-700">
          <section>
            <h3 className="font-semibold text-gray-900 mb-2">1. Acceptable Use</h3>
            <p>
              By accessing InventOMatic, you agree to use this inventory management system responsibly and in accordance with these guidelines. This system is designed for legitimate business inventory tracking and management purposes only.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-2">2. User Responsibilities</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Maintain the confidentiality of your login credentials</li>
              <li>Ensure accurate data entry for all inventory transactions</li>
              <li>Report any system issues or security concerns immediately</li>
              <li>Use the system only for authorized business purposes</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-2">3. Data Security</h3>
            <p>
              All data entered into InventOMatic is encrypted and stored securely. Users are responsible for maintaining the confidentiality of sensitive business information and should not share access credentials with unauthorized personnel.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-2">4. System Guidelines</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Regular backups are performed, but users should maintain their own records</li>
              <li>System maintenance may cause temporary unavailability</li>
              <li>Users should log out properly after each session</li>
              <li>Multiple concurrent sessions from the same account may be restricted</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-2">5. Prohibited Activities</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Attempting to access unauthorized areas of the system</li>
              <li>Sharing login credentials with unauthorized users</li>
              <li>Using the system for illegal or unethical purposes</li>
              <li>Attempting to reverse engineer or compromise system security</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-2">6. Support and Contact</h3>
            <p>
              For technical support or questions about these terms, please contact your system administrator. By continuing to use InventOMatic, you acknowledge that you have read and agree to these terms and conditions.
            </p>
          </section>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 font-medium">
              Last Updated: June 2025
            </p>
            <p className="text-blue-700 text-xs mt-1">
              These terms may be updated periodically. Users will be notified of any significant changes.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
