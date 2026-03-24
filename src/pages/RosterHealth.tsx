import React, { useState } from 'react';
import { Navbar } from '@/src/components/Landing';
import { Users, Search, Filter, Plus, TrendingUp, BarChart3, ShieldCheck, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const mockHealthData = {
  overall: 82,
  positions: [
    { pos: 'QB', score: 95, status: 'Elite', players: 'Mahomes, Allen', note: 'Strongest position. No action needed.' },
    { pos: 'RB', score: 65, status: 'Weak', players: 'McCaffrey, Hall', note: 'Depth is a major concern. One injury could tank your season.' },
    { pos: 'WR', score: 88, status: 'Solid', players: 'Jefferson, Hill, Rice', note: 'Great starters. Bye-week management is key.' },
    { pos: 'TE', score: 72, status: 'Average', players: 'Kelce', note: 'Top-tier starter but no backup. High risk if Kelce misses time.' },
  ],
  byeWeeks: [
    { week: 5, impact: 'High', players: 'Mahomes, Kelce, Rice', status: 'Critical' },
    { week: 9, impact: 'Medium', players: 'Jefferson, Hall', status: 'Manageable' },
    { week: 12, impact: 'Low', players: 'McCaffrey', status: 'Safe' },
  ]
};

export default function RosterHealth() {
  const [activeTab, setActiveTab] = useState('POSITIONS');

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 text-accent mb-4">
              <ShieldCheck className="w-6 h-6" />
              <span className="text-xs font-black uppercase tracking-widest">Roster Health Engine</span>
            </div>
            <h1 className="text-5xl font-display font-black tracking-tighter uppercase">
              TEAM <span className="text-accent italic">DIAGNOSTICS</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-4xl font-display font-black text-accent italic">{mockHealthData.overall}%</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/30">OVERALL SCORE</div>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-white/5 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent animate-spin" style={{ animationDuration: '3s' }} />
              <CheckCircle2 className="w-8 h-8 text-accent" />
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-12">
          {['POSITIONS', 'BYE WEEKS', 'RISK ANALYSIS'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-accent text-primary neon-glow' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="wait">
              {activeTab === 'POSITIONS' && (
                <motion.div 
                  key="positions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {mockHealthData.positions.map((p, i) => (
                    <div key={p.pos} className="p-8 rounded-3xl bg-card border border-border flex flex-col md:flex-row items-center justify-between gap-8 hover:border-accent/30 transition-all">
                      <div className="flex items-center gap-6 flex-1">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${p.score >= 85 ? 'bg-green-400/10 text-green-400' : p.score >= 70 ? 'bg-yellow-400/10 text-yellow-400' : 'bg-red-400/10 text-red-400'}`}>
                          <span className="text-2xl font-black italic">{p.pos}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{p.status}</h3>
                          <p className="text-xs text-white/40 mt-1">{p.players}</p>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <p className="text-sm text-white/60 leading-relaxed italic">"{p.note}"</p>
                      </div>

                      <div className="text-right shrink-0">
                        <div className={`text-2xl font-black italic ${p.score >= 85 ? 'text-green-400' : p.score >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>{p.score}%</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/30">SCORE</div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'BYE WEEKS' && (
                <motion.div 
                  key="bye-weeks"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {mockHealthData.byeWeeks.map((b, i) => (
                    <div key={b.week} className="p-8 rounded-3xl bg-card border border-border flex flex-col md:flex-row items-center justify-between gap-8 hover:border-accent/30 transition-all">
                      <div className="flex items-center gap-6 flex-1">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${b.status === 'Critical' ? 'bg-red-400/10 text-red-400' : b.status === 'Manageable' ? 'bg-yellow-400/10 text-yellow-400' : 'bg-green-400/10 text-green-400'}`}>
                          <span className="text-2xl font-black italic">W{b.week}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{b.status} Impact</h3>
                          <p className="text-xs text-white/40 mt-1">{b.players}</p>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">RISK LEVEL</div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full ${b.status === 'Critical' ? 'bg-red-400 w-full' : b.status === 'Manageable' ? 'bg-yellow-400 w-1/2' : 'bg-green-400 w-1/4'}`} />
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className={`text-xl font-black italic uppercase ${b.status === 'Critical' ? 'text-red-400' : b.status === 'Manageable' ? 'text-yellow-400' : 'text-green-400'}`}>{b.impact}</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/30">THREAT</div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-accent text-primary neon-glow">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-4">AI Prescription</h3>
              <p className="text-sm font-medium leading-relaxed mb-6">
                "Your RB depth is dangerously low. We recommend trading one of your elite QBs (Allen or Mahomes) for a high-volume RB2 to balance your roster health."
              </p>
              <button className="w-full py-3 rounded-xl bg-primary text-white text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">
                Analyze Trades
              </button>
            </div>

            <div className="p-8 rounded-3xl bg-card border border-border">
              <h3 className="text-lg font-bold mb-6">Health Trends</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-sm font-bold">Week 1</span>
                  <span className="text-xs text-green-400">92%</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-sm font-bold">Week 2</span>
                  <span className="text-xs text-yellow-400">85%</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-sm font-bold">Week 3</span>
                  <span className="text-xs text-red-400">82%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
