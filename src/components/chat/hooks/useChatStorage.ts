
import { useState, useEffect } from 'react';
import { ChatMessage } from '../types';

const STORAGE_KEY = 'inventomatic-chat-history';

export const useChatStorage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I can help you with inventory questions. Try asking about stock levels, suppliers, or analytics.',
      isBot: true,
      timestamp: new Date()
    }
  ]);

  // Load messages from localStorage
  useEffect(() => {
    const storedMessages = localStorage.getItem(STORAGE_KEY);
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  const clearHistory = () => {
    const initialMessage = {
      id: Date.now().toString(),
      text: 'Chat history has been cleared. How can I help you with your inventory today?',
      isBot: true,
      timestamp: new Date()
    };
    
    setMessages([initialMessage]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    messages,
    setMessages,
    clearHistory
  };
};
