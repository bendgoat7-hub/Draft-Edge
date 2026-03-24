import React from 'react';
import { Navbar } from '@/src/components/Landing';
import { motion } from 'motion/react';
import { Calendar, Clock, User } from 'lucide-react';

const articles = [
  {
    id: '1',
    title: 'Top 5 Waiver Wire Pickups for Week 4',
    excerpt: 'Injuries are piling up. Here are the players you need to target to save your season...',
    author: 'Fantasy Guru',
    date: 'Oct 24, 2026',
    readTime: '5 min read',
    image: 'https://picsum.photos/seed/football1/800/400'
  },
  {
    id: '2',
    title: 'The AI Guide to Perfect Start/Sit Decisions',
    excerpt: 'Stop relying on gut feelings. Learn how our AI analyzes matchups to give you the best projections...',
    author: 'Data Scientist',
    date: 'Oct 22, 2026',
    readTime: '8 min read',
    image: 'https://picsum.photos/seed/football2/800/400'
  },
  {
    id: '3',
    title: 'Trade Value Chart: Week 4 Edition',
    excerpt: 'Who is rising? Who is falling? Check out our updated trade value chart before you hit accept...',
    author: 'Trade Expert',
    date: 'Oct 21, 2026',
    readTime: '12 min read',
    image: 'https://picsum.photos/seed/football3/800/400'
  }
];

export default function ContentHub() {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h1 className="text-5xl font-display font-black tracking-tighter uppercase mb-4">
              CONTENT <span className="text-accent italic">HUB</span>
            </h1>
            <p className="text-white/50 max-w-xl">
              Expert analysis, data-driven insights, and winning strategies updated daily.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-colors">All</button>
            <button className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-colors">Waivers</button>
            <button className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-colors">Rankings</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map((article, i) => (
            <motion.article 
              key={article.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-video rounded-2xl overflow-hidden mb-6 relative">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center gap-4 text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">
                <span className="flex items-center gap-1"><User className="w-3 h-3" /> {article.author}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors leading-tight">
                {article.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-2">
                {article.excerpt}
              </p>
              <button className="text-xs font-black uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                Read Article <span className="text-accent">→</span>
              </button>
            </motion.article>
          ))}
        </div>
      </main>
    </div>
  );
}
