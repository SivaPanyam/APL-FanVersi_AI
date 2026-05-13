import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Trophy, 
  MessageSquare, 
  Cpu, 
  Gamepad2, 
  Settings 
} from "lucide-react";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Live Match', href: '/match/live', icon: Gamepad2 },
  { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  { name: 'Fan Chat', href: '/chat', icon: MessageSquare },
  { name: 'AI Assistant', href: '/ai-assistant', icon: Cpu },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-16 hidden h-[calc(100vh-4rem)] w-64 flex-col border-r border-white/10 bg-ink-950/50 backdrop-blur-xl lg:flex">
      <div className="flex flex-1 flex-col overflow-y-auto p-4">
        <nav className="space-y-1" aria-label="Sidebar Navigation">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verse-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 ${
                  isActive 
                    ? 'bg-verse-600/20 text-energy-neon neon-border' 
                    : 'text-ink-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon aria-hidden="true" className={`h-5 w-5 ${isActive ? 'text-energy-neon' : 'group-hover:text-white'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-4 pt-4">
          <div className="rounded-2xl glass-card p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-500">Active Match</h4>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-white">Lakers vs Warriors</span>
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            </div>
            <p className="text-[10px] text-ink-400 mt-1">4th Quarter • 02:45</p>
          </div>

          <Link
            to="/settings"
            className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-ink-400 hover:bg-white/5 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verse-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
          >
            <Settings aria-hidden="true" className="h-5 w-5" />
            Settings
          </Link>
        </div>
      </div>
    </aside>
  );
}
