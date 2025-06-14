
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSupply } from '@/contexts/SupplyContext';
import { Trash2, MessageSquare } from 'lucide-react';
import { ChatMessage } from './chat/types';
import { generateResponse } from './chat/utils/responseGenerator';
import { ChatHistory } from './chat/ChatHistory';
import { ChatInput } from './chat/ChatInput';
import { useChatStorage } from './chat/hooks/useChatStorage';

export const MiniChatbot: React.FC = () => {
  const [input, setInput] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const { inventory, suppliers, transactions } = useSupply();
  const { messages, setMessages, clearHistory } = useChatStorage();

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date()
    };

    const botResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: generateResponse(input, inventory, suppliers, transactions),
      isBot: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };
  
  const handleEditMessage = (id: string, currentText: string) => {
    setEditingId(id);
    setEditText(currentText);
  };
  
  const handleSaveEdit = (id: string) => {
    if (!editText.trim()) return;
    
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, text: editText.trim() } : msg
    ));
    setEditingId(null);
    setEditText('');
  };
  
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };
  
  const handleDeleteMessage = (id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Supply Assistant
          </CardTitle>
          {messages.length > 1 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearHistory}
              className="text-red-600 hover:text-red-800 hover:bg-red-100 dark:hover:bg-red-900/30"
            >
              <Trash2 className="w-4 h-4" />
              <span className="sr-only">Clear History</span>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ChatHistory
          messages={messages}
          showHistory={showHistory}
          editingId={editingId}
          editText={editText}
          onToggleHistory={() => setShowHistory(!showHistory)}
          onEditMessage={handleEditMessage}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={handleCancelEdit}
          onDeleteMessage={handleDeleteMessage}
          onEditTextChange={setEditText}
        />
        <ChatInput
          input={input}
          onInputChange={setInput}
          onSend={handleSend}
          onKeyPress={handleKeyPress}
        />
      </CardContent>
    </Card>
  );
};
