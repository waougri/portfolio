import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Loader } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { PROJECTS, EXPERIENCE } from '../utils/data.ts';

export const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{role: 'user' | 'model', text: string}>>([
    { role: 'model', text: "Hello! I'm Ayman's AI assistant. Ask me anything about his projects, skills, or experience." }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const context = `
        You are an AI assistant for Ayman Ougri's portfolio.
        Tone: Professional, enthusiastic, concise.
        
        Data:
        Projects: ${JSON.stringify(PROJECTS)}
        Experience: ${JSON.stringify(EXPERIENCE)}
        
        Answer questions based on this data. If asked about contact, provide waougri@gmail.com.
        Keep answers short (under 50 words unless detailed info is requested).
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts: [{ text: userMsg }] }],
        config: { systemInstruction: context }
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || "I couldn't process that request." }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Connection error. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-40 p-4 bg-ctp-blue text-ctp-base rounded-full shadow-lg hover:scale-110 transition-transform ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 w-[350px] md:w-[400px] h-[500px] bg-[#1e1e2e] rounded-2xl border border-ctp-surface1 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-ctp-mantle border-b border-ctp-surface1 flex justify-between items-center">
              <div className="flex items-center gap-2 text-ctp-blue font-bold">
                <Sparkles size={18} />
                <span>AI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-ctp-overlay1 hover:text-ctp-red">
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-ctp-base/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-ctp-blue text-ctp-base rounded-tr-sm' 
                      : 'bg-ctp-surface0 text-ctp-text rounded-tl-sm border border-ctp-surface1'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-ctp-surface0 p-3 rounded-2xl rounded-tl-sm">
                    <Loader size={16} className="animate-spin text-ctp-blue" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-ctp-mantle border-t border-ctp-surface1">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about my skills..."
                  className="w-full bg-ctp-surface0 border border-ctp-surface1 rounded-xl py-3 pl-4 pr-12 text-sm text-ctp-text focus:outline-none focus:border-ctp-blue transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-ctp-blue hover:text-ctp-mauve disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
