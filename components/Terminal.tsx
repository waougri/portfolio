import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const COMMANDS = {
  help: "Try these: whoami, stack, contact, clear, neofetch",
  whoami: "I'm Ayman. I like computers, coffee, and compiling things.",
  stack: "My daily drivers:\n- Languages: C++, Rust, Go, TypeScript\n- Ops: Docker, K8s, Linux (Arch/Debian)\n- Cloud: AWS, DigitalOcean",
  contact: "Drop me a line:\nEmail: waougri@gmail.com\nGitHub: github.com/waougri",
};

const NEOFETCH_ART = `
        .---.        guest@ougri-dev
       /     \\       ---------------
      | () () |      OS: Arch Linux
       \\  ^  /       Host: Portfolio v2.0
        |||||        Kernel: 5.15.0-generic
        |||||        Uptime: 24 years
                     Shell: zsh 5.9
                     Theme: Catppuccin Mocha
                     Packages: Rust, C++, Go
`;

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<Array<{type: 'input' | 'output', content: string}>>([
    { type: 'output', content: NEOFETCH_ART }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // block: 'nearest' ensures the container scrolls to show the element 
    // without forcing the entire page to scroll if it's already in view.
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      setHistory(prev => [...prev, { type: 'input', content: input }]);
      
      if (cmd === 'clear') {
        setHistory([]);
      } else if (cmd === 'neofetch') {
        setHistory(prev => [...prev, { type: 'output', content: NEOFETCH_ART }]);
      } else if (Object.keys(COMMANDS).includes(cmd)) {
        setHistory(prev => [...prev, { type: 'output', content: COMMANDS[cmd as keyof typeof COMMANDS] }]);
      } else if (cmd !== '') {
        setHistory(prev => [...prev, { type: 'output', content: `zsh: command not found: ${cmd}` }]);
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
              I've always been the type to take things apart just to see how they work. That curiosity naturally led me to <span className="text-ctp-mauve font-medium">systems programming</span>.
            </p>
            <p>
              I don't just write code that "works" — I write code that's efficient, reliable, and maintainable. Whether it's shaving microseconds off a request or structuring a complex distributed system, I enjoy the puzzle.
            </p>
            <p>
              When I'm not at the keyboard, I'm probably tweaking my dotfiles or reading up on the latest kernel features.
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
              <div key={i} className={`${entry.type === 'input' ? 'text-ctp-blue' : 'text-ctp-text'} whitespace-pre-wrap font-mono`}>
                {entry.type === 'input' ? <span className="mr-2 text-ctp-green">➜  ~</span> : ''}
                {entry.content}
              </div>
            ))}
            <div className="flex items-center text-ctp-blue">
              <span className="mr-2 text-ctp-green">➜  ~</span>
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