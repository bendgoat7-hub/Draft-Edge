import React from 'react';
import { Navbar, Hero, Features } from '@/src/components/Landing';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-primary grid-bg">
      <Navbar />
      <Hero />
      <Features />
      
      {/* How It Works */}
      <section id="how-it-works" className="py-32 px-6 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-accent/[0.02] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <div className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-4">The Playbook</div>
            <h2 className="text-5xl md:text-7xl font-display font-black mb-6 uppercase tracking-tighter leading-none">Your path to <span className="text-accent italic">victory</span></h2>
            <p className="text-white/40 max-w-2xl mx-auto text-lg">Three simple steps to dominate your league and secure the championship trophy.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center group">
              <div className="w-24 h-24 rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-10 text-4xl font-display font-black italic text-accent group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl">01</div>
              <h3 className="text-2xl font-display font-black mb-4 uppercase tracking-tight">Connect Your League</h3>
              <p className="text-white/40 leading-relaxed font-medium">Sync your Sleeper, ESPN, or Yahoo leagues instantly. Our engine fetches your real-time rosters, scoring settings, and matchups without any manual data entry.</p>
            </div>
            <div className="text-center group">
              <div className="w-24 h-24 rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-10 text-4xl font-display font-black italic text-accent group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shadow-2xl">02</div>
              <h3 className="text-2xl font-display font-black mb-4 uppercase tracking-tight">AI-Powered Analysis</h3>
              <p className="text-white/40 leading-relaxed font-medium">Our proprietary AI simulates every matchup 10,000+ times. Get personalized start/sit advice, trade evaluations, and waiver wire gems tailored specifically to your team's needs.</p>
            </div>
            <div className="text-center group">
              <div className="w-24 h-24 rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-10 text-4xl font-display font-black italic text-accent group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl">03</div>
              <h3 className="text-2xl font-display font-black mb-4 uppercase tracking-tight">Dominate & Win</h3>
              <p className="text-white/40 leading-relaxed font-medium">Make data-backed decisions with 98% confidence. Outsmart your opponents with superior insights and take home your league's championship trophy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-10 rounded-[40px] bg-card border border-border shadow-2xl hover:border-accent/30 transition-colors group">
              <div className="flex gap-2 text-accent mb-8">
                {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-4 h-4 bg-accent rounded-full shadow-[0_0_10px_rgba(0,255,0,0.5)]" />)}
              </div>
              <p className="text-lg text-white/70 italic mb-10 font-medium leading-relaxed">"I've played fantasy for 10 years and never had an edge like this. The Trade Analyzer saved my season."</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10" />
                <div>
                  <div className="text-base font-bold">Mike R.</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black">3-Time Champion</div>
                </div>
              </div>
            </div>
            <div className="p-10 rounded-[40px] bg-card border border-border shadow-2xl hover:border-accent/30 transition-colors group">
              <div className="flex gap-2 text-accent mb-8">
                {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-4 h-4 bg-accent rounded-full shadow-[0_0_10px_rgba(0,255,0,0.5)]" />)}
              </div>
              <p className="text-lg text-white/70 italic mb-10 font-medium leading-relaxed">"The AI Chat Assistant is a cheat code. I got an A+ draft grade and I'm currently 8-0 in my main league."</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10" />
                <div>
                  <div className="text-base font-bold">Sarah J.</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black">Pro League Player</div>
                </div>
              </div>
            </div>
            <div className="p-10 rounded-[40px] bg-card border border-border shadow-2xl hover:border-accent/30 transition-colors group">
              <div className="flex gap-2 text-accent mb-8">
                {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-4 h-4 bg-accent rounded-full shadow-[0_0_10px_rgba(0,255,0,0.5)]" />)}
              </div>
              <p className="text-lg text-white/70 italic mb-10 font-medium leading-relaxed">"Finally a fantasy app that doesn't look like it was built in 2005. Fast, clean, and actually helpful."</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10" />
                <div>
                  <div className="text-base font-bold">David K.</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black">Casual Player</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 border-y border-white/5 bg-white/[0.02] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-32 opacity-20 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="text-3xl font-display font-black italic tracking-tighter">ESPN FANTASY</div>
          <div className="text-3xl font-display font-black italic tracking-tighter">SLEEPER</div>
          <div className="text-3xl font-display font-black italic tracking-tighter">YAHOO SPORTS</div>
          <div className="text-3xl font-display font-black italic tracking-tighter">NFL.COM</div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <div className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-4">Membership</div>
            <h2 className="text-5xl md:text-7xl font-display font-black mb-6 uppercase tracking-tighter leading-none">Choose your <span className="text-accent italic">advantage</span></h2>
            <p className="text-white/40 max-w-2xl mx-auto text-lg">Start winning today. Upgrade anytime to unlock professional-grade tools.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-16 rounded-[48px] bg-card border border-border flex flex-col justify-between shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full -mr-32 -mt-32 blur-[100px]" />
              <div>
                <h3 className="text-3xl font-display font-black mb-4 uppercase tracking-tight">Free Tier</h3>
                <div className="text-6xl font-display font-black mb-10 italic">$0<span className="text-sm font-black text-white/20 not-italic uppercase tracking-widest ml-2">/mo</span></div>
                <ul className="space-y-6 mb-16">
                  <li className="flex items-center gap-4 text-base text-white/60 font-medium"><div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(0,255,0,0.5)]" /> Basic Rankings</li>
                  <li className="flex items-center gap-4 text-base text-white/60 font-medium"><div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(0,255,0,0.5)]" /> Start/Sit Advice (3/week)</li>
                  <li className="flex items-center gap-4 text-base text-white/60 font-medium"><div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10_rgba(0,255,0,0.5)]" /> Trade Analyzer (Basic)</li>
                </ul>
              </div>
              <Link to="/dashboard" className="w-full py-6 rounded-2xl border border-white/10 font-black uppercase tracking-widest text-xs hover:bg-white/5 transition-all text-center">
                Get Started
              </Link>
            </div>
            
            <div className="p-16 rounded-[48px] bg-accent text-primary flex flex-col justify-between relative overflow-hidden neon-glow group hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute top-8 right-8 px-5 py-2 bg-primary text-accent text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-2xl">MOST POPULAR</div>
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/20 rounded-full blur-[100px]" />
              <div>
                <h3 className="text-3xl font-display font-black mb-4 uppercase tracking-tight">Pro Advantage</h3>
                <div className="text-6xl font-display font-black mb-10 italic">$9.99<span className="text-sm font-black text-primary/40 not-italic uppercase tracking-widest ml-2">/mo</span></div>
                <ul className="space-y-6 mb-16">
                  <li className="flex items-center gap-4 text-base font-bold"><div className="w-2 h-2 rounded-full bg-primary" /> Unlimited AI Rankings</li>
                  <li className="flex items-center gap-4 text-base font-bold"><div className="w-2 h-2 rounded-full bg-primary" /> 24/7 AI Chat Assistant</li>
                  <li className="flex items-center gap-4 text-base font-bold"><div className="w-2 h-2 rounded-full bg-primary" /> Advanced Trade Win-Prob</li>
                  <li className="flex items-center gap-4 text-base font-bold"><div className="w-2 h-2 rounded-full bg-primary" /> Injury Impact Analysis</li>
                </ul>
              </div>
              <Link to="/dashboard" className="w-full py-6 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-xs hover:shadow-2xl transition-all text-center">
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-32 px-6 border-t border-white/5 text-center relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-accent/[0.01] pointer-events-none" />
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,255,0,0.3)]">
            <span className="text-primary font-black text-lg italic font-display">G</span>
          </div>
          <span className="text-3xl font-display font-black tracking-tighter uppercase">GRIDIRON<span className="text-accent">AI</span></span>
        </div>
        <p className="text-white/20 text-sm max-w-md mx-auto leading-relaxed font-medium">
          &copy; 2026 GridironAI. All rights reserved. Fantasy football is for entertainment purposes only. Please play responsibly.
        </p>
      </footer>
    </div>
  );
}
