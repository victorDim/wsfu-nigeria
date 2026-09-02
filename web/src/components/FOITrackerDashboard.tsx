import React, { useState, useEffect } from 'react';
import { FOIRequest } from '../types';
import { fetchFOIRequests } from '../lib/api';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Building,
  Scale,
  Search,
  PlusCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare
} from 'lucide-react';


interface FOITrackerDashboardProps {
  onOpenGenerator: () => void;
}

export const FOITrackerDashboard: React.FC<FOITrackerDashboardProps> = ({ onOpenGenerator }) => {
  const [requests, setRequests] = useState<FOIRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    loadRequests();
  }, [filterStatus]);

  const loadRequests = async () => {
    setLoading(true);
    const data = await fetchFOIRequests(filterStatus);
    setRequests(data);
    setLoading(false);
  };

  // MDA Scoreboard Analytics
  const mdaScoreboard = [
    { name: 'Nigerian Electricity Regulatory Commission (NERC)', total: 18, fulfilled: 16, avgDays: 5.2, compliancePct: 89, rating: 'Responsive', badgeColor: 'bg-emerald-950 text-emerald-400 border-emerald-800/60' },
    { name: 'Universal Basic Education Commission (UBEC)', total: 14, fulfilled: 11, avgDays: 6.1, compliancePct: 78, rating: 'Responsive', badgeColor: 'bg-emerald-950 text-emerald-400 border-emerald-800/60' },
    { name: 'Federal Inland Revenue Service (FIRS)', total: 22, fulfilled: 15, avgDays: 6.8, compliancePct: 68, rating: 'Average', badgeColor: 'bg-amber-950 text-amber-400 border-amber-800/60' },
    { name: 'Federal Capital Territory Administration (FCTA)', total: 19, fulfilled: 9, avgDays: 8.4, compliancePct: 47, rating: 'Defaulting', badgeColor: 'bg-rose-950 text-rose-400 border-rose-800/60' },
    { name: 'Federal Ministry of Works', total: 31, fulfilled: 8, avgDays: 12.1, compliancePct: 26, rating: 'Defaulting', badgeColor: 'bg-rose-950 text-rose-400 border-rose-800/60' },
    { name: 'Nigerian National Petroleum Company Ltd (NNPCL)', total: 42, fulfilled: 7, avgDays: 14.5, compliancePct: 17, rating: 'Defaulting', badgeColor: 'bg-rose-950 text-rose-400 border-rose-800/60' },
  ];

  const filteredRequests = requests.filter(r => {
    const q = searchQuery.toLowerCase();
    return (
      r.mda_name.toLowerCase().includes(q) ||
      r.subject.toLowerCase().includes(q) ||
      r.tracking_code.toLowerCase().includes(q)
    );
  });

  const getDaysRemaining = (dueDateStr: string) => {
    const due = new Date(dueDateStr).getTime();
    const now = new Date().getTime();
    const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusBadge = (r: FOIRequest) => {
    if (r.status === 'fulfilled') {
      return (
        <span className="flex items-center space-x-1 px-2.5 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 rounded-full text-xs font-bold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Disclosed / Fulfilled</span>
        </span>
      );
    }
    if (r.status === 'overdue') {
      return (
        <span className="flex items-center space-x-1 px-2.5 py-1 bg-rose-950/80 text-rose-400 border border-rose-800/60 rounded-full text-xs font-bold">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Section 7 Statutory Default</span>
        </span>
      );
    }
    if (r.status === 'denied') {
      return (
        <span className="flex items-center space-x-1 px-2.5 py-1 bg-purple-950/80 text-purple-400 border border-purple-800/60 rounded-full text-xs font-bold">
          <XCircle className="w-3.5 h-3.5" />
          <span>Exemption Cited (In Appeal)</span>
        </span>
      );
    }
    const days = getDaysRemaining(r.due_date);
    if (days < 0) {
      return (
        <span className="flex items-center space-x-1 px-2.5 py-1 bg-rose-950/80 text-rose-400 border border-rose-800/60 rounded-full text-xs font-bold">
          <Clock className="w-3.5 h-3.5" />
          <span>{Math.abs(days)} Days Overdue</span>
        </span>
      );
    }
    return (
      <span className="flex items-center space-x-1 px-2.5 py-1 bg-blue-950/80 text-blue-400 border border-blue-800/60 rounded-full text-xs font-bold">
        <Clock className="w-3.5 h-3.5" />
        <span>{days} Days Remaining</span>
      </span>
    );
  };

  const handleShareWhatsApp = (r: FOIRequest) => {
    let text = `🇳🇬 *WSFU CITIZEN FOI TRACKING ALERT*\n`;
    text += `📌 *Reference:* ${r.tracking_code}\n`;
    text += `🏛️ *Target MDA:* ${r.mda_name}\n`;
    text += `📜 *Subject:* ${r.subject}\n`;
    text += `📅 *Date Filed:* ${r.date_filed} | *Statutory Due:* ${r.due_date}\n`;
    text += `⚖️ *Status:* ${r.status.toUpperCase()}\n\n`;
    if (r.response_summary) {
      text += `📝 *Disclosed Findings:* ${r.response_summary}\n\n`;
    }
    text += `🔍 Track this and other public records on: ${window.location.origin}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner with Action CTA */}
      <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-emerald-950/50 border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Scale className="w-4 h-4" />
            <span>FREEDOM OF INFORMATION (FOI) ACT 2011 COMPLIANCE DESK</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Citizen Public Records & MDA Scoreboard
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Monitor formal public information requests filed by citizens against Nigerian government ministries, departments, and agencies under the mandatory 7-working-day statutory compliance window.
          </p>
        </div>

        <button
          onClick={onOpenGenerator}
          className="flex-shrink-0 flex items-center space-x-2 px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
        >
          <PlusCircle className="w-5 h-5" />
          <span>File New Statutory FOI Notice</span>
        </button>
      </div>

      {/* KPI Overview Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4">
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Publicly Tracked</p>
          <p className="text-2xl font-black text-white mt-1">145</p>
          <p className="text-[10px] text-zinc-500 mt-0.5 font-mono">Formal Citizen Applications</p>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4">
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">National Compliance Rate</p>
          <p className="text-2xl font-black text-emerald-400 mt-1">48.2%</p>
          <p className="text-[10px] text-zinc-500 mt-0.5 font-mono">Disclosed within 7 Days</p>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4">
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Average Turnaround</p>
          <p className="text-2xl font-black text-blue-400 mt-1">8.6 Days</p>
          <p className="text-[10px] text-zinc-500 mt-0.5 font-mono">From Filing to Resolution</p>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4">
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Section 7 Violations</p>
          <p className="text-2xl font-black text-rose-400 mt-1">54 Defaults</p>
          <p className="text-[10px] text-zinc-500 mt-0.5 font-mono">Unlawful MDA Refusals</p>
        </div>
      </div>

      {/* MDA Compliance Scoreboard */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
          <div>
            <h2 className="text-lg font-black text-white flex items-center space-x-2">
              <Building className="w-5 h-5 text-emerald-400" />
              <span>Nigerian MDA FOI Compliance Scoreboard (2024)</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Ranked by adherence to Section 4 of the FOI Act 2011 requiring disclosure within 7 working days.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-3">Ministry / Agency (MDA)</th>
                <th className="py-3 px-3">Requests Received</th>
                <th className="py-3 px-3">Fulfilled on Time</th>
                <th className="py-3 px-3">Avg Response Time</th>
                <th className="py-3 px-3">Compliance %</th>
                <th className="py-3 px-3">Transparency Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-medium">
              {mdaScoreboard.map((mda, idx) => (
                <tr key={idx} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-zinc-100 flex items-center space-x-2">
                    <span className="text-zinc-600 font-mono text-[11px] w-4">{idx + 1}.</span>
                    <span>{mda.name}</span>
                  </td>
                  <td className="py-3.5 px-3 text-zinc-300 font-mono">{mda.total}</td>
                  <td className="py-3.5 px-3 text-emerald-400 font-mono">{mda.fulfilled}</td>
                  <td className="py-3.5 px-3 text-zinc-400 font-mono">{mda.avgDays} Days</td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-zinc-950 rounded-full h-1.5 overflow-hidden border border-zinc-800">
                        <div
                          className={`h-full rounded-full ${
                            mda.compliancePct >= 75
                              ? 'bg-emerald-500'
                              : mda.compliancePct >= 50
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                          }`}
                          style={{ width: `${mda.compliancePct}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] font-bold text-zinc-200">
                        {mda.compliancePct}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${mda.badgeColor}`}>
                      {mda.rating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Public FOI Tracking Ledger */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <h2 className="text-lg font-black text-white flex items-center space-x-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              <span>Public Citizen FOI Ledger & Statutory Countdown</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Certified tracking records of citizen applications with legal countdown clocks.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search MDA, subject, ref code..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs font-bold">
          {[
            { id: 'all', label: 'All Tracked Requests' },
            { id: 'submitted', label: 'Active Clock (7 Days)' },
            { id: 'fulfilled', label: 'Fulfilled & Disclosed' },
            { id: 'overdue', label: 'Section 7 Defaults' },
            { id: 'denied', label: 'Denied / Exemptions' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setFilterStatus(t.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                filterStatus === t.id
                  ? 'bg-emerald-500 text-black font-extrabold'
                  : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Requests List */}
        {loading ? (
          <div className="p-12 text-center text-zinc-500 font-mono animate-pulse text-xs">
            Loading public FOI tracking records...
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 text-xs">
            No public FOI records found matching your search.
          </div>
        ) : (
          <div className="space-y-3 pt-2">
            {filteredRequests.map(r => {
              const isExpanded = expandedId === r.id;
              return (
                <div
                  key={r.id}
                  className="bg-zinc-950/70 border border-zinc-800/80 hover:border-zinc-700 rounded-xl p-4.5 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center space-x-2 flex-wrap gap-1">
                        <span className="font-mono text-xs font-black text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                          {r.tracking_code}
                        </span>
                        <span className="text-xs text-zinc-300 font-bold">
                          {r.mda_name}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-white pt-0.5">
                        {r.subject}
                      </h3>
                      <div className="flex items-center space-x-4 text-[11px] text-zinc-400 pt-1">
                        <span>📅 Filed: <strong className="text-zinc-200">{r.date_filed}</strong></span>
                        <span>⚖️ Statutory Deadline: <strong className="text-zinc-200">{r.due_date}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {getStatusBadge(r)}
                      <button
                        onClick={() => handleShareWhatsApp(r)}
                        className="p-1.5 bg-zinc-900 hover:bg-emerald-950 hover:text-emerald-400 text-zinc-400 border border-zinc-800 rounded-lg transition-colors cursor-pointer"
                        title="Share FOI Alert on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : r.id)}
                        className="p-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded-lg transition-colors cursor-pointer"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details & Official Findings */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-zinc-800/80 space-y-3 text-xs animate-fadeIn">
                      <div className="bg-zinc-900/90 rounded-lg p-3 border border-zinc-800">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                          Records Requested Under Section 1 FOI Act:
                        </span>
                        <p className="text-zinc-200 leading-relaxed whitespace-pre-line">
                          {r.details}
                        </p>
                      </div>

                      {r.response_summary && (
                        <div className="bg-emerald-950/30 rounded-lg p-3 border border-emerald-800/40">
                          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                            Official MDA Disclosure / Legal Outcome:
                          </span>
                          <p className="text-zinc-200 leading-relaxed">
                            {r.response_summary}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
