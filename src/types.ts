export interface Player {
  id: string;
  name: string;
  position: 'QB' | 'RB' | 'WR' | 'TE' | 'K' | 'DEF';
  team: string;
  projectedPoints: number;
  actualPoints?: number;
  status: 'Healthy' | 'Questionable' | 'Doubtful' | 'Out' | 'IR';
  image?: string;
}

export interface Matchup {
  id: string;
  team1: Team;
  team2: Team;
  week: number;
}

export interface Team {
  id: string;
  name: string;
  ownerId: string;
  players: Player[];
  totalPoints: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  leagues: string[];
  isPremium: boolean;
}
