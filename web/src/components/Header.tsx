import React from 'react';
import { Newspaper, Landmark, ShieldCheck, FileText, Search, Lock, Bell, Calendar, Compass, SlidersHorizontal } from 'lucide-react';

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
  pendingApprovalsCount = 0
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#090a0d]/95 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('feed')}>
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center font-black text-lg text-black shadow-md shadow-emerald-500/20">
              W
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight text-white">WSFU</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-800/60 uppercase">
                  Nigeria
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 tracking-wide font-medium hidden sm:block">
                Who Swear For Us • Citizen Accountability & Records
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex items-center relative w-60">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3" />
            <input
              type="text"
              placeholder="Search contracts, FAAC, states..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#11131a] border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Navigation & Actions */}
          <div className="flex items-center space-x-2">
            <nav className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto">
              <button
                onClick={() => setActiveTab('feed')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'feed'
                    ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700'
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
                    ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Daily</span>
                <span>Digest</span>
              </button>

              <button
                onClick={() => setActiveTab('faac')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'faac'
                    ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700'
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
                    ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700'
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
                    ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700'
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
                <Compass className="w-3.5 h-3.5" />
                <span>Research Desk</span>
              </button>
            </nav>

            {/* Topics Preference Button */}
            {onOpenPreferences && (
              <button
                onClick={onOpenPreferences}
                className="p-2 bg-[#11131a] hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-lg border border-zinc-800 transition-colors cursor-pointer"
                title="Customize Followed States & Topics"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            )}

            {/* Admin Approval Badge */}
            {pendingApprovalsCount > 0 && (
              <button
                onClick={() => setActiveTab('admin')}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-500/30 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm"
                title={`${pendingApprovalsCount} news summaries waiting for editorial review`}
              >
                <Bell className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{pendingApprovalsCount} Pending</span>
                <span className="sm:hidden">{pendingApprovalsCount}</span>
              </button>
            )}

            {/* Admin Portal Lock */}
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center space-x-1 p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
              }`}
              title="Editorial Admin Staff"
            >
              <Lock className="w-3.5 h-3.5 text-zinc-400" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
