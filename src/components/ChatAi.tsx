"use client";
import React, { useState } from "react";
import { Bot, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/components/ui/textarea"; // Assuming shadcn/ui textarea path

interface ChatAiProps {
  onGenerateSchema: (userInput: string) => void;
}

export default function ChatAi({ onGenerateSchema }: ChatAiProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleGenerate = () => {
    if (message.trim()) {
      onGenerateSchema(message);
      setMessage(""); // Clear textarea after generating
    }
  };

  return (
    <div className="absolute bottom-10 right-10 z-20">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={handleToggle}
            className="bg-gradient-to-bl from-orange-500 to-orange-700 p-3 rounded-full shadow-lg"
          >
            <Bot className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="w-96 h-[70vh] bg-card rounded-lg shadow-2xl flex flex-col border"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b bg-muted rounded-t-lg">
              <h3 className="font-bold text-lg">Gemini Ai</h3>
              <button onClick={handleToggle} className="p-1 rounded-full hover:bg-muted-foreground/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat History (Placeholder) */}
            <div className="flex-grow p-4 overflow-y-auto">
              <div className="text-sm text-muted-foreground text-center">
                Chat history will appear here.
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t">
              <div className="relative">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe the nodes and connections you want to create..."
                  className="pr-12"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleGenerate();
                    }
                  }}
                />
                <button
                  onClick={handleGenerate}
                  className="absolute right-2 bottom-2 p-2 bg-orange-600 rounded-md hover:bg-orange-700 disabled:bg-orange-300"
                  disabled={!message.trim()}
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
