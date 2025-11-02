import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-emerald-500 rounded-3xl p-12 md:p-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />

          <div className="relative z-10 text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              Start your transformation today
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Your 100-Day Journey
              <br />
              Starts Today.
            </h2>

            <p className="text-xl md:text-2xl text-blue-50 max-w-2xl mx-auto">
              Track your progress, stay accountable, and transform your habits.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button className="group bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2">
                Join a Challenge
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <p className="text-blue-100 text-sm">
              No credit card required • Free to start • Join 10,000+ users
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
