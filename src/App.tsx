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
import Profile from "./pages/Profile";
import PublicProfile from "./pages/PublicProfile";

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
          <Route
            path="/all-challenges"
            element={
              <ProtectedRoute>
                <AllChallenges />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-challenges"
            element={
              <ProtectedRoute>
                <MyChallenges />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-challenges/:challengeId"
            element={
              <ProtectedRoute>
                <HabitsChallenge />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-habits"
            element={
              <ProtectedRoute>
                <UserHabits />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-habits/:habitId/analytics"
            element={
              <ProtectedRoute>
                <HabitAnalytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-challenges/:challengeId/create-habits"
            element={
              <ProtectedRoute>
                <CreateHabits />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/public/:userId" element={<PublicProfile />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
