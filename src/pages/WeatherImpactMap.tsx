import React, { useState } from 'react';
import { Navbar } from '@/src/components/Landing';
import { ShieldCheck, Cloud, Wind, Droplets, Thermometer, AlertCircle, Search, Filter, Plus, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const mockStadiums = [
  { id: 1, name: 'Soldier Field', city: 'Chicago', temp: '42°F', wind: '18 mph', precip: '20%', impact: 'High', advice: 'Downgrade Kickers & Deep WRs. Focus on RBs.', status: 'Windy' },
  { id: 2, name: 'Lumen Field', city: 'Seattle', temp: '54°F', wind: '8 mph', precip: '85%', impact: 'Medium', advice: 'Slippery field. Downgrade speed WRs. Upgrade TEs.', status: 'Rainy' },
  { id: 3, name: 'AT&T Stadium', city: 'Arlington', temp: '72°F', wind: '0 mph', precip: '0%', impact: 'None', advice: 'Dome game. All players full go. Upgrade QBs.', status: 'Dome' },
  { id: 4, name: 'Gillette Stadium', city: 'Foxborough', temp: '32°F', wind: '12 mph', precip: '40%', impact: 'Medium', advice: 'Cold impact on ball. Downgrade deep passing.', status: 'Cold' },
  { id: 5, name: 'Hard Rock Stadium', city: 'Miami', temp: '88°F', wind: '5 mph', precip: '10%', impact: 'Low', advice: 'Heat exhaustion risk. High tempo offense favored.', status: 'Hot' },
];

export default function WeatherImpactMap() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStadiums = mockStadiums.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 text-accent mb-4">
              <Cloud className="w-6 h-6" />
              <span className="text-xs font-black uppercase tracking-widest">Weather Impact Engine</span>
            </div>
            <h1 className="text-5xl font-display font-black tracking-tighter uppercase">
              STADIUM <span className="text-accent italic">CONDITIONS</span>
            </h1>
            <p className="text-white/30 text-[10px] font-black uppercase tracking-widest mt-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Live Updates: Mar 24, 2026 • 09:00 AM EST
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                type="text" 
                placeholder="Search stadiums..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-accent/50 w-64"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {filteredStadiums.map((s, i) => (
              <motion.div 
                key={s.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-8 rounded-3xl bg-card border border-border flex flex-col md:flex-row items-center justify-between hover:border-accent/30 transition-all group gap-8"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${s.impact === 'High' ? 'bg-red-400/10 text-red-400' : s.impact === 'Medium' ? 'bg-yellow-400/10 text-yellow-400' : 'bg-green-400/10 text-green-400'}`}>
                    {s.status === 'Windy' ? <Wind className="w-8 h-8" /> : s.status === 'Rainy' ? <Droplets className="w-8 h-8" /> : s.status === 'Dome' ? <MapPin className="w-8 h-8" /> : <Cloud className="w-8 h-8" />}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{s.name}</h3>
                    <div className="flex items-center gap-4 text-xs text-white/40 mt-1">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {s.city}</span>
                      <span className="flex items-center gap-1 font-mono"><Thermometer className="w-3 h-3" /> {s.temp}</span>
                      <span className="flex items-center gap-1 font-mono"><Wind className="w-3 h-3" /> {s.wind}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">AI ADVICE</div>
                  <p className="text-sm text-white/60 leading-relaxed italic">"{s.advice}"</p>
                </div>

                <div className="text-right shrink-0">
                  <div className={`text-xl font-black italic uppercase ${s.impact === 'High' ? 'text-red-400' : s.impact === 'Medium' ? 'text-yellow-400' : 'text-green-400'}`}>{s.impact}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/30">IMPACT</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-accent text-primary neon-glow">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Weather Strategy</h3>
              <p className="text-sm font-medium leading-relaxed mb-6">
                "Wind is the #1 killer of fantasy production. Any game with sustained winds over 15mph should be a major red flag for your passing game and kickers."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Wind className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-60">CRITICAL FACTOR</div>
                  <div className="text-sm font-bold italic">Wind Velocity</div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-card border border-border">
              <h3 className="text-lg font-bold mb-6">Impact Thresholds</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-sm font-bold">Rain</span>
                  <span className="text-xs text-yellow-400">Moderate Impact</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-sm font-bold">Snow</span>
                  <span className="text-xs text-green-400">Low Impact (RBs Up)</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-sm font-bold">Wind (20mph+)</span>
                  <span className="text-xs text-red-400">Severe Impact</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
