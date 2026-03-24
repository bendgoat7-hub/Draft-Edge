import React, { useState } from 'react';
import { Navbar } from '@/src/components/Landing';
import { TrendingUp, Search, Filter, Plus, Trophy, Target, Percent } from 'lucide-react';
import { motion } from 'motion/react';

const mockPlayoffOdds = [
  { id: 1, team: 'Team Alpha', owner: 'Mike R.', record: '3-0', points: '412.5', odds: '98%', winOdds: '22%', trend: 'up' },
  { id: 2, team: 'Team Beta', owner: 'Sarah J.', record: '2-1', points: '385.2', odds: '85%', winOdds: '15%', trend: 'up' },
  { id: 3, team: 'Team Gamma', owner: 'David K.', record: '2-1', points: '360.8', odds: '72%', winOdds: '10%', trend: 'down' },
  { id: 4, team: 'Team Delta', owner: 'Chris L.', record: '1-2', points: '345.1', odds: '45%', winOdds: '5%', trend: 'down' },
  { id: 5, team: 'Team Epsilon', owner: 'John D.', record: '1-2', points: '320.4', odds: '32%', winOdds: '3%', trend: 'up' },
  { id: 6, team: 'Team Zeta', owner: 'Alex M.', record: '0-3', points: '295.7', odds: '12%', winOdds: '1%', trend: 'down' },
];

export default function PlayoffPredictor() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOdds = mockPlayoffOdds.filter(o => 
    o.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 text-accent mb-4">
              <TrendingUp className="w-6 h-6" />
              <span className="text-xs font-black uppercase tracking-widest">Playoff Predictor</span>
            </div>
            <h1 className="text-5xl font-display font-black tracking-tighter uppercase">
              PREDICT THE <span className="text-accent italic">CHAMPION</span>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/30">
              <div className="flex-1">TEAM / OWNER</div>
              <div className="w-24 text-center">RECORD</div>
              <div className="w-24 text-center">POINTS</div>
              <div className="w-24 text-center">PLAYOFF ODDS</div>
              <div className="w-24 text-right">WIN ODDS</div>
            </div>
            {filteredOdds.map((o, i) => (
              <motion.div 
                key={o.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-card border border-border flex items-center justify-between hover:border-accent/30 transition-all group"
              >
                <div className="flex-1">
                  <div className="font-bold">{o.team}</div>
                  <div className="text-[10px] text-white/40 uppercase">{o.owner}</div>
                </div>
                <div className="w-24 text-center font-mono text-sm">{o.record}</div>
                <div className="w-24 text-center font-mono text-sm">{o.points}</div>
                <div className="w-24 text-center">
                  <div className="text-lg font-black italic text-accent">{o.odds}</div>
                  <div className="w-full h-1 bg-white/5 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: o.odds }} />
                  </div>
                </div>
                <div className="w-24 text-right">
                  <div className="text-lg font-black italic text-white/60">{o.winOdds}</div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-white/20">CHAMPION</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-accent text-primary neon-glow">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-4">AI Analysis</h3>
              <p className="text-sm font-medium leading-relaxed mb-6">
                "Team Alpha is currently the favorite with a 98% chance of making the playoffs. Their high points-for total suggests their record is sustainable."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-60">PROJECTED CHAMP</div>
                  <div className="text-sm font-bold italic">Team Alpha</div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-card border border-border">
              <h3 className="text-lg font-bold mb-6">Simulation Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <Target className="w-4 h-4 text-accent" />
                    <span className="text-sm font-bold">Simulations Run</span>
                  </div>
                  <span className="text-sm font-mono">10,000</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <Percent className="w-4 h-4 text-accent" />
                    <span className="text-sm font-bold">Avg. Points Needed</span>
                  </div>
                  <span className="text-sm font-mono">1,850</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
