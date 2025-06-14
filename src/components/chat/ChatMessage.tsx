
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit2, Trash2, Check, X } from 'lucide-react';
import { ChatMessage as ChatMessageType } from './types';

interface ChatMessageProps {
  message: ChatMessageType;
  isEditing: boolean;
  editText: string;
  onEdit: (id: string, text: string) => void;
  onSaveEdit: (id: string) => void;
  onCancelEdit: () => void;
  onDelete: (id: string) => void;
  onEditTextChange: (text: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isEditing,
  editText,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  onEditTextChange
}) => {
  return (
    <div
      className={`group p-2 rounded-lg text-xs relative ${
        message.isBot
          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 ml-4'
      }`}
    >
      {isEditing ? (
        <div className="space-y-2">
          <Input
            value={editText}
            onChange={(e) => onEditTextChange(e.target.value)}
            className="text-xs h-8"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSaveEdit(message.id);
              }
              if (e.key === 'Escape') {
                onCancelEdit();
              }
            }}
            autoFocus
          />
          <div className="flex space-x-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onSaveEdit(message.id)}
              className="h-6 px-2 text-green-600 hover:text-green-800 hover:bg-green-100"
            >
              <Check className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onCancelEdit}
              className="h-6 px-2 text-red-600 hover:text-red-800 hover:bg-red-100"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-2">{message.text}</div>
            <div className="flex items-center space-x-1">
              <div className="text-[10px] text-gray-500 dark:text-gray-400 shrink-0">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
          
          {/* Action buttons - only show on hover for non-bot messages or when not the initial message */}
          {(!message.isBot || message.id !== '1') && (
            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
              {!message.isBot && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onEdit(message.id, message.text)}
                  className="h-5 w-5 p-0 text-gray-500 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                >
                  <Edit2 className="w-3 h-3" />
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(message.id)}
                className="h-5 w-5 p-0 text-gray-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
