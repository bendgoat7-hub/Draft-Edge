/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '@/src/pages/LandingPage';
import DashboardPage from '@/src/pages/DashboardPage';
import ToolsPage from '@/src/pages/ToolsPage';
import ContentHub from '@/src/pages/ContentHub';
import TradeAnalyzer from '@/src/pages/TradeAnalyzer';
import DraftAssistant from '@/src/pages/DraftAssistant';
import PlayerComparison from '@/src/pages/PlayerComparison';
import WaiverFinder from '@/src/pages/WaiverFinder';
import StartSitOptimizer from '@/src/pages/StartSitOptimizer';
import WeeklyRankings from '@/src/pages/WeeklyRankings';
import DFSLineupOptimizer from '@/src/pages/DFSLineupOptimizer';
import InjuryTracker from '@/src/pages/InjuryTracker';
import StrengthOfSchedule from '@/src/pages/StrengthOfSchedule';
import PlayoffPredictor from '@/src/pages/PlayoffPredictor';
import DynastyCalculator from '@/src/pages/DynastyCalculator';
import PropAnalyzer from '@/src/pages/PropAnalyzer';
import LeagueSync from '@/src/pages/LeagueSync';
import AIChatAssistant from '@/src/pages/AIChatAssistant';
import WeatherImpactMap from '@/src/pages/WeatherImpactMap';
import RosterHealth from '@/src/pages/RosterHealth';
import LiveDraftRoom from '@/src/pages/LiveDraftRoom';
import MarketValueTrends from '@/src/pages/MarketValueTrends';
import { AuthProvider } from '@/src/contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/trade-analyzer" element={<TradeAnalyzer />} />
          <Route path="/draft-assistant" element={<DraftAssistant />} />
          <Route path="/player-comparison" element={<PlayerComparison />} />
          <Route path="/waiver-finder" element={<WaiverFinder />} />
          <Route path="/start-sit" element={<StartSitOptimizer />} />
          <Route path="/rankings" element={<WeeklyRankings />} />
          <Route path="/dfs-optimizer" element={<DFSLineupOptimizer />} />
          <Route path="/injury-tracker" element={<InjuryTracker />} />
          <Route path="/sos" element={<StrengthOfSchedule />} />
          <Route path="/playoff-predictor" element={<PlayoffPredictor />} />
          <Route path="/dynasty-calculator" element={<DynastyCalculator />} />
          <Route path="/prop-analyzer" element={<PropAnalyzer />} />
          <Route path="/league-sync" element={<LeagueSync />} />
          <Route path="/ai-chat" element={<AIChatAssistant />} />
          <Route path="/weather" element={<WeatherImpactMap />} />
          <Route path="/roster-health" element={<RosterHealth />} />
          <Route path="/draft-room" element={<LiveDraftRoom />} />
          <Route path="/market-trends" element={<MarketValueTrends />} />
          <Route path="/content" element={<ContentHub />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}





