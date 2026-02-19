import { Routes, Route } from "react-router-dom";
import Index from "./Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import AllChallenges from "./pages/AllChallenges";
import MyChallenges from "./pages/MyChallenges";
import HabitsChallenge from "./pages/HabitsChallenge";
import CreateHabits from "./pages/CreateHabits";
import ProtectedRoute from "./components/ProtectedRoute";
import UserHabits from "./pages/UserHabits";
import HabitAnalytics from "./pages/HabitAnalytics";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/all-challenges" element={<AllChallenges />} />
          <Route path="/my-challenges" element={<MyChallenges />} />
          <Route
            path="/my-challenges/:challengeId"
            element={
                <HabitsChallenge />
            }
          />
          <Route path="/my-habits" element={<UserHabits />} />
          <Route path="/my-habits/:habitId/analytics" element={<HabitAnalytics />} />
          <Route
            path="/my-challenges/:challengeId/create-habits"
            element={
                <CreateHabits />
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
