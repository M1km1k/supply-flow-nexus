
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, ChevronDown, ArrowDown } from 'lucide-react';
import { ChatMessage as ChatMessageType } from './types';
import { ChatMessage } from './ChatMessage';

interface ChatHistoryProps {
  messages: ChatMessageType[];
  showHistory: boolean;
  editingId: string | null;
  editText: string;
  onToggleHistory: () => void;
  onEditMessage: (id: string, text: string) => void;
  onSaveEdit: (id: string) => void;
  onCancelEdit: () => void;
  onDeleteMessage: (id: string) => void;
  onEditTextChange: (text: string) => void;
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({
  messages,
  showHistory,
  editingId,
  editText,
  onToggleHistory,
  onEditMessage,
  onSaveEdit,
  onCancelEdit,
  onDeleteMessage,
  onEditTextChange
}) => {
  // Split messages into recent and history
  const recentMessages = messages.slice(-4); // Show last 4 messages by default
  const historyMessages = messages.slice(0, -4); // Messages before the recent ones

  const renderMessage = (message: ChatMessageType) => (
    <ChatMessage
      key={message.id}
      message={message}
      isEditing={editingId === message.id}
      editText={editText}
      onEdit={onEditMessage}
      onSaveEdit={onSaveEdit}
      onCancelEdit={onCancelEdit}
      onDelete={onDeleteMessage}
      onEditTextChange={onEditTextChange}
    />
  );

  return (
    <div className="space-y-3 max-h-48 overflow-y-auto mb-3">
      {/* History messages (collapsible) */}
      {historyMessages.length > 0 && (
        <div className="mb-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onToggleHistory}
            className="w-full text-xs flex items-center justify-center py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-md"
          >
            <Clock className="w-3 h-3 mr-1" />
            {showHistory ? "Hide older messages" : `Show ${historyMessages.length} older messages`}
            <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${showHistory ? 'rotate-180' : ''}`} />
          </Button>
          
          {showHistory && (
            <div className="mt-2 border-l-2 border-gray-200 dark:border-gray-700 pl-2 space-y-2">
              {historyMessages.map(renderMessage)}
              
              <div className="flex justify-center">
                <div className="bg-gray-200 dark:bg-gray-700 h-px w-full my-2"></div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Recent messages */}
      {recentMessages.map(renderMessage)}
      
      {messages.length > 4 && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full py-0.5 h-6 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
          onClick={onToggleHistory}
        >
          <ArrowDown className="w-3 h-3 mr-1" />
          {showHistory ? "Hide history" : "View all messages"}
        </Button>
      )}
    </div>
  );
};
