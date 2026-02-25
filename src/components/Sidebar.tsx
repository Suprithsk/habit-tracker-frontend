import { Link, useLocation } from "react-router-dom";
import { Target, LayoutDashboard, Trophy, List, User, LogOut, X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/useAuth";


interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen = true, onClose }: SidebarProps) => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "All Challenges",
      path: "/all-challenges",
      icon: Trophy,
    },
    {
      label: "My Challenges",
      path: "/my-challenges",
      icon: List,
    },
    {
      label: "My Habits",
      path: "/my-habits",
      icon: BookOpen,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleNavigation = () => {
    if (onClose && window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white flex flex-col border-r border-gray-800 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Logo */}
        <Link to="/dashboard" className="p-6 border-b border-gray-800" onClick={handleNavigation}>
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-xl">
              <Target className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">HabitQuest</span>
          </div>
        </Link>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleNavigation}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-blue-500 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-800 space-y-2">
        
          <Link
            to="/profile"
            onClick={handleNavigation}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-200"
          >
            <User className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">My Profile</span>
          </Link>
          <Button
            onClick={logout}
            variant="ghost"
            className="w-full justify-start gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">Logout</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;