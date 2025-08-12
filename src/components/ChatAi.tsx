"use client";
import React, { useState } from "react";
import { Bot, X, Send, PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { useChatHistory } from "@/hooks/useChatHistory";
import { Button } from "@/components/ui/button";
import { useSchemaStore } from "@/stores/schemaStore";
import { generateSchemaAction } from "@/app/actions";
import { useSchemaContextStore } from "@/stores/schemaContext";
type ChatMessage = {
  text: string;
  sender: 'user' | 'ai';
};

function ChatAi() {
  const { nodes, edges, setLoading, isLoading ,  setEdges ,  setNodes } = useSchemaStore();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { chatHistory, appendMessage, clearHistory } = useChatHistory();

  const handleGenerateSchema = async (userInput: string) => {
    setLoading(true);
    try {
      const response = await generateSchemaAction(userInput, nodes, edges);
      

      if (response.type === 'schema') {
        setNodes(response.nodes || []);
        setEdges(response.edges || []);
        useSchemaContextStore.getState().setContext(response.context_update.summary);
        return response.message || "Schema updated successfully!";
      } else if (response.type === 'chat') {
        return response.message;
      } else if (response.type === 'error') {
        return response.message || "An error occurred. Please try again.";
      }
      return undefined;
    } catch (error) {
      console.error("Failed to generate response:", error);
      return "Failed to generate response. Please try again.";
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleGenerate = async () => {
    if (message.trim()) {
      const userMessage: ChatMessage = { text: message, sender: 'user' };
      appendMessage(userMessage);
      setMessage("");

      try {
        const aiResponse = await handleGenerateSchema(message);
        
        if (aiResponse) {
          let messageText = aiResponse as string;
          if (typeof aiResponse === 'object' && aiResponse !== null && 'message' in aiResponse) {
            messageText = String((aiResponse as Record<string, unknown>).message);
          }
          
          appendMessage({ text: messageText, sender: 'ai' });
        }
      } catch (error) {
        console.error("Error generating response:", error);
        appendMessage({ text: "Error generating response. Please try again.", sender: 'ai' });
      }
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
              <h3 className="font-bold text-lg">AI Assistant</h3>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={clearHistory} title="New Chat">
                  <PlusCircle className="w-5 h-5" />
                </Button>
                <button onClick={handleToggle} className="p-1 rounded-full hover:bg-muted-foreground/10">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat History */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
              {chatHistory.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center">
                  Chat history will appear here.
                </div>
              ) : (
                chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-lg max-w-[80%] ${msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-muted text-muted-foreground mr-auto'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t">
              <div className="relative">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Chat with me or describe your database schema needs..."
                  className="pr-12"
                  disabled={isLoading}
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
                  disabled={!message.trim() || isLoading}
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

export default ChatAi;
