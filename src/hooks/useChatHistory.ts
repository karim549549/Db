import { useState, useEffect } from 'react';

import { ChatMessage } from '@/lib/types/chat.type';

const LOCAL_STORAGE_KEY = 'chatHistory';

export const useChatHistory = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
    // Initialize from localStorage
    if (typeof window !== 'undefined') {
      const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedHistory ? JSON.parse(storedHistory) : [];
    }
    return [];
  });

  // Save to localStorage whenever chatHistory changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  const appendMessage = (message: ChatMessage) => {
    setChatHistory((prev) => [...prev, message]);
  };

  const clearHistory = () => {
    setChatHistory([]);
  };

  return { chatHistory, appendMessage, clearHistory };
};
