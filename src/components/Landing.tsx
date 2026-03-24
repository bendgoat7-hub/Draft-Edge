import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Zap, TrendingUp, BarChart3, ShieldCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 px-6 py-4 flex items-center justify-between">
    <Link to="/" className="flex items-center gap-2">
      <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
        <Trophy className="text-primary w-5 h-5" />
      </div>
      <span className="text-xl font-display font-bold tracking-tighter">GRIDIRON<span className="text-accent">AI</span></span>
    </Link>
    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
      <a href="#features" className="hover:text-accent transition-colors">Features</a>
      <a href="#how-it-works" className="hover:text-accent transition-colors">How It Works</a>
      <Link to="/content" className="hover:text-accent transition-colors">Content</Link>
      <Link to="/tools" className="hover:text-accent transition-colors">Tools</Link>
      <a href="#pricing" className="hover:text-accent transition-colors">Pricing</a>
    </div>
    <div className="flex items-center gap-4">
      <Link to="/dashboard" className="text-sm font-medium hover:text-accent transition-colors">Login</Link>
      <Link to="/dashboard" className="bg-accent text-primary px-5 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform neon-glow">
        Start Winning Free
      </Link>
    </div>
  </nav>
);


export const Hero = () => (
  <section className="relative pt-32 pb-20 px-6 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20 pointer-events-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px]" />
    </div>
    
    <div className="max-w-5xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6 border border-accent/20">
          AI-Powered Fantasy Advantage
        </span>
        <h1 className="text-6xl md:text-8xl font-display font-black leading-[0.9] mb-8 tracking-tighter">
          DOMINATE YOUR <br />
          <span className="text-accent italic">FANTASY LEAGUE</span>
        </h1>
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Stop guessing. Start winning with real-time AI rankings, live matchup insights, and the most advanced trade analyzer in the game.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link to="/dashboard" className="w-full sm:w-auto bg-accent text-primary px-8 py-4 rounded-full text-lg font-black hover:scale-105 transition-transform neon-glow flex items-center justify-center gap-2">
            START WINNING FREE <Zap className="w-5 h-5 fill-current" />
          </Link>
          <Link to="/trade-analyzer" className="w-full sm:w-auto glass px-8 py-4 rounded-full text-lg font-bold hover:bg-white/10 transition-colors">
            Try Trade Analyzer
          </Link>
        </div>
        <div className="flex items-center justify-center gap-4 text-white/40 text-xs font-bold uppercase tracking-widest">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-primary bg-white/10" />
            ))}
          </div>
          <span>Join 50,000+ players winning today</span>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-20 relative"
      >
        <div className="glass rounded-2xl p-4 md:p-8 shadow-2xl border-white/10 overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full" />
              <div className="text-left">
                <div className="h-4 w-32 bg-white/20 rounded mb-2" />
                <div className="h-3 w-20 bg-white/10 rounded" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="px-3 py-1 bg-accent/20 text-accent text-xs font-bold rounded">WIN PROB: 84%</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg" />
                  <div className="text-left">
                    <div className="h-3 w-24 bg-white/20 rounded mb-1.5" />
                    <div className="h-2 w-16 bg-white/10 rounded" />
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-2xl font-display font-bold">18.4</div>
                  <div className="text-[10px] text-accent font-bold uppercase tracking-tighter">+2.4 VS AVG</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export const Features = () => (
  <section id="features" className="py-24 px-6 bg-primary">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-black mb-4 tracking-tighter uppercase">
          Everything you need to <span className="text-accent italic">crush</span> your league
        </h2>
        <p className="text-white/50 max-w-xl mx-auto">
          Built by data scientists and fantasy pros to give you the ultimate competitive edge.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <TrendingUp />, title: "AI Rankings", desc: "Real-time updates based on injury reports, weather, and advanced metrics." },
          { icon: <ShieldCheck />, title: "Start/Sit Optimizer", desc: "Stop overthinking. Our AI analyzes 10,000+ simulations for every matchup." },
          { icon: <BarChart3 />, title: "Trade Analyzer", desc: "Know exactly who wins the trade with our predictive win-probability engine." },
          { icon: <Users />, title: "Draft Assistant", desc: "Live suggestions during your draft to ensure you never reach for a bust." },
          { icon: <Zap />, title: "DFS Optimizer", desc: "Build winning Daily Fantasy lineups for DraftKings and FanDuel in seconds." },
          { icon: <Trophy />, title: "Playoff Predictor", desc: "Calculate your odds of making the playoffs and winning the championship." },
        ].map((f, i) => (
          <div key={i} className="group p-8 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-primary transition-colors">
              {React.cloneElement(f.icon as React.ReactElement<any>, { className: "w-6 h-6" })}
            </div>
            <h3 className="text-xl font-bold mb-3">{f.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
