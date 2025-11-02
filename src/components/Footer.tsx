import { Target, Twitter, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">HabitQuest</span>
            </div>
            <p className="text-gray-600">
              Build lasting habits through daily challenges and consistent action.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">Challenges</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
          <p>&copy; 2025 HabitQuest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
