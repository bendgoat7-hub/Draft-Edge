import React from 'react';
import { DashboardHeader, InsightCard, PlayerRow } from '@/src/components/Dashboard';
import { Player, Team } from '@/src/types';
import { Trophy, TrendingUp, Zap, Users, BarChart3, Settings, Loader2, Link as LinkIcon } from 'lucide-react';
import { useAuth } from '@/src/contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';

const MOCK_TEAM: Team = {
  id: '1',
  name: 'THE TOUCHDOWN KINGS',
  ownerId: 'demo-user-123',
  totalPoints: 442.5,
  players: [
    { id: 'p1', name: 'Patrick Mahomes', position: 'QB', team: 'KC', projectedPoints: 22.4, status: 'Healthy' },
    { id: 'p2', name: 'Christian McCaffrey', position: 'RB', team: 'SF', projectedPoints: 19.8, status: 'Healthy' },
    { id: 'p3', name: 'Justin Jefferson', position: 'WR', team: 'MIN', projectedPoints: 18.2, status: 'Questionable' },
    { id: 'p4', name: 'Travis Kelce', position: 'TE', team: 'KC', projectedPoints: 14.5, status: 'Healthy' },
    { id: 'p5', name: 'Breece Hall', position: 'RB', team: 'NYJ', projectedPoints: 16.2, status: 'Healthy' },
  ]
};

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary flex">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 border-r border-white/5 flex flex-col items-center md:items-stretch py-8 px-4 gap-8">
        <div className="flex items-center gap-2 px-2">
          <div className="w-8 h-8 bg-accent rounded flex items-center justify-center shrink-0">
            <Trophy className="text-primary w-5 h-5" />
          </div>
          <span className="hidden md:block text-xl font-display font-bold tracking-tighter">GRIDIRON<span className="text-accent">AI</span></span>
        </div>
        
        <nav className="flex flex-col gap-2">
          {[
            { icon: <TrendingUp />, label: 'Dashboard', path: '/dashboard', active: true },
            { icon: <Users />, label: 'My Team', path: '/roster-health', active: false },
            { icon: <BarChart3 />, label: 'Market Trends', path: '/market-trends', active: false },
            { icon: <Zap />, label: 'AI Chat', path: '/ai-chat', active: false },
            { icon: <Trophy />, label: 'Tools', path: '/tools', active: false },
          ].map((item, i) => (
            <Link key={i} to={item.path} className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${item.active ? 'bg-accent/10 text-accent' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
              {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-5 h-5" })}
              <span className="hidden md:block text-sm font-bold">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <button 
            onClick={signOut}
            className="w-full flex items-center gap-4 p-3 rounded-xl text-white/50 hover:bg-white/5 hover:text-white transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span className="hidden md:block text-sm font-bold">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <DashboardHeader team={MOCK_TEAM} />
        
        {/* League Sync Banner */}
        <section className="mb-8 p-6 rounded-3xl bg-accent text-primary flex flex-col md:flex-row items-center justify-between gap-6 neon-glow">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <LinkIcon className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-black uppercase tracking-tighter mb-1">Sync Your Real League</h2>
              <p className="text-sm font-medium opacity-70">Connect ESPN, Sleeper, or Yahoo for personalized AI advice.</p>
            </div>
          </div>
          <Link to="/league-sync" className="w-full md:w-auto px-8 py-4 bg-primary text-white rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-transform text-center">
            Connect Now
          </Link>
        </section>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column: Team & Matchup */}
          <div className="xl:col-span-2 space-y-8">
            <section>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 uppercase tracking-tight">
                Current Lineup <span className="text-white/20 text-xs font-normal">(WEEK 4)</span>
              </h2>
              <div className="space-y-3">
                {MOCK_TEAM.players.map(player => (
                  <PlayerRow key={player.id} player={player} />
                ))}
              </div>
            </section>
            
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass p-6 rounded-2xl">
                <h3 className="text-sm font-bold mb-4 uppercase text-white/50">Matchup Projection</h3>
                <div className="flex items-end justify-between mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-display font-black">124.5</div>
                    <div className="text-[10px] font-bold text-white/30 uppercase">Your Team</div>
                  </div>
                  <div className="flex-1 px-4 pb-2">
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-accent w-[65%]" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-display font-black">108.2</div>
                    <div className="text-[10px] font-bold text-white/30 uppercase">Opponent</div>
                  </div>
                </div>
                <div className="text-center text-xs font-bold text-accent uppercase tracking-widest">
                  Win Probability: 68%
                </div>
              </div>
              
              <div className="glass p-6 rounded-2xl">
                <h3 className="text-sm font-bold mb-4 uppercase text-white/50">Waiver Alerts</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-xs font-bold">RB</div>
                      <div>
                        <div className="text-xs font-bold">Zamir White</div>
                        <div className="text-[10px] text-white/30">LV • 42% Rostered</div>
                      </div>
                    </div>
                    <div className="text-accent text-[10px] font-bold">PICK UP</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-xs font-bold">WR</div>
                      <div>
                        <div className="text-xs font-bold">Josh Downs</div>
                        <div className="text-[10px] text-white/30">IND • 18% Rostered</div>
                      </div>
                    </div>
                    <div className="text-accent text-[10px] font-bold">WATCH</div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: AI Insights */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold flex items-center gap-2 uppercase tracking-tight">
              AI <span className="text-accent italic">INSIGHTS</span>
            </h2>
            
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

            <div className="glass p-6 rounded-2xl border-accent/10">
              <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" /> ASK GRIDIRON AI
              </h3>
              <textarea 
                placeholder="Should I start Mahomes or Allen?"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-accent/50 transition-colors resize-none mb-4"
                rows={3}
              />
              <button className="w-full bg-accent text-primary py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">
                Get AI Advice
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
