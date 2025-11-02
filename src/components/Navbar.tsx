import { Target } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-xl">
            <Target className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">HabitQuest</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-600 hover:text-blue-500 transition-colors font-medium">
            Features
          </a>
          <a href="#how-it-works" className="text-gray-600 hover:text-blue-500 transition-colors font-medium">
            How It Works
          </a>
          <a href="#testimonials" className="text-gray-600 hover:text-blue-500 transition-colors font-medium">
            Testimonials
          </a>
          <button className="bg-blue-500 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
