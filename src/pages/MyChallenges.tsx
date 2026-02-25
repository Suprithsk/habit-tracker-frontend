// src/pages/MyChallenges.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Menu, Trophy, Calendar, Flame, Minus } from "lucide-react";
import { useMyChallenges } from "@/hooks/queries/useChallenge";
import { useLeaveChallenge } from "@/hooks/mutations/useChallengeMutations";

const CARD_COLORS = [
  "from-blue-500 to-indigo-500",
  "from-emerald-500 to-teal-500",
  "from-purple-500 to-pink-500",
  "from-orange-500 to-red-500",
  "from-cyan-500 to-blue-500",
  "from-rose-500 to-pink-500",
];

const MyChallenges = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [leavingIds, setLeavingIds] = useState<Set<string>>(new Set());

  const { data: myChallenges = [], isLoading, isError } = useMyChallenges();
  const leaveChallenge = useLeaveChallenge();

  const handleLeave = (challengeId: string) => {
    if (leavingIds.has(challengeId)) return;
    setLeavingIds((prev) => new Set(prev).add(challengeId));
    leaveChallenge.mutate(challengeId, {
      onSettled: () => {
        setLeavingIds((prev) => {
          const next = new Set(prev);
          next.delete(challengeId);
          return next;
        });
      },
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const getProgressPercentage = (completedDays: number, totalDays: number) => {
    return Math.round((completedDays / totalDays) * 100);
  };

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
          <h1 className="text-xl font-bold text-gray-900">My Challenges</h1>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:block mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Challenges</h1>
            <p className="text-gray-600">Track your active challenges and progress</p>
          </div>

          {/* Challenges Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-red-500 font-semibold">Failed to load challenges. Please try again.</p>
            </div>
          ) : myChallenges.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {myChallenges.map((userChallenge, index) => {
                const color = CARD_COLORS[index % CARD_COLORS.length];
                const progressPercentage = getProgressPercentage(
                  userChallenge.progress.completedDays,
                  userChallenge.challenge.durationDays
                );

                return (
                  <Card
                    key={userChallenge.id}
                    className="border-2 border-gray-200 hover:shadow-xl transition-all duration-200 overflow-hidden"
                  >
                    <CardContent className="p-0 flex flex-col">
                      {/* Top Section - Gradient Background with Trophy */}
                      <div className={`w-full bg-gradient-to-br ${color} p-10 flex items-center justify-center relative`}>
                        <Trophy className="w-20 h-20 text-white" />

                        {/* Lives Badge - Top Right */}
                        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Heart
                              key={i}
                              className={`w-3 h-3 ${
                                i < userChallenge.livesRemaining
                                  ? "text-white fill-white"
                                  : "text-white/30 fill-white/30"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Middle Section - Content */}
                      <div className="p-6 flex flex-col flex-1">
                        {/* Title and Days Pill */}
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <h3 className="font-bold text-xl text-gray-900 leading-tight">
                            {userChallenge.challenge.title}
                          </h3>
                          <div className={`bg-gradient-to-br ${color} rounded-full px-2.5 py-1 flex-shrink-0 flex items-center justify-center`}>
                            <span className="text-[10px] font-semibold text-white whitespace-nowrap leading-none">
                              {userChallenge.challenge.durationDays} days
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                            <span>Day {userChallenge.progress.completedDays}/{userChallenge.challenge.durationDays}</span>
                            <span className="font-bold">{progressPercentage}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${color} transition-all duration-300`}
                              style={{ width: `${progressPercentage}%` }}
                            />
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed flex-1">
                          {userChallenge.challenge.description}
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                              <Flame className="w-4 h-4 text-orange-500" />
                            </div>
                            <p className="text-xs text-gray-500">Streak</p>
                            <p className="text-sm font-bold text-gray-900">{userChallenge.progress.currentStreak}</p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                              <Minus className="w-4 h-4 text-red-500" />
                            </div>
                            <p className="text-xs text-gray-500">Missed</p>
                            <p className="text-sm font-bold text-gray-900">{userChallenge.missedDays}</p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                              <Calendar className="w-4 h-4 text-purple-500" />
                            </div>
                            <p className="text-xs text-gray-500">Started</p>
                            <p className="text-sm font-bold text-gray-900">{formatDate(userChallenge.startDate)}</p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-3 mt-auto">
                          <Button
                            variant="outline"
                            onClick={() => handleLeave(userChallenge.challenge.id)}
                            disabled={leavingIds.has(userChallenge.challenge.id)}
                            className="w-full border-gray-300 text-gray-800 hover:bg-gray-100 font-semibold py-6 transition-all duration-200"
                          >
                            {leavingIds.has(userChallenge.challenge.id) ? "Leaving..." : "Leave"}
                          </Button>
                          <Link to={`/my-challenges/${userChallenge.id}`} className="w-full">
                            <Button className={`w-full bg-gradient-to-r ${color} hover:opacity-90 text-white font-semibold py-6 transition-all duration-200`}>
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                <Trophy className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">No Active Challenges</h3>
              <p className="text-gray-600 mb-6 text-center max-w-md">
                You haven't joined any challenges yet. Start your journey today!
              </p>
              <Link to="/all-challenges">
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold px-8 py-6">
                  Explore Challenges
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyChallenges;