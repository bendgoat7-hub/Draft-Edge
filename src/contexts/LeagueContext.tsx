import React, { createContext, useContext, useState, useEffect } from 'react';
import { Team, Player } from '@/src/types';
import { sleeperService } from '@/src/services/sleeper';

interface LeagueContextType {
  syncedTeam: Team | null;
  isSynced: boolean;
  syncLeague: (platform: string, leagueId: string, username?: string) => Promise<void>;
  updateTeam: (team: Team) => void;
  refreshLeague: () => Promise<void>;
}

const LeagueContext = createContext<LeagueContextType | undefined>(undefined);

export const LeagueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [syncedTeam, setSyncedTeam] = useState<Team | null>(null);
  const [isSynced, setIsSynced] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('gridiron_synced_team');
    const savedPlatform = localStorage.getItem('gridiron_synced_platform');
    if (saved) {
      setSyncedTeam(JSON.parse(saved));
      setIsSynced(true);
    }
  }, []);

  const syncLeague = async (platform: string, leagueId: string, username?: string) => {
    if (platform === 'sleeper' && username) {
      try {
        const team = await sleeperService.syncLeague(leagueId, username);
        setSyncedTeam(team);
        setIsSynced(true);
        localStorage.setItem('gridiron_synced_team', JSON.stringify(team));
        localStorage.setItem('gridiron_synced_platform', platform);
        localStorage.setItem('gridiron_synced_league_id', leagueId);
        localStorage.setItem('gridiron_synced_username', username);
      } catch (error) {
        console.error('Failed to sync Sleeper league:', error);
        throw error;
      }
    } else {
      // For other platforms, we currently use mock for demo
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          const mockTeam: Team = {
            id: leagueId,
            name: `${platform.toUpperCase()} ALL-STARS`,
            ownerId: 'demo-user-123',
            totalPoints: 442.5,
            players: [
              { id: 'p1', name: 'Patrick Mahomes', position: 'QB', team: 'KC', projectedPoints: 23.5, status: 'Healthy' },
              { id: 'p2', name: 'Christian McCaffrey', position: 'RB', team: 'SF', projectedPoints: 24.5, status: 'Healthy' },
              { id: 'p3', name: 'Justin Jefferson', position: 'WR', team: 'MIN', projectedPoints: 21.2, status: 'Healthy' },
            ]
          };
          setSyncedTeam(mockTeam);
          setIsSynced(true);
          localStorage.setItem('gridiron_synced_team', JSON.stringify(mockTeam));
          localStorage.setItem('gridiron_synced_platform', platform);
          resolve();
        }, 1500);
      });
    }
  };

  const refreshLeague = async () => {
    const platform = localStorage.getItem('gridiron_synced_platform');
    const leagueId = localStorage.getItem('gridiron_synced_league_id');
    const username = localStorage.getItem('gridiron_synced_username');

    if (platform === 'sleeper' && leagueId && username) {
      await syncLeague(platform, leagueId, username);
    }
  };

  const updateTeam = (team: Team) => {
    setSyncedTeam(team);
    localStorage.setItem('gridiron_synced_team', JSON.stringify(team));
  };

  return (
    <LeagueContext.Provider value={{ syncedTeam, isSynced, syncLeague, updateTeam, refreshLeague }}>
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
