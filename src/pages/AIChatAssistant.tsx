import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from '@/src/components/Landing';
import { Zap, Send, User, Bot, Loader2, Trash2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: 'user', parts: [{ text: `You are a world-class fantasy football expert. Answer the following question concisely and with data-driven reasoning: ${input}` }] }
        ],
        config: {
          systemInstruction: "You are Gridiron AI, a helpful and expert fantasy football assistant. You provide data-driven advice, considering player stats, matchups, injuries, and trends. Keep responses concise and formatted with markdown for readability.",
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
    <div className="min-h-screen bg-primary flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-6 px-6 max-w-5xl mx-auto w-full flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 text-accent">
            <Zap className="w-6 h-6" />
            <h1 className="text-3xl font-display font-black uppercase tracking-tighter">GRIDIRON <span className="italic">AI CHAT</span></h1>
          </div>
          <button 
            onClick={() => setMessages([{ id: '1', role: 'assistant', content: "Hello! I'm Gridiron AI, your personal fantasy football consultant. Ask me anything about your roster, trade offers, or waiver wire targets." }])}
            className="p-2 rounded-lg bg-white/5 text-white/30 hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 bg-card border border-border rounded-3xl overflow-hidden flex flex-col shadow-2xl">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-accent text-primary' : 'bg-white/5 text-accent border border-white/10'}`}>
                    {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                  </div>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-accent/10 text-white border border-accent/20' : 'bg-white/5 text-white/80 border border-white/5'}`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isTyping && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 text-accent border border-white/10 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-accent animate-spin" />
                  <span className="text-xs text-white/40 italic">Gridiron AI is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 bg-white/[0.02] border-t border-white/5">
            <div className="relative">
              <input
                type="text"
                placeholder="Ask about trades, start/sit, or draft strategy..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-16 text-sm focus:outline-none focus:border-accent/50 transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-accent text-primary flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-white/20">
              <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> Real-time Data</span>
              <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> Expert Logic</span>
              <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> Personalized</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
