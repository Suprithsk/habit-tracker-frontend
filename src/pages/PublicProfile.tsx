import { useParams, Link } from "react-router-dom";
import {
  Trophy,
  Flame,
  CheckCircle2,
  Calendar,
  Target,
  BookOpen,
  Loader2,
  Heart,
  Star,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUserPublicProfile } from "@/hooks/queries/useAuth";

const StatCard = ({
  icon: Icon,
  label,
  value,
  color = "text-blue-600",
  bg = "bg-blue-100",
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color?: string;
  bg?: string;
}) => (
  <Card className="border-2 border-gray-200">
    <CardContent className="p-4 flex items-center gap-3">
      <div className={`p-2 ${bg} rounded-lg flex-shrink-0`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-gray-400 truncate">{label}</p>
        <p className="text-lg font-bold text-gray-900 truncate">{value}</p>
      </div>
    </CardContent>
  </Card>
);

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const PublicProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data, isLoading, isError, refetch } = useUserPublicProfile(userId ?? "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-500">Loading profile…</p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-700 font-semibold text-lg mb-2">Profile not found</p>
          <p className="text-gray-400 text-sm mb-6">This profile may not exist or is unavailable.</p>
          <Button variant="outline" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const { user, challengeStats, activeChallenges, completedChallenges, personalHabits } = data;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-1.5 rounded-lg">
              <Target className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">HabitQuest</span>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Hero */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-8 flex flex-col sm:flex-row items-center sm:items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center flex-shrink-0 shadow-lg">
            <span className="text-3xl font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{user.name}</h1>
            <p className="text-blue-100 text-sm flex items-center justify-center sm:justify-start gap-1.5 mt-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Member since {formatDate(user.memberSince)}
            </p>
          </div>
        </div>

        {/* Challenge Stats Grid */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Challenge Stats</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            <StatCard icon={Trophy}        label="Completed"        value={challengeStats.completed}                  color="text-yellow-600" bg="bg-yellow-100" />
            <StatCard icon={Flame}         label="Best Streak"      value={`${challengeStats.bestStreak}d`}           color="text-orange-600" bg="bg-orange-100" />
            <StatCard icon={CheckCircle2}  label="Completion Rate"  value={`${challengeStats.completionRate}%`}       color="text-green-600"  bg="bg-green-100"  />
            <StatCard icon={Star}          label="Days Completed"   value={challengeStats.totalCompletedDays}         color="text-blue-600"   bg="bg-blue-100"   />
            <StatCard icon={Target}        label="Total Enrolled"   value={challengeStats.totalEnrollments}           color="text-indigo-600" bg="bg-indigo-100" />
            <StatCard icon={CheckCircle2}  label="Active Now"       value={challengeStats.active}                     color="text-teal-600"   bg="bg-teal-100"   />
            <StatCard icon={BookOpen}      label="Habit Logs"       value={personalHabits.totalLogs}                  color="text-purple-600" bg="bg-purple-100" />
            <StatCard icon={BookOpen}      label="Active Habits"    value={personalHabits.activeCount}                color="text-pink-600"   bg="bg-pink-100"   />
          </div>
        </div>

        {/* Active Challenges */}
        {activeChallenges.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Active Challenges</h2>
            <div className="space-y-3">
              {activeChallenges.map((ch, i) => {
                const pct = Math.round((ch.completedDays / ch.durationDays) * 100);
                return (
                  <Card key={i} className="border-2 border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{ch.challengeTitle}</h3>
                          <p className="text-xs text-gray-400 mt-0.5">
                            Started {formatDate(ch.startDate)}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0 text-sm">
                          <span className="flex items-center gap-1 text-orange-500 font-semibold">
                            <Flame className="w-4 h-4" />
                            {ch.currentStreak}d
                          </span>
                          <span className="flex items-center gap-1 text-red-400 font-semibold">
                            <Heart className="w-4 h-4" />
                            {ch.livesRemaining}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                        <span>Progress</span>
                        <span className="font-semibold">
                          {ch.completedDays}/{ch.durationDays} days ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Completed Challenges */}
        {completedChallenges.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Completed Challenges</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {completedChallenges.map((ch, i) => (
                <Card key={i} className="border-2 border-green-200 bg-green-50">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{ch.challengeTitle}</p>
                      <p className="text-xs text-gray-500">
                        {ch.completedDays}/{ch.durationDays} days · Finished{" "}
                        {formatDate(ch.completedOn)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-gray-300 pb-4">
          Powered by HabitQuest
        </p>
      </div>
    </div>
  );
};

export default PublicProfile;
