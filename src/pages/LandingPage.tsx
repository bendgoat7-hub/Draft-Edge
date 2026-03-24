import React from 'react';
import { Navbar, Hero, Features } from '@/src/components/Landing';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <Hero />
      <Features />
      
      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-black mb-4 uppercase tracking-tighter">Your path to <span className="text-accent italic">victory</span></h2>
            <p className="text-white/50">Three simple steps to dominate your league.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 text-2xl font-black italic text-accent">01</div>
              <h3 className="text-xl font-bold mb-3 uppercase">Connect League</h3>
              <p className="text-sm text-white/50 leading-relaxed">Sync your ESPN, Sleeper, or Yahoo leagues in seconds. No manual entry required.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 text-2xl font-black italic text-accent">02</div>
              <h3 className="text-xl font-bold mb-3 uppercase">Get AI Insights</h3>
              <p className="text-sm text-white/50 leading-relaxed">Our engine analyzes 10,000+ simulations to give you the perfect lineup every week.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 text-2xl font-black italic text-accent">03</div>
              <h3 className="text-xl font-bold mb-3 uppercase">Win Your League</h3>
              <p className="text-sm text-white/50 leading-relaxed">Execute trades, grab waiver targets, and make start/sit calls with 98% confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border">
              <div className="flex gap-1 text-accent mb-4">
                {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-3 h-3 bg-accent rounded-full" />)}
              </div>
              <p className="text-sm text-white/70 italic mb-6">"I've played fantasy for 10 years and never had an edge like this. The Trade Analyzer saved my season."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10" />
                <div>
                  <div className="text-sm font-bold">Mike R.</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-widest">3-Time Champion</div>
                </div>
              </div>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border">
              <div className="flex gap-1 text-accent mb-4">
                {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-3 h-3 bg-accent rounded-full" />)}
              </div>
              <p className="text-sm text-white/70 italic mb-6">"The Draft Assistant is a cheat code. I got an A+ draft grade and I'm currently 8-0 in my main league."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10" />
                <div>
                  <div className="text-sm font-bold">Sarah J.</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-widest">Pro League Player</div>
                </div>
              </div>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border">
              <div className="flex gap-1 text-accent mb-4">
                {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-3 h-3 bg-accent rounded-full" />)}
              </div>
              <p className="text-sm text-white/70 italic mb-6">"Finally a fantasy app that doesn't look like it was built in 2005. Fast, clean, and actually helpful."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10" />
                <div>
                  <div className="text-sm font-bold">David K.</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-widest">Casual Player</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="text-2xl font-black italic tracking-tighter">ESPN FANTASY</div>
          <div className="text-2xl font-black italic tracking-tighter">SLEEPER</div>
          <div className="text-2xl font-black italic tracking-tighter">YAHOO SPORTS</div>
          <div className="text-2xl font-black italic tracking-tighter">NFL.COM</div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-black mb-4 uppercase tracking-tighter">Choose your <span className="text-accent italic">advantage</span></h2>
            <p className="text-white/50">Start winning today. Upgrade anytime.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-3xl bg-card border border-border flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Free Tier</h3>
                <div className="text-4xl font-black mb-6">$0<span className="text-sm font-normal text-white/40">/mo</span></div>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-3 text-sm text-white/70"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> Basic Rankings</li>
                  <li className="flex items-center gap-3 text-sm text-white/70"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> Start/Sit Advice (3/week)</li>
                  <li className="flex items-center gap-3 text-sm text-white/70"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> Trade Analyzer (Basic)</li>
                </ul>
              </div>
              <Link to="/dashboard" className="w-full py-4 rounded-xl border border-white/10 font-bold hover:bg-white/5 transition-colors text-center">
                Get Started
              </Link>
            </div>
            
            <div className="p-10 rounded-3xl bg-accent text-primary flex flex-col justify-between relative overflow-hidden neon-glow">
              <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-accent text-[10px] font-black uppercase tracking-widest rounded-full">MOST POPULAR</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Pro Advantage</h3>
                <div className="text-4xl font-black mb-6">$9.99<span className="text-sm font-normal text-primary/40">/mo</span></div>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-3 text-sm font-bold"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Unlimited AI Rankings</li>
                  <li className="flex items-center gap-3 text-sm font-bold"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Real-time Draft Assistant</li>
                  <li className="flex items-center gap-3 text-sm font-bold"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Advanced Trade Win-Prob</li>
                  <li className="flex items-center gap-3 text-sm font-bold"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Injury Impact Analysis</li>
                </ul>
              </div>
              <Link to="/dashboard" className="w-full py-4 rounded-xl bg-primary text-white font-bold hover:scale-[1.02] transition-transform text-center">
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 px-6 border-t border-white/5 text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-6 h-6 bg-accent rounded flex items-center justify-center">
            <span className="text-primary font-black text-[10px]">G</span>
          </div>
          <span className="text-lg font-display font-bold tracking-tighter">GRIDIRON<span className="text-accent">AI</span></span>
        </div>
        <p className="text-white/30 text-xs max-w-md mx-auto leading-relaxed">
          &copy; 2026 GridironAI. All rights reserved. Fantasy football is for entertainment purposes only. Please play responsibly.
        </p>
      </footer>
    </div>
  );
}
