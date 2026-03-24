import React, { useState } from 'react';
import { Navbar } from '@/src/components/Landing';
import { motion } from 'motion/react';
import { Users, Zap, BarChart3, TrendingUp, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const MOCK_PLAYERS = [
  { id: '1', name: 'Justin Jefferson', pos: 'WR', team: 'MIN', proj: 18.4, avg: 17.2, ceiling: 24.5, floor: 12.1 },
  { id: '2', name: 'Tyreek Hill', pos: 'WR', team: 'MIA', proj: 19.2, avg: 18.5, ceiling: 28.1, floor: 10.4 },
];

export default function PlayerComparison() {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display font-black tracking-tighter uppercase mb-4">
            PLAYER <span className="text-accent italic">COMPARISON</span>
          </h1>
          <p className="text-white/50">Side-by-side AI analysis of any two players.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {MOCK_PLAYERS.map((player, i) => (
            <div key={player.id} className="glass p-10 rounded-[40px] border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] -z-10" />
              
              <div className="flex items-center gap-6 mb-10">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center">
                  <span className="text-2xl font-black text-white/20">{player.pos}</span>
                </div>
                <div>
                  <h2 className="text-3xl font-display font-black tracking-tight">{player.name}</h2>
                  <div className="text-xs font-bold text-white/40 uppercase tracking-widest">{player.team} • WR1</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                  <div className="text-4xl font-display font-black text-accent mb-1">{player.proj}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/30">Proj Points</div>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                  <div className="text-4xl font-display font-black text-white mb-1">{player.avg}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/30">Season Avg</div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">
                    <span>Ceiling / Floor</span>
                    <span className="text-white/60">{player.ceiling} / {player.floor}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-blue w-[75%]" />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">
                    <span>Matchup Strength</span>
                    <span className="text-accent">EXCELLENT</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-[90%]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 glass p-10 rounded-[40px] border-accent/20">
          <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 mb-6">
            <Zap className="w-4 h-4 text-accent" /> AI HEAD-TO-HEAD VERDICT
          </h3>
          <p className="text-lg font-medium leading-relaxed text-white/80">
            While both players are elite, <span className="text-accent font-bold">Tyreek Hill</span> has the edge this week. The Dolphins face a Titans defense that has allowed the 3rd most explosive plays to WRs this season. Justin Jefferson's matchup against the Lions is tougher, as they've limited WR1s to under 15 points in 3 of their last 4 games.
          </p>
        </div>
      </main>
    </div>
  );
}
