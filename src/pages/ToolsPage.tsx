import React from 'react';
import { Navbar } from '@/src/components/Landing';
import { Zap, BarChart3, Users, TrendingUp, ShieldCheck, Trophy, Link as LinkIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const tools = [
  { id: 'draft', title: 'Draft Assistant', icon: <Users />, desc: 'Real-time suggestions based on your league scoring and roster needs.', premium: true, path: '/draft-assistant' },
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
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display font-black tracking-tighter uppercase mb-4">
            WINNING <span className="text-accent italic">TOOLS</span>
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto">
            The most advanced suite of fantasy football tools ever built. Powered by AI, used by champions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, i) => (
            <motion.div 
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-3xl bg-card border border-border hover:border-accent/50 transition-all cursor-pointer relative overflow-hidden"
            >
              <Link to={tool.path} className="absolute inset-0 z-10" />
              {tool.premium && (
                <div className="absolute top-4 right-4 px-2 py-1 bg-accent/20 text-accent text-[8px] font-black uppercase tracking-widest rounded">PRO</div>
              )}
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-primary transition-colors">
                {React.cloneElement(tool.icon as React.ReactElement<any>, { className: "w-7 h-7" })}
              </div>
              <h3 className="text-2xl font-bold mb-3">{tool.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-8">{tool.desc}</p>
              <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest group-hover:bg-accent group-hover:text-primary group-hover:border-accent transition-all">
                Launch Tool
              </button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

