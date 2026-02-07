
export type Role = 'user' | 'assistant';

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
  isThinking?: boolean;
}

export interface ThoughtStep {
  id: string;
  label: string;
  duration: number;
}
