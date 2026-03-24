import React, { useState } from 'react';
import { Navbar } from '@/src/components/Landing';
import { motion } from 'motion/react';
import { ArrowLeftRight, TrendingUp, TrendingDown, Zap, AlertCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function TradeAnalyzer() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResult({
        winProbChange: 12.4,
        verdict: "WINNING TRADE",
        analysis: "Trading away Christian McCaffrey while his value is at an all-time high for Tyreek Hill and a 2025 1st round pick is a strategic masterstroke. Hill's upcoming schedule is the easiest in the league for WRs, while McCaffrey faces three top-5 run defenses in the next 4 weeks.",
        grade: "A-"
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display font-black tracking-tighter uppercase mb-4">
            TRADE <span className="text-accent italic">ANALYZER</span>
          </h1>
          <p className="text-white/50">Our AI evaluates 10,000+ simulations to tell you who wins the trade.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Side A */}
          <div className="glass p-8 rounded-3xl border-white/5">
            <h3 className="text-sm font-black uppercase tracking-widest text-white/30 mb-6">You Give</h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center font-bold">RB</div>
                  <div className="text-sm font-bold">Christian McCaffrey</div>
                </div>
                <div className="text-xs font-bold text-white/30">SF</div>
              </div>
            </div>
            <button className="w-full mt-6 py-3 border border-dashed border-white/20 rounded-xl text-xs font-bold text-white/30 hover:border-accent/50 hover:text-accent transition-all">
              + Add Player
            </button>
          </div>
          
          {/* Side B */}
          <div className="glass p-8 rounded-3xl border-white/5">
            <h3 className="text-sm font-black uppercase tracking-widest text-white/30 mb-6">You Receive</h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center font-bold">WR</div>
                  <div className="text-sm font-bold">Tyreek Hill</div>
                </div>
                <div className="text-xs font-bold text-white/30">MIA</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center font-bold">PK</div>
                  <div className="text-sm font-bold">2025 1st Round Pick</div>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 py-3 border border-dashed border-white/20 rounded-xl text-xs font-bold text-white/30 hover:border-accent/50 hover:text-accent transition-all">
              + Add Player
            </button>
          </div>
        </div>
        
        <div className="text-center">
          <button 
            onClick={handleAnalyze}
            disabled={analyzing}
            className="bg-accent text-primary px-12 py-5 rounded-full text-lg font-black uppercase tracking-widest hover:scale-105 transition-transform neon-glow flex items-center gap-3 mx-auto disabled:opacity-50 disabled:scale-100"
          >
            {analyzing ? "Analyzing Simulations..." : "Analyze Trade"} <Zap className={cn("w-5 h-5", analyzing && "animate-pulse")} />
          </button>
        </div>
        
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 glass p-10 rounded-[40px] border-accent/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px] -z-10" />
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                  <div className="px-3 py-1 bg-accent/20 text-accent text-[10px] font-black uppercase tracking-widest rounded-full">AI VERDICT</div>
                  <div className="text-4xl font-display font-black text-accent italic">{result.verdict}</div>
                </div>
                <p className="text-white/70 leading-relaxed max-w-xl">
                  {result.analysis}
                </p>
              </div>
              
              <div className="flex items-center gap-12">
                <div className="text-center">
                  <div className="text-6xl font-display font-black text-accent mb-2">{result.grade}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/30">Trade Grade</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-display font-black text-accent-blue mb-2">+{result.winProbChange}%</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/30">Win Prob Change</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
