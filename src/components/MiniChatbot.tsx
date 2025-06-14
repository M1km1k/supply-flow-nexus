
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSupply } from '@/contexts/SupplyContext';

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export const MiniChatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I can help you with inventory questions. Try asking about stock levels, suppliers, or analytics.',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const { inventory, suppliers, transactions } = useSupply();

  const generateResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('stock') || lowerQuestion.includes('inventory')) {
      const lowStockItems = inventory.filter(item => item.status === 'Low Stock');
      if (lowStockItems.length > 0) {
        return `You have ${lowStockItems.length} items with low stock: ${lowStockItems.map(item => item.name).join(', ')}.`;
      }
      return `All items are well stocked! You have ${inventory.length} different items in inventory.`;
    }
    
    if (lowerQuestion.includes('supplier')) {
      return `You have ${suppliers.length} active suppliers: ${suppliers.map(s => s.name).join(', ')}.`;
    }
    
    if (lowerQuestion.includes('transaction') || lowerQuestion.includes('recent')) {
      const recentCount = Math.min(3, transactions.length);
      return `Your ${recentCount} most recent transactions include ${transactions.slice(0, recentCount).map(t => `${t.type} of ${t.itemName}`).join(', ')}.`;
    }
    
    if (lowerQuestion.includes('analytics') || lowerQuestion.includes('report')) {
      const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
      return `Current analytics: ${totalItems} total items across ${inventory.length} categories, ${suppliers.length} suppliers, ${transactions.length} total transactions.`;
    }
    
    if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi')) {
      return 'Hello! I\'m here to help with your supply management questions. Ask me about inventory, suppliers, or analytics.';
    }
    
    return 'I can help with inventory management questions. Try asking about stock levels, suppliers, transactions, or analytics.';
  };

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
      text: generateResponse(input),
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

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
          Supply Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-48 overflow-y-auto mb-3">
          {messages.map(message => (
            <div
              key={message.id}
              className={`p-2 rounded-lg text-xs ${
                message.isBot
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 ml-4'
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about inventory..."
            className="text-xs"
          />
          <Button onClick={handleSend} size="sm">
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
