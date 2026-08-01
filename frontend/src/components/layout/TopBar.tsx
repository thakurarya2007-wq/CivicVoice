import {
  Bell,
  LayoutDashboard,
  MapPinned,
  BarChart3,
  UserCircle2,
} from "lucide-react";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl text-white shadow-md">
            🏛
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">
              CivicVoice AI
            </h1>

            <p className="text-xs text-slate-500">
              AI Powered Civic Platform
            </p>
          </div>
        </div>

        {/* Navigation */}

        <nav className="hidden items-center gap-8 md:flex">

          <button className="flex items-center gap-2 font-medium text-blue-600 transition hover:text-blue-700">
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button className="flex items-center gap-2 font-medium text-slate-600 transition hover:text-blue-600">
            <BarChart3 size={18} />
            Analytics
          </button>

          <button className="flex items-center gap-2 font-medium text-slate-600 transition hover:text-blue-600">
            <MapPinned size={18} />
            Complaints
          </button>

        </nav>

        {/* Right Side */}

        <div className="flex items-center gap-5">

          <button className="text-slate-600 transition hover:text-blue-600">
            <Bell size={22} />
          </button>

          <button className="text-blue-600 transition hover:scale-105">
            <UserCircle2 size={34} />
          </button>

        </div>

      </div>
    </header>
  );
}