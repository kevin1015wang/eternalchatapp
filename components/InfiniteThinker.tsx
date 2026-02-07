
import React, { useState, useEffect } from 'react';
import { THINKING_MESSAGES } from '../constants';

const InfiniteThinker: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % THINKING_MESSAGES.length);
      setProgress(0);
    }, 4000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 0.5, 99.9)); // Never reaches 100%
    }, 20);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse-slow" />
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse-slow [animation-delay:0.5s]" />
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse-slow [animation-delay:1s]" />
        </div>
        <span className="text-sm font-medium text-zinc-400 uppercase tracking-widest mono">
          Thinking...
        </span>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-end">
          <p className="text-lg text-zinc-200 font-light italic">
            "{THINKING_MESSAGES[currentMessageIndex]}"
          </p>
          <span className="text-xs mono text-zinc-500">{progress.toFixed(1)}%</span>
        </div>
        
        <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="p-2 rounded bg-black/30 border border-white/5 flex flex-col gap-1">
          <span className="text-[10px] text-zinc-500 uppercase mono">Logic Depth</span>
          <div className="h-1 bg-zinc-700 rounded-full overflow-hidden">
             <div className="h-full bg-blue-400 animate-pulse" style={{width: '85%'}}></div>
          </div>
        </div>
        <div className="p-2 rounded bg-black/30 border border-white/5 flex flex-col gap-1">
          <span className="text-[10px] text-zinc-500 uppercase mono">Abstract Load</span>
          <div className="h-1 bg-zinc-700 rounded-full overflow-hidden">
             <div className="h-full bg-purple-400 animate-pulse" style={{width: '92%'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfiniteThinker;
