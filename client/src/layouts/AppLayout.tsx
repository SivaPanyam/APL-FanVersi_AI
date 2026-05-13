import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Trophy, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Activity,
  Menu,
  X,
  BrainCircuit
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ChatPanel } from "@/components/chat/ChatPanel";

export function AppLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Activity, label: "Match Details", path: "/match/123" },
    { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
    { icon: MessageSquare, label: "Fan Chat", path: "/chat" },
  ];

  return (
    <div className="flex h-screen bg-ink-950 text-ink-100 overflow-hidden font-sans">
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-ink-900 border border-white/10 lg:hidden"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-ink-900/50 backdrop-blur-xl border-r border-white/5 transition-transform duration-300 lg:relative lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-3 mb-12 px-2">
            <div className="h-10 w-10 rounded-xl bg-verse-600 flex items-center justify-center shadow-neon">
              <Activity className="text-white" size={24} />
            </div>
            <span className="font-display text-xl font-black text-white tracking-tighter italic uppercase">
              Fan<span className="text-verse-500">Verse</span>
            </span>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all
                  ${isActive 
                    ? "bg-verse-600/10 text-verse-400 border border-verse-500/20" 
                    : "text-ink-500 hover:bg-white/5 hover:text-white border border-transparent"}
                `}
              >
                <item.icon size={18} />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5 space-y-2">
            <button 
              onClick={() => setIsAiPanelOpen(!isAiPanelOpen)}
              className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                isAiPanelOpen ? "bg-energy-neon/10 text-energy-neon border border-energy-neon/20" : "text-ink-500 hover:bg-white/5 hover:text-white"
              }`}
            >
              <BrainCircuit size={18} />
              AI Assistant
            </button>
            <button className="flex w-full items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-ink-500 hover:bg-white/5 hover:text-white">
              <Settings size={18} />
              Settings
            </button>
            <button 
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-red-500/70 hover:bg-red-500/10 hover:text-red-500 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative scrollbar-thin scrollbar-thumb-white/5">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>

      {/* AI Side Panel */}
      <aside className={`
        fixed inset-y-0 right-0 z-40 w-80 lg:w-96 transition-transform duration-300 transform
        ${isAiPanelOpen ? "translate-x-0" : "translate-x-full"}
      `}>
        <ChatPanel onClose={() => setIsAiPanelOpen(false)} />
      </aside>
    </div>
  );
}
