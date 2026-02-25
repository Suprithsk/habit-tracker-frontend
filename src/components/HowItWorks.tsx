import { Calendar, CheckSquare, Trophy } from 'lucide-react';

const steps = [
  {
    icon: Calendar,
    title: 'Choose a Challenge',
    description: 'Pick from 30, 60, or 100-day challenges tailored to your goals.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: CheckSquare,
    title: 'Complete Daily Habits',
    description: 'Log your progress daily with simple check-ins and track your consistency.',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Trophy,
    title: 'Earn Streaks',
    description: 'Unlock achievements and build momentum as you hit milestones.',
    color: 'from-yellow-500 to-yellow-600',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started in three simple steps and transform your habits forever.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="group relative bg-gray-50 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="absolute -top-4 -right-4 bg-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-2xl text-gray-300 shadow-lg">
                {idx + 1}
              </div>

              <div className={`bg-gradient-to-br ${step.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <step.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
