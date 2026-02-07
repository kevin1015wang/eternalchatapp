
import React from 'react';
import { Message } from '../types';
import { BotIcon, UserIcon } from '../constants';

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full mb-8 ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div className={`flex max-w-[85%] md:max-w-[70%] gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border shadow-xl ${
          isUser 
            ? 'bg-zinc-100 border-zinc-200 text-zinc-900' 
            : 'bg-zinc-900 border-zinc-800 text-zinc-100'
        }`}>
          {isUser ? <UserIcon /> : <BotIcon />}
        </div>
        
        <div className="flex flex-col gap-1">
          <div className={`px-5 py-4 rounded-3xl shadow-sm text-[15px] leading-relaxed ${
            isUser 
              ? 'bg-blue-600 text-white rounded-tr-none' 
              : 'bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-tl-none'
          }`}>
            {message.content}
          </div>
          <span className={`text-[10px] mono text-zinc-500 mt-1 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
