import React, { useState, useMemo } from 'react';
import { Navbar } from '@/src/components/Landing';
import { ArrowRightLeft, TrendingUp, TrendingDown, AlertCircle, Info, Search, Plus, X, Trophy, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RANKINGS_2026 } from '@/src/data/rankings2026';
import { cn } from '@/src/lib/utils';

interface Player {
  id: string;
  name: string;
  pos: string;
  team: string;
  adp: number;
  proj: number;
}

export default function TradeAnalyzer() {
  const [sideA, setSideA] = useState<Player[]>([]);
  const [sideB, setSideB] = useState<Player[]>([]);
  const [searchA, setSearchA] = useState('');
  const [searchB, setSearchB] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    verdict: string;
    analysis: string;
    sideAValue: number;
    sideBValue: number;
  } | null>(null);

  const filteredA = useMemo(() => {
    if (!searchA) return [];
    return RANKINGS_2026.filter(p => 
      p.name.toLowerCase().includes(searchA.toLowerCase()) && 
      !sideA.find(s => s.id === p.id) &&
      !sideB.find(s => s.id === p.id)
    ).slice(0, 5);
  }, [searchA, sideA, sideB]);

  const filteredB = useMemo(() => {
    if (!searchB) return [];
    return RANKINGS_2026.filter(p => 
      p.name.toLowerCase().includes(searchB.toLowerCase()) && 
      !sideA.find(s => s.id === p.id) &&
      !sideB.find(s => s.id === p.id)
    ).slice(0, 5);
  }, [searchB, sideA, sideB]);

  const calculateValue = (players: Player[]) => {
    // Value formula: 1000 / (rank + 5) - lower rank is much more valuable
    // We use ADP as a proxy for rank here
    return players.reduce((acc, p) => acc + (1000 / (p.adp + 5)), 0);
  };

  const handleAnalyze = () => {
    if (sideA.length === 0 || sideB.length === 0) return;
    
    setIsAnalyzing(true);
    
    // Simulate API delay
    setTimeout(() => {
      const valA = calculateValue(sideA);
      const valB = calculateValue(sideB);
      
      const ratio = valB / valA; // Value for user (Side B / Side A)
      
      // Score from 1-10 (5 is fair)
      let score = 5;
      if (ratio > 1) {
        // Good for user (receiving more than giving)
        score = Math.min(10, 5 + (ratio - 1) * 5);
      } else {
        // Bad for user
        score = Math.max(1, 5 - (1 - ratio) * 5);
      }

      let verdict = "Fair Trade";
      let analysis = "This trade is relatively balanced based on 2026 market value and projections.";
      
      if (score > 7.5) {
        verdict = "Strong Win";
        analysis = "You are receiving significantly more value in this deal. The market heavily favors your side.";
      } else if (score > 5.5) {
        verdict = "Slight Win";
        analysis = "You gain a marginal advantage in this trade. It helps your roster depth or top-end talent.";
      } else if (score < 2.5) {
        verdict = "Major Loss";
        analysis = "This trade is heavily lopsided against you. You are giving up elite 2026 assets for sub-par returns.";
      } else if (score < 4.5) {
        verdict = "Slight Loss";
        analysis = "You are losing a bit of value here. Ensure the positional need justifies the drop in overall asset quality.";
      }

      setResult({
        score: Math.round(score * 10) / 10,
        verdict,
        analysis,
        sideAValue: Math.round(valA),
        sideBValue: Math.round(valB)
      });
      setIsAnalyzing(false);
    }, 1000);
  };

  const removePlayer = (id: string, side: 'A' | 'B') => {
    if (side === 'A') {
      setSideA(sideA.filter(p => p.id !== id));
    } else {
      setSideB(sideB.filter(p => p.id !== id));
    }
    setResult(null);
  };

  const addPlayer = (player: Player, side: 'A' | 'B') => {
    if (side === 'A') {
      setSideA([...sideA, player]);
      setSearchA('');
    } else {
      setSideB([...sideB, player]);
      setSearchB('');
    }
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col grid-bg">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 px-6 max-w-6xl mx-auto w-full relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-accent rounded-[24px] flex items-center justify-center shadow-[0_0_50px_rgba(0,255,0,0.2)] group hover:rotate-12 transition-transform duration-500">
              <ArrowRightLeft className="text-primary w-10 h-10" />
            </div>
            <div>
              <div className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-2">Market Intelligence</div>
              <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">TRADE <span className="text-accent italic">ANALYZER</span></h1>
            </div>
          </div>
          
          <button 
            onClick={handleAnalyze}
            disabled={sideA.length === 0 || sideB.length === 0 || isAnalyzing}
            className={cn(
              "px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm transition-all shadow-2xl",
              sideA.length > 0 && sideB.length > 0 
                ? "bg-accent text-primary neon-glow hover:scale-105 active:scale-95" 
                : "bg-white/5 text-white/20 cursor-not-allowed border border-white/5"
            )}
          >
            {isAnalyzing ? (
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                Analyzing...
              </div>
            ) : 'Analyze Trade'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
          {/* VS Icon */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary border-2 border-accent rounded-full items-center justify-center z-10 shadow-[0_0_30px_rgba(0,255,0,0.3)]">
            <span className="font-display font-black italic text-accent text-xl">VS</span>
          </div>

          {/* Side A */}
          <div className="bg-card border border-border rounded-[40px] p-8 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/40">You Send</h2>
              <div className="px-4 py-1 bg-white/5 rounded-full text-[10px] font-black text-white/30 uppercase tracking-widest">Side A</div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input 
                  type="text" 
                  placeholder="Search player to send..." 
                  value={searchA}
                  onChange={(e) => setSearchA(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-accent/50 transition-all"
                />
                <AnimatePresence>
                  {filteredA.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl overflow-hidden z-20 shadow-2xl"
                    >
                      {filteredA.map(p => (
                        <button 
                          key={p.id}
                          onClick={() => addPlayer(p, 'A')}
                          className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-accent w-8">{p.pos}</span>
                            <span className="font-bold text-sm">{p.name}</span>
                          </div>
                          <span className="text-[10px] text-white/30 font-black">{p.team}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-3">
                {sideA.map(p => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={p.id} 
                    className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-black text-accent text-xs">{p.pos}</div>
                      <div>
                        <div className="font-bold text-sm">{p.name}</div>
                        <div className="text-[10px] text-white/40 font-black uppercase tracking-widest">{p.team} • ADP: {p.adp}</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => removePlayer(p.id, 'A')}
                      className="p-2 text-white/20 hover:text-red-400 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
                {sideA.length === 0 && (
                  <div className="py-12 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-white/10">
                    <Plus className="w-8 h-8 mb-2" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Add Players</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Side B */}
          <div className="bg-card border border-border rounded-[40px] p-8 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/40">You Receive</h2>
              <div className="px-4 py-1 bg-accent/10 rounded-full text-[10px] font-black text-accent uppercase tracking-widest">Side B</div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input 
                  type="text" 
                  placeholder="Search player to receive..." 
                  value={searchB}
                  onChange={(e) => setSearchB(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-accent/50 transition-all"
                />
                <AnimatePresence>
                  {filteredB.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl overflow-hidden z-20 shadow-2xl"
                    >
                      {filteredB.map(p => (
                        <button 
                          key={p.id}
                          onClick={() => addPlayer(p, 'B')}
                          className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-accent w-8">{p.pos}</span>
                            <span className="font-bold text-sm">{p.name}</span>
                          </div>
                          <span className="text-[10px] text-white/30 font-black">{p.team}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-3">
                {sideB.map(p => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={p.id} 
                    className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-black text-accent text-xs">{p.pos}</div>
                      <div>
                        <div className="font-bold text-sm">{p.name}</div>
                        <div className="text-[10px] text-white/40 font-black uppercase tracking-widest">{p.team} • ADP: {p.adp}</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => removePlayer(p.id, 'B')}
                      className="p-2 text-white/20 hover:text-red-400 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
                {sideB.length === 0 && (
                  <div className="py-12 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-white/10">
                    <Plus className="w-8 h-8 mb-2" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Add Players</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 bg-card border border-border rounded-[40px] p-10 shadow-2xl overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] rounded-full -mr-32 -mt-32" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center relative z-10">
                <div className="text-center md:text-left">
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-2">Trade Grade</div>
                  <div className="flex items-baseline gap-2 justify-center md:justify-start">
                    <span className={`text-8xl font-display font-black italic ${result.score >= 7 ? 'text-accent' : result.score >= 4 ? 'text-white' : 'text-red-400'}`}>
                      {result.score}
                    </span>
                    <span className="text-2xl font-display font-black text-white/20">/10</span>
                  </div>
                  <div className={`mt-4 inline-block px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${result.score >= 7 ? 'bg-accent/20 text-accent' : result.score >= 4 ? 'bg-white/10 text-white' : 'bg-red-400/20 text-red-400'}`}>
                    {result.verdict}
                  </div>
                </div>

                <div className="md:col-span-2 space-y-6">
                  <div className="flex items-start gap-4 p-6 bg-white/5 rounded-3xl border border-white/10">
                    <Info className="w-6 h-6 text-accent shrink-0 mt-1" />
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest mb-2">AI Analysis</h3>
                      <p className="text-white/60 text-sm leading-relaxed">{result.analysis}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Side A Value</div>
                      <div className="text-2xl font-display font-black italic">{result.sideAValue}</div>
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Side B Value</div>
                      <div className="text-2xl font-display font-black italic text-accent">{result.sideBValue}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
