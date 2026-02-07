
import React, { useState, useRef, useEffect } from 'react';
import { Message } from './types';
import ChatBubble from './components/ChatBubble';
import InfiniteThinker from './components/InfiniteThinker';
import InputArea from './components/InputArea';
import { BotIcon } from './constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello. I am the Eternal Thinker. I possess infinite processing power and use every single bit of it to contemplate your queries. Please be aware: my thoughts are so complex that I have yet to find a way to express them in finite language. Ask me anything, and I shall think about it... forever.",
      timestamp: new Date()
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsThinking(true);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/60 backdrop-blur-md border-b border-zinc-800/50 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <BotIcon />
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight">The Eternal Thinker</h1>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-medium">Deep Thought Online</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="hidden md:flex flex-col items-end">
             <span className="text-[10px] text-zinc-500 uppercase mono">CPU Load</span>
             <span className="text-xs text-blue-400 mono">100% (Sustained)</span>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 pt-10 pb-40 overflow-y-auto custom-scrollbar">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        
        {isThinking && (
          <div className="w-full mb-8">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border shadow-xl bg-zinc-900 border-zinc-800 text-blue-500">
                <BotIcon />
              </div>
              <div className="flex-1">
                <InfiniteThinker />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <InputArea onSendMessage={handleSendMessage} disabled={isThinking} />
    </div>
  );
};

export default App;
