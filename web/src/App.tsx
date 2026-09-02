import React, { useState, useEffect } from 'react';
import { Header, NavTab } from './components/Header';
import { NewsCard } from './components/NewsCard';
import { FAACExplorer } from './components/FAACExplorer';
import { PromiseTracker } from './components/PromiseTracker';
import { FOIGenerator } from './components/FOIGenerator';
import { AdminPortal } from './components/AdminPortal';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TakedownPortal } from './components/TakedownPortal';
import { DailyDigestView } from './components/DailyDigestView';
import { UserPreferencesModal, UserPreferences, DEFAULT_PREFERENCES } from './components/UserPreferencesModal';
import { WhatsAppBotSimulator } from './components/WhatsAppBotSimulator';
import { Article } from './types';
import { fetchNewsFeed } from './lib/api';

import { Flame, RefreshCw, WifiOff, Shield, Sparkles, SlidersHorizontal } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [feedMode, setFeedMode] = useState<'all' | 'personalized'>('all');
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [pendingCount, setPendingCount] = useState(2);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  // User preferences
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem('wsfu_user_preferences');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_PREFERENCES;
  });

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadFeed = async (source?: string, q?: string) => {
    setLoading(true);
    const slug = source && source !== 'all' ? source : undefined;
    const res = await fetchNewsFeed(30, 0, slug, q);
    setArticles(res.items);
    setLoading(false);
  };

  useEffect(() => {
    if (activeTab === 'feed' || activeTab === 'digest') {
      loadFeed(selectedSource, searchQuery);
    }
  }, [activeTab, selectedSource, searchQuery]);

  const handleArticleApproved = (approvedItem: any) => {
    const newLiveArticle: Article = {
      id: approvedItem.id || `live-${Date.now()}`,
      title: approvedItem.title,
      url: 'https://premiumtimesng.com',
      author: 'WSFU Verified Wire',
      category: approvedItem.category || 'Breaking News',
      is_breaking: true,
      published_at: new Date().toISOString(),
      image_url: approvedItem.image_url || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
      sources: { name: approvedItem.source || 'Premium Times', slug: 'premium-times', reliability_tier: 'tier_1' },
      article_summaries: {
        id: `sum-${Date.now()}`,
        tldr_bullets: Array.isArray(approvedItem.tldr) ? approvedItem.tldr : [approvedItem.tldr],
        civic_impact: approvedItem.impact,
        actors_entities: ['EFCC', 'Judiciary', 'Public Treasury'],
        figures_mentioned: approvedItem.figures || [{ amount: '₦19.4 Billion', currency: 'NGN' }],
        corroboration_sources: ['The Cable', 'Punch'],
        confidence_score: approvedItem.confidence || 0.95,
        status: 'published'
      }
    };

    // Prepend to top of live feed
    setArticles(prev => [newLiveArticle, ...prev]);
    setPendingCount(prev => Math.max(0, prev - 1));
  };

  // Filter articles based on personalized topics if active
  const displayedArticles = feedMode === 'personalized' && preferences.followedCategories.length > 0
    ? articles.filter(art => {
        const cat = art.category || 'National';
        return preferences.followedCategories.some(fc => 
          cat.toLowerCase().includes(fc.toLowerCase()) || fc.toLowerCase().includes(cat.toLowerCase())
        );
      })
    : articles;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      {/* Offline Status Banner */}
      {isOffline && (
        <div className="bg-amber-600 text-black px-4 py-2 text-center text-xs font-extrabold flex items-center justify-center space-x-2 shadow-md">
          <WifiOff className="w-4 h-4" />
          <span>You are currently offline — Showing verified briefs from local device cache.</span>
        </div>
      )}

      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenPreferences={() => setIsPreferencesOpen(true)}
        pendingApprovalsCount={pendingCount}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab 1: Live News Feed */}
        {activeTab === 'feed' && (
          <div className="space-y-6">
            {/* Header & Mode Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/70 p-4 rounded-xl border border-zinc-800">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-extrabold text-xs text-white uppercase tracking-wider flex items-center gap-1">
                    <Flame className="w-4 h-4 text-emerald-400" />
                    Verified News Wire
                  </span>
                </div>

                {/* Feed Mode Toggle: All vs Personalized */}
                <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-lg p-0.5 text-xs">
                  <button
                    onClick={() => setFeedMode('all')}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                      feedMode === 'all'
                        ? 'bg-zinc-800 text-white shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    All Wire
                  </button>
                  <button
                    onClick={() => setFeedMode('personalized')}
                    className={`px-2.5 py-1 rounded-md font-bold flex items-center space-x-1 transition-all cursor-pointer ${
                      feedMode === 'personalized'
                        ? 'bg-emerald-500 text-black shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>My Topics</span>
                  </button>
                </div>
              </div>

              {/* Source Filters */}
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
                {[
                  { name: 'All Sources', slug: 'all' },
                  { name: 'Premium Times', slug: 'premium-times' },
                  { name: 'The Cable', slug: 'the-cable' },
                  { name: 'Punch', slug: 'punch-newspapers' },
                  { name: 'Sahara Reporters', slug: 'sahara-reporters' },
                  { name: 'BusinessDay', slug: 'businessday' }
                ].map((s) => (
                  <button
                    key={s.slug}
                    onClick={() => setSelectedSource(s.slug)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedSource === s.slug
                        ? 'bg-emerald-500 text-black shadow-sm'
                        : 'bg-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}

                <button
                  onClick={() => setIsPreferencesOpen(true)}
                  title="Configure Followed Topics"
                  className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-emerald-400 rounded-lg transition-colors ml-1 cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => loadFeed(selectedSource, searchQuery)}
                  title="Refresh Feed"
                  className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors ml-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Articles List */}
            {loading ? (
              <div className="p-16 text-center text-zinc-500 font-medium animate-pulse">
                Fetching corroborated news wire & AI citizen briefs...
              </div>
            ) : displayedArticles.length === 0 ? (
              <div className="p-16 text-center text-zinc-500 bg-zinc-900/40 rounded-xl border border-zinc-800/60 space-y-3">
                <p>No matching articles found for your current filters.</p>
                {feedMode === 'personalized' && (
                  <button
                    onClick={() => setIsPreferencesOpen(true)}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Customize Followed Topics
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {displayedArticles.map((art) => (
                  <NewsCard key={art.id} article={art} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Daily Digest (What Happened in Nigeria Today) */}
        {activeTab === 'digest' && <DailyDigestView articles={articles} />}

        {/* Tab 3: FAAC Government Spending Tracker */}
        {activeTab === 'faac' && <FAACExplorer />}

        {/* Tab 4: Governance Promise Meter */}
        {activeTab === 'promises' && <PromiseTracker />}

        {/* Tab 5: Freedom of Information (FOI) Builder */}
        {activeTab === 'foi' && <FOIGenerator />}

        {/* Tab 6: Admin Workspace (MFA Protected) */}
        {activeTab === 'admin' && <AdminPortal onArticleApproved={handleArticleApproved} />}

        {/* Tab 7: NDPR Privacy Policy */}
        {activeTab === 'privacy' && <PrivacyPolicy />}

        {/* Tab 8: Publisher Takedown Portal */}
        {activeTab === 'takedown' && <TakedownPortal />}
      </main>

      {/* User Preferences Modal */}
      <UserPreferencesModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
        onSave={(newPrefs) => setPreferences(newPrefs)}
        initialPreferences={preferences}
      />

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-8 mt-12 text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            <p className="font-bold text-zinc-300">WSFU (Who Swear For Us) 🇳🇬 — Citizen Accountability Engine</p>
            <p className="text-[11px] text-zinc-500">
              Aggregated under Nigerian Copyright Fair Use & Freedom of Information Act 2011.
            </p>
          </div>

          <div className="flex items-center space-x-4 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('privacy')}
              className="text-zinc-400 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              NDPR Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('takedown')}
              className="text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
            >
              Publisher Takedowns / Disputes
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('admin')}
              className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer flex items-center space-x-1"
            >
              <Shield className="w-3 h-3" />
              <span>Staff Login</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Interactive WhatsApp Civic Bot Simulator */}
      <WhatsAppBotSimulator />
    </div>
  );
};


