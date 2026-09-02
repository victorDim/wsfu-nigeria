import React, { useState, useEffect } from 'react';
import { Shield, Power, CheckCircle, Lock, Bell, Send, AlertCircle, RefreshCw, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';
import {
  fetchPendingSummaries,
  publishSummary,
  rejectSummary,
  fetchManagedSources,
  toggleSourceKillSwitch,
  fetchTakedowns,
  resolveTakedown,
  fetchAuditLogs,
  triggerIngestionCycle
} from '../lib/api';

interface SourceItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  is_enabled: boolean;
  fetch_status: 'healthy' | 'degraded' | 'failing';
  consecutive_errors: number;
  last_fetched_at: string;
}

interface AdminPortalProps {
  onArticleApproved?: (approvedArticle: any) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onArticleApproved }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<'moderation' | 'sources' | 'takedowns' | 'audit'>('moderation');
  const [triggeringIngest, setTriggeringIngest] = useState(false);
  const [ingestStatusMsg, setIngestStatusMsg] = useState<string | null>(null);

  // Live state from backend
  const [sources, setSources] = useState<SourceItem[]>([]);
  const [pendingSummaries, setPendingSummaries] = useState<any[]>([]);
  const [takedowns, setTakedowns] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Check existing session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user && session.access_token) {
        setAdminEmail(session.user.email || '');
        setAuthToken(session.access_token);
        setIsAuthenticated(true);
      }
    });
  }, []);

  // Reload data when authenticated and tab changes
  const loadAdminData = async (token: string) => {
    setLoadingData(true);
    try {
      const [pending, srcs, tks, logs] = await Promise.all([
        fetchPendingSummaries(token),
        fetchManagedSources(token),
        fetchTakedowns(token),
        fetchAuditLogs(token)
      ]);
      setPendingSummaries(pending);
      setSources(srcs);
      setTakedowns(tks);
      setAuditLogs(logs);
    } catch (err) {
      console.error('Error loading admin portal data', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && authToken) {
      loadAdminData(authToken);
    }
  }, [isAuthenticated, authToken, activeAdminTab]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setLoggingIn(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: adminPassword,
      });

      if (error) {
        setAuthError(error.message || 'Invalid credentials.');
        return;
      }

      if (data?.session) {
        setAuthToken(data.session.access_token);
        setIsAuthenticated(true);
        loadAdminData(data.session.access_token);
      }
    } catch (err: any) {
      setAuthError(err.message || 'Authentication error.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setAuthToken(null);
  };

  const handleTriggerIngestion = async () => {
    if (!authToken) return;
    setTriggeringIngest(true);
    setIngestStatusMsg('🛰️ Ingestion cycle initiated in background. Fetching feeds & generating AI summaries...');
    const ok = await triggerIngestionCycle(authToken);
    if (ok) {
      setTimeout(() => {
        loadAdminData(authToken);
        setIngestStatusMsg('✓ Ingestion cycle running. Check moderation queue for newly generated stories.');
        setTimeout(() => setIngestStatusMsg(null), 5000);
      }, 3000);
    } else {
      setIngestStatusMsg('⚠️ Failed to start ingestion cycle.');
      setTimeout(() => setIngestStatusMsg(null), 4000);
    }
    setTriggeringIngest(false);
  };

  const handleToggleKillSwitch = async (id: string) => {
    if (!authToken) return;
    const updated = await toggleSourceKillSwitch(id, authToken);
    if (updated) {
      setSources(prev => prev.map(s => s.id === id ? { ...s, is_enabled: updated.is_enabled } : s));
    }
  };

  const handleApproveSummary = async (item: any) => {
    if (!authToken) return;
    const ok = await publishSummary(item.id, authToken);
    if (ok) {
      setPendingSummaries(prev => prev.filter(s => s.id !== item.id));
      if (onArticleApproved) {
        onArticleApproved({
          id: item.articles?.id || item.article_id,
          title: item.articles?.title || 'Approved Story',
          source: item.articles?.sources?.name || 'Verified Source',
          category: item.articles?.category || 'National',
          tldr: item.tldr_bullets,
          impact: item.civic_impact,
          figures: item.figures_mentioned,
          confidence: item.confidence_score
        });
      }
    } else {
      alert('Failed to publish summary. Please ensure your account has admin privileges.');
    }
  };

  const handleRejectSummary = async (item: any) => {
    if (!authToken) return;
    const ok = await rejectSummary(item.id, authToken);
    if (ok) {
      setPendingSummaries(prev => prev.filter(s => s.id !== item.id));
    } else {
      alert('Failed to reject summary.');
    }
  };

  const handleResolveTakedown = async (takedownId: string, action: 'approved_removed' | 'rejected') => {
    if (!authToken) return;
    const notes = prompt(`Enter resolution rationale for this takedown (${action}):`);
    if (notes === null) return;
    const ok = await resolveTakedown(takedownId, action, notes, authToken);
    if (ok) {
      setTakedowns(prev => prev.map(t => t.id === takedownId ? { ...t, status: action, resolution_notes: notes } : t));
    } else {
      alert('Failed to resolve takedown request.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center space-x-2 text-rose-400 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Lock className="w-4 h-4" />
          <span>INTERNAL EDITORIAL & COMPLIANCE ACCESS</span>
        </div>
        <h2 className="text-2xl font-black text-white">Staff Sign-In</h2>
        <p className="text-xs text-zinc-400 mt-1 mb-6">
          Admin access requires verified Supabase Auth credentials with admin privileges.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">Admin Email</label>
            <input
              type="email"
              required
              value={adminEmail}
              onChange={e => setAdminEmail(e.target.value)}
              placeholder="editor@wsfu.ng"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">Password</label>
            <input
              type="password"
              required
              value={adminPassword}
              onChange={e => setAdminPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {authError && (
            <div className="p-3 bg-rose-950/80 border border-rose-800 rounded-xl text-xs text-rose-300 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loggingIn}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
          >
            {loggingIn ? 'Authenticating...' : 'Sign In & Access Dashboard'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Urgent Alert Banner if pending approvals exist */}
      {pendingSummaries.length > 0 && (
        <div className="bg-gradient-to-r from-amber-950 via-zinc-900 to-amber-950 border border-amber-500/50 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black animate-pulse flex-shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                <span>ACTION REQUIRED:</span>
                <span className="text-amber-400">{pendingSummaries.length} News Briefs Awaiting Editorial Approval</span>
              </h4>
              <p className="text-xs text-zinc-300 mt-0.5">
                Review and approve verified briefs to publish them to the live citizen wire.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Ingest status banner if triggered */}
      {ingestStatusMsg && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-800 rounded-2xl text-xs font-semibold text-emerald-300 shadow-lg flex items-center space-x-2">
          <Zap className="w-4 h-4 text-emerald-400 animate-bounce flex-shrink-0" />
          <span>{ingestStatusMsg}</span>
        </div>
      )}

      {/* Admin Workspace Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4" />
            <span>AUTHENTICATED EDITORIAL WORKSPACE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Editorial & Governance Control Panel</h1>
          <p className="text-xs text-zinc-400 mt-1">Logged in as {adminEmail || 'admin@wsfu.ng'}</p>
        </div>

        <div className="flex items-center space-x-2 flex-wrap gap-2">
          <button
            onClick={handleTriggerIngestion}
            disabled={triggeringIngest}
            className="flex items-center space-x-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{triggeringIngest ? 'Crawling Feeds...' : '⚡ Trigger Ingestion Cycle'}</span>
          </button>
          <button
            onClick={() => authToken && loadAdminData(authToken)}
            disabled={loadingData}
            title="Refresh Data"
            className="p-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loadingData ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}

      <div className="flex items-center space-x-2 border-b border-zinc-800 pb-3 overflow-x-auto">
        {[
          { id: 'moderation', label: `🚨 Immediate Approvals (${pendingSummaries.length})` },
          { id: 'sources', label: `📡 Source Kill Switches (${sources.length})` },
          { id: 'takedowns', label: `⚖️ Publisher Takedowns (${takedowns.filter(t => t.status === 'pending').length})` },
          { id: 'audit', label: `🛡️ Audit Logs (${auditLogs.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
              activeAdminTab === tab.id
                ? 'bg-emerald-500 text-black shadow-md'
                : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: AI Human Review & Instant Push */}
      {activeAdminTab === 'moderation' && (
        <div className="space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <h3 className="font-bold text-base text-white">Mandatory Human Editorial Gate</h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Every AI summary generated from RSS feeds is verified for strict attribution (*"According to..."*) before publication.
            </p>
          </div>

          {pendingSummaries.length === 0 ? (
            <div className="p-16 text-center text-zinc-400 bg-zinc-900/60 rounded-2xl border border-zinc-800">
              <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
              <h4 className="font-bold text-base text-white">All News Briefs Are Live</h4>
              <p className="text-xs text-zinc-500 mt-1">No pending stories waiting in moderation queue.</p>
            </div>
          ) : (
            pendingSummaries.map(item => (
              <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-lg">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-zinc-800 text-zinc-200">
                      {item.articles?.sources?.name || 'RSS Source'}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400">
                      {item.articles?.category || 'National'}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-800 font-bold animate-pulse">
                    ⚡ Verification Required
                  </span>
                </div>

                <h3 className="font-extrabold text-lg text-white leading-snug">{item.articles?.title || 'Untitled Story'}</h3>

                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-xs text-zinc-300 space-y-2">
                  <div>
                    <strong className="text-emerald-400 uppercase tracking-wider text-[11px] block mb-1">Generated 3-Bullet TLDR:</strong>
                    <ul className="space-y-1 pl-3 text-zinc-300">
                      {item.tldr_bullets?.map((b: string, i: number) => (
                        <li key={i} className="list-disc leading-relaxed">{b}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-zinc-800/80">
                    <strong className="text-emerald-400 uppercase tracking-wider text-[11px] block mb-0.5">Citizen Impact Note:</strong>
                    <p className="text-zinc-300 italic">{item.civic_impact}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-800 flex-wrap gap-2">
                  <span className="text-xs text-zinc-500 font-mono">Confidence: {((item.confidence_score || 0.95) * 100).toFixed(0)}%</span>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleRejectSummary(item)}
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-rose-900 text-zinc-300 hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                    >
                      Reject Brief
                    </button>
                    <button
                      onClick={() => handleApproveSummary(item)}
                      className="flex items-center space-x-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Approve & Publish Live</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Sources Kill Switch */}
      {activeAdminTab === 'sources' && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
          <div>
            <h3 className="font-bold text-base text-white">Media Outlets & Kill Switches</h3>
            <p className="text-xs text-zinc-400">
              Instantly disable compromised sources at the database layer without code redeployment.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-zinc-950 text-zinc-400 uppercase border-b border-zinc-800">
                <tr>
                  <th className="p-3">Source Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Health Status</th>
                  <th className="p-3">Kill Switch Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-mono">
                {sources.map(src => (
                  <tr key={src.id} className="hover:bg-zinc-950/40">
                    <td className="p-3 font-sans font-bold text-white">{src.name}</td>
                    <td className="p-3 font-sans text-zinc-400">{src.category || 'National'}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        src.fetch_status === 'healthy' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400'
                      }`}>
                        {(src.fetch_status || 'healthy').toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3 font-sans">
                      <button
                        onClick={() => handleToggleKillSwitch(src.id)}
                        className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                          src.is_enabled
                            ? 'bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white border border-rose-800'
                            : 'bg-emerald-600 text-black hover:bg-emerald-500'
                        }`}
                      >
                        <Power className="w-3.5 h-3.5" />
                        <span>{src.is_enabled ? 'Kill Source' : 'Re-Enable'}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Publisher Takedowns */}
      {activeAdminTab === 'takedowns' && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
          <div>
            <h3 className="font-bold text-base text-white">Publisher Takedowns & Dispute Queue</h3>
            <p className="text-xs text-zinc-400">
              Review and resolve formal objections submitted by publisher legal desks under NDPR / Copyright Act.
            </p>
          </div>

          {takedowns.length === 0 ? (
            <div className="p-12 text-center text-zinc-500 bg-zinc-950 rounded-xl border border-zinc-800">
              No takedown requests submitted.
            </div>
          ) : (
            <div className="space-y-3">
              {takedowns.map(tk => (
                <div key={tk.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white">{tk.requester_name}</span>
                      <span className="text-xs text-zinc-400 ml-2">({tk.requester_email}) — {tk.organization || 'Individual'}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      tk.status === 'pending' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                      tk.status === 'approved_removed' ? 'bg-rose-950 text-rose-400' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {tk.status}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 font-mono break-all"><strong className="text-zinc-500">Cited URL:</strong> {tk.article_url}</p>
                  <p className="text-xs text-zinc-400"><strong className="text-zinc-500">Reason:</strong> {tk.reason}</p>
                  {tk.resolution_notes && (
                    <p className="text-xs text-emerald-400 italic"><strong className="text-zinc-500">Resolution Note:</strong> {tk.resolution_notes}</p>
                  )}
                  {tk.status === 'pending' && (
                    <div className="flex items-center space-x-2 pt-2 border-t border-zinc-800">
                      <button
                        onClick={() => handleResolveTakedown(tk.id, 'approved_removed')}
                        className="px-3 py-1 bg-rose-900/60 hover:bg-rose-700 text-rose-200 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        Approve Takedown & Hide Content
                      </button>
                      <button
                        onClick={() => handleResolveTakedown(tk.id, 'rejected')}
                        className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        Reject Dispute
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Audit Logs */}
      {activeAdminTab === 'audit' && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
          <div>
            <h3 className="font-bold text-base text-white">Immutable Administrative Audit Logs</h3>
            <p className="text-xs text-zinc-400">
              Forensic log of all editorial actions, status changes, kill-switch operations, and takedown resolutions.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-300 font-mono">
              <thead className="bg-zinc-950 text-zinc-400 uppercase border-b border-zinc-800">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Admin ID</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Target Entity</th>
                  <th className="p-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {auditLogs.map(log => (
                  <tr key={log.id} className="hover:bg-zinc-950/40">
                    <td className="p-3 text-zinc-400">{new Date(log.created_at).toLocaleString()}</td>
                    <td className="p-3 text-emerald-400">{log.admin_user_id?.slice(0, 8)}...</td>
                    <td className="p-3 font-bold text-white">{log.action}</td>
                    <td className="p-3 text-zinc-400">{log.target_entity}</td>
                    <td className="p-3 text-[11px] text-zinc-500 max-w-xs truncate">
                      {JSON.stringify(log.new_state || {})}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

