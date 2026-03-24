import React, { createContext, useContext, useState, useEffect } from 'react';
import { Team, Player } from '@/src/types';

interface LeagueContextType {
  syncedTeam: Team | null;
  isSynced: boolean;
  syncLeague: (platform: string, leagueId: string) => Promise<void>;
  updateTeam: (team: Team) => void;
}

const LeagueContext = createContext<LeagueContextType | undefined>(undefined);

const DEFAULT_TEAM: Team = {
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

export const LeagueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [syncedTeam, setSyncedTeam] = useState<Team | null>(null);
  const [isSynced, setIsSynced] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('gridiron_synced_team');
    if (saved) {
      setSyncedTeam(JSON.parse(saved));
      setIsSynced(true);
    } else {
      // For demo, we can start with the default team if not synced
      setSyncedTeam(DEFAULT_TEAM);
    }
  }, []);

  const syncLeague = async (platform: string, leagueId: string) => {
    // Simulate API call to sync league
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newTeam = { ...DEFAULT_TEAM, name: `${platform.toUpperCase()} ALL-STARS` };
        setSyncedTeam(newTeam);
        setIsSynced(true);
        localStorage.setItem('gridiron_synced_team', JSON.stringify(newTeam));
        resolve();
      }, 2000);
    });
  };

  const updateTeam = (team: Team) => {
    setSyncedTeam(team);
    localStorage.setItem('gridiron_synced_team', JSON.stringify(team));
  };

  return (
    <LeagueContext.Provider value={{ syncedTeam, isSynced, syncLeague, updateTeam }}>
      {children}
    </LeagueContext.Provider>
  );
};

export const useLeague = () => {
  const context = useContext(LeagueContext);
  if (context === undefined) {
    throw new Error('useLeague must be used within a LeagueProvider');
  }
  return context;
};
