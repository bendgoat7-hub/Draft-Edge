import React from 'react';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, AlertCircle, ArrowRight, Zap, Users } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Player, Team } from '@/src/types';

export const DashboardHeader = ({ team }: { team: Team }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
    <div>
      <h1 className="text-3xl font-display font-black tracking-tighter uppercase mb-1">
        {team.name} <span className="text-accent italic">DASHBOARD</span>
      </h1>
      <p className="text-white/50 text-sm">Week 4 Matchup vs. The Commish</p>
    </div>
    <div className="flex items-center gap-3">
      <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-wider">Live Projections</span>
      </div>
      <button className="bg-accent text-primary px-4 py-2 rounded-xl text-xs font-black hover:scale-105 transition-transform uppercase tracking-wider">
        Optimize Lineup
      </button>
    </div>
  </div>
);

export const InsightCard = ({ title, type, content, action }: { title: string, type: 'warning' | 'success' | 'info', content: string, action?: string }) => (
  <div className={cn(
    "p-5 rounded-2xl border flex flex-col justify-between",
    type === 'warning' ? "bg-red-500/5 border-red-500/20" : 
    type === 'success' ? "bg-accent/5 border-accent/20" : 
    "bg-accent-blue/5 border-accent-blue/20"
  )}>
    <div>
      <div className="flex items-center gap-2 mb-3">
        {type === 'warning' ? <AlertCircle className="w-4 h-4 text-red-500" /> : 
         type === 'success' ? <Zap className="w-4 h-4 text-accent" /> : 
         <BarChart3 className="w-4 h-4 text-accent-blue" />}
        <span className={cn(
          "text-[10px] font-black uppercase tracking-widest",
          type === 'warning' ? "text-red-500" : 
          type === 'success' ? "text-accent" : 
          "text-accent-blue"
        )}>{title}</span>
      </div>
      <p className="text-sm font-medium leading-relaxed mb-4">{content}</p>
    </div>
    {action && (
      <button className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
        {action} <ArrowRight className="w-3 h-3" />
      </button>
    )}
  </div>
);

export const PlayerRow = ({ player }: { player: Player }) => (
  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-white/10 rounded-lg overflow-hidden flex items-center justify-center">
        {player.image ? <img src={player.image} alt={player.name} className="w-full h-full object-cover" /> : <Users className="w-5 h-5 text-white/20" />}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">{player.name}</span>
          <span className="text-[10px] font-bold text-white/30">{player.position} • {player.team}</span>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className={cn(
            "text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter",
            player.status === 'Healthy' ? "bg-accent/10 text-accent" : "bg-red-500/10 text-red-500"
          )}>{player.status}</span>
        </div>
      </div>
    </div>
    <div className="text-right">
      <div className="text-sm font-bold">{player.projectedPoints}</div>
      <div className="text-[10px] font-bold text-white/30 uppercase tracking-tighter">Proj Pts</div>
    </div>
  </div>
);
