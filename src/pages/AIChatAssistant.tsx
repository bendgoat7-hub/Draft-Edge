import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from '@/src/components/Landing';
import { Zap, Send, User, Bot, Loader2, Trash2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '@/src/lib/utils';

let aiInstance: GoogleGenAI | null = null;

const getAI = () => {
  if (!aiInstance) {
    const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (process as any).env?.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set. Please add it to your environment variables.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: "Hello! I'm Gridiron AI, your personal fantasy football consultant. Ask me anything about your roster, trade offers, or waiver wire targets." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (process as any).env?.GEMINI_API_KEY;
      if (!apiKey) throw new Error("API Key missing");
      
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: 'user', parts: [{ text: input }] }
        ],
        config: {
          systemInstruction: "You are Gridiron AI, a world-class fantasy football expert. Provide data-driven advice, considering player stats, matchups, injuries, and trends. Keep responses concise and formatted with markdown for readability. Use a professional yet energetic sports-analyst tone.",
        }
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text || "I'm sorry, I couldn't process that request. Please try again."
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { id: 'error', role: 'assistant', content: "I'm having trouble connecting to my brain right now. Please check your internet or try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary grid-bg flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-12 px-6 max-w-5xl mx-auto w-full flex flex-col relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-accent rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(0,255,102,0.3)] group hover:rotate-12 transition-transform duration-500">
              <Zap className="text-primary w-8 h-8 fill-current" />
            </div>
            <div>
              <div className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-2">24/7 Consultant</div>
              <h1 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-none">GRIDIRON <span className="text-accent italic">AI CHAT</span></h1>
            </div>
          </div>
          <button 
            onClick={() => setMessages([{ id: '1', role: 'assistant', content: "Hello! I'm Gridiron AI, your personal fantasy football consultant. Ask me anything about your roster, trade offers, or waiver wire targets." }])}
            className="w-14 h-14 rounded-2xl bg-white/5 text-white/20 flex items-center justify-center hover:bg-white/10 hover:text-red-400 transition-all border border-white/5"
          >
            <Trash2 className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 glass border-white/5 rounded-[48px] overflow-hidden flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.6)] relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
          
          <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex items-start gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border transition-all",
                    msg.role === 'user' 
                      ? 'bg-accent text-primary border-accent shadow-[0_0_20px_rgba(0,255,102,0.2)]' 
                      : 'bg-white/5 text-accent border-white/10'
                  )}>
                    {msg.role === 'user' ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                  </div>
                  <div className={cn(
                    "max-w-[75%] p-6 rounded-[32px] text-sm leading-relaxed font-medium shadow-xl border",
                    msg.role === 'user' 
                      ? 'bg-accent/10 text-white border-accent/20 rounded-tr-none' 
                      : 'bg-white/5 text-white/80 border-white/5 rounded-tl-none'
                  )}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isTyping && (
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 text-accent border border-white/10 flex items-center justify-center shadow-lg">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="bg-white/5 p-6 rounded-[32px] rounded-tl-none border border-white/5 flex items-center gap-4 shadow-xl">
                  <div className="flex gap-1">
                    <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-accent rounded-full" />
                    <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-accent rounded-full" />
                    <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-accent rounded-full" />
                  </div>
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">AI ANALYZING DATA...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-10 bg-white/[0.02] border-t border-white/5 relative z-10">
            <div className="relative group">
              <input
                type="text"
                placeholder="Ask about trades, start/sit, or draft strategy..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 pl-8 pr-20 text-sm font-medium focus:outline-none focus:border-accent/50 transition-all placeholder:text-white/10 group-hover:bg-white/[0.08]"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-accent text-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 shadow-xl neon-glow"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[9px] font-black uppercase tracking-[0.3em] text-white/10">
              <span className="flex items-center gap-2"><Sparkles className="w-3 h-3 text-accent" /> REAL-TIME DATA</span>
              <span className="flex items-center gap-2"><Sparkles className="w-3 h-3 text-accent" /> EXPERT LOGIC</span>
              <span className="flex items-center gap-2"><Sparkles className="w-3 h-3 text-accent" /> PERSONALIZED</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
