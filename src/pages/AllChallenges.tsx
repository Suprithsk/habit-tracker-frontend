// src/pages/AllChallenges.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trophy, Search, Menu, Filter } from "lucide-react";
import { useAllChallenges, useMyChallenges } from "@/hooks/queries/useChallenge";
import { useJoinChallenge } from "@/hooks/mutations/useChallengeMutations";
import useDebounce from "@/hooks/useDebounce";

const CARD_COLORS = [
  "from-blue-500 to-indigo-500",
  "from-emerald-500 to-teal-500",
  "from-purple-500 to-pink-500",
  "from-orange-500 to-red-500",
  "from-cyan-500 to-blue-500",
  "from-rose-500 to-pink-500",
];

const AllChallenges = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("");

  const debouncedSearch = useDebounce(searchTerm, 400);

  const { data: challenges = [], isLoading, isError } = useAllChallenges(
    { search: debouncedSearch || undefined, sortBy: sortBy || undefined }
  );
  const { data: myChallenges = [] } = useMyChallenges();
  const joinChallenge = useJoinChallenge();
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());

  const enrolledIds = new Set(myChallenges.map((uc) => uc.challenge.id));
  const enrollmentIdMap = new Map(myChallenges.map((uc) => [uc.challenge.id, uc.id]));
  const handleJoin = (challengeId: string) => {
    if (pendingIds.has(challengeId) || enrolledIds.has(challengeId)) return;
    setPendingIds((prev) => new Set(prev).add(challengeId));
    joinChallenge.mutate(
      { challengeId },
      {
        onSettled: () => {
          setPendingIds((prev) => {
            const next = new Set(prev);
            next.delete(challengeId);
            return next;
          });
        },
      }
    );
  };

  const filteredChallenges = challenges;

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
          <h1 className="text-xl font-bold text-gray-900">All Challenges</h1>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:block mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              All Challenges
            </h1>
            <p className="text-gray-600">
              Explore and join challenges to build better habits
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="search by title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 border-gray-200"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto pl-10 pr-10 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
              >
                <option value="">Sort By</option>
                <option value="titleAsc">Title</option>
                <option value="durationAsc">Days</option>
              </select>
            </div>
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
          ) : filteredChallenges.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {filteredChallenges.map((challenge, index) => (
                <Card
                  key={challenge.id}
                  className="h-full border-2 border-gray-200 hover:shadow-xl transition-all duration-200 overflow-hidden rounded-lg flex flex-col"
                >
                  <CardContent className="p-0 flex flex-col flex-1">
                    {/* Top Section */}
                    <div
                      className={`w-full bg-gradient-to-br ${CARD_COLORS[index % CARD_COLORS.length]} p-10 flex items-center justify-center`}
                    >
                      <Trophy className="w-20 h-20 text-white" />
                    </div>

                    {/* Middle Section */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <h3 className="font-bold text-xl text-gray-900 leading-tight">
                          {challenge.title}
                        </h3>
                        <div
                          className={`bg-gradient-to-br ${CARD_COLORS[index % CARD_COLORS.length]} rounded-full px-2.5 py-1 flex items-center justify-center`}
                        >
                          <span className="text-[10px] font-semibold text-white whitespace-nowrap leading-none">
                            {challenge.durationDays} days
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-6 leading-relaxed flex-1">
                        {challenge.description}
                      </p>

                      {enrolledIds.has(challenge.id) ? (
                        <Link
                          to={`/my-challenges/${enrollmentIdMap.get(challenge.id)}`}
                          className="mt-auto"
                        >
                          <Button className="w-full bg-emerald-500 hover:bg-emerald-600 hover:shadow-lg text-white font-semibold py-6 transition-all duration-200">
                            View Challenge
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          onClick={() => handleJoin(challenge.id)}
                          disabled={pendingIds.has(challenge.id)}
                          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 hover:shadow-lg text-white font-semibold py-6 transition-all duration-200 mt-auto"
                        >
                          {pendingIds.has(challenge.id) ? "Joining..." : "Join Challenge"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                <Trophy className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-gray-300" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">
                No challenges found
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6 text-center max-w-md px-4">
                {searchTerm || sortBy
                  ? "Try adjusting your search or filters"
                  : "There are no challenges available at the moment"}
              </p>
              {(searchTerm || sortBy) && (
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSortBy("");
                  }}
                  variant="outline"
                  className="border-2 border-blue-500 text-blue-500 hover:bg-blue-50"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AllChallenges;
