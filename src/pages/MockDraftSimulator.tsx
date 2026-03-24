import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from '@/src/components/Landing';
import { Trophy, Users, Zap, Search, Filter, Plus, Clock, Play, Pause, RotateCcw, Settings as SettingsIcon, ChevronRight, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RANKINGS_2026 } from '@/src/data/rankings2026';
import { cn } from '@/src/lib/utils';

interface DraftSettings {
  leagueSize: number;
  userPick: number;
  timerSeconds: number;
}

export default function MockDraftSimulator() {
  const [settings, setSettings] = useState<DraftSettings>({
    leagueSize: 12,
    userPick: 1,
    timerSeconds: 30,
  });
  const [showSettings, setShowSettings] = useState(true);
  const [pick, setPick] = useState(1);
  const [draftedPlayers, setDraftedPlayers] = useState<any[]>([]);
  const [isDrafting, setIsDrafting] = useState(false);
  const [timer, setTimer] = useState(30);
  const [search, setSearch] = useState('');

  const round = Math.ceil(pick / settings.leagueSize);
  const pickInRound = ((pick - 1) % settings.leagueSize) + 1;
  const isSnakeBack = round % 2 === 0;
  const currentPickOwner = isSnakeBack 
    ? settings.leagueSize - pickInRound + 1 
    : pickInRound;
  
  const isUserTurn = currentPickOwner === settings.userPick;

  useEffect(() => {
    let interval: any;
    if (isDrafting && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (isDrafting && timer === 0) {
      if (isUserTurn) {
        // Auto pick for user if time runs out
        const bestAvailable = RANKINGS_2026.find(p => !draftedPlayers.find(dp => dp.id === p.id));
        if (bestAvailable) handleDraft(bestAvailable);
      } else {
        // AI Turn
        setTimeout(aiPick, 500);
      }
    }
    return () => clearInterval(interval);
  }, [isDrafting, timer, isUserTurn]);

  // Handle AI picking when it's not user's turn
  useEffect(() => {
    if (isDrafting && !isUserTurn && timer > 0) {
      const aiDelay = Math.random() * 2000 + 1000; // 1-3 seconds
      const timeout = setTimeout(aiPick, aiDelay);
      return () => clearTimeout(timeout);
    }
  }, [pick, isDrafting, isUserTurn]);

  const aiPick = () => {
    if (!isDrafting || isUserTurn) return;
    
    const available = RANKINGS_2026.filter(p => !draftedPlayers.find(dp => dp.id === p.id));
    if (available.length === 0) return;

    // Simple AI: Pick best available with some randomness
    const top3 = available.slice(0, 3);
    const chosen = top3[Math.floor(Math.random() * top3.length)];
    handleDraft(chosen);
  };

  const handleDraft = (player: any) => {
    if (draftedPlayers.find(p => p.id === player.id)) return;
    
    const newDrafted = [...draftedPlayers, { ...player, pick, owner: currentPickOwner }];
    setDraftedPlayers(newDrafted);
    
    if (pick < settings.leagueSize * 15) {
      setPick(pick + 1);
      setTimer(settings.timerSeconds);
    } else {
      setIsDrafting(false);
    }
  };

  const startDraft = () => {
    setShowSettings(false);
    setIsDrafting(true);
    setTimer(settings.timerSeconds);
  };

  const resetDraft = () => {
    setPick(1);
    setDraftedPlayers([]);
    setIsDrafting(false);
    setTimer(settings.timerSeconds);
    setShowSettings(true);
  };

  const myTeam = useMemo(() => {
    return draftedPlayers.filter(p => p.owner === settings.userPick);
  }, [draftedPlayers, settings.userPick]);

  const roster = useMemo(() => {
    const slots = [
      { id: 'qb', pos: 'QB', player: null as any },
      { id: 'rb1', pos: 'RB', player: null as any },
      { id: 'rb2', pos: 'RB', player: null as any },
      { id: 'wr1', pos: 'WR', player: null as any },
      { id: 'wr2', pos: 'WR', player: null as any },
      { id: 'te', pos: 'TE', player: null as any },
      { id: 'flex', pos: 'FLEX', player: null as any },
      { id: 'dst', pos: 'DST', player: null as any },
      { id: 'k', pos: 'K', player: null as any },
      { id: 'bn1', pos: 'BN', player: null as any },
      { id: 'bn2', pos: 'BN', player: null as any },
      { id: 'bn3', pos: 'BN', player: null as any },
      { id: 'bn4', pos: 'BN', player: null as any },
      { id: 'bn5', pos: 'BN', player: null as any },
      { id: 'bn6', pos: 'BN', player: null as any },
    ];

    const team = [...myTeam].sort((a, b) => a.pick - b.pick);
    const remaining = [...team];

    // 1. Fill exact position matches
    slots.forEach(slot => {
      if (['FLEX', 'BN'].includes(slot.pos)) return;
      const index = remaining.findIndex(p => p.pos === slot.pos);
      if (index !== -1) {
        slot.player = remaining[index];
        remaining.splice(index, 1);
      }
    });

    // 2. Fill FLEX (RB, WR, TE)
    const flexSlot = slots.find(s => s.pos === 'FLEX');
    if (flexSlot) {
      const index = remaining.findIndex(p => ['RB', 'WR', 'TE'].includes(p.pos));
      if (index !== -1) {
        flexSlot.player = remaining[index];
        remaining.splice(index, 1);
      }
    }

    // 3. Fill Bench
    slots.forEach(slot => {
      if (slot.pos !== 'BN') return;
      if (remaining.length > 0) {
        slot.player = remaining[0];
        remaining.splice(0, 1);
      }
    });

    return slots;
  }, [myTeam]);

  const filteredPlayers = useMemo(() => {
    return RANKINGS_2026
      .filter(p => !draftedPlayers.find(dp => dp.id === p.id))
      .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }, [draftedPlayers, search]);

  if (showSettings) {
    return (
      <div className="min-h-screen bg-primary grid-bg flex flex-col">
        <Navbar />
        <main className="flex-1 pt-32 pb-20 px-6 flex items-center justify-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-xl glass border-white/10 p-12 rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center gap-6 mb-12">
              <div className="w-16 h-16 bg-accent rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(0,255,102,0.3)]">
                <SettingsIcon className="text-primary w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-display font-black uppercase tracking-tighter leading-none mb-2">MOCK DRAFT <span className="text-accent italic">SIMULATOR</span></h1>
                <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">Configure your 2026 simulation</p>
              </div>
            </div>

            <div className="space-y-10">
              <div className="space-y-5">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">League Size</label>
                <div className="grid grid-cols-4 gap-3">
                  {[8, 10, 12, 14].map(size => (
                    <button 
                      key={size}
                      onClick={() => setSettings({ ...settings, leagueSize: size })}
                      className={cn(
                        "py-5 rounded-2xl font-black text-sm transition-all border",
                        settings.leagueSize === size 
                          ? "bg-accent text-primary border-accent shadow-[0_0_20px_rgba(0,255,102,0.2)]" 
                          : "bg-white/5 border-white/5 text-white/30 hover:bg-white/10 hover:border-white/20"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Your Draft Position</label>
                  <span className="text-3xl font-display font-black italic text-accent">{settings.userPick}</span>
                </div>
                <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                  <input 
                    type="range" 
                    min="1" 
                    max={settings.leagueSize} 
                    value={settings.userPick}
                    onChange={(e) => setSettings({ ...settings, userPick: parseInt(e.target.value) })}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between mt-4 text-[10px] font-black text-white/10 uppercase tracking-widest">
                    <span>Pick 1</span>
                    <span>Pick {settings.leagueSize}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Pick Timer</label>
                <div className="grid grid-cols-3 gap-3">
                  {[15, 30, 60].map(time => (
                    <button 
                      key={time}
                      onClick={() => setSettings({ ...settings, timerSeconds: time })}
                      className={cn(
                        "py-5 rounded-2xl font-black text-sm transition-all border",
                        settings.timerSeconds === time 
                          ? "bg-accent text-primary border-accent shadow-[0_0_20px_rgba(0,255,102,0.2)]" 
                          : "bg-white/5 border-white/5 text-white/30 hover:bg-white/10 hover:border-white/20"
                      )}
                    >
                      {time}S
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={startDraft}
                className="w-full py-7 bg-accent text-primary rounded-3xl font-black uppercase tracking-[0.4em] text-xs hover:scale-[1.02] active:scale-[0.98] transition-all neon-glow flex items-center justify-center gap-4 mt-4"
              >
                START SIMULATION <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary grid-bg flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-12 px-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-4 gap-10 relative z-10">
        {/* Left: Draft Board */}
        <div className="lg:col-span-3 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between glass border-white/5 p-10 rounded-[48px] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] -z-10" />
            
            <div className="flex items-center gap-8 mb-8 md:mb-0">
              <div className="w-24 h-24 rounded-[32px] bg-white/5 border border-white/10 flex flex-col items-center justify-center shadow-inner">
                <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] leading-none mb-2">Round</div>
                <div className="text-4xl font-display font-black italic leading-none text-accent">{round}</div>
              </div>
              <div>
                <div className="flex items-center gap-3 text-accent/60 mb-3">
                  <Clock className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">OVERALL PICK {pick}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter leading-none">
                  {isUserTurn ? <span className="text-accent italic">YOUR TURN</span> : <span className="text-white/80">TEAM {currentPickOwner} <span className="text-white/20">ON CLOCK</span></span>}
                </h1>
                <div className="flex items-center gap-3 mt-4">
                  <div className={cn("w-2 h-2 rounded-full", isDrafting ? "bg-accent animate-pulse" : "bg-white/10")} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/20">LIVE SIMULATION • {settings.leagueSize} TEAMS</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-12">
              <div className="text-center">
                <div className={cn(
                  "text-7xl font-display font-black italic leading-none transition-colors",
                  timer < 10 ? "text-red-500 animate-pulse" : "text-white"
                )}>
                  {timer}
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mt-2">SECONDS</div>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsDrafting(!isDrafting)}
                  className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center transition-all",
                    isDrafting 
                      ? "bg-white/5 text-white/30 hover:bg-white/10" 
                      : "bg-accent text-primary shadow-[0_0_30px_rgba(0,255,102,0.3)] hover:scale-105"
                  )}
                >
                  {isDrafting ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current" />}
                </button>
                <button 
                  onClick={resetDraft}
                  className="w-16 h-16 rounded-2xl bg-white/5 text-white/20 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all"
                >
                  <RotateCcw className="w-8 h-8" />
                </button>
              </div>
            </div>
          </div>

          <div className="glass border-white/5 rounded-[48px] overflow-hidden shadow-2xl">
            <div className="p-10 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 bg-white/[0.02]">
              <h2 className="text-2xl font-display font-black uppercase tracking-tight">AVAILABLE <span className="text-accent italic">PLAYERS</span></h2>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  type="text" 
                  placeholder="Search name, team..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-medium focus:outline-none focus:border-accent/50 transition-all placeholder:text-white/10" 
                />
              </div>
            </div>
            <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto custom-scrollbar">
              {filteredPlayers.map((player) => (
                <motion.div 
                  key={player.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 flex items-center justify-between hover:bg-white/[0.03] transition-all group"
                >
                  <div className="flex items-center gap-8">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center font-black text-accent text-xs border border-white/5 group-hover:border-accent/30 transition-colors">{player.pos}</div>
                    <div>
                      <div className="font-bold text-xl tracking-tight group-hover:text-accent transition-colors">{player.name}</div>
                      <div className="text-[10px] text-white/20 font-black uppercase tracking-[0.2em] mt-1">{player.team} • AVG RANK: {player.adp}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-12">
                    <div className="text-right">
                      <div className="text-2xl font-display font-black italic text-accent leading-none">{player.proj}</div>
                      <div className="text-[8px] font-black uppercase tracking-widest text-white/10 mt-1">PROJ PTS</div>
                    </div>
                    <button 
                      onClick={() => handleDraft(player)}
                      disabled={!isUserTurn || !isDrafting}
                      className={cn(
                        "px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                        isUserTurn && isDrafting 
                          ? "bg-accent text-primary shadow-[0_0_20px_rgba(0,255,102,0.2)] hover:scale-105 active:scale-95" 
                          : "bg-white/5 text-white/10 cursor-not-allowed"
                      )}
                    >
                      DRAFT
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: My Team & Draft Log */}
        <div className="space-y-8">
          <div className="glass border-white/5 rounded-[40px] p-10 shadow-2xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-10 flex items-center justify-between">
              <span className="flex items-center gap-3"><User className="w-4 h-4 text-accent" /> MY ROSTER</span>
              <span className="text-accent">{myTeam.length}/15</span>
            </h3>
            <div className="space-y-3">
              {roster.map((slot, i) => {
                const player = slot.player;
                return (
                  <div key={i} className={cn(
                    "flex items-center justify-between p-4 rounded-2xl border transition-all",
                    player 
                      ? "bg-accent/5 border-accent/20 shadow-[inset_0_0_20px_rgba(0,255,102,0.05)]" 
                      : "bg-white/[0.02] border-dashed border-white/10"
                  )}>
                    <span className="text-[10px] font-black text-white/20 uppercase w-10">{slot.pos}</span>
                    {player ? (
                      <div className="text-right">
                        <div className="text-xs font-bold text-white tracking-tight">{player.name}</div>
                        <div className="text-[8px] text-accent/60 font-black uppercase tracking-widest mt-0.5">{player.team} • PICK {player.pick}</div>
                      </div>
                    ) : (
                      <span className="text-[9px] text-white/5 font-black uppercase tracking-widest">EMPTY</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass border-white/5 rounded-[40px] p-10 shadow-2xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-10 flex items-center gap-3">
              <Zap className="w-4 h-4 text-accent fill-accent" /> DRAFT LOG
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence initial={false}>
                {draftedPlayers.slice().reverse().map((p) => (
                  <motion.div 
                    key={p.pick}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-5 p-4 rounded-2xl bg-white/[0.02] border border-white/5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[10px] font-black text-white/20 border border-white/5">{p.pick}</div>
                    <div className="flex-1">
                      <div className="text-xs font-bold tracking-tight">{p.name}</div>
                      <div className="text-[8px] text-white/30 uppercase font-black tracking-widest mt-0.5">TEAM {p.owner} • {p.pos}</div>
                    </div>
                    {p.owner === settings.userPick && (
                      <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(0,255,102,0.8)]" />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
