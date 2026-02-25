import { Target, Twitter, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-xl">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">HabitQuest</span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/suprithmay31"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors"
              aria-label="Twitter / X"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/Suprithsk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/suprithsk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-700 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
          Built with ❤️ by{' '}
          <a
            href="https://www.linkedin.com/in/suprithsk/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gray-700 hover:text-blue-600 transition-colors"
          >
            Suprith S K
          </a>
        </div>
      </div>
    </footer>
  );
}
