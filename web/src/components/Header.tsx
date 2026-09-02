import React from 'react';
import { Newspaper, Landmark, ShieldCheck, FileText, Search, Lock, Bell, Calendar, Sparkles } from 'lucide-react';

export type NavTab = 'feed' | 'digest' | 'faac' | 'promises' | 'foi' | 'ai' | 'admin' | 'privacy' | 'takedown';


interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenPreferences?: () => void;
  pendingApprovalsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenPreferences,
  pendingApprovalsCount = 2
}) => {
  return (
    <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('feed')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center font-black text-xl text-black shadow-lg shadow-emerald-500/20">
              W
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-white">WSFU</span>
                <span className="text-xs bg-emerald-950 text-emerald-400 font-semibold px-2 py-0.5 rounded-full border border-emerald-800/60">
                  NIGERIA
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 tracking-wide font-medium hidden sm:block">
                Who Swear For Us • Citizen Accountability & News
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex items-center relative w-56">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3" />
            <input
              type="text"
              placeholder="Search corruption, FAAC, states..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Navigation & Preferences */}
          <div className="flex items-center space-x-2">
            <nav className="flex items-center space-x-1 sm:space-x-1.5">
              <button
                onClick={() => setActiveTab('feed')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'feed'
                    ? 'bg-emerald-500 text-black shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                <Newspaper className="w-3.5 h-3.5" />
                <span>Wire</span>
              </button>

              <button
                onClick={() => setActiveTab('digest')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'digest'
                    ? 'bg-emerald-500 text-black shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Daily Digest</span>
              </button>

              <button
                onClick={() => setActiveTab('faac')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'faac'
                    ? 'bg-emerald-500 text-black shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>FAAC</span>
              </button>

              <button
                onClick={() => setActiveTab('promises')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'promises'
                    ? 'bg-emerald-500 text-black shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Promises</span>
              </button>

              <button
                onClick={() => setActiveTab('foi')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'foi'
                    ? 'bg-emerald-500 text-black shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>FOI</span>
              </button>

              <button
                onClick={() => setActiveTab('ai')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'ai'
                    ? 'bg-emerald-500 text-black shadow-sm'
                    : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 border border-emerald-800/40'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>AI Assistant</span>
              </button>
            </nav>



            {/* Topics Preference Button */}
            {onOpenPreferences && (
              <button
                onClick={onOpenPreferences}
                className="p-1.5 bg-zinc-900 hover:bg-zinc-800 text-emerald-400 rounded-lg border border-zinc-800 transition-colors cursor-pointer"
                title="Personalize Followed Topics & State"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            )}

            {/* Urgent Admin Approval Alert Bell */}
            {pendingApprovalsCount > 0 && (
              <button
                onClick={() => setActiveTab('admin')}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-500/30 rounded-lg text-xs font-extrabold transition-all cursor-pointer shadow-sm animate-pulse"
                title={`${pendingApprovalsCount} news summaries waiting for your immediate editorial review!`}
              >
                <Bell className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{pendingApprovalsCount} Pending</span>
                <span className="sm:hidden">{pendingApprovalsCount}</span>
              </button>
            )}

            {/* Admin Lock Button */}
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center space-x-1 px-2 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
              }`}
              title="Admin Staff Portal"
            >
              <Lock className="w-3.5 h-3.5 text-rose-400" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

