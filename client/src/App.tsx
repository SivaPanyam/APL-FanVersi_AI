import { Route, Routes } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { LandingPage } from "@/pages/LandingPage";
import { LoginPage } from "@/pages/LoginPage";
import { Dashboard } from "@/pages/Dashboard";
import { Leaderboard } from "@/pages/Leaderboard";
import { MatchDetails } from "@/pages/MatchDetails";
import { FanChatPage } from "@/pages/FanChatPage";

export default function App() {
  return (
    <Routes>
      {/* Public Routes without Sidebar */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected App Routes with Sidebar */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/match/:id" element={<MatchDetails />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/chat" element={<FanChatPage />} />
      </Route>
    </Routes>
  );
}
