import { ArrowRight, Flame, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
              <Flame className="w-4 h-4" />
              Start building better habits today
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Build Habits.
              <br />
              <span className="bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
                Conquer Challenges.
              </span>
              <br />
              Stay Consistent.
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              Join 100-day challenges that keep you accountable and motivated. Transform your life, one day at a time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="group bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2">
                Start Your Challenge
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/register" className="bg-white text-gray-700 px-8 py-4 rounded-full font-bold text-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex items-center justify-center">
                View Challenges
              </Link>
            </div>
          </div>

          <div className="relative animate-slide-up">
            <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-emerald-500 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Your Progress</h3>
                  <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-bold">
                    <Flame className="w-5 h-5" />
                    28 day streak
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { habit: 'Morning Meditation', completed: 28, total: 100 },
                    { habit: 'Read 30 Pages', completed: 28, total: 100 },
                    { habit: 'Exercise', completed: 28, total: 100 },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          <span className="font-semibold text-gray-900">{item.habit}</span>
                        </div>
                        <span className="text-sm font-bold text-blue-500">{item.completed}/{item.total}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${(item.completed / item.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 p-3 rounded-xl">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Today's Goal</p>
                  <p className="text-lg font-bold text-gray-900">3/3 Complete</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
