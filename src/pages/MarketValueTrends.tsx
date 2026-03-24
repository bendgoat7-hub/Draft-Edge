import React, { useState } from 'react';
import { Navbar } from '@/src/components/Landing';
import { TrendingUp, Search, Filter, Plus, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const mockTrendData = [
  { name: 'Week 1', value: 8500 },
  { name: 'Week 2', value: 8700 },
  { name: 'Week 3', value: 9200 },
  { name: 'Week 4', value: 9100 },
  { name: 'Week 5', value: 9800 },
  { name: 'Week 6', value: 10200 },
];

const mockMarketPlayers = [
  { id: 1, name: 'Breece Hall', pos: 'RB', value: 9800, change: '+12%', trend: 'up', data: mockTrendData },
  { id: 2, name: 'Rashee Rice', pos: 'WR', value: 7500, change: '+25%', trend: 'up', data: mockTrendData.map(d => ({ ...d, value: d.value * 0.7 })) },
  { id: 3, name: 'Travis Kelce', pos: 'TE', value: 6800, change: '-8%', trend: 'down', data: mockTrendData.map(d => ({ ...d, value: d.value * 0.8 })) },
  { id: 4, name: 'Anthony Richardson', pos: 'QB', value: 7200, change: '-15%', trend: 'down', data: mockTrendData.map(d => ({ ...d, value: d.value * 0.9 })) },
];

export default function MarketValueTrends() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 text-accent mb-4">
              <TrendingUp className="w-6 h-6" />
              <span className="text-xs font-black uppercase tracking-widest">Market Value Engine</span>
            </div>
            <h1 className="text-5xl font-display font-black tracking-tighter uppercase">
              PLAYER <span className="text-accent italic">TRENDS</span>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mockMarketPlayers.map((p, i) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-card border border-border hover:border-accent/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center font-bold text-accent text-sm">{p.pos}</div>
                  <div>
                    <h3 className="text-2xl font-bold">{p.name}</h3>
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/30">Current Value: {p.value}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-black italic flex items-center gap-2 justify-end ${p.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {p.change}
                    {p.trend === 'up' ? <ArrowUpRight className="w-6 h-6" /> : <ArrowDownRight className="w-6 h-6" />}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/30">7-DAY CHANGE</div>
                </div>
              </div>

              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={p.data}>
                    <defs>
                      <linearGradient id={`colorValue-${p.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={p.trend === 'up' ? '#00FF00' : '#FF0000'} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={p.trend === 'up' ? '#00FF00' : '#FF0000'} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                      itemStyle={{ color: '#00FF00', fontWeight: 'bold' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke={p.trend === 'up' ? '#00FF00' : '#FF0000'} 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill={`url(#colorValue-${p.id})`} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-8 flex gap-4">
                <button className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors">
                  View Full History
                </button>
                <button className="flex-1 py-3 rounded-xl bg-accent text-primary text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">
                  Trade Analysis
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
