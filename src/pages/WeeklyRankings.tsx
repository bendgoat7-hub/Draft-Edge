import React, { useState } from 'react';
import { Navbar } from '@/src/components/Landing';
import { TrendingUp, Search, Filter, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'motion/react';

const mockRankings = [
  { id: 1, rank: 1, player: 'Christian McCaffrey', pos: 'RB', team: 'SF', opp: 'vs ARI', proj: '24.5', trend: 'up' },
  { id: 2, rank: 2, player: 'CeeDee Lamb', pos: 'WR', team: 'DAL', opp: '@ PHI', proj: '22.8', trend: 'up' },
  { id: 3, rank: 3, player: 'Justin Jefferson', pos: 'WR', team: 'MIN', opp: '@ GB', proj: '21.2', trend: 'up' },
  { id: 4, rank: 4, player: 'Breece Hall', pos: 'RB', team: 'NYJ', opp: 'vs DEN', proj: '20.5', trend: 'up' },
  { id: 5, rank: 5, player: 'Tyreek Hill', pos: 'WR', team: 'MIA', opp: 'vs TEN', proj: '21.8', trend: 'down' },
  { id: 6, rank: 6, player: 'Bijan Robinson', pos: 'RB', team: 'ATL', opp: 'vs NO', proj: '19.7', trend: 'up' },
  { id: 7, rank: 7, player: 'Ja\'Marr Chase', pos: 'WR', team: 'CIN', opp: '@ PIT', proj: '20.2', trend: 'up' },
  { id: 8, rank: 8, player: 'Amon-Ra St. Brown', pos: 'WR', team: 'DET', opp: 'vs SEA', proj: '19.5', trend: 'up' },
  { id: 9, rank: 9, player: 'Saquon Barkley', pos: 'RB', team: 'PHI', opp: 'vs DAL', proj: '18.8', trend: 'up' },
  { id: 10, rank: 10, player: 'Garrett Wilson', pos: 'WR', team: 'NYJ', opp: 'vs DEN', proj: '18.2', trend: 'up' },
  { id: 11, rank: 11, player: 'Josh Allen', pos: 'QB', team: 'BUF', opp: '@ BAL', proj: '24.2', trend: 'down' },
  { id: 12, rank: 12, player: 'Patrick Mahomes', pos: 'QB', team: 'KC', opp: '@ LAC', proj: '23.5', trend: 'up' },
  { id: 13, rank: 13, player: 'Travis Kelce', pos: 'TE', team: 'KC', opp: '@ LAC', proj: '15.8', trend: 'down' },
  { id: 14, rank: 14, player: 'Sam LaPorta', pos: 'TE', team: 'DET', opp: 'vs SEA', proj: '15.2', trend: 'up' },
];

export default function WeeklyRankings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPos, setCurrentPos] = useState('ALL');

  const filteredRankings = mockRankings.filter(r => 
    (currentPos === 'ALL' || r.pos === currentPos) &&
    (r.player.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.pos.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 text-accent mb-4">
              <TrendingUp className="w-6 h-6" />
              <span className="text-xs font-black uppercase tracking-widest">Weekly Rankings</span>
            </div>
            <h1 className="text-5xl font-display font-black tracking-tighter uppercase">
              EXPERT <span className="text-accent italic">RANKINGS</span>
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

        <div className="flex flex-wrap gap-2 mb-8">
          {['ALL', 'QB', 'RB', 'WR', 'TE', 'K', 'D/ST'].map(pos => (
            <button 
              key={pos}
              onClick={() => setCurrentPos(pos)}
              className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${currentPos === pos ? 'bg-accent text-primary' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
            >
              {pos}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="p-8 rounded-3xl bg-card border border-border overflow-hidden">
              <div className="grid grid-cols-12 gap-4 pb-6 border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-white/30">
                <div className="col-span-1">RK</div>
                <div className="col-span-1">TREND</div>
                <div className="col-span-5">PLAYER</div>
                <div className="col-span-2">POS</div>
                <div className="col-span-2">OPP</div>
                <div className="col-span-1 text-right">PROJ</div>
              </div>
              
              <div className="divide-y divide-white/5">
                {filteredRankings.map((ranking, i) => (
                  <motion.div 
                    key={ranking.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="grid grid-cols-12 gap-4 py-6 items-center hover:bg-white/[0.02] transition-colors group cursor-pointer"
                  >
                    <div className="col-span-1 text-xl font-black italic text-white/20">{ranking.rank}</div>
                    <div className="col-span-1">
                      {ranking.trend === 'up' ? <ChevronUp className="w-4 h-4 text-green-400" /> : <ChevronDown className="w-4 h-4 text-red-400" />}
                    </div>
                    <div className="col-span-5">
                      <div className="font-bold group-hover:text-accent transition-colors">{ranking.player}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest">{ranking.team}</div>
                    </div>
                    <div className="col-span-2 text-sm font-medium text-white/60">{ranking.pos}</div>
                    <div className="col-span-2 text-sm font-medium text-white/60">{ranking.opp}</div>
                    <div className="col-span-1 text-right font-black italic text-accent">{ranking.proj}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/5">
              <h3 className="text-lg font-bold mb-4">Expert Consensus</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Rankings are aggregated from 50+ industry experts and adjusted for real-time news, weather, and injury reports.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-accent text-primary neon-glow">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Pro Tip</h3>
              <p className="text-sm font-medium leading-relaxed">
                "Don't chase last week's points. Focus on target share and red-zone usage for sustainable production."
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
