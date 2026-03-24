import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from '@/src/components/Landing';
import { Trophy, Users, Zap, Search, Filter, Plus, Clock, Play, Pause, RotateCcw, Settings as SettingsIcon, ChevronRight, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// 2026 Mock ADP Data
const ADP_2026 = [
  { id: 1, name: 'Christian McCaffrey', pos: 'RB', team: 'SF', adp: 1.1, proj: 24.5 },
  { id: 2, name: 'CeeDee Lamb', pos: 'WR', team: 'DAL', adp: 2.3, proj: 22.8 },
  { id: 3, name: 'Justin Jefferson', pos: 'WR', team: 'MIN', adp: 3.5, proj: 21.2 },
  { id: 4, name: 'Breece Hall', pos: 'RB', team: 'NYJ', adp: 4.2, proj: 20.5 },
  { id: 5, name: 'Tyreek Hill', pos: 'WR', team: 'MIA', adp: 5.1, proj: 21.8 },
  { id: 6, name: 'Bijan Robinson', pos: 'RB', team: 'ATL', adp: 6.4, proj: 19.7 },
  { id: 7, name: 'Ja\'Marr Chase', pos: 'WR', team: 'CIN', adp: 7.2, proj: 20.2 },
  { id: 8, name: 'Amon-Ra St. Brown', pos: 'WR', team: 'DET', adp: 8.5, proj: 19.5 },
  { id: 9, name: 'Saquon Barkley', pos: 'RB', team: 'PHI', adp: 9.8, proj: 18.8 },
  { id: 10, name: 'Garrett Wilson', pos: 'WR', team: 'NYJ', adp: 10.5, proj: 18.2 },
  { id: 11, name: 'Jonathan Taylor', pos: 'RB', team: 'IND', adp: 11.2, proj: 18.5 },
  { id: 12, name: 'Jahmyr Gibbs', pos: 'RB', team: 'DET', adp: 12.4, proj: 17.8 },
  { id: 13, name: 'A.J. Brown', pos: 'WR', team: 'PHI', adp: 13.1, proj: 17.5 },
  { id: 14, name: 'Puka Nacua', pos: 'WR', team: 'LAR', adp: 14.5, proj: 17.2 },
  { id: 15, name: 'Kyren Williams', pos: 'RB', team: 'LAR', adp: 15.8, proj: 16.8 },
  { id: 16, name: 'Marvin Harrison Jr.', pos: 'WR', team: 'ARI', adp: 16.2, proj: 17.5 },
  { id: 17, name: 'Josh Allen', pos: 'QB', team: 'BUF', adp: 17.5, proj: 24.2 },
  { id: 18, name: 'Patrick Mahomes', pos: 'QB', team: 'KC', adp: 18.8, proj: 23.5 },
  { id: 19, name: 'Travis Kelce', pos: 'TE', team: 'KC', adp: 19.5, proj: 15.8 },
  { id: 20, name: 'Sam LaPorta', pos: 'TE', team: 'DET', adp: 20.2, proj: 15.2 },
  { id: 21, name: 'De\'Von Achane', pos: 'RB', team: 'MIA', adp: 21.5, proj: 16.5 },
  { id: 22, name: 'Chris Olave', pos: 'WR', team: 'NO', adp: 22.8, proj: 16.2 },
  { id: 23, name: 'Drake London', pos: 'WR', team: 'ATL', adp: 23.5, proj: 15.8 },
  { id: 24, name: 'Travis Etienne', pos: 'RB', team: 'JAX', adp: 24.2, proj: 15.5 },
  { id: 25, name: 'Lamar Jackson', pos: 'QB', team: 'BAL', adp: 25.1, proj: 22.8 },
  { id: 26, name: 'Jalen Hurts', pos: 'QB', team: 'PHI', adp: 26.5, proj: 22.5 },
  { id: 27, name: 'James Cook', pos: 'RB', team: 'BUF', adp: 27.8, proj: 14.8 },
  { id: 28, name: 'Nico Collins', pos: 'WR', team: 'HOU', adp: 28.2, proj: 15.5 },
  { id: 29, name: 'Brandon Aiyuk', pos: 'WR', team: 'SF', adp: 29.5, proj: 15.2 },
  { id: 30, name: 'Isiah Pacheco', pos: 'RB', team: 'KC', adp: 30.8, proj: 14.5 },
  { id: 31, name: 'Davante Adams', pos: 'WR', team: 'LV', adp: 31.5, proj: 14.2 },
  { id: 32, name: 'Mike Evans', pos: 'WR', team: 'TB', adp: 32.2, proj: 13.8 },
  { id: 33, name: 'Stefon Diggs', pos: 'WR', team: 'HOU', adp: 33.8, proj: 13.5 },
  { id: 34, name: 'Cooper Kupp', pos: 'WR', team: 'LAR', adp: 34.5, proj: 13.2 },
  { id: 35, name: 'Derrick Henry', pos: 'RB', team: 'BAL', adp: 35.2, proj: 14.8 },
  { id: 36, name: 'Joe Mixon', pos: 'RB', team: 'HOU', adp: 36.8, proj: 13.5 },
  { id: 37, name: 'Rachaad White', pos: 'RB', team: 'TB', adp: 37.5, proj: 13.2 },
  { id: 38, name: 'Kenneth Walker III', pos: 'RB', team: 'SEA', adp: 38.2, proj: 12.8 },
  { id: 39, name: 'James Conner', pos: 'RB', team: 'ARI', adp: 39.5, proj: 12.5 },
  { id: 40, name: 'Alvin Kamara', pos: 'RB', team: 'NO', adp: 40.8, proj: 12.2 },
  { id: 41, name: 'Jaylen Waddle', pos: 'WR', team: 'MIA', adp: 41.5, proj: 14.5 },
  { id: 42, name: 'DeVonta Smith', pos: 'WR', team: 'PHI', adp: 42.2, proj: 14.2 },
  { id: 43, name: 'DK Metcalf', pos: 'WR', team: 'SEA', adp: 43.8, proj: 13.8 },
  { id: 44, name: 'DJ Moore', pos: 'WR', team: 'CHI', adp: 44.5, proj: 13.5 },
  { id: 45, name: 'Michael Pittman Jr.', pos: 'WR', team: 'IND', adp: 45.2, proj: 13.2 },
  { id: 46, name: 'Tee Higgins', pos: 'WR', team: 'CIN', adp: 46.8, proj: 12.8 },
  { id: 47, name: 'Zay Flowers', pos: 'WR', team: 'BAL', adp: 47.5, proj: 12.5 },
  { id: 48, name: 'Tank Dell', pos: 'WR', team: 'HOU', adp: 48.2, proj: 12.2 },
  { id: 49, name: 'George Kittle', pos: 'TE', team: 'SF', adp: 49.5, proj: 11.8 },
  { id: 50, name: 'Mark Andrews', pos: 'TE', team: 'BAL', adp: 50.8, proj: 11.5 },
];

interface DraftSettings {
  leagueSize: number;
  userPick: number;
  timerSeconds: number;
}

export default function LiveDraftRoom() {
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
        const bestAvailable = ADP_2026.find(p => !draftedPlayers.find(dp => dp.id === p.id));
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
    
    const available = ADP_2026.filter(p => !draftedPlayers.find(dp => dp.id === p.id));
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

  const filteredPlayers = useMemo(() => {
    return ADP_2026
      .filter(p => !draftedPlayers.find(dp => dp.id === p.id))
      .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }, [draftedPlayers, search]);

  if (showSettings) {
    return (
      <div className="min-h-screen bg-primary flex flex-col">
        <Navbar />
        <main className="flex-1 pt-32 pb-20 px-6 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl bg-card border border-border p-10 rounded-[40px] shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center">
                <SettingsIcon className="text-primary w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-display font-black uppercase tracking-tighter">DRAFT <span className="text-accent italic">SETTINGS</span></h1>
                <p className="text-white/30 text-xs font-bold uppercase tracking-widest">Customize your 2026 mock draft</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">League Size</label>
                <div className="grid grid-cols-4 gap-3">
                  {[8, 10, 12, 14].map(size => (
                    <button 
                      key={size}
                      onClick={() => setSettings({ ...settings, leagueSize: size })}
                      className={`py-4 rounded-2xl font-black text-sm transition-all border ${settings.leagueSize === size ? 'bg-accent text-primary border-accent' : 'bg-white/5 border-white/10 text-white/50 hover:border-white/30'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Your Draft Position</label>
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <input 
                    type="range" 
                    min="1" 
                    max={settings.leagueSize} 
                    value={settings.userPick}
                    onChange={(e) => setSettings({ ...settings, userPick: parseInt(e.target.value) })}
                    className="flex-1 accent-accent"
                  />
                  <span className="text-2xl font-display font-black italic w-12 text-center">{settings.userPick}</span>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Pick Timer (Seconds)</label>
                <div className="grid grid-cols-3 gap-3">
                  {[15, 30, 60].map(time => (
                    <button 
                      key={time}
                      onClick={() => setSettings({ ...settings, timerSeconds: time })}
                      className={`py-4 rounded-2xl font-black text-sm transition-all border ${settings.timerSeconds === time ? 'bg-accent text-primary border-accent' : 'bg-white/5 border-white/10 text-white/50 hover:border-white/30'}`}
                    >
                      {time}s
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={startDraft}
                className="w-full py-6 bg-accent text-primary rounded-2xl font-black uppercase tracking-[0.3em] text-sm hover:scale-[1.02] active:scale-[0.98] transition-all neon-glow flex items-center justify-center gap-3"
              >
                Enter Draft Room <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-6 px-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left: Draft Board */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between bg-card border border-border p-8 rounded-[32px] shadow-xl">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center justify-center">
                <div className="text-[10px] font-black text-white/30 uppercase tracking-widest leading-none mb-1">Round</div>
                <div className="text-3xl font-display font-black italic leading-none">{round}</div>
              </div>
              <div>
                <div className="flex items-center gap-3 text-accent mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Overall Pick {pick}</span>
                </div>
                <h1 className="text-3xl font-display font-black uppercase tracking-tighter leading-none">
                  {isUserTurn ? <span className="text-accent">YOUR TURN</span> : `TEAM ${currentPickOwner} ON CLOCK`}
                </h1>
                <p className="text-white/30 text-[10px] font-black uppercase tracking-widest mt-2 flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${isDrafting ? 'bg-accent animate-pulse' : 'bg-white/20'}`} />
                  2026 Mock Draft • {settings.leagueSize} Teams
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-10">
              <div className="text-center">
                <div className={`text-6xl font-display font-black italic leading-none ${timer < 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                  {timer}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mt-1">SECONDS</div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsDrafting(!isDrafting)}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isDrafting ? 'bg-white/5 text-white/40' : 'bg-accent text-primary neon-glow'}`}
                >
                  {isDrafting ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7" />}
                </button>
                <button 
                  onClick={resetDraft}
                  className="w-14 h-14 rounded-2xl bg-white/5 text-white/40 flex items-center justify-center hover:text-white transition-colors"
                >
                  <RotateCcw className="w-7 h-7" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-lg">
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
              <h2 className="text-xl font-display font-black uppercase tracking-tight">Available Players</h2>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input 
                    type="text" 
                    placeholder="Search players..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-12 pr-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs focus:outline-none focus:border-accent/50 w-64 transition-all" 
                  />
                </div>
              </div>
            </div>
            <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto custom-scrollbar">
              {filteredPlayers.map((player, i) => (
                <motion.div 
                  key={player.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors group"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-black text-accent text-sm border border-white/5">{player.pos}</div>
                    <div>
                      <div className="font-bold text-lg">{player.name}</div>
                      <div className="text-[10px] text-white/40 font-black uppercase tracking-widest">{player.team} • ADP: {player.adp}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-10">
                    <div className="text-right">
                      <div className="text-xl font-display font-black italic text-accent">{player.proj}</div>
                      <div className="text-[8px] font-black uppercase tracking-widest text-white/20">PROJ PTS</div>
                    </div>
                    <button 
                      onClick={() => handleDraft(player)}
                      disabled={!isUserTurn || !isDrafting}
                      className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isUserTurn && isDrafting ? 'bg-accent text-primary hover:scale-105 neon-glow' : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
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
          <div className="bg-card border border-border rounded-[32px] p-8 shadow-lg">
            <h3 className="text-xs font-black uppercase tracking-widest text-white/30 mb-8 flex items-center gap-3">
              <User className="w-4 h-4 text-accent" /> MY ROSTER <span className="ml-auto text-accent">{myTeam.length}/15</span>
            </h3>
            <div className="space-y-3">
              {['QB', 'RB', 'RB', 'WR', 'WR', 'TE', 'FLEX', 'DST', 'K', 'BN', 'BN', 'BN', 'BN', 'BN', 'BN'].map((pos, i) => {
                const player = myTeam[i];
                return (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${player ? 'bg-accent/5 border-accent/20' : 'bg-white/[0.02] border-dashed border-white/10'}`}>
                    <span className="text-[10px] font-black text-white/30 uppercase w-10">{pos}</span>
                    {player ? (
                      <div className="text-right">
                        <div className="text-xs font-bold text-white">{player.name}</div>
                        <div className="text-[8px] text-accent font-black uppercase tracking-widest">{player.team} • Pick {player.pick}</div>
                      </div>
                    ) : (
                      <span className="text-[10px] text-white/10 font-black uppercase tracking-widest">Available</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-card border border-border rounded-[32px] p-8 shadow-lg">
            <h3 className="text-xs font-black uppercase tracking-widest text-white/30 mb-8 flex items-center gap-3">
              <Zap className="w-4 h-4 text-accent" /> DRAFT LOG
            </h3>
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence initial={false}>
                {draftedPlayers.slice().reverse().map((p, i) => (
                  <motion.div 
                    key={p.pick}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-black text-white/30">{p.pick}</div>
                    <div className="flex-1">
                      <div className="text-xs font-bold">{p.name}</div>
                      <div className="text-[8px] text-white/40 uppercase font-black tracking-widest">Team {p.owner} • {p.pos}</div>
                    </div>
                    {p.owner === settings.userPick && (
                      <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(0,255,0,0.5)]" />
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
