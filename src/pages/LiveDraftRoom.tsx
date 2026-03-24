import React, { useState, useEffect } from 'react';
import { Navbar } from '@/src/components/Landing';
import { Trophy, Users, Zap, Search, Filter, Plus, Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const mockDraftPlayers = [
  { id: 1, name: 'Christian McCaffrey', pos: 'RB', team: 'SF', adp: 1.2, proj: 22.4 },
  { id: 2, name: 'CeeDee Lamb', pos: 'WR', team: 'DAL', adp: 2.5, proj: 20.8 },
  { id: 3, name: 'Tyreek Hill', pos: 'WR', team: 'MIA', adp: 3.1, proj: 21.2 },
  { id: 4, name: 'Breece Hall', pos: 'RB', team: 'NYJ', adp: 4.8, proj: 19.5 },
  { id: 5, name: 'Justin Jefferson', pos: 'WR', team: 'MIN', adp: 5.2, proj: 19.8 },
  { id: 6, name: 'Bijan Robinson', pos: 'RB', team: 'ATL', adp: 6.4, proj: 18.7 },
  { id: 7, name: 'Amon-Ra St. Brown', pos: 'WR', team: 'DET', adp: 7.1, proj: 18.5 },
  { id: 8, name: 'Ja\'Marr Chase', pos: 'WR', team: 'CIN', adp: 8.3, proj: 19.2 },
  { id: 9, name: 'Saquon Barkley', pos: 'RB', team: 'PHI', adp: 9.5, proj: 17.8 },
  { id: 10, name: 'Jonathan Taylor', pos: 'RB', team: 'IND', adp: 10.2, proj: 17.5 },
];

export default function LiveDraftRoom() {
  const [pick, setPick] = useState(1);
  const [round, setRound] = useState(1);
  const [draftedPlayers, setDraftedPlayers] = useState<any[]>([]);
  const [myTeam, setMyTeam] = useState<any[]>([]);
  const [isDrafting, setIsDrafting] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval: any;
    if (isDrafting && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0) {
      // Auto pick for AI
      handleDraft(mockDraftPlayers.find(p => !draftedPlayers.find(dp => dp.id === p.id))!);
    }
    return () => clearInterval(interval);
  }, [isDrafting, timer]);

  const handleDraft = (player: any) => {
    if (draftedPlayers.find(p => p.id === player.id)) return;
    
    const newDrafted = [...draftedPlayers, player];
    setDraftedPlayers(newDrafted);
    
    // If it's my turn (simulated as every 12th pick for now, or just alternating for demo)
    if (pick % 12 === 1) {
      setMyTeam([...myTeam, player]);
    }

    if (pick < 180) {
      setPick(pick + 1);
      setRound(Math.ceil((pick + 1) / 12));
      setTimer(60);
    } else {
      setIsDrafting(false);
    }
  };

  const resetDraft = () => {
    setPick(1);
    setRound(1);
    setDraftedPlayers([]);
    setMyTeam([]);
    setIsDrafting(false);
    setTimer(60);
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-6 px-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left: Draft Board */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between bg-card border border-border p-8 rounded-3xl">
            <div>
              <div className="flex items-center gap-3 text-accent mb-2">
                <Clock className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest">Round {round} • Pick {pick}</span>
              </div>
              <h1 className="text-4xl font-display font-black uppercase tracking-tighter">LIVE <span className="text-accent italic">DRAFT ROOM</span></h1>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className={`text-5xl font-display font-black italic ${timer < 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                  0:{timer.toString().padStart(2, '0')}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/30">ON THE CLOCK</div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsDrafting(!isDrafting)}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isDrafting ? 'bg-white/5 text-white/40' : 'bg-accent text-primary neon-glow'}`}
                >
                  {isDrafting ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                <button 
                  onClick={resetDraft}
                  className="w-12 h-12 rounded-xl bg-white/5 text-white/40 flex items-center justify-center hover:text-white transition-colors"
                >
                  <RotateCcw className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-lg font-bold uppercase tracking-tight">Available Players</h2>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input type="text" placeholder="Search..." className="pl-12 pr-6 py-2 bg-white/5 border border-white/10 rounded-xl text-xs focus:outline-none focus:border-accent/50 w-48" />
                </div>
              </div>
            </div>
            <div className="divide-y divide-white/5">
              {mockDraftPlayers.filter(p => !draftedPlayers.find(dp => dp.id === p.id)).map((player, i) => (
                <motion.div 
                  key={player.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors group"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center font-bold text-accent text-xs">{player.pos}</div>
                    <div>
                      <div className="font-bold">{player.name}</div>
                      <div className="text-[10px] text-white/40 uppercase">{player.team} • ADP: {player.adp}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <div className="text-sm font-black italic text-accent">{player.proj}</div>
                      <div className="text-[8px] font-black uppercase tracking-widest text-white/20">PROJ PTS</div>
                    </div>
                    <button 
                      onClick={() => handleDraft(player)}
                      className="px-6 py-2 rounded-lg bg-accent text-primary text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all hover:scale-105"
                    >
                      Draft Player
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: My Team & Draft Log */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-3xl p-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-white/30 mb-6 flex items-center gap-2">
              <Users className="w-4 h-4 text-accent" /> My Roster
            </h3>
            <div className="space-y-3">
              {['QB', 'RB', 'RB', 'WR', 'WR', 'TE', 'FLEX', 'DST', 'K', 'BN', 'BN', 'BN'].map((pos, i) => {
                const player = myTeam[i];
                return (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-dashed border-white/10">
                    <span className="text-[10px] font-black text-white/30 uppercase w-8">{pos}</span>
                    {player ? (
                      <span className="text-xs font-bold text-accent">{player.name}</span>
                    ) : (
                      <span className="text-xs text-white/10 italic">Empty</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-card border border-border rounded-3xl p-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-white/30 mb-6 flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent" /> AI Draft Log
            </h3>
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {draftedPlayers.slice().reverse().map((p, i) => (
                <div key={i} className="flex items-center gap-3 text-xs">
                  <span className="text-white/20 font-mono">{draftedPlayers.length - i}.</span>
                  <span className="font-bold">{p.name}</span>
                  <span className="text-white/30 uppercase text-[10px]">{p.pos}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
