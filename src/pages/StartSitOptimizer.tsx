import React, { useState } from 'react';
import { Navbar } from '@/src/components/Landing';
import { ShieldCheck, TrendingUp, Search, Filter, Plus, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'motion/react';

const mockMatchups = [
  { id: 1, player: 'Saquon Barkley', pos: 'RB', team: 'PHI', opp: 'vs DAL', proj: '18.4', status: 'Start', confidence: '92%', reason: 'Elite volume and favorable matchup against a struggling run defense.' },
  { id: 2, player: 'CeeDee Lamb', pos: 'WR', team: 'DAL', opp: '@ PHI', proj: '21.2', status: 'Start', confidence: '98%', reason: 'Top-tier target share and high-scoring game environment.' },
  { id: 3, player: 'Zamir White', pos: 'RB', team: 'LV', opp: 'vs CLE', proj: '9.8', status: 'Sit', confidence: '65%', reason: 'Inefficient production and tough defensive front.' },
  { id: 4, player: 'Terry McLaurin', pos: 'WR', team: 'WAS', opp: '@ ARI', proj: '14.5', status: 'Start', confidence: '78%', reason: 'Developing chemistry with Jayden Daniels; high target volume.' },
  { id: 5, player: 'Jared Goff', pos: 'QB', team: 'DET', opp: 'vs SEA', proj: '16.2', status: 'Sit', confidence: '55%', reason: 'Low passing volume expected in a run-heavy game script.' },
];

export default function StartSitOptimizer() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMatchups = mockMatchups.filter(m => 
    m.player.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.pos.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 text-accent mb-4">
              <ShieldCheck className="w-6 h-6" />
              <span className="text-xs font-black uppercase tracking-widest">Start/Sit Optimizer</span>
            </div>
            <h1 className="text-5xl font-display font-black tracking-tighter uppercase">
              OPTIMIZE YOUR <span className="text-accent italic">LINEUP</span>
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
            {filteredMatchups.map((matchup, i) => (
              <motion.div 
                key={matchup.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-card border border-border flex items-center justify-between hover:border-accent/30 transition-all group"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${matchup.status === 'Start' ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'}`}>
                    {matchup.status === 'Start' ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{matchup.player}</h3>
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <span>{matchup.pos}</span>
                      <span>•</span>
                      <span>{matchup.team}</span>
                      <span>•</span>
                      <span className="text-white/60">{matchup.opp}</span>
                    </div>
                  </div>
                </div>
                
                <div className="hidden md:block max-w-xs text-right">
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">AI VERDICT: {matchup.status}</div>
                  <p className="text-xs text-white/60 leading-relaxed">{matchup.reason}</p>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black italic text-accent">{matchup.proj}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/30">PROJ PTS</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-card border border-border">
              <h3 className="text-lg font-bold mb-6">Matchup Heatmap</h3>
              <div className="space-y-4">
                {['QB', 'RB', 'WR', 'TE', 'D/ST'].map(pos => (
                  <div key={pos} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-sm font-bold">{pos} Matchups</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className={`w-4 h-4 rounded-sm ${i > 3 ? 'bg-green-400/40' : i > 1 ? 'bg-yellow-400/40' : 'bg-red-400/40'}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/5">
              <h3 className="text-lg font-bold mb-4">Simulation Insights</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Our engine ran 10,000 simulations for this week's games. The highest variance is currently in the PHI vs DAL matchup, where offensive efficiency is projected at 95% of peak capacity.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
