import React from 'react';
import { DashboardHeader, InsightCard, PlayerRow } from '@/src/components/Dashboard';
import { Player, Team } from '@/src/types';
import { Trophy, TrendingUp, Zap, Users, BarChart3, Settings, Loader2, Link as LinkIcon } from 'lucide-react';
import { useAuth } from '@/src/contexts/AuthContext';
import { useLeague } from '@/src/contexts/LeagueContext';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

export default function DashboardPage() {
  const { user, loading, signOut, signIn } = useAuth();
  const { syncedTeam, isSynced, refreshLeague } = useLeague();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshLeague();
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  React.useEffect(() => {
    if (!loading && !user) {
      signIn();
    }
  }, [loading, user, signIn]);

  if (loading || !syncedTeam) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-accent animate-spin" />
          <p className="text-white/30 text-xs font-black uppercase tracking-widest animate-pulse">Initializing Gridiron AI...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary flex">
      {/* Sidebar */}
      <aside className="w-20 md:w-72 border-r border-white/5 flex flex-col py-8 px-4 gap-10 bg-card/50 backdrop-blur-xl sticky top-0 h-screen overflow-y-auto">
        <Link to="/" className="flex items-center gap-3 px-4 group">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <Trophy className="text-primary w-6 h-6" />
          </div>
          <span className="hidden md:block text-2xl font-display font-black tracking-tighter uppercase">
            GRIDIRON<span className="text-accent italic">AI</span>
          </span>
        </Link>
        
        <div className="flex flex-col gap-1">
          <div className="hidden md:block px-4 mb-4 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Navigation</div>
          {[
            { icon: <TrendingUp />, label: 'Dashboard', path: '/dashboard', active: true },
            { icon: <Users />, label: 'Roster Health', path: '/roster-health', active: false },
            { icon: <BarChart3 />, label: 'Market Trends', path: '/market-trends', active: false },
            { icon: <Zap />, label: 'AI Chat', path: '/ai-chat', active: false },
            { icon: <Trophy />, label: 'Tools', path: '/tools', active: false },
          ].map((item, i) => (
            <Link 
              key={i} 
              to={item.path} 
              className={cn(
                "flex items-center gap-4 p-4 rounded-2xl transition-all group",
                item.active ? "bg-accent text-primary neon-glow" : "text-white/40 hover:bg-white/5 hover:text-white"
              )}
            >
              {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-5 h-5" })}
              <span className="hidden md:block text-sm font-black uppercase tracking-widest">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="mt-auto space-y-4">
          <div className="hidden md:block px-4 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Account</div>
          <button 
            onClick={signOut}
            className="w-full flex items-center gap-4 p-4 rounded-2xl text-white/40 hover:bg-white/5 hover:text-white transition-all group"
          >
            <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
            <span className="hidden md:block text-sm font-black uppercase tracking-widest">Sign Out</span>
          </button>
          
          <div className="hidden md:flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-black">
              {user?.displayName?.[0] || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-black truncate uppercase tracking-tight">{user?.displayName || 'User'}</div>
              <div className="text-[9px] font-bold text-white/30 truncate uppercase tracking-widest">Pro Plan</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto grid-bg">
        <DashboardHeader 
          team={syncedTeam} 
          onRefresh={isSynced ? handleRefresh : undefined}
          isRefreshing={isRefreshing}
        />
        
        {/* League Sync Banner */}
        {!isSynced && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-1 rounded-[32px] bg-gradient-to-r from-accent to-accent-blue neon-glow group overflow-hidden"
          >
            <div className="bg-primary/90 backdrop-blur-xl rounded-[28px] p-8 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-8">
                <div className="w-20 h-20 rounded-3xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform">
                  <LinkIcon className="w-10 h-10 text-accent" />
                </div>
                <div>
                  <h2 className="text-3xl font-display font-black uppercase tracking-tighter mb-2">Sync Your Real League</h2>
                  <p className="text-white/50 text-sm font-medium leading-relaxed max-w-md">Connect ESPN, Sleeper, or Yahoo for personalized AI advice and real-time roster health monitoring.</p>
                </div>
              </div>
              <Link to="/league-sync" className="w-full md:w-auto px-10 py-5 bg-accent text-primary rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-[0_0_30px_rgba(0,255,0,0.3)]">
                Connect Now
              </Link>
            </div>
          </motion.section>
        )}
        
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          {/* Left Column: Team & Matchup */}
          <div className="xl:col-span-8 space-y-12">
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-display font-black uppercase tracking-tight">Active Roster</h2>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Week 4 Projections</span>
                  <div className="w-px h-4 bg-white/10" />
                  <button className="text-[10px] font-black text-accent uppercase tracking-widest hover:underline">Full Roster</button>
                </div>
              </div>
              <div className="space-y-3">
                {syncedTeam.players.map(player => (
                  <PlayerRow key={player.id} player={player} />
                ))}
              </div>
            </section>
            
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass p-8 rounded-[32px] border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors" />
                <h3 className="text-sm font-black text-white/20 uppercase tracking-[0.2em] mb-8">Matchup Projection</h3>
                <div className="flex items-end justify-between mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-display font-black tracking-tighter">124.5</div>
                    <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mt-2">Your Team</div>
                  </div>
                  <div className="flex-1 px-8 pb-3">
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "65%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-accent neon-glow" 
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-display font-black tracking-tighter">108.2</div>
                    <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mt-2">Opponent</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs font-black text-accent uppercase tracking-[0.2em]">Win Probability: 68%</span>
                </div>
              </div>
              
              <div className="glass p-8 rounded-[32px] border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/5 rounded-full blur-3xl group-hover:bg-accent-blue/10 transition-colors" />
                <h3 className="text-sm font-black text-white/20 uppercase tracking-[0.2em] mb-8">Waiver Alerts</h3>
                <div className="space-y-6">
                  {[
                    { pos: "RB", name: "Zamir White", team: "LV", rostered: "42%", action: "PICK UP" },
                    { pos: "WR", name: "Josh Downs", team: "IND", rostered: "18%", action: "WATCH" },
                  ].map((alert, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[10px] font-black border border-white/10">{alert.pos}</div>
                        <div>
                          <div className="text-sm font-bold">{alert.name}</div>
                          <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">{alert.team} • {alert.rostered} Rostered</div>
                        </div>
                      </div>
                      <div className="text-accent text-[10px] font-black uppercase tracking-widest">{alert.action}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: AI Insights */}
          <div className="xl:col-span-4 space-y-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-display font-black uppercase tracking-tight">AI Insights</h2>
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-accent" />
              </div>
            </div>
            
            <div className="space-y-4">
              <InsightCard 
                title="Injury Alert"
                type="warning"
                content="Justin Jefferson (Questionable) has a 40% chance of limited snaps. Consider subbing in Jordan Addison."
                action="Swap Players"
              />
              
              <InsightCard 
                title="Trade Opportunity"
                type="success"
                content="Your RB depth is high. Trading McCaffrey for Tyreek Hill increases your season win prob by 12%."
                action="Analyze Trade"
              />
              
              <InsightCard 
                title="Waiver Gem"
                type="info"
                content="Rookie RB Bucky Irving is trending. His snap count increased 20% last week. Add him now."
                action="View Stats"
              />
            </div>

            <div className="glass p-8 rounded-[32px] border-accent/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors" />
              <h3 className="text-lg font-display font-black uppercase tracking-tight mb-6 flex items-center gap-3">
                <Zap className="w-5 h-5 text-accent fill-accent" /> Ask Gridiron AI
              </h3>
              <textarea 
                placeholder="Should I start Mahomes or Allen?"
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:border-accent/50 transition-colors resize-none mb-6 placeholder:text-white/20"
                rows={4}
              />
              <button className="w-full bg-accent text-primary py-5 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-all active:scale-95 neon-glow">
                Get AI Advice
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
