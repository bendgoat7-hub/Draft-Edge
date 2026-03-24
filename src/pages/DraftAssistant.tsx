import React, { useState, useEffect } from 'react';
import { Navbar } from '@/src/components/Landing';
import { motion } from 'motion/react';
import { Users, Zap, Trophy, Search, Filter, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const MOCK_PLAYERS = [
  { id: '1', name: 'Christian McCaffrey', pos: 'RB', team: 'SF', adp: 1.1, proj: 24.5, tier: 1 },
  { id: '2', name: 'CeeDee Lamb', pos: 'WR', team: 'DAL', adp: 2.3, proj: 22.8, tier: 1 },
  { id: '3', name: 'Justin Jefferson', pos: 'WR', team: 'MIN', adp: 3.5, proj: 21.2, tier: 1 },
  { id: '4', name: 'Breece Hall', pos: 'RB', team: 'NYJ', adp: 4.2, proj: 20.5, tier: 1 },
  { id: '5', name: 'Tyreek Hill', pos: 'WR', team: 'MIA', adp: 5.1, proj: 21.8, tier: 1 },
  { id: '6', name: 'Bijan Robinson', pos: 'RB', team: 'ATL', adp: 6.4, proj: 19.7, tier: 1 },
  { id: '7', name: 'Ja\'Marr Chase', pos: 'WR', team: 'CIN', adp: 7.2, proj: 20.2, tier: 1 },
  { id: '8', name: 'Amon-Ra St. Brown', pos: 'WR', team: 'DET', adp: 8.5, proj: 19.5, tier: 1 },
  { id: '9', name: 'Saquon Barkley', pos: 'RB', team: 'PHI', adp: 9.8, proj: 18.8, tier: 2 },
  { id: '10', name: 'Garrett Wilson', pos: 'WR', team: 'NYJ', adp: 10.5, proj: 18.2, tier: 2 },
  { id: '11', name: 'Jonathan Taylor', pos: 'RB', team: 'IND', adp: 11.2, proj: 18.5, tier: 2 },
  { id: '12', name: 'Jahmyr Gibbs', pos: 'RB', team: 'DET', adp: 12.4, proj: 17.8, tier: 2 },
  { id: '13', name: 'A.J. Brown', pos: 'WR', team: 'PHI', adp: 13.1, proj: 17.5, tier: 2 },
  { id: '14', name: 'Puka Nacua', pos: 'WR', team: 'LAR', adp: 14.5, proj: 17.2, tier: 2 },
  { id: '15', name: 'Kyren Williams', pos: 'RB', team: 'LAR', adp: 15.8, proj: 16.8, tier: 2 },
];

export default function DraftAssistant() {
  const [search, setSearch] = useState('');
  
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Left: Player List */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-display font-black tracking-tighter uppercase">
              DRAFT <span className="text-accent italic">ASSISTANT</span>
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input 
                  type="text" 
                  placeholder="Search players..."
                  className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-accent/50 transition-all w-64"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="glass rounded-3xl overflow-hidden border-white/5">
            <div className="grid grid-cols-6 p-4 border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-white/30">
              <div className="col-span-3">Player</div>
              <div className="text-center">ADP</div>
              <div className="text-center">PROJ</div>
              <div className="text-right">Action</div>
            </div>
            <div className="divide-y divide-white/5">
              {MOCK_PLAYERS.map((player) => (
                <div key={player.id} className="grid grid-cols-6 p-4 items-center hover:bg-white/[0.02] transition-colors group">
                  <div className="col-span-3 flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center font-bold text-xs">
                      {player.pos}
                    </div>
                    <div>
                      <div className="text-sm font-bold">{player.name}</div>
                      <div className="text-[10px] text-white/30 font-bold uppercase">{player.team} • TIER {player.tier}</div>
                    </div>
                  </div>
                  <div className="text-center text-sm font-medium">{player.adp}</div>
                  <div className="text-center text-sm font-bold text-accent">{player.proj}</div>
                  <div className="text-right">
                    <button className="bg-white/5 hover:bg-accent hover:text-primary p-2 rounded-lg transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right: AI Recommendations */}
        <div className="w-full lg:w-96 space-y-8">
          <div className="glass p-8 rounded-[32px] border-accent/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[60px] -z-10" />
            <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 mb-6">
              <Zap className="w-4 h-4 text-accent" /> AI BEST PICK
            </h3>
            
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center">
                  <span className="text-primary font-black text-2xl">WR</span>
                </div>
                <div>
                  <div className="text-xl font-display font-black tracking-tight">JA'MARR CHASE</div>
                  <div className="text-xs font-bold text-white/40 uppercase">CIN • PROJ 18.4 PTS</div>
                </div>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                Chase is the clear choice here. His target share is projected to increase by 15% with a healthy Burrow. He offers the highest ceiling of any player remaining.
              </p>
            </div>
            
            <button className="w-full bg-accent text-primary py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform neon-glow">
              DRAFT PLAYER
            </button>
          </div>
          
          <div className="glass p-8 rounded-[32px] border-white/5">
            <h3 className="text-sm font-black uppercase tracking-widest text-white/30 mb-6 flex items-center gap-2">
              <Trophy className="w-4 h-4" /> ROSTER NEEDS
            </h3>
            <div className="space-y-4">
              {[
                { pos: 'QB', status: 'Empty', color: 'bg-white/10' },
                { pos: 'RB', status: 'Filled', color: 'bg-accent/20 text-accent' },
                { pos: 'WR', status: 'Empty', color: 'bg-white/10' },
                { pos: 'TE', status: 'Empty', color: 'bg-white/10' },
              ].map((need, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs font-bold">{need.pos}</span>
                  <span className={cn("text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded", need.color)}>
                    {need.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
