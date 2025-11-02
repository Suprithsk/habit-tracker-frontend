import { CheckCircle2, Flame, Users, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: CheckCircle2,
    title: 'Daily Habit Tracking',
    description: 'Log progress easily with one tap. Simple, intuitive, and designed for consistency.',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    icon: Flame,
    title: 'Smart Streaks',
    description: 'Automatically track your consistency and never lose momentum with intelligent reminders.',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Users,
    title: 'Community Challenges',
    description: 'Compete with others and stay inspired. Join groups and share your journey.',
    gradient: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: TrendingUp,
    title: 'Detailed Analytics',
    description: 'See your growth over time with beautiful charts and insights that keep you motivated.',
    gradient: 'from-purple-500 to-pink-500',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Everything You Need to
            <span className="bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent"> Succeed</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to help you build lasting habits and achieve your goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`bg-gradient-to-br ${feature.gradient} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
