import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Send, User, Bot, Sparkles, RefreshCw } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { PROJECTS } from '../constants.tsx';
import { ChatMessage } from '../types.ts';

export const PortfolioAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Systems online. Ayman's AI Proxy at your service. How may I assist your query regarding his architecture or statistics?" }
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
        You are an AI proxy for Ayman Ougri's portfolio. 
        Theme: Catppuccin Mocha. 
        Traits: Technical, precise, minimalist, uses hacker-ish jargon.
        Data:
        - Systems Engineer specializing in C++, Rust, and Distributed Architecture.
        - Created HTTPxx (15k req/s).
        - Experience at VNB-IT, Axentra OS.
        Keep responses under 100 words. Format technical terms in backticks.
      `;

      const response = await ai.models.generateContent({
        model: modelName,
        contents: [{ role: 'user', parts: [{ text: userMessage }] }],
        config: { systemInstruction, temperature: 0.8 }
      });

      const aiText = response.text || "Connection dropped. Retry.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "FATAL: Systems unresponsive. Polling fallback... (Check your API key or network)." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 flex flex-col items-center">
      <div className="w-full max-w-4xl glass rounded-[2.5rem] overflow-hidden flex flex-col h-[75vh] shadow-2xl border border-mocha-surface0">
        <div className="bg-mocha-mantle/80 px-8 py-5 border-b border-mocha-surface0 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-mocha-red/80"></div>
              <div className="w-3 h-3 rounded-full bg-mocha-yellow/80"></div>
              <div className="w-3 h-3 rounded-full bg-mocha-green/80"></div>
            </div>
            <div className="ml-6 flex items-center text-[10px] font-mono text-mocha-overlay1 uppercase tracking-[0.3em] font-bold">
              <Terminal className="w-3 h-3 mr-3 text-mocha-blue" />
              IO.PROX.V1
            </div>
          </div>
          <button 
            onClick={() => setMessages([{ role: 'model', text: "Buffer cleared. Query engine ready." }])}
            className="p-2 hover:bg-mocha-surface0 rounded-xl text-mocha-overlay1 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-8 scroll-smooth bg-mocha-crust/20">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 w-11 h-11 rounded-[1rem] flex items-center justify-center shadow-lg ${
                  msg.role === 'user' ? 'bg-mocha-blue ml-4' : 'bg-mocha-surface0 mr-4 border border-mocha-surface1'
                }`}>
                  {msg.role === 'user' ? <User className="w-5 h-5 text-mocha-base" /> : <Bot className="w-5 h-5 text-mocha-blue" />}
                </div>
                <div className={`p-5 rounded-2xl text-[14px] leading-relaxed font-medium shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-mocha-blue/10 text-mocha-text border border-mocha-blue/20' 
                    : 'bg-mocha-mantle/50 text-mocha-subtext0 border border-mocha-surface1'
                }`}>
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-3 bg-mocha-mantle/50 p-5 rounded-2xl border border-mocha-surface1">
                <div className="w-2 h-2 bg-mocha-blue rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-mocha-blue rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-mocha-blue rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-10 bg-mocha-crust/60 border-t border-mocha-surface0">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Enter system query..."
              className="w-full bg-mocha-base border border-mocha-surface0 rounded-2xl px-8 py-5 pr-20 focus:outline-none focus:ring-2 focus:ring-mocha-blue/40 transition-all text-sm font-mono text-mocha-text placeholder:text-mocha-overlay1 placeholder:uppercase placeholder:tracking-widest"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-xl transition-all ${
                input.trim() && !loading ? 'bg-mocha-blue text-mocha-base hover:bg-mocha-sapphire shadow-lg' : 'text-mocha-surface2'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-6 flex items-center justify-center text-[9px] text-mocha-overlay1 uppercase font-black tracking-[0.4em] space-x-8">
            <span className="flex items-center"><Sparkles className="w-3 h-3 mr-2 text-mocha-peach" /> Neural Processing</span>
            <span className="flex items-center"><Terminal className="w-3 h-3 mr-2 text-mocha-blue" /> waougri.io/sys</span>
          </div>
        </div>
      </div>
    </section>
  );
};