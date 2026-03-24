import React, { useState } from 'react';
import { Navbar } from '@/src/components/Landing';
import { Zap, TrendingUp, Search, Filter, Plus } from 'lucide-react';
import { motion } from 'motion/react';

const mockWaiverPlayers = [
  { id: 1, name: 'Bucky Irving', pos: 'RB', team: 'TB', rostered: '42%', trend: '+12%', upside: 'High', reason: 'Increased snap share (45%) and goal-line work.' },
  { id: 2, name: 'Jauan Jennings', pos: 'WR', team: 'SF', rostered: '38%', trend: '+25%', upside: 'Elite', reason: 'Deebo Samuel injury creates massive target volume.' },
  { id: 3, name: 'Quentin Johnston', pos: 'WR', team: 'LAC', rostered: '28%', trend: '+8%', upside: 'Medium', reason: 'Developing chemistry with Herbert; deep threat potential.' },
  { id: 4, name: 'Sam Darnold', pos: 'QB', team: 'MIN', rostered: '45%', trend: '+15%', upside: 'High', reason: 'Top 5 QB efficiency through 3 weeks.' },
  { id: 5, name: 'Tyler Conklin', pos: 'TE', team: 'NYJ', rostered: '15%', trend: '+5%', upside: 'Low', reason: 'Consistent target floor in a pass-heavy offense.' },
];

export default function WaiverFinder() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlayers = mockWaiverPlayers.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.pos.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 text-accent mb-4">
              <Zap className="w-6 h-6" />
              <span className="text-xs font-black uppercase tracking-widest">Waiver Wire Finder</span>
            </div>
            <h1 className="text-5xl font-display font-black tracking-tighter uppercase">
              BEAT THE <span className="text-accent italic">WIRE</span>
            </h1>
          </div>
          
          <div className="flex gap-4">
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
            <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {filteredPlayers.map((player, i) => (
              <motion.div 
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-card border border-border flex items-center justify-between hover:border-accent/30 transition-all group"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center font-bold text-accent">
                    {player.pos}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{player.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <span>{player.team}</span>
                      <span>•</span>
                      <span>{player.rostered} Rostered</span>
                      <span className="text-green-400 font-bold">{player.trend}</span>
                    </div>
                  </div>
                </div>
                
                <div className="hidden md:block max-w-xs text-right">
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">AI INSIGHT</div>
                  <p className="text-xs text-white/60 leading-relaxed">{player.reason}</p>
                </div>

                <button className="p-3 rounded-xl bg-accent text-primary opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                  <Plus className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-accent text-primary neon-glow">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Pro Strategy</h3>
              <p className="text-sm font-medium leading-relaxed mb-6">
                "Waiver wire wins championships. This week, prioritize RB depth as several starters are facing tough matchups or minor injuries."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-60">TRENDING UP</div>
                  <div className="text-sm font-bold italic">Zero-RB Strategy</div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-card border border-border">
              <h3 className="text-lg font-bold mb-6">Waiver Priority</h3>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xl font-black italic text-white/20">0{i}</span>
                    <div>
                      <div className="font-bold text-sm">Priority Target {i}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest">High FAAB Bid Recommended</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
