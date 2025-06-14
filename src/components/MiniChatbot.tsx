import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSupply } from '@/contexts/SupplyContext';
import { Trash2, MessageSquare, Clock, ChevronDown, ArrowDown, Edit2, Check, X } from 'lucide-react';

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
  const [showHistory, setShowHistory] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const { inventory, suppliers, transactions } = useSupply();
  
  // Store messages in localStorage
  useEffect(() => {
    const storedMessages = localStorage.getItem('inventomatic-chat-history');
    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages);
        // Convert string dates back to Date objects
        const formattedMessages = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(formattedMessages);
      } catch (e) {
        console.error('Error parsing chat history:', e);
      }
    }
  }, []);
  
  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 1) { // Don't save just the welcome message
      localStorage.setItem('inventomatic-chat-history', JSON.stringify(messages));
    }
  }, [messages]);

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
  
  const clearHistory = () => {
    const initialMessage = {
      id: Date.now().toString(),
      text: 'Chat history has been cleared. How can I help you with your inventory today?',
      isBot: true,
      timestamp: new Date()
    };
    
    setMessages([initialMessage]);
    localStorage.removeItem('inventomatic-chat-history');
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
  
  // Split messages into recent and history
  const recentMessages = messages.slice(-4); // Show last 4 messages by default
  const historyMessages = messages.slice(0, -4); // Messages before the recent ones

  const renderMessage = (message: ChatMessage) => {
    const isEditing = editingId === message.id;
    
    return (
      <div
        key={message.id}
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
              onChange={(e) => setEditText(e.target.value)}
              className="text-xs h-8"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSaveEdit(message.id);
                }
                if (e.key === 'Escape') {
                  handleCancelEdit();
                }
              }}
              autoFocus
            />
            <div className="flex space-x-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleSaveEdit(message.id)}
                className="h-6 px-2 text-green-600 hover:text-green-800 hover:bg-green-100"
              >
                <Check className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCancelEdit}
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
                    onClick={() => handleEditMessage(message.id, message.text)}
                    className="h-5 w-5 p-0 text-gray-500 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                  >
                    <Edit2 className="w-3 h-3" />
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteMessage(message.id)}
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
        <div className="space-y-3 max-h-48 overflow-y-auto mb-3">
          {/* History messages (collapsible) */}
          {historyMessages.length > 0 && (
            <div className="mb-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowHistory(!showHistory)}
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
              onClick={() => setShowHistory(!showHistory)}
            >
              <ArrowDown className="w-3 h-3 mr-1" />
              {showHistory ? "Hide history" : "View all messages"}
            </Button>
          )}
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
