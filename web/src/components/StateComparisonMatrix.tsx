import React, { useState } from 'react';
import { StateData } from '../types';
import { getRealFAACForState } from '../lib/api';
import { getPerCapitaFAAC, NIGERIAN_STATE_POPULATIONS } from '../lib/faac_data';
import {
  Landmark,
  Scale,
  TrendingDown,
  Users,
  MessageSquare,
  Copy,
  Check
} from 'lucide-react';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';

interface StateComparisonMatrixProps {
  states: StateData[];
}

export const StateComparisonMatrix: React.FC<StateComparisonMatrixProps> = ({ states }) => {
  const [stateCodeA, setStateCodeA] = useState('LA'); // Lagos
  const [stateCodeB, setStateCodeB] = useState('KN'); // Kano
  const [copied, setCopied] = useState(false);

  const availableStates = states.filter(s => s.code !== 'NAT');

  const stateDataA = getRealFAACForState(stateCodeA);
  const stateDataB = getRealFAACForState(stateCodeB);

  const stateInfoA = availableStates.find(s => s.code === stateCodeA) || { name: 'State A', code: stateCodeA, geopolitical_zone: 'Zone A' };
  const stateInfoB = availableStates.find(s => s.code === stateCodeB) || { name: 'State B', code: stateCodeB, geopolitical_zone: 'Zone B' };

  // Calculate annual totals
  const totalGrossA = stateDataA.monthly_history.reduce((sum, r) => sum + r.gross, 0);
  const totalNetA = stateDataA.monthly_history.reduce((sum, r) => sum + r.net, 0);
  const totalDeductionsA = stateDataA.monthly_history.reduce((sum, r) => sum + r.deductions, 0);

  const totalGrossB = stateDataB.monthly_history.reduce((sum, r) => sum + r.gross, 0);
  const totalNetB = stateDataB.monthly_history.reduce((sum, r) => sum + r.net, 0);
  const totalDeductionsB = stateDataB.monthly_history.reduce((sum, r) => sum + r.deductions, 0);

  const popA = NIGERIAN_STATE_POPULATIONS[stateCodeA] || 5000000;
  const popB = NIGERIAN_STATE_POPULATIONS[stateCodeB] || 5000000;

  const perCapitaA = getPerCapitaFAAC(stateCodeA, totalGrossA);
  const perCapitaB = getPerCapitaFAAC(stateCodeB, totalGrossB);

  const formatNaira = (amount: number) => {
    if (amount >= 1e12) return `₦${(amount / 1e12).toFixed(2)} Trillion`;
    if (amount >= 1e9) return `₦${(amount / 1e9).toFixed(2)} Billion`;
    if (amount >= 1e6) return `₦${(amount / 1e6).toFixed(2)} Million`;
    return `₦${amount.toLocaleString()}`;
  };

  // Grouped monthly chart data
  const chartData = stateDataA.monthly_history.map((recA, idx) => {
    const recB = stateDataB.monthly_history[idx] || { gross: 0, net: 0 };
    return {
      month: recA.month_name,
      [stateInfoA.name]: Math.round(recA.gross / 1e9 * 100) / 100,
      [stateInfoB.name]: Math.round(recB.gross / 1e9 * 100) / 100
    };
  });

  const getComparisonShareText = () => {
    let text = `🇳🇬 *WSFU FAAC STATE COMPARISON MATRIX*\n`;
    text += `📊 *${stateInfoA.name.toUpperCase()}* vs *${stateInfoB.name.toUpperCase()}*\n\n`;

    text += `🏛️ *${stateInfoA.name.toUpperCase()} (${stateInfoA.geopolitical_zone}):*\n`;
    text += `• 2024 Gross Allocation: ${formatNaira(totalGrossA)}\n`;
    text += `• Debt Deductions: -${formatNaira(totalDeductionsA)}\n`;
    text += `• Net Vault Revenue: ${formatNaira(totalNetA)}\n`;
    text += `• Per-Capita (Revenue/Citizen): ₦${perCapitaA.toLocaleString()}/person/yr\n`;
    text += `• Autonomous LGAs: ${stateDataA.lgas.length}\n\n`;

    text += `🏛️ *${stateInfoB.name.toUpperCase()} (${stateInfoB.geopolitical_zone}):*\n`;
    text += `• 2024 Gross Allocation: ${formatNaira(totalGrossB)}\n`;
    text += `• Debt Deductions: -${formatNaira(totalDeductionsB)}\n`;
    text += `• Net Vault Revenue: ${formatNaira(totalNetB)}\n`;
    text += `• Per-Capita (Revenue/Citizen): ₦${perCapitaB.toLocaleString()}/person/yr\n`;
    text += `• Autonomous LGAs: ${stateDataB.lgas.length}\n\n`;

    const diffPct = Math.abs(Math.round(((totalGrossA - totalGrossB) / totalGrossB) * 100));
    if (totalGrossA > totalGrossB) {
      text += `⚖️ *Takeaway:* ${stateInfoA.name} received *+${diffPct}% more* FAAC revenue than ${stateInfoB.name}.\n\n`;
    } else {
      text += `⚖️ *Takeaway:* ${stateInfoB.name} received *+${diffPct}% more* FAAC revenue than ${stateInfoA.name}.\n\n`;
    }

    text += `🔍 Compare all 36 States & 774 LGAs on: ${window.location.origin}`;
    return text;
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(getComparisonShareText());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopyText = async () => {
    const text = getComparisonShareText();
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & State Selectors */}
      <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-emerald-950/40 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Scale className="w-4 h-4" />
              <span>FEDERATION ACCOUNT REVENUE BENCHMARK</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              State-vs-State FAAC Matrix
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Compare 2024 gross revenues, debt deductions, per-capita spending power, and LGA distributions side by side.
            </p>
          </div>

          <div className="flex items-center space-x-2 flex-wrap gap-2">
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center space-x-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-900/40 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Share Comparison to WhatsApp</span>
            </button>
            <button
              onClick={handleCopyText}
              className="flex items-center space-x-1.5 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
            </button>
          </div>
        </div>

        {/* State Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* State A Picker */}
          <div className="bg-zinc-950/90 border border-emerald-500/40 rounded-xl p-4 space-y-2 shadow-md shadow-emerald-950/20">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
              Primary Benchmark State (A):
            </span>
            <select
              value={stateCodeA}
              onChange={e => setStateCodeA(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-sm text-white font-bold focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {availableStates.map(s => (
                <option key={`a-${s.code}`} value={s.code}>
                  {s.name} State ({s.geopolitical_zone})
                </option>
              ))}
            </select>
          </div>

          {/* State B Picker */}
          <div className="bg-zinc-950/90 border border-blue-500/40 rounded-xl p-4 space-y-2 shadow-md shadow-blue-950/20">
            <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block">
              Comparison Target State (B):
            </span>
            <select
              value={stateCodeB}
              onChange={e => setStateCodeB(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-sm text-white font-bold focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              {availableStates.map(s => (
                <option key={`b-${s.code}`} value={s.code}>
                  {s.name} State ({s.geopolitical_zone})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Side-by-Side KPI Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* KPI 1: Annual Gross Allocation */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              2024 Gross Allocation
            </span>
            <Landmark className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="space-y-2 pt-1">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-emerald-400">{stateInfoA.name}</span>
                <span className="text-white">{formatNaira(totalGrossA)}</span>
              </div>
              <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden border border-zinc-800">
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${Math.min(100, (totalGrossA / Math.max(totalGrossA, totalGrossB)) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-blue-400">{stateInfoB.name}</span>
                <span className="text-white">{formatNaira(totalGrossB)}</span>
              </div>
              <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden border border-zinc-800">
                <div
                  className="bg-blue-500 h-full rounded-full"
                  style={{ width: `${Math.min(100, (totalGrossB / Math.max(totalGrossA, totalGrossB)) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* KPI 2: Per-Capita Spending Power */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Per-Capita Allocation (Yearly)
            </span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>

          <div className="space-y-2 pt-1">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-emerald-400">{stateInfoA.name} <span className="text-[10px] text-zinc-500 font-normal">({(popA / 1e6).toFixed(1)}M pop)</span></span>
                <span className="text-white font-mono">₦{perCapitaA.toLocaleString()} / person</span>
              </div>
              <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden border border-zinc-800">
                <div
                  className="bg-amber-500 h-full rounded-full"
                  style={{ width: `${Math.min(100, (perCapitaA / Math.max(perCapitaA, perCapitaB)) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-blue-400">{stateInfoB.name} <span className="text-[10px] text-zinc-500 font-normal">({(popB / 1e6).toFixed(1)}M pop)</span></span>
                <span className="text-white font-mono">₦{perCapitaB.toLocaleString()} / person</span>
              </div>
              <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden border border-zinc-800">
                <div
                  className="bg-blue-500 h-full rounded-full"
                  style={{ width: `${Math.min(100, (perCapitaB / Math.max(perCapitaA, perCapitaB)) * 100)}%` }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* KPI 3: Debt & Loan Deductions Burden */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Debt & Bond Deductions
            </span>
            <TrendingDown className="w-4 h-4 text-rose-400" />
          </div>

          <div className="space-y-2 pt-1">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-emerald-400">{stateInfoA.name}</span>
                <span className="text-rose-400">-{formatNaira(totalDeductionsA)} ({Math.round((totalDeductionsA / totalGrossA) * 100)}%)</span>
              </div>
              <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden border border-zinc-800">
                <div
                  className="bg-rose-500 h-full rounded-full"
                  style={{ width: `${Math.min(100, (totalDeductionsA / totalGrossA) * 100 * 3)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-blue-400">{stateInfoB.name}</span>
                <span className="text-rose-400">-{formatNaira(totalDeductionsB)} ({Math.round((totalDeductionsB / totalGrossB) * 100)}%)</span>
              </div>
              <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden border border-zinc-800">
                <div
                  className="bg-rose-500 h-full rounded-full"
                  style={{ width: `${Math.min(100, (totalDeductionsB / totalGrossB) * 100 * 3)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparative Monthly Disbursement Chart */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-white">
              Monthly Gross Disbursement Comparison (2024)
            </h3>
            <p className="text-xs text-zinc-400">
              Values in Billions of Naira (₦B) as gazetted by the Office of the Accountant-General of the Federation.
            </p>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="month" stroke="#71717a" fontSize={11} tickLine={false} />
              <YAxis stroke="#71717a" fontSize={11} tickLine={false} tickFormatter={v => `₦${v}B`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '0.75rem', fontSize: '12px' }}
                formatter={(val: any) => [`₦${val} Billion`, '']}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey={stateInfoA.name} fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey={stateInfoB.name} fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
