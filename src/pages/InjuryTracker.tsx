import React, { useState } from 'react';
import { Navbar } from '@/src/components/Landing';
import { ShieldCheck, TrendingUp, Search, Filter, Plus, AlertCircle, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'motion/react';

const mockInjuries = [
  { id: 1, player: 'Christian McCaffrey', pos: 'RB', team: 'SF', status: 'Out', injury: 'Achilles', impact: 'High', replacement: 'Jordan Mason', note: 'Placed on IR. Expected return Week 10.' },
  { id: 2, player: 'A.J. Brown', pos: 'WR', team: 'PHI', status: 'Questionable', injury: 'Hamstring', impact: 'Medium', replacement: 'DeVonta Smith', note: 'Limited in practice Friday. Game-time decision.' },
  { id: 3, player: 'Cooper Kupp', pos: 'WR', team: 'LAR', status: 'Out', injury: 'Ankle', impact: 'High', replacement: 'Demarcus Robinson', note: 'High ankle sprain. Expected out 3-4 weeks.' },
  { id: 4, player: 'Joe Mixon', pos: 'RB', team: 'HOU', status: 'Doubtful', injury: 'Ankle', impact: 'Medium', replacement: 'Cam Akers', note: 'Did not practice all week. Unlikely to play.' },
  { id: 5, player: 'Jordan Love', pos: 'QB', team: 'GB', status: 'Questionable', injury: 'Knee', impact: 'High', replacement: 'Malik Willis', note: 'Limited participant. Trending towards playing.' },
];

export default function InjuryTracker() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInjuries = mockInjuries.filter(i => 
    i.player.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 text-accent mb-4">
              <ShieldCheck className="w-6 h-6" />
              <span className="text-xs font-black uppercase tracking-widest">Injury Tracker</span>
            </div>
            <h1 className="text-5xl font-display font-black tracking-tighter uppercase">
              REAL-TIME <span className="text-accent italic">UPDATES</span>
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
            {filteredInjuries.map((injury, i) => (
              <motion.div 
                key={injury.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-card border border-border flex items-center justify-between hover:border-accent/30 transition-all group"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${injury.status === 'Out' ? 'bg-red-400/10 text-red-400' : 'bg-yellow-400/10 text-yellow-400'}`}>
                    {injury.status === 'Out' ? <XCircle className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{injury.player}</h3>
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <span>{injury.pos}</span>
                      <span>•</span>
                      <span>{injury.team}</span>
                      <span>•</span>
                      <span className="text-white/60">{injury.injury}</span>
                    </div>
                  </div>
                </div>
                
                <div className="hidden md:block max-w-xs text-right">
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">REPLACEMENT: {injury.replacement}</div>
                  <p className="text-xs text-white/60 leading-relaxed">{injury.note}</p>
                </div>

                <div className="text-right">
                  <div className={`text-sm font-black italic uppercase ${injury.status === 'Out' ? 'text-red-400' : 'text-yellow-400'}`}>{injury.status}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/30">STATUS</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-accent text-primary neon-glow">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Injury Impact</h3>
              <p className="text-sm font-medium leading-relaxed mb-6">
                "The loss of Christian McCaffrey significantly downgrades the 49ers' offensive efficiency. Jordan Mason is a must-start RB2/Flex option."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-60">TRENDING UP</div>
                  <div className="text-sm font-bold italic">Jordan Mason</div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-card border border-border">
              <h3 className="text-lg font-bold mb-6">Practice Reports</h3>
              <div className="space-y-4">
                {['DNP', 'LP', 'FP'].map(status => (
                  <div key={status} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-sm font-bold">{status} List</span>
                    <span className="text-xs text-white/40">12 Players</span>
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
