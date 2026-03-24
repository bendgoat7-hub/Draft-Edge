import React, { useState } from 'react';
import { Navbar } from '@/src/components/Landing';
import { BarChart3, Search, Filter, Plus, TrendingUp, Target, Percent } from 'lucide-react';
import { motion } from 'motion/react';

const mockProps = [
  { id: 1, player: 'Saquon Barkley', prop: 'Over 75.5 Rush Yds', odds: '-115', proj: '88.4', edge: '17.1%', trend: 'up' },
  { id: 2, player: 'Justin Jefferson', prop: 'Over 82.5 Rec Yds', odds: '-110', proj: '95.2', edge: '15.4%', trend: 'up' },
  { id: 3, player: 'Lamar Jackson', prop: 'Over 1.5 Pass TD', odds: '+105', proj: '1.8', edge: '12.0%', trend: 'down' },
  { id: 4, player: 'Breece Hall', prop: 'Over 3.5 Receptions', odds: '-125', proj: '4.2', edge: '10.5%', trend: 'up' },
  { id: 5, player: 'CeeDee Lamb', prop: 'Over 6.5 Receptions', odds: '-110', proj: '7.1', edge: '9.2%', trend: 'down' },
];

export default function PropAnalyzer() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProps = mockProps.filter(p => 
    p.player.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.prop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 text-accent mb-4">
              <BarChart3 className="w-6 h-6" />
              <span className="text-xs font-black uppercase tracking-widest">Prop Analyzer</span>
            </div>
            <h1 className="text-5xl font-display font-black tracking-tighter uppercase">
              FIND THE <span className="text-accent italic">EDGE</span>
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
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/30">
              <div className="flex-1">PLAYER / PROP</div>
              <div className="w-24 text-center">ODDS</div>
              <div className="w-24 text-center">PROJ</div>
              <div className="w-24 text-center">EDGE</div>
              <div className="w-12"></div>
            </div>
            {filteredProps.map((p, i) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-card border border-border flex items-center justify-between hover:border-accent/30 transition-all group"
              >
                <div className="flex-1">
                  <div className="font-bold">{p.player}</div>
                  <div className="text-[10px] text-white/40 uppercase">{p.prop}</div>
                </div>
                <div className="w-24 text-center font-mono text-sm">{p.odds}</div>
                <div className="w-24 text-center font-black italic text-accent">{p.proj}</div>
                <div className="w-24 text-center text-sm text-green-400 font-bold">{p.edge}</div>
                <button className="w-12 flex justify-end">
                  <Plus className="w-5 h-5 text-white/20 group-hover:text-accent transition-colors" />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-accent text-primary neon-glow">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Prop Strategy</h3>
              <p className="text-sm font-medium leading-relaxed mb-6">
                "Look for props with an edge of 10% or higher. These represent significant value based on our 10,000+ simulation engine."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-60">BEST BET</div>
                  <div className="text-sm font-bold italic">Saquon Over 75.5</div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-card border border-border">
              <h3 className="text-lg font-bold mb-6">Market Trends</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-sm font-bold">Sharp Money</span>
                  <span className="text-xs text-green-400">WR Overs</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-sm font-bold">Public Money</span>
                  <span className="text-xs text-red-400">QB Overs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
