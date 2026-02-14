
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Send, User, Bot, Sparkles, RefreshCw } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { PROJECTS } from '../constants';
import { ChatMessage } from '../types';

export const PortfolioAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm Ayman's digital assistant. I can tell you about his projects in distributed systems, computer vision, and his algorithm performance on LeetCode. How can I help you today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const modelName = 'gemini-3-flash-preview';
      
      const systemInstruction = `
        You are an AI assistant for Ayman Ougri's developer portfolio. 
        Ayman's Background: Systems & Vision Engineer.
        Ayman's GitHub: waougri.
        Top Projects:
        ${PROJECTS.map(p => `- ${p.title}: ${p.description} (Tech: ${p.tags.join(', ')})`).join('\n')}
        
        LeetCode: Username 'iustus', around 100+ problems solved, Top 1.3M ranking.
        
        Be professional, technical, and helpful. Use a slightly hacker-themed tone but stay concise.
        If asked about things not in the resume, admit you only know about his engineering work.
      `;

      const response = await ai.models.generateContent({
        model: modelName,
        contents: [
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const aiText = response.text || "I'm sorry, I couldn't process that. Could you try rephrasing?";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', text: "Systems offline. Please check back later or contact Ayman directly on GitHub." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 flex flex-col items-center">
      <div className="w-full max-w-4xl glass rounded-3xl overflow-hidden flex flex-col h-[70vh] shadow-2xl">
        {/* Terminal Header */}
        <div className="bg-gray-950/80 px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <div className="ml-4 flex items-center text-xs font-mono text-gray-500 uppercase tracking-widest">
              <Terminal className="w-3 h-3 mr-2" />
              Assistant.v1.0.core
            </div>
          </div>
          <button 
            onClick={() => setMessages([{ role: 'model', text: "Memory wiped. Ready for a new query." }])}
            className="p-1.5 hover:bg-gray-800 rounded-lg text-gray-500 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
        >
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                  msg.role === 'user' ? 'bg-blue-600 ml-4' : 'bg-gray-800 mr-4'
                }`}>
                  {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5 text-blue-400" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600/10 text-blue-100 border border-blue-500/20' 
                    : 'bg-gray-900 text-gray-300 border border-gray-800'
                }`}>
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2 bg-gray-900 p-4 rounded-2xl border border-gray-800">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-gray-950/50 border-t border-gray-800">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about Ayman's technical stack or projects..."
              className="w-full bg-gray-900 border border-gray-800 rounded-2xl px-6 py-4 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${
                input.trim() && !loading ? 'bg-blue-600 text-white hover:bg-blue-500' : 'text-gray-600'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-center text-[10px] text-gray-600 uppercase tracking-widest space-x-4">
            <span className="flex items-center"><Sparkles className="w-3 h-3 mr-1" /> Powered by Gemini</span>
            <span className="flex items-center"><Terminal className="w-3 h-3 mr-1" /> waougri/assistant</span>
          </div>
        </div>
      </div>
    </section>
  );
};
