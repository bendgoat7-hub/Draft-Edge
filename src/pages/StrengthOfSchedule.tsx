import React, { useState } from 'react';
import { Navbar } from '@/src/components/Landing';
import { BarChart3, Search, Filter, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'motion/react';

const mockSoS = [
  { id: 1, team: 'PHI', pos: 'QB', week1: 4, week2: 5, week3: 3, week4: 5, avg: 4.25, trend: 'up' },
  { id: 2, team: 'SF', pos: 'RB', week1: 5, week2: 4, week3: 5, week4: 4, avg: 4.5, trend: 'up' },
  { id: 3, team: 'DAL', pos: 'WR', week1: 3, week2: 2, week3: 4, week4: 3, avg: 3.0, trend: 'down' },
  { id: 4, team: 'MIN', pos: 'WR', week1: 4, week2: 5, week3: 4, week4: 5, avg: 4.5, trend: 'up' },
  { id: 5, team: 'KC', pos: 'TE', week1: 5, week2: 5, week3: 4, week4: 4, avg: 4.5, trend: 'up' },
  { id: 6, team: 'NYJ', pos: 'D/ST', week1: 2, week2: 3, week3: 2, week4: 1, avg: 2.0, trend: 'down' },
];

export default function StrengthOfSchedule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPos, setCurrentPos] = useState('ALL');

  const filteredSoS = mockSoS.filter(s => 
    (currentPos === 'ALL' || s.pos === currentPos) &&
    (s.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.pos.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getHeatColor = (val: number) => {
    if (val >= 4.5) return 'bg-green-400/40 text-green-400 border-green-400/20';
    if (val >= 3.5) return 'bg-green-400/20 text-green-400/80 border-green-400/10';
    if (val >= 2.5) return 'bg-yellow-400/20 text-yellow-400/80 border-yellow-400/10';
    return 'bg-red-400/20 text-red-400/80 border-red-400/10';
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 text-accent mb-4">
              <BarChart3 className="w-6 h-6" />
              <span className="text-xs font-black uppercase tracking-widest">Strength of Schedule</span>
            </div>
            <h1 className="text-5xl font-display font-black tracking-tighter uppercase">
              ANALYZE THE <span className="text-accent italic">MATCHUPS</span>
            </h1>
          </div>
          
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                type="text" 
                placeholder="Search teams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-accent/50 w-64"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {['ALL', 'QB', 'RB', 'WR', 'TE', 'D/ST'].map(pos => (
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
                <div className="col-span-2">TEAM / POS</div>
                <div className="col-span-2 text-center">WEEK 4</div>
                <div className="col-span-2 text-center">WEEK 5</div>
                <div className="col-span-2 text-center">WEEK 6</div>
                <div className="col-span-2 text-center">WEEK 7</div>
                <div className="col-span-2 text-right">AVG RATING</div>
              </div>
              
              <div className="divide-y divide-white/5">
                {filteredSoS.map((s, i) => (
                  <motion.div 
                    key={s.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="grid grid-cols-12 gap-4 py-6 items-center hover:bg-white/[0.02] transition-colors group cursor-pointer"
                  >
                    <div className="col-span-2">
                      <div className="font-bold">{s.team}</div>
                      <div className="text-[10px] text-white/40 uppercase">{s.pos}</div>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black italic border ${getHeatColor(s.week1)}`}>{s.week1}</div>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black italic border ${getHeatColor(s.week2)}`}>{s.week2}</div>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black italic border ${getHeatColor(s.week3)}`}>{s.week3}</div>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black italic border ${getHeatColor(s.week4)}`}>{s.week4}</div>
                    </div>
                    <div className="col-span-2 text-right">
                      <div className="text-xl font-black italic text-accent">{s.avg}</div>
                      <div className="flex items-center justify-end gap-1">
                        {s.trend === 'up' ? <ChevronUp className="w-3 h-3 text-green-400" /> : <ChevronDown className="w-3 h-3 text-red-400" />}
                        <span className="text-[8px] font-black uppercase tracking-widest text-white/30">TREND</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/5">
              <h3 className="text-lg font-bold mb-4">Rating Legend</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-green-400" />
                  <span className="text-xs text-white/60">Elite Matchup (5)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-green-400/40" />
                  <span className="text-xs text-white/60">Favorable (4)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-yellow-400/40" />
                  <span className="text-xs text-white/60">Neutral (3)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-red-400/40" />
                  <span className="text-xs text-white/60">Tough (2)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-red-400" />
                  <span className="text-xs text-white/60">Avoid (1)</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-accent text-primary neon-glow">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-4">AI Strategy</h3>
              <p className="text-sm font-medium leading-relaxed">
                "Target players with a schedule rating of 4.0+ over the next 4 weeks. These players are statistically likely to outperform their projections by 15%."
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
