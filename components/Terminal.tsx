import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const COMMANDS = {
  help: "Available commands: whoami, stack, contact, clear",
  whoami: "Ayman Ougri. Systems Engineer. Passionate about C++, Rust, and performant code.",
  stack: "Languages: C++, Rust, TS, Python, Go.\nTools: Docker, K8s, Linux, AWS.",
  contact: "Email: waougri@gmail.com\nGitHub: github.com/waougri",
};

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<Array<{type: 'input' | 'output', content: string}>>([
    { type: 'output', content: "Welcome to OugriOS v2.0. Type 'help' to start." }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      setHistory(prev => [...prev, { type: 'input', content: input }]);
      
      if (cmd === 'clear') {
        setHistory([]);
      } else if (Object.keys(COMMANDS).includes(cmd)) {
        setHistory(prev => [...prev, { type: 'output', content: COMMANDS[cmd as keyof typeof COMMANDS] }]);
      } else if (cmd !== '') {
        setHistory(prev => [...prev, { type: 'output', content: `Command not found: ${cmd}` }]);
      }
      
      setInput('');
    }
  };

  return (
    <section id="about" className="py-24 container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
            <span className="text-ctp-blue">01.</span> About Me
          </h2>
          <div className="space-y-6 text-ctp-subtext0 leading-relaxed text-lg">
            <p>
              I don't just write code; I engineer systems. My journey began with a curiosity for how things work under the hood, leading me to specialize in <span className="text-ctp-mauve font-medium">systems programming</span> and <span className="text-ctp-mauve font-medium">distributed architecture</span>.
            </p>
            <p>
              Whether it's optimizing a C++ server for microsecond latency or designing a scalable microservices mesh in Go, I thrive on complexity and performance challenges.
            </p>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-[#1e1e2e] rounded-xl overflow-hidden border border-ctp-surface1 shadow-2xl font-mono text-sm h-[400px] flex flex-col"
        >
          <div className="bg-ctp-mantle px-4 py-3 border-b border-ctp-surface1 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-ctp-red" />
            <div className="w-3 h-3 rounded-full bg-ctp-peach" />
            <div className="w-3 h-3 rounded-full bg-ctp-green" />
            <div className="ml-auto text-xs text-ctp-overlay1">guest@ougri-dev:~</div>
          </div>
          
          <div className="p-6 flex-1 overflow-y-auto space-y-2 cursor-text" onClick={() => document.getElementById('term-input')?.focus()}>
            {history.map((entry, i) => (
              <div key={i} className={`${entry.type === 'input' ? 'text-ctp-blue' : 'text-ctp-subtext0'} whitespace-pre-wrap`}>
                {entry.type === 'input' ? <span className="mr-2">$</span> : ''}
                {entry.content}
              </div>
            ))}
            <div className="flex items-center text-ctp-blue">
              <span className="mr-2">$</span>
              <input
                id="term-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                className="bg-transparent border-none outline-none flex-1 text-ctp-text"
                autoComplete="off"
                autoFocus
              />
            </div>
            <div ref={bottomRef} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
