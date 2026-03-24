import { Player, Team } from '@/src/types';

const SLEEPER_API_BASE = 'https://api.sleeper.app/v1';

export interface SleeperUser {
  user_id: string;
  username: string;
  display_name: string;
  avatar: string;
}

export interface SleeperRoster {
  roster_id: number;
  owner_id: string;
  players: string[];
  starters: string[];
}

export interface SleeperLeague {
  league_id: string;
  name: string;
  season: string;
  status: string;
  total_rosters: number;
}

export interface SleeperPlayer {
  player_id: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  position: string;
  team: string;
  status?: string;
}

let playerCache: Record<string, SleeperPlayer> | null = null;

export const sleeperService = {
  async fetchUser(username: string): Promise<SleeperUser> {
    const response = await fetch(`${SLEEPER_API_BASE}/user/${username}`);
    if (!response.ok) throw new Error('User not found');
    return response.json();
  },

  async fetchLeague(leagueId: string): Promise<SleeperLeague> {
    const response = await fetch(`${SLEEPER_API_BASE}/league/${leagueId}`);
    if (!response.ok) throw new Error('League not found');
    return response.json();
  },

  async fetchRosters(leagueId: string): Promise<SleeperRoster[]> {
    const response = await fetch(`${SLEEPER_API_BASE}/league/${leagueId}/rosters`);
    if (!response.ok) throw new Error('Rosters not found');
    return response.json();
  },

  async fetchLeagueUsers(leagueId: string): Promise<SleeperUser[]> {
    const response = await fetch(`${SLEEPER_API_BASE}/league/${leagueId}/users`);
    if (!response.ok) throw new Error('League users not found');
    return response.json();
  },

  async fetchAllPlayers(): Promise<Record<string, SleeperPlayer>> {
    if (playerCache) return playerCache;

    // Check localStorage first
    const cached = localStorage.getItem('sleeper_players_cache');
    const cacheTime = localStorage.getItem('sleeper_players_cache_time');
    const now = Date.now();

    // Cache for 24 hours
    if (cached && cacheTime && now - parseInt(cacheTime) < 24 * 60 * 60 * 1000) {
      playerCache = JSON.parse(cached);
      return playerCache!;
    }

    const response = await fetch(`${SLEEPER_API_BASE}/players/nfl`);
    if (!response.ok) throw new Error('Failed to fetch player database');
    const data = await response.json();
    
    playerCache = data;
    localStorage.setItem('sleeper_players_cache', JSON.stringify(data));
    localStorage.setItem('sleeper_players_cache_time', now.toString());
    
    return data;
  },

  async syncLeague(leagueId: string, username: string): Promise<Team> {
    try {
      // 1. Get user
      const user = await this.fetchUser(username);
      
      // 2. Get league info
      const league = await this.fetchLeague(leagueId);
      
      // 3. Get all rosters
      const rosters = await this.fetchRosters(leagueId);
      
      // 4. Find user's roster
      const userRoster = rosters.find(r => r.owner_id === user.user_id);
      if (!userRoster) throw new Error('User does not have a roster in this league');
      
      // 5. Get player database
      const allPlayers = await this.fetchAllPlayers();
      
      // 6. Map players
      const players: Player[] = userRoster.players.map(pid => {
        const p = allPlayers[pid];
        if (!p) {
          return {
            id: pid,
            name: 'Unknown Player',
            position: 'WR' as any,
            team: 'N/A',
            projectedPoints: 0,
            status: 'Healthy' as any
          };
        }
        return {
          id: pid,
          name: p.full_name || `${p.first_name} ${p.last_name}`,
          position: (p.position || 'WR') as any,
          team: p.team || 'N/A',
          projectedPoints: 0, // Projections would need another API or mock
          status: (p.status === 'Active' ? 'Healthy' : 'Out') as any
        };
      });

      return {
        id: leagueId,
        name: league.name,
        ownerId: user.user_id,
        players,
        totalPoints: 0 // Would need to fetch scores
      };
    } catch (error) {
      console.error('Sleeper Sync Error:', error);
      throw error;
    }
  }
};
