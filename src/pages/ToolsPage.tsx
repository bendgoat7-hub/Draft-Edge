import React from 'react';
import { Navbar } from '@/src/components/Landing';
import { Zap, BarChart3, Users, TrendingUp, ShieldCheck, Trophy, Link as LinkIcon, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const tools = [
  { id: 'trade', title: 'Trade Analyzer', icon: <BarChart3 />, desc: 'Analyze win probability and long-term impact of any trade.', premium: false, path: '/trade-analyzer' },
  { id: 'waiver', title: 'Waiver Finder', icon: <Zap />, desc: 'Identify high-upside players before they become mainstream.', premium: true, path: '/waiver-finder' },
  { id: 'start-sit', title: 'Start/Sit Optimizer', icon: <ShieldCheck />, desc: 'AI-driven projections based on 10,000+ game simulations.', premium: false, path: '/start-sit' },
  { id: 'rankings', title: 'Weekly Rankings', icon: <TrendingUp />, desc: 'Expert-blended rankings updated every hour.', premium: false, path: '/rankings' },
  { id: 'comparison', title: 'Player Comparison', icon: <Trophy />, desc: 'Side-by-side analysis of stats, trends, and matchups.', premium: true, path: '/player-comparison' },
  { id: 'league-sync', title: 'League Sync', icon: <LinkIcon />, desc: 'Connect your ESPN, Sleeper, or Yahoo leagues for personalized AI advice.', premium: false, path: '/league-sync' },
  { id: 'dfs', title: 'DFS Optimizer', icon: <Zap />, desc: 'Build winning Daily Fantasy lineups for DraftKings and FanDuel.', premium: true, path: '/dfs-optimizer' },
  { id: 'injury', title: 'Injury Tracker', icon: <ShieldCheck />, desc: 'Real-time injury updates and impact analysis on your roster.', premium: false, path: '/injury-tracker' },
  { id: 'sos', title: 'Strength of Schedule', icon: <BarChart3 />, desc: 'Analyze upcoming matchups for every team and position.', premium: false, path: '/sos' },
  { id: 'playoff', title: 'Playoff Predictor', icon: <TrendingUp />, desc: 'Calculate your odds of making the playoffs and winning it all.', premium: true, path: '/playoff-predictor' },
  { id: 'dynasty', title: 'Dynasty Calculator', icon: <Users />, desc: 'Value draft picks and players for long-term dynasty success.', premium: true, path: '/dynasty-calculator' },
  { id: 'props', title: 'Prop Analyzer', icon: <BarChart3 />, desc: 'Find the best player props based on AI projections.', premium: true, path: '/prop-analyzer' },
  { id: 'ai-chat', title: 'Gridiron AI Chat', icon: <Zap />, desc: 'Your personal 24/7 fantasy consultant for complex roster questions.', premium: true, path: '/ai-chat' },
  { id: 'weather', title: 'Weather Impact', icon: <ShieldCheck />, desc: 'Real-time stadium weather and its impact on player performance.', premium: false, path: '/weather' },
  { id: 'health', title: 'Roster Health', icon: <Users />, desc: 'Deep dive into your team strengths, weaknesses, and bye-week risks.', premium: true, path: '/roster-health' },
  { id: 'draft-room', title: 'Live Draft Room', icon: <Trophy />, desc: 'Practice drafts against AI opponents with different strategies.', premium: true, path: '/draft-room' },
  { id: 'market', title: 'Market Trends', icon: <TrendingUp />, desc: 'Visualize player value changes across the industry in real-time.', premium: true, path: '/market-trends' },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-primary pt-32 pb-20 px-6 grid-bg">
      <Navbar />
      
      <main className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-4">Professional Suite</div>
          <h1 className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.85] mb-8">
            THE <span className="text-accent italic">ARSENAL</span>
          </h1>
          <p className="text-white/40 max-w-2xl text-lg leading-relaxed">
            Dominate your league with our comprehensive suite of AI-powered tools. 
            From draft day to the championship, we've got you covered.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, i) => (
            <Link 
              key={tool.id} 
              to={tool.path}
              className="block group"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="h-full p-10 rounded-[32px] bg-card border border-border group-hover:border-accent/30 transition-all duration-500 relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors" />
                
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all duration-500 group-hover:rotate-6">
                      {React.cloneElement(tool.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
                    </div>
                    {tool.premium && (
                      <div className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest rounded-lg border border-accent/20">PRO</div>
                    )}
                  </div>
                  <h3 className="text-2xl font-display font-black uppercase tracking-tight mb-4 group-hover:text-accent transition-colors">{tool.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors mb-8">{tool.desc}</p>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent">Launch Tool</span>
                  <ArrowRight className="w-5 h-5 text-accent group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

