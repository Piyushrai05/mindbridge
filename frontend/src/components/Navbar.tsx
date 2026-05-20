import { Link, useLocation } from "react-router-dom";
import { Heart, Wind, BookOpen, Home } from "lucide-react";

const NAV_ITEMS = [
  { path: "/checkin", label: "Check-in", icon: Home },
  { path: "/journal", label: "Journal", icon: BookOpen },
  { path: "/breathe", label: "Breathe", icon: Wind },
  { path: "/resources", label: "Resources", icon: Heart },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary font-semibold text-lg">
          <span className="text-2xl">🧠</span>
          MindBridge
        </Link>
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm transition-colors ${
                location.pathname === path
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-text-secondary hover:text-primary hover:bg-primary/5"
              }`}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
