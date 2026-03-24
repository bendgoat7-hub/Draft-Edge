import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile } from '@/src/types';

interface AuthContextType {
  user: any | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demo purposes since Firebase was declined
const MOCK_USER = {
  uid: 'demo-user-123',
  email: 'demo@gridironai.com',
  displayName: 'Fantasy Pro',
};

const MOCK_PROFILE: UserProfile = {
  uid: 'demo-user-123',
  email: 'demo@gridironai.com',
  displayName: 'Fantasy Pro',
  leagues: ['League A', 'League B'],
  isPremium: true
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking local storage or session
    const savedUser = localStorage.getItem('gridiron_user');
    if (savedUser) {
      setUser(MOCK_USER);
      setProfile(MOCK_PROFILE);
    }
    setLoading(false);
  }, []);

  const signIn = async () => {
    setLoading(true);
    // Simulate sign in
    setTimeout(() => {
      setUser(MOCK_USER);
      setProfile(MOCK_PROFILE);
      localStorage.setItem('gridiron_user', 'true');
      setLoading(false);
    }, 1000);
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem('gridiron_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      loading, 
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
