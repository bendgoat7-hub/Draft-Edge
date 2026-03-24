import React, { useState } from 'react';
import { Navbar } from '@/src/components/Landing';
import { Trophy, Link as LinkIcon, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLeague } from '@/src/contexts/LeagueContext';
import { useNavigate } from 'react-router-dom';

const platforms = [
  { id: 'sleeper', name: 'Sleeper', icon: 'https://sleeper.com/images/v2/logos/sleeper_logo_white.png', color: 'bg-[#00CEB8]' },
  { id: 'espn', name: 'ESPN Fantasy', icon: 'https://a.espncdn.com/combiner/i?img=/i/fantasy/fantasy_football_logo.png', color: 'bg-[#CC0000]' },
  { id: 'yahoo', name: 'Yahoo Sports', icon: 'https://s.yimg.com/cv/apiv2/myc/fantasy/fantasy_football_logo_2021.png', color: 'bg-[#410093]' },
  { id: 'nfl', name: 'NFL.com', icon: 'https://static.www.nfl.com/image/upload/v1554321393/league/nvpno9Mr4ege99p369y7.png', color: 'bg-[#013369]' },
];

export default function LeagueSync() {
  const { syncLeague } = useLeague();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [leagueId, setLeagueId] = useState('');
  const [username, setUsername] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlatformSelect = (id: string) => {
    setSelectedPlatform(id);
    setStep(2);
  };

  const handleSync = async () => {
    if (!leagueId || !selectedPlatform) return;
    if (selectedPlatform === 'sleeper' && !username) {
      setError('Sleeper username is required');
      return;
    }

    setIsSyncing(true);
    setError(null);
    try {
      await syncLeague(selectedPlatform, leagueId, username);
      setIsSyncing(false);
      setSyncSuccess(true);
      setStep(3);
    } catch (err: any) {
      setIsSyncing(false);
      setError(err.message || 'Failed to sync league. Please check your ID and username.');
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 text-accent mb-4">
            <LinkIcon className="w-6 h-6" />
            <span className="text-xs font-black uppercase tracking-widest">League Sync Engine</span>
          </div>
          <h1 className="text-5xl font-display font-black tracking-tighter uppercase mb-4">
            CONNECT YOUR <span className="text-accent italic">LEAGUES</span>
          </h1>
          <p className="text-white/50">
            Sync your roster, scoring settings, and matchups in real-time for personalized AI advice.
          </p>
        </div>

        <div className="bg-card border border-border rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Select your platform</h2>
                  <p className="text-sm text-white/40">Choose where your league is hosted</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {platforms.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handlePlatformSelect(p.id)}
                      className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-accent/50 transition-all flex flex-col items-center gap-4"
                    >
                      <div className={`w-16 h-16 rounded-2xl ${p.color} p-3 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <img src={p.icon} alt={p.name} className="w-full h-full object-contain brightness-0 invert" referrerPolicy="no-referrer" />
                      </div>
                      <span className="font-bold text-sm">{p.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <button 
                  onClick={() => setStep(1)}
                  className="text-xs font-black uppercase tracking-widest text-white/30 hover:text-accent transition-colors flex items-center gap-2"
                >
                  ← Back to platforms
                </button>
                <div className="text-center">
                  <div className={`w-20 h-20 rounded-2xl ${platforms.find(p => p.id === selectedPlatform)?.color} p-4 flex items-center justify-center mx-auto mb-6`}>
                    <img src={platforms.find(p => p.id === selectedPlatform)?.icon} alt="" className="w-full h-full object-contain brightness-0 invert" referrerPolicy="no-referrer" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Enter League ID</h2>
                  <p className="text-sm text-white/40">You can find this in your league settings URL</p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">League ID</label>
                    <input 
                      type="text" 
                      placeholder="League ID (e.g. 10485729384)"
                      value={leagueId}
                      onChange={(e) => setLeagueId(e.target.value)}
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-center font-mono focus:outline-none focus:border-accent/50"
                    />
                  </div>

                  {selectedPlatform === 'sleeper' && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Sleeper Username</label>
                      <input 
                        type="text" 
                        placeholder="Your Sleeper Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-center font-mono focus:outline-none focus:border-accent/50"
                      />
                    </div>
                  )}

                  {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  <button 
                    disabled={!leagueId || (selectedPlatform === 'sleeper' && !username) || isSyncing}
                    onClick={handleSync}
                    className="w-full py-4 rounded-xl bg-accent text-primary font-black uppercase tracking-widest hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3"
                  >
                    {isSyncing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Syncing Data...
                      </>
                    ) : (
                      <>
                        Sync League <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-4">
                  <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <p className="text-xs text-white/50 leading-relaxed">
                    For private ESPN leagues, you may need to provide your <code className="text-accent">SWID</code> and <code className="text-accent">espn_s2</code> cookies. <a href="#" className="underline hover:text-accent">Learn how to find them.</a>
                  </p>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 rounded-full bg-green-400/20 flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-12 h-12 text-green-400" />
                </div>
                <h2 className="text-3xl font-display font-black uppercase tracking-tighter mb-4">League Synced!</h2>
                <p className="text-white/50 mb-10 max-w-sm mx-auto">
                  Your roster and matchups have been imported. AI insights are now personalized for your team.
                </p>
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="w-full py-4 rounded-xl bg-accent text-primary font-black uppercase tracking-widest hover:scale-[1.02] transition-transform"
                  >
                    Go to Dashboard
                  </button>
                  <button 
                    onClick={() => { setStep(1); setSyncSuccess(false); setLeagueId(''); }}
                    className="text-sm font-bold text-white/40 hover:text-white transition-colors"
                  >
                    Sync another league
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
            <h3 className="font-bold mb-2">Why Sync?</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-xs text-white/50">
                <CheckCircle2 className="w-4 h-4 text-accent" /> Automatic roster updates
              </li>
              <li className="flex items-center gap-2 text-xs text-white/50">
                <CheckCircle2 className="w-4 h-4 text-accent" /> Personalized start/sit advice
              </li>
              <li className="flex items-center gap-2 text-xs text-white/50">
                <CheckCircle2 className="w-4 h-4 text-accent" /> Real-time trade impact analysis
              </li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
            <h3 className="font-bold mb-2">Security</h3>
            <p className="text-xs text-white/50 leading-relaxed">
              We never store your passwords. We use read-only API access to fetch your league data securely.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
