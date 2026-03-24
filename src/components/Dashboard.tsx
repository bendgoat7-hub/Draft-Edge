import React from 'react';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, AlertCircle, ArrowRight, Zap, Users } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Player, Team } from '@/src/types';

export const DashboardHeader = ({ team, onRefresh, isRefreshing }: { team: Team, onRefresh?: () => void, isRefreshing?: boolean }) => (
  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
    <div>
      <div className="flex items-center gap-3 mb-2">
        <div className="px-2 py-0.5 rounded bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest border border-accent/20">
          Pro Member
        </div>
        <div className="w-1 h-1 rounded-full bg-white/20" />
        <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">League: {team.name}</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase leading-none">
        {team.name} <span className="text-accent italic">HQ</span>
      </h1>
    </div>
    
    <div className="flex flex-wrap items-center gap-4">
      {onRefresh && (
        <button 
          onClick={onRefresh}
          disabled={isRefreshing}
          className="glass px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <TrendingUp className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
          {isRefreshing ? 'Syncing...' : 'Refresh League'}
        </button>
      )}
      
      <div className="glass px-6 py-3 rounded-2xl flex items-center gap-4">
        <div className="text-right">
          <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">Season Rank</div>
          <div className="text-xl font-display font-black text-accent">#2 / 12</div>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <div className="text-right">
          <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">Win Streak</div>
          <div className="text-xl font-display font-black">4W</div>
        </div>
      </div>
      
      <button className="bg-accent text-primary px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all active:scale-95 neon-glow flex items-center gap-2">
        <Zap className="w-4 h-4 fill-current" /> Optimize Lineup
      </button>
    </div>
  </div>
);

export const InsightCard = ({ title, type, content, action }: { title: string, type: 'warning' | 'success' | 'info', content: string, action?: string }) => (
  <motion.div 
    whileHover={{ x: 5 }}
    className={cn(
      "p-6 rounded-3xl border flex flex-col justify-between relative overflow-hidden group transition-all duration-300",
      type === 'warning' ? "bg-red-500/[0.03] border-red-500/20 hover:border-red-500/40" : 
      type === 'success' ? "bg-accent/[0.03] border-accent/20 hover:border-accent/40" : 
      "bg-accent-blue/[0.03] border-accent-blue/20 hover:border-accent-blue/40"
    )}
  >
    <div className={cn(
      "absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-40",
      type === 'warning' ? "bg-red-500" : 
      type === 'success' ? "bg-accent" : 
      "bg-accent-blue"
    )} />
    
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className={cn(
          "w-8 h-8 rounded-xl flex items-center justify-center",
          type === 'warning' ? "bg-red-500/10 text-red-500" : 
          type === 'success' ? "bg-accent/10 text-accent" : 
          "bg-accent-blue/10 text-accent-blue"
        )}>
          {type === 'warning' ? <AlertCircle className="w-4 h-4" /> : 
           type === 'success' ? <Zap className="w-4 h-4" /> : 
           <BarChart3 className="w-4 h-4" />}
        </div>
        <span className={cn(
          "text-[10px] font-black uppercase tracking-[0.2em]",
          type === 'warning' ? "text-red-500" : 
          type === 'success' ? "text-accent" : 
          "text-accent-blue"
        )}>{title}</span>
      </div>
      <p className="text-sm font-medium leading-relaxed text-white/70 mb-6">{content}</p>
    </div>
    
    {action && (
      <button className={cn(
        "text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all",
        type === 'warning' ? "text-red-500" : 
        type === 'success' ? "text-accent" : 
        "text-accent-blue"
      )}>
        {action} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
      </button>
    )}
  </motion.div>
);

export const PlayerRow = ({ player }: { player: Player }) => (
  <motion.div 
    whileHover={{ x: 4 }}
    className="flex items-center justify-between p-5 bg-white/[0.02] rounded-2xl border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all cursor-pointer group"
  >
    <div className="flex items-center gap-5">
      <div className="relative">
        <div className="w-14 h-14 bg-white/5 rounded-2xl overflow-hidden border border-white/10 group-hover:border-accent/30 transition-colors">
          {player.image ? (
            <img src={player.image} alt={player.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-accent/5">
              <Users className="w-6 h-6 text-accent/20" />
            </div>
          )}
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary border border-white/10 rounded-lg flex items-center justify-center text-[8px] font-black">
          {player.position}
        </div>
      </div>
      
      <div>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-base font-bold tracking-tight group-hover:text-accent transition-colors">{player.name}</span>
          <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{player.team}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-1.5 h-1.5 rounded-full",
            player.status === 'Healthy' ? "bg-accent" : "bg-red-500"
          )} />
          <span className={cn(
            "text-[10px] font-black uppercase tracking-widest",
            player.status === 'Healthy' ? "text-accent/60" : "text-red-500/60"
          )}>{player.status}</span>
        </div>
      </div>
    </div>
    
    <div className="text-right">
      <div className="text-xl font-display font-black tracking-tighter">{player.projectedPoints}</div>
      <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">Proj Pts</div>
    </div>
  </motion.div>
);
