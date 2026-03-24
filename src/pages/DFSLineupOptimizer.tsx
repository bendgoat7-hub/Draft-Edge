import React, { useState } from 'react';
import { Navbar } from '@/src/components/Landing';
import { Zap, Search, Filter, Plus, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';

const mockDFSPlayers = [
  { id: 1, name: 'Lamar Jackson', pos: 'QB', salary: '$8,200', proj: '24.5', value: '3.0x', matchup: '@ DAL' },
  { id: 2, name: 'Breece Hall', pos: 'RB', salary: '$7,500', proj: '20.2', value: '2.7x', matchup: 'vs DEN' },
  { id: 3, name: 'Rashee Rice', pos: 'WR', salary: '$6,400', proj: '18.8', value: '2.9x', matchup: '@ ATL' },
  { id: 4, name: 'Brock Bowers', pos: 'TE', salary: '$4,800', proj: '14.2', value: '3.0x', matchup: 'vs CLE' },
  { id: 5, name: 'Chris Godwin', pos: 'WR', salary: '$6,200', proj: '17.5', value: '2.8x', matchup: 'vs DEN' },
];

export default function DFSLineupOptimizer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [platform, setPlatform] = useState('DraftKings');

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 text-accent mb-4">
              <Zap className="w-6 h-6" />
              <span className="text-xs font-black uppercase tracking-widest">DFS Lineup Optimizer</span>
            </div>
            <h1 className="text-5xl font-display font-black tracking-tighter uppercase">
              CRUSH THE <span className="text-accent italic">GPPs</span>
            </h1>
          </div>
          
          <div className="flex gap-4">
            <select 
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-accent/50"
            >
              <option>DraftKings</option>
              <option>FanDuel</option>
              <option>Yahoo DFS</option>
            </select>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                type="text" 
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-accent/50 w-64"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/30">
              <div className="flex-1">Player</div>
              <div className="w-24 text-center">Salary</div>
              <div className="w-24 text-center">Proj</div>
              <div className="w-24 text-center">Value</div>
              <div className="w-12"></div>
            </div>
            {mockDFSPlayers.map((player, i) => (
              <motion.div 
                key={player.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-card border border-border flex items-center justify-between hover:border-accent/30 transition-all group"
              >
                <div className="flex-1 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center font-bold text-accent text-xs">
                    {player.pos}
                  </div>
                  <div>
                    <div className="font-bold">{player.name}</div>
                    <div className="text-[10px] text-white/40 uppercase">{player.matchup}</div>
                  </div>
                </div>
                <div className="w-24 text-center font-mono text-sm">{player.salary}</div>
                <div className="w-24 text-center font-black italic text-accent">{player.proj}</div>
                <div className="w-24 text-center text-sm text-green-400 font-bold">{player.value}</div>
                <button className="w-12 flex justify-end">
                  <Plus className="w-5 h-5 text-white/20 group-hover:text-accent transition-colors" />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-card border border-border">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold">Optimal Lineup</h3>
                <div className="text-xs font-black text-accent">$50,000 / $50,000</div>
              </div>
              <div className="space-y-3 mb-8">
                {['QB', 'RB', 'RB', 'WR', 'WR', 'WR', 'TE', 'FLEX', 'DST'].map(pos => (
                  <div key={pos} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-dashed border-white/10">
                    <span className="text-[10px] font-black text-white/30 uppercase">{pos}</span>
                    <span className="text-xs text-white/20 italic">Empty</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 rounded-xl bg-accent text-primary font-black uppercase tracking-widest hover:scale-[1.02] transition-transform neon-glow">
                Optimize Lineup
              </button>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/5">
              <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4 text-accent" /> Optimizer Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-white/30 uppercase mb-2 block">Stacking</label>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-lg bg-accent text-primary text-[10px] font-bold">QB + 1 WR</button>
                    <button className="flex-1 py-2 rounded-lg bg-white/5 text-white/40 text-[10px] font-bold">QB + 2 WR</button>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-white/30 uppercase mb-2 block">Variance</label>
                  <input type="range" className="w-full accent-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
