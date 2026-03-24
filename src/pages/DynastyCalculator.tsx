import React, { useState } from 'react';
import { Navbar } from '@/src/components/Landing';
import { Users, Search, Filter, Plus, TrendingUp, BarChart3, ArrowRightLeft } from 'lucide-react';
import { motion } from 'motion/react';

const mockDynastyPlayers = [
  { id: 1, name: 'Bijan Robinson', pos: 'RB', age: 22, value: 9800, trend: '+150', tier: 'Elite' },
  { id: 2, name: 'Justin Jefferson', pos: 'WR', age: 25, value: 9500, trend: '-50', tier: 'Elite' },
  { id: 3, name: 'Caleb Williams', pos: 'QB', age: 22, value: 8200, trend: '+300', tier: 'High' },
  { id: 4, name: 'Marvin Harrison Jr.', pos: 'WR', age: 21, value: 7800, trend: '+200', tier: 'High' },
  { id: 5, name: 'Breece Hall', pos: 'RB', age: 23, value: 8500, trend: '+100', tier: 'Elite' },
];

export default function DynastyCalculator() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlayers = mockDynastyPlayers.filter(p => 
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
              <Users className="w-6 h-6" />
              <span className="text-xs font-black uppercase tracking-widest">Dynasty Calculator</span>
            </div>
            <h1 className="text-5xl font-display font-black tracking-tighter uppercase">
              VALUE YOUR <span className="text-accent italic">FUTURE</span>
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
              <div className="flex-1">PLAYER / AGE</div>
              <div className="w-24 text-center">POS</div>
              <div className="w-24 text-center">TIER</div>
              <div className="w-24 text-center">VALUE</div>
              <div className="w-24 text-right">TREND</div>
            </div>
            {filteredPlayers.map((p, i) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-card border border-border flex items-center justify-between hover:border-accent/30 transition-all group"
              >
                <div className="flex-1">
                  <div className="font-bold">{p.name}</div>
                  <div className="text-[10px] text-white/40 uppercase">Age: {p.age}</div>
                </div>
                <div className="w-24 text-center font-bold text-sm">{p.pos}</div>
                <div className="w-24 text-center">
                  <div className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${p.tier === 'Elite' ? 'bg-accent/20 text-accent' : 'bg-white/10 text-white/60'}`}>{p.tier}</div>
                </div>
                <div className="w-24 text-center font-black italic text-accent text-lg">{p.value}</div>
                <div className={`w-24 text-right font-mono text-sm ${p.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{p.trend}</div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-card border border-border">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold">Trade Calculator</h3>
                <ArrowRightLeft className="w-5 h-5 text-accent" />
              </div>
              <div className="space-y-6 mb-8">
                <div>
                  <label className="text-[10px] font-black text-white/30 uppercase mb-2 block">Side A</label>
                  <div className="p-4 rounded-xl bg-white/5 border border-dashed border-white/10 text-xs text-white/20 italic text-center">Add Players / Picks</div>
                </div>
                <div className="flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-accent text-primary flex items-center justify-center font-black italic">VS</div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-white/30 uppercase mb-2 block">Side B</label>
                  <div className="p-4 rounded-xl bg-white/5 border border-dashed border-white/10 text-xs text-white/20 italic text-center">Add Players / Picks</div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold">Fairness Score</span>
                  <span className="text-xs font-black text-accent">--</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full" />
              </div>
              <button className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-colors">
                Calculate Trade
              </button>
            </div>

            <div className="p-8 rounded-3xl bg-accent text-primary neon-glow">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Dynasty Strategy</h3>
              <p className="text-sm font-medium leading-relaxed">
                "In dynasty, age is a currency. Sell high on aging RBs (27+) and target young WRs (21-23) to build a multi-year window of dominance."
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
