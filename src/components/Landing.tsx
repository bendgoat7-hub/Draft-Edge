import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Zap, TrendingUp, BarChart3, ShieldCheck, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 px-6 py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
          <Trophy className="text-primary w-6 h-6" />
        </div>
        <span className="text-2xl font-display font-black tracking-tighter uppercase">
          GRIDIRON<span className="text-accent italic">AI</span>
        </span>
      </Link>
      
      <div className="hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-white/50">
        <a href="#features" className="hover:text-accent transition-colors">Features</a>
        <a href="#how-it-works" className="hover:text-accent transition-colors">How It Works</a>
        <Link to="/content" className="hover:text-accent transition-colors">Content</Link>
        <Link to="/tools" className="hover:text-accent transition-colors">Tools</Link>
        <a href="#pricing" className="hover:text-accent transition-colors">Pricing</a>
      </div>
      
      <div className="flex items-center gap-6">
        <Link to="/dashboard" className="hidden sm:block text-xs font-black uppercase tracking-widest hover:text-accent transition-colors">Login</Link>
        <Link to="/dashboard" className="bg-accent text-primary px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all active:scale-95 neon-glow">
          Get Started
        </Link>
      </div>
    </div>
  </nav>
);

export const Hero = () => (
  <section className="relative pt-48 pb-32 px-6 overflow-hidden grid-bg">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-accent/20 rounded-full blur-[150px]" />
    </div>
    
    <div className="max-w-6xl mx-auto text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-10">
          <Zap className="w-3 h-3 fill-current" />
          The Future of Fantasy Football
        </div>
        
        <h1 className="text-7xl md:text-[120px] font-display font-black leading-[0.85] mb-10 tracking-tighter uppercase">
          WIN YOUR <br />
          <span className="text-accent italic neon-text">CHAMPIONSHIP</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-white/50 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
          GridironAI uses advanced machine learning to analyze millions of data points, giving you the ultimate edge in your fantasy league.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
          <Link to="/dashboard" className="w-full sm:w-auto bg-accent text-primary px-10 py-6 rounded-2xl text-lg font-black uppercase tracking-widest hover:scale-105 transition-all active:scale-95 neon-glow flex items-center justify-center gap-3">
            START WINNING FREE <ArrowRight className="w-6 h-6" />
          </Link>
          <Link to="/trade-analyzer" className="w-full sm:w-auto glass px-10 py-6 rounded-2xl text-lg font-black uppercase tracking-widest hover:bg-white/10 transition-all">
            Analyze Trade
          </Link>
        </div>
        
        <div className="flex flex-col items-center gap-6">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-12 h-12 rounded-full border-4 border-primary bg-card overflow-hidden">
                <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
            Trusted by <span className="text-white">50,000+</span> serious players
          </p>
        </div>
      </motion.div>
      
      {/* Floating UI Elements */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-24 relative max-w-5xl mx-auto"
      >
        <div className="glass rounded-[40px] p-1 md:p-2 shadow-[0_0_100px_rgba(0,0,0,0.5)] border-white/5 overflow-hidden group">
          <div className="bg-primary/50 rounded-[32px] p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex-1 text-left">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="text-accent w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-black uppercase tracking-tight">Matchup Analysis</h3>
                    <p className="text-white/40 text-sm">Week 4 • Projections Updated</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white/60 uppercase tracking-widest">Win Probability</span>
                    <span className="text-2xl font-display font-black text-accent italic">84.2%</span>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "84.2%" }}
                      transition={{ delay: 1, duration: 1.5 }}
                      className="h-full bg-accent neon-glow" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="w-px h-32 bg-white/10 hidden md:block" />
              
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/5 text-left">
                  <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">Proj Score</div>
                  <div className="text-3xl font-display font-black">142.8</div>
                </div>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/5 text-left">
                  <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">Optimal Pts</div>
                  <div className="text-3xl font-display font-black text-accent">+12.4</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-blue/10 rounded-full blur-3xl animate-pulse" />
      </motion.div>
    </div>
  </section>
);

export const Features = () => (
  <section id="features" className="py-32 px-6 bg-primary relative overflow-hidden">
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <div className="max-w-2xl">
          <div className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-4">The Toolkit</div>
          <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase leading-[0.9]">
            EVERYTHING YOU NEED TO <span className="text-accent italic">CRUSH</span> YOUR LEAGUE
          </h2>
        </div>
        <p className="text-white/40 max-w-xs text-sm leading-relaxed mb-2">
          Our suite of tools uses the same data engines as pro scouts and high-stakes players.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: <TrendingUp />, title: "AI Rankings", desc: "Real-time updates based on injury reports, weather, and advanced metrics." },
          { icon: <ShieldCheck />, title: "Start/Sit Optimizer", desc: "Stop overthinking. Our AI analyzes 10,000+ game simulations for every matchup." },
          { icon: <BarChart3 />, title: "Trade Analyzer", desc: "Know exactly who wins the trade with our predictive win-probability engine." },
          { icon: <Zap />, title: "DFS Optimizer", desc: "Build winning Daily Fantasy lineups for DraftKings and FanDuel in seconds." },
          { icon: <Trophy />, title: "Playoff Predictor", desc: "Calculate your odds of making the playoffs and winning the championship." },
          { icon: <TrendingUp />, title: "Market Trends", desc: "Visualize player value changes across the industry in real-time." },
        ].map((f, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className="group p-10 rounded-[32px] bg-card border border-border hover:border-accent/30 transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors" />
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-primary transition-all duration-500 group-hover:rotate-6">
              {React.cloneElement(f.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
            </div>
            <h3 className="text-2xl font-display font-black uppercase tracking-tight mb-4">{f.title}</h3>
            <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
