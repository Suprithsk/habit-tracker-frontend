import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowRight, CheckCircle2, Menu } from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  //TODO: Fetch real data from API and show real progress
  // Mock data - replace with API calls
  const joinedChallenges = [
    {
      id: 1,
      title: "75 Hard Challenge",
      progress: 28,
      total: 75,
      color: "from-blue-500 to-indigo-500",
    },
    {
      id: 2,
      title: "30 Day Fitness",
      progress: 15,
      total: 30,
      color: "from-emerald-500 to-teal-500",
    },
    {
      id: 3,
      title: "100 Day Reading",
      progress: 42,
      total: 100,
      color: "from-purple-500 to-pink-500",
    },
  ];

  const recentHabits = [
    { name: "Morning Run", completed: true },
    { name: "Read 10 Pages", completed: true },
    { name: "Drink Water", completed: true },
    { name: "Meditation", completed: false },
    { name: "Journal", completed: false },
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
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:block mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Track your progress and stay consistent</p>
          </div>

          {/* Challenges Joined Section */}
          <Card className="mb-6 lg:mb-8 border-2 border-gray-200">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <CardTitle className="text-xl sm:text-2xl">Challenges Joined</CardTitle>
                <CardDescription className="text-gray-500 mt-1">
                  Your active challenges
                </CardDescription>
              </div>
              <Link to="/my-challenges" className="w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto border-blue-500 text-blue-500 hover:bg-blue-50"
                >
                  View My Challenges
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {joinedChallenges.map((challenge) => (
                  <Card 
                    key={challenge.id}
                    className="border-2 border-gray-200 hover:shadow-lg transition-shadow duration-200"
                  >
                    <CardContent className="p-4 lg:p-6">
                      <div className={`w-full h-24 sm:h-32 rounded-xl bg-gradient-to-br ${challenge.color} mb-4 flex items-center justify-center`}>
                        <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                      </div>
                      <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-2 line-clamp-1">
                        {challenge.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span className="font-semibold">{challenge.progress}/{challenge.total} days</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${challenge.color} transition-all duration-300`}
                          style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Recent Habits Card */}
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">List of habits</CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  Track your daily habits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 sm:space-y-3">
                  {recentHabits.map((habit, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-2 sm:p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <CheckCircle2 
                          className={`w-5 h-5 flex-shrink-0 ${
                            habit.completed ? "text-emerald-500" : "text-gray-300"
                          }`}
                        />
                        <span className={`font-medium text-sm sm:text-base truncate ${
                          habit.completed ? "text-gray-900" : "text-gray-500"
                        }`}>
                          {habit.name}
                        </span>
                      </div>
                      {habit.completed && (
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-semibold flex-shrink-0 ml-2">
                          Done
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Explore Challenges Card */}
            <Card className="border-2 border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="flex flex-col items-center justify-center h-full p-6 sm:p-8 text-center min-h-[300px]">
                <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500 mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Explore wide ranges of challenges
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-6">
                  Join community challenges and stay motivated
                </p>
                <Link to="/challenges" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold shadow-lg">
                    View All Challenges
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;