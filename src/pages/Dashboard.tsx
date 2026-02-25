import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  ArrowRight,
  CheckCircle2,
  Menu,
  Flame,
  Heart,
  Target,
  TrendingUp,
  Plus,
  Circle,
  Loader2,
  CalendarCheck,
} from "lucide-react";
import { useState } from "react";
import { useMyChallenges } from "@/hooks/queries/useChallenge";
import { useUserHabitsSummary } from "@/hooks/queries/useHabits";
import { useAuth } from "@/context/useAuth";

const STATUS_STYLES: Record<string, string> = {
  active: "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
  failed: "bg-red-100 text-red-700",
};

const GRADIENT_COLORS = [
  "from-blue-500 to-indigo-500",
  "from-emerald-500 to-teal-500",
  "from-purple-500 to-pink-500",
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  const { data: myChallenges = [], isLoading: challengesLoading } = useMyChallenges();
  const { data: habitsSummary, isLoading: habitsLoading } = useUserHabitsSummary();

  const topChallenges = myChallenges.slice(0, 3);
  const habitItems = habitsSummary?.habits ?? [];
  const topHabits = habitItems.slice(0, 5);

  const totalStreak = myChallenges.reduce(
    (sum, c) => sum + (c.progress?.currentStreak ?? 0),
    0
  );
  const activeChallenges = myChallenges.filter((c) => c.status === "active").length;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700"
          >
            <Menu className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Greeting */}
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}! 👋
            </h1>
            <p className="text-gray-500 mt-1">Here's how you're doing today.</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 lg:mb-8">
            <Card className="border-2 border-gray-200">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                  <Trophy className="w-5 h-5 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Active Challenges</p>
                  <p className="text-xl font-bold text-gray-900">
                    {challengesLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : activeChallenges}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-200">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
                  <Flame className="w-5 h-5 text-orange-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Total Streak</p>
                  <p className="text-xl font-bold text-gray-900">
                    {challengesLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : `${totalStreak}d`}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-200">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                  <CalendarCheck className="w-5 h-5 text-green-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Habits Today</p>
                  <p className="text-xl font-bold text-gray-900">
                    {habitsLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      `${habitsSummary?.completedTodayCount ?? 0}/${habitsSummary?.totalHabits ?? 0}`
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-200">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Total Completions</p>
                  <p className="text-xl font-bold text-gray-900">
                    {habitsLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      habitItems.reduce((s, h) => s + h.totalCompletions, 0)
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* My Challenges */}
            <Card className="border-2 border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                  <CardTitle className="text-lg">My Challenges</CardTitle>
                  <p className="text-sm text-gray-500 mt-0.5">Your top active challenges</p>
                </div>
                <Link to="/my-challenges">
                  <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                    View all
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {challengesLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                  </div>
                ) : topChallenges.length === 0 ? (
                  <div className="flex flex-col items-center py-8 text-center">
                    <Trophy className="w-12 h-12 text-gray-200 mb-3" />
                    <p className="text-gray-500 text-sm mb-4">You haven't joined any challenges yet.</p>
                    <Link to="/all-challenges">
                      <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                        <Plus className="w-4 h-4 mr-1" />
                        Browse Challenges
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {topChallenges.map((uc, i) => {
                      const pct = Math.round(
                        ((uc.progress?.completedDays ?? 0) / uc.challenge.durationDays) * 100
                      );
                      return (
                        <Link
                          key={uc.id}
                          to={`/my-challenges/${uc.id}`}
                          className="block"
                        >
                          <div className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all duration-200">
                            <div
                              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${GRADIENT_COLORS[i % GRADIENT_COLORS.length]} flex items-center justify-center flex-shrink-0`}
                            >
                              <Trophy className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <p className="font-semibold text-sm text-gray-900 truncate pr-2">
                                  {uc.challenge.title}
                                </p>
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${STATUS_STYLES[uc.status]}`}>
                                  {uc.status}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full bg-gradient-to-r ${GRADIENT_COLORS[i % GRADIENT_COLORS.length]} rounded-full transition-all`}
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                                <span className="text-xs text-gray-500 flex-shrink-0">
                                  {uc.progress?.completedDays ?? 0}/{uc.challenge.durationDays}d
                                </span>
                              </div>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="flex items-center gap-0.5 text-[11px] text-orange-600">
                                  <Flame className="w-3 h-3" />
                                  {uc.progress?.currentStreak ?? 0} streak
                                </span>
                                <span className="flex items-center gap-0.5 text-[11px] text-red-500">
                                  <Heart className="w-3 h-3 fill-red-400 text-red-400" />
                                  {uc.livesRemaining} lives
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* My Habits */}
            <Card className="border-2 border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                  <CardTitle className="text-lg">My Habits</CardTitle>
                  <p className="text-sm text-gray-500 mt-0.5">Today's personal habits</p>
                </div>
                <Link to="/my-habits">
                  <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                    View all
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {habitsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                  </div>
                ) : topHabits.length === 0 ? (
                  <div className="flex flex-col items-center py-8 text-center">
                    <Target className="w-12 h-12 text-gray-200 mb-3" />
                    <p className="text-gray-500 text-sm mb-4">No habits yet. Start building consistency!</p>
                    <Link to="/my-habits">
                      <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                        <Plus className="w-4 h-4 mr-1" />
                        Create a Habit
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {topHabits.map((item) => (
                      <div
                        key={item.habit.id}
                        className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-200 ${
                          item.completedToday
                            ? "bg-green-50 border-green-200"
                            : "bg-white border-gray-100"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: item.habit.color }}
                          />
                          {item.completedToday ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-300 flex-shrink-0" />
                          )}
                          <span
                            className={`font-medium text-sm truncate ${
                              item.completedToday ? "line-through text-green-700" : "text-gray-800"
                            }`}
                          >
                            {item.habit.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                          <span className="flex items-center gap-0.5 text-[11px] text-orange-500">
                            <Flame className="w-3 h-3" />
                            {item.currentStreak}
                          </span>
                          {item.completedToday && (
                            <span className="text-[10px] font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                              Done
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    {habitItems.length > 5 && (
                      <p className="text-center text-xs text-gray-400 pt-1">
                        +{habitItems.length - 5} more — <Link to="/my-habits" className="text-blue-500 hover:underline">view all</Link>
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Explore CTA */}
          <Card className="mt-6 border-2 border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Explore more challenges</h3>
                  <p className="text-sm text-gray-500">Join community challenges and stay motivated</p>
                </div>
              </div>
              <Link to="/all-challenges" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold">
                  View All Challenges
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
