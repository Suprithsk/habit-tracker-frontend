import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Menu,
  ArrowLeft,
  Flame,
  Trophy,
  TrendingUp,
  CheckCircle2,
  Calendar,
  Target,
} from "lucide-react";

const DUMMY_ANALYTICS: Record<
  string,
  {
    habit: {
      id: string;
      title: string;
      description?: string;
      color: string;
      isArchived: boolean;
      createdAt: string;
    };
    analytics: {
      currentStreak: number;
      longestStreak: number;
      totalCompletions: number;
      lastCompletedDate?: string;
      completedToday: boolean;
      completionRateLast7: number;
      completionRateLast30: number;
      weeklyBreakdown: { weekStart: string; weekEnd: string; completed: number; total: number }[];
      monthlyBreakdown: { month: string; completed: number; total: number; completionRate: number }[];
    };
  }
> = {
  "1": {
    habit: {
      id: "1",
      title: "Morning Run",
      description: "Run 5km every morning before breakfast",
      color: "#3b82f6",
      isArchived: false,
      createdAt: "2026-01-01T00:00:00.000Z",
    },
    analytics: {
      currentStreak: 4,
      longestStreak: 12,
      totalCompletions: 38,
      lastCompletedDate: "2026-02-19T12:00:00.000Z",
      completedToday: true,
      completionRateLast7: 86,
      completionRateLast30: 77,
      weeklyBreakdown: [
        { weekStart: "2026-01-25", weekEnd: "2026-01-31", completed: 5, total: 7 },
        { weekStart: "2026-02-01", weekEnd: "2026-02-07", completed: 7, total: 7 },
        { weekStart: "2026-02-08", weekEnd: "2026-02-14", completed: 6, total: 7 },
        { weekStart: "2026-02-15", weekEnd: "2026-02-21", completed: 5, total: 7 },
      ],
      monthlyBreakdown: [
        { month: "2025-09", completed: 20, total: 30, completionRate: 67 },
        { month: "2025-10", completed: 25, total: 31, completionRate: 81 },
        { month: "2025-11", completed: 22, total: 30, completionRate: 73 },
        { month: "2025-12", completed: 28, total: 31, completionRate: 90 },
        { month: "2026-01", completed: 27, total: 31, completionRate: 87 },
        { month: "2026-02", completed: 19, total: 28, completionRate: 68 },
      ],
    },
  },
};

// Fallback for habits without specific dummy data
const FALLBACK = DUMMY_ANALYTICS["1"];

const formatDate = (dateString?: string) => {
  if (!dateString) return "Never";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatMonth = (month: string) => {
  const [year, m] = month.split("-");
  return new Date(Number(year), Number(m) - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const formatWeek = (weekStart: string, weekEnd: string) => {
  const s = new Date(weekStart).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const e = new Date(weekEnd).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${s} – ${e}`;
};

const HabitAnalytics = () => {
  const { habitId } = useParams<{ habitId: string }>();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const data = (habitId && DUMMY_ANALYTICS[habitId]) ? DUMMY_ANALYTICS[habitId] : FALLBACK;
  const { habit, analytics } = data;

  const statCards = [
    {
      label: "Current Streak",
      value: `${analytics.currentStreak} days`,
      icon: Flame,
      bg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      label: "Longest Streak",
      value: `${analytics.longestStreak} days`,
      icon: Trophy,
      bg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      label: "Total Completions",
      value: analytics.totalCompletions,
      icon: CheckCircle2,
      bg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: "Last Completed",
      value: formatDate(analytics.lastCompletedDate),
      icon: Calendar,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Last 7 Days",
      value: `${analytics.completionRateLast7}%`,
      icon: TrendingUp,
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      label: "Last 30 Days",
      value: `${analytics.completionRateLast30}%`,
      icon: Target,
      bg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
  ];

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
          <h1 className="text-xl font-bold text-gray-900">Habit Analytics</h1>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
          {/* Back */}
          <Link
            to="/my-habits"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to My Habits
          </Link>

          {/* Habit Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: habit.color }}
              />
              <h1 className="text-3xl font-bold text-gray-900">{habit.title}</h1>
              {analytics.completedToday && (
                <span className="text-xs font-semibold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                  Done Today ✓
                </span>
              )}
            </div>
            {habit.description && (
              <p className="text-gray-500 ml-7">{habit.description}</p>
            )}
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {statCards.map(({ label, value, icon: Icon, bg, iconColor }) => (
              <Card key={label} className="border-2 border-gray-200">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`p-2 ${bg} rounded-lg flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 truncate">{label}</p>
                    <p className="text-lg font-bold text-gray-900 truncate">{value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Breakdown */}
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  Weekly Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {analytics.weeklyBreakdown.map((week) => {
                  const pct = Math.round((week.completed / week.total) * 100);
                  return (
                    <div key={week.weekStart}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">{formatWeek(week.weekStart, week.weekEnd)}</span>
                        <span className="font-semibold text-gray-900">
                          {week.completed}/{week.total} ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, backgroundColor: habit.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Monthly Breakdown */}
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  Monthly Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {analytics.monthlyBreakdown.map((month) => (
                  <div key={month.month}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">{formatMonth(month.month)}</span>
                      <span className="font-semibold text-gray-900">
                        {month.completed}/{month.total} ({month.completionRate}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${month.completionRate}%`, backgroundColor: habit.color }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HabitAnalytics;
