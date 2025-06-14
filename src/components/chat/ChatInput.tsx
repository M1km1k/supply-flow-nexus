
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  input,
  onInputChange,
  onSend,
  onKeyPress
}) => {
  return (
    <div className="flex space-x-2">
      <Input
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder="Ask about inventory..."
        className="text-xs"
      />
      <Button onClick={onSend} size="sm">
        Send
      </Button>
    </div>
  );
};
