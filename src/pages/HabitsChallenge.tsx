import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Trophy,
  Calendar,
  Flame,
  Heart,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowLeft,
  Target,
  Plus,
  PartyPopper,
} from "lucide-react";
import { useMyChallengeProgress } from "@/hooks/queries/useChallenge";
import { useLogHabit } from "@/hooks/mutations/useHabitsMutations";
import { useJoinChallenge } from "@/hooks/mutations/useChallengeMutations";

const ITEMS_PER_PAGE = 4;

const HabitsChallenge = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loggingIds, setLoggingIds] = useState<Set<string>>(new Set());

  const { data, isLoading, isError } = useMyChallengeProgress(challengeId!);
  const logHabit = useLogHabit();
  const joinChallenge = useJoinChallenge();

  const handleMarkComplete = (habitId: string) => {
    if (loggingIds.has(habitId)) return;
    setLoggingIds((prev) => new Set(prev).add(habitId));
    logHabit.mutate(
      { habitId },
      {
        onSettled: () => {
          setLoggingIds((prev) => {
            const next = new Set(prev);
            next.delete(habitId);
            return next;
          });
        },
      }
    );
  };

  // Pagination logic
  const habits = data?.habits ?? [];
  const totalPages = Math.ceil(habits.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedHabits = habits.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Not completed yet";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate completion percentage for pie chart
  const completedHabits = habits.filter((h) => h.completedToday).length;
  const totalHabits = habits.length;
  const completionPercentage =
    totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;

  // Check if all habits are completed today
  const todayCompleted = data?.todayCompleted ?? false;

  // SVG Pie chart calculation (radius = 40, matching the SVG circle r="40")
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (completionPercentage / 100) * circumference;

  const userChallenge = data?.userChallenge;
  const challenge = data?.challenge;
  const progress = userChallenge?.progress;

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
          <h1 className="text-xl font-bold text-gray-900">Habits in Challenge</h1>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Back Button */}
          <Link
            to="/my-challenges"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to My Challenges
          </Link>

          {/* Header */}
          <div className="hidden lg:block mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Habits in Challenge
            </h1>
            <p className="text-gray-600">
              Track and complete your daily habits
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : isError || !data ? (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-red-500 font-semibold">Failed to load challenge. Please try again.</p>
            </div>
          ) : (
            <>
          {/* Today Completed Banner */}
          {todayCompleted && userChallenge?.status !== "completed" && (
            <div className="mb-6 flex items-start gap-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-5">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-green-800 text-base">
                  Adding new habits is disabled after you've completed your first day.
                </p>
                <p className="text-sm text-green-700 mt-0.5">
                  You've finished all habits for today. Come back tomorrow to keep your streak going!
                </p>
              </div>
            </div>
          )}
          {/* Completed Banner */}
          {userChallenge?.status === "completed" && (
            <div className="mb-6 rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <PartyPopper className="w-7 h-7 text-white" />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-900">Challenge Completed!</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    You finished <span className="font-semibold text-gray-800">{challenge!.title}</span> —{" "}
                    <span className="font-semibold text-gray-800">{progress?.completedDays ?? 0} days</span> completed with a best streak of{" "}
                    <span className="inline-flex items-center gap-1 font-semibold text-orange-500">
                      <Flame className="w-3.5 h-3.5" />{progress?.currentStreak ?? 0}
                    </span>{" "}
                    and{" "}
                    <span className="inline-flex items-center gap-1 font-semibold text-red-400">
                      <Heart className="w-3.5 h-3.5" />{userChallenge.livesRemaining} lives remaining
                    </span>.
                  </p>
                </div>

                {/* CTA */}
                <Button
                  onClick={() => joinChallenge.mutate({ challengeId: challenge!.id })}
                  disabled={joinChallenge.isPending}
                  className="flex-shrink-0 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold shadow-sm"
                >
                  {joinChallenge.isPending ? "Enrolling..." : "Re-enroll"}
                </Button>
              </div>
            </div>
          )}
          {/* Challenge Info Card */}
          <Card className="mb-6 border-2 border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="w-8 h-8 text-white" />
                <h2 className="text-2xl font-bold text-white">
                  {challenge!.title}
                </h2>
              </div>
              <p className="text-blue-100">{challenge!.description}</p>
            </div>

            <CardContent className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Last Completed Date */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Completed</p>
                    <p className="font-semibold text-gray-900 text-sm">
                      {formatDate(progress?.lastCompletedDate)}
                    </p>
                  </div>
                </div>

                {/* Current Streak */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Flame className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current Streak</p>
                    <p className="font-semibold text-gray-900">
                      {progress?.currentStreak ?? 0} days
                    </p>
                  </div>
                </div>

                {/* Completed Days */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Target className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Completed Days</p>
                    <p className="font-semibold text-gray-900">
                      {progress?.completedDays ?? 0} / {challenge!.durationDays}
                    </p>
                  </div>
                </div>

                {/* Lives Remaining */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Heart className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Lives Remaining</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Heart
                          key={i}
                          className={`w-4 h-4 ${
                            i < (userChallenge!.livesRemaining ?? 0)
                              ? "text-red-500 fill-red-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Overall Progress</span>
                  <span className="font-semibold text-gray-900">
                    {Math.round(
                      ((progress?.completedDays ?? 0) / challenge!.durationDays) * 100
                    )}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${((progress?.completedDays ?? 0) / challenge!.durationDays) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Today's Status */}
              <div className="mt-4 p-3 rounded-lg bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-2">
                  {todayCompleted ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="text-green-700 font-medium">
                        You've completed all habits for today! 🎉
                      </span>
                    </>
                  ) : (
                    <>
                      <Circle className="w-5 h-5 text-amber-500" />
                      <span className="text-amber-700 font-medium">
                        Complete your habits to keep your streak going!
                      </span>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Habits Section with Pie Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Habits List */}
            <Card className="lg:col-span-2 border-2 border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  Today's Habits
                </CardTitle>
                <Link
                  to={`/my-challenges/${challengeId}/create-habits`}
                  onClick={(e) => (todayCompleted || userChallenge?.status === "completed") && e.preventDefault()}
                  className={(todayCompleted || userChallenge?.status === "completed") ? "pointer-events-none" : ""}
                >
                  <Button
                    size="sm"
                    disabled={todayCompleted || userChallenge?.status === "completed"}
                    title={todayCompleted ? "Adding habits is disabled after today's session is complete" : undefined}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Habit
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {paginatedHabits.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Target className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No habits added to this challenge yet.</p>
                    <p className="text-sm mt-2 mb-4">
                      Add habits to start tracking your progress.
                    </p>
                    {!todayCompleted && userChallenge?.status !== "completed" && (
                      <Link to={`/my-challenges/${challengeId}/create-habits`}>
                        <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Your First Habit
                        </Button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {paginatedHabits.map((habit) => (
                      <div
                        key={habit.id}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${
                          habit.completedToday
                            ? "bg-green-50 border-green-200"
                            : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`rounded-lg transition-all ${
                              habit.completedToday
                                ? "bg-green-500 text-white hover:bg-green-600"
                                : "border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                            }`}
                            onClick={() => handleMarkComplete(habit.id)}
                            disabled={habit.completedToday || loggingIds.has(habit.id) || userChallenge?.status === "completed"}
                          >
                            {habit.completedToday ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : loggingIds.has(habit.id) ? (
                              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-400" />
                            )}
                          </Button>
                          <div>
                            <h3
                              className={`font-semibold ${
                                habit.completedToday
                                  ? "text-green-700 line-through"
                                  : "text-gray-900"
                              }`}
                            >
                              {habit.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Created{" "}
                              {new Date(habit.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        {habit.completedToday && (
                          <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gray-200">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => goToPage(1)}
                      disabled={currentPage === 1}
                      className="h-8 w-8"
                    >
                      <ChevronsLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="h-8 w-8"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>

                    <span className="px-4 py-1 text-sm font-medium text-gray-700">
                      {startIndex + 1}-{Math.min(endIndex, habits.length)} of{" "}
                      {habits.length}
                    </span>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="h-8 w-8"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => goToPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="h-8 w-8"
                    >
                      <ChevronsRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pie Chart Card */}
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-center">Today's Progress</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                {/* SVG Pie Chart */}
                <div className="relative w-36 h-36">
                  <svg 
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#e5e7eb"
                      strokeWidth="10"
                      fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="url(#progressGradient)"
                      strokeWidth="10"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-500"
                    />
                    {/* Gradient definition */}
                    <defs>
                      <linearGradient
                        id="progressGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {/* Center text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">
                      {completionPercentage}%
                    </span>
                    <span className="text-xs text-gray-500">Complete</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-6 w-full space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-green-700 font-medium">Completed</span>
                    <span className="text-green-700 font-bold">
                      {completedHabits}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Remaining</span>
                    <span className="text-gray-700 font-bold">
                      {totalHabits - completedHabits}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-700 font-medium">Total Habits</span>
                    <span className="text-blue-700 font-bold">{totalHabits}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          </>
          )}
        </div>
      </main>
    </div>
  );
};

export default HabitsChallenge;
