import React, { useState, useEffect } from 'react';
import { StateData, FAACAllocation, LGAData } from '../types';
import { fetchStates, fetchStateAllocations } from '../lib/api';
import {
  Landmark,
  Share2,
  PieChart as PieIcon,
  BarChart3,
  Fuel,
  Building,
  ShoppingCart,
  Anchor,
  Smartphone,
  HelpCircle,
  TrendingUp,
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
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const FAACExplorer: React.FC = () => {
  const [states, setStates] = useState<StateData[]>([]);
  const [selectedStateCode, setSelectedStateCode] = useState('LA');
  const [data, setData] = useState<{ state: StateData; allocations: FAACAllocation[]; lgas: LGAData[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchStates().then((res) => {
      // Filter out 'NAT' from FAAC state selector dropdown
      const actualStates = res.filter(s => s.code !== 'NAT');
      setStates(actualStates);
      if (actualStates.length > 0) {
        loadStateData(selectedStateCode);
      }
    });
  }, []);

  const loadStateData = async (code: string) => {
    setLoading(true);
    setSelectedStateCode(code);
    const res = await fetchStateAllocations(code);
    setData(res);
    setLoading(false);
  };

  const formatNaira = (amount: number) => {
    if (amount >= 1e12) return `₦${(amount / 1e12).toFixed(2)} Trillion`;
    if (amount >= 1e9) return `₦${(amount / 1e9).toFixed(2)} Billion`;
    if (amount >= 1e6) return `₦${(amount / 1e6).toFixed(2)} Million`;
    return `₦${amount.toLocaleString()}`;
  };

  const latestAllocation = data?.allocations?.[0];

  const getFormattedFAACText = () => {
    if (!data || !latestAllocation) return '';
    let text = `🇳🇬 *WSFU FAAC REVENUE REPORT: ${data.state.name.toUpperCase()}*\n`;
    text += `📍 *Geopolitical Zone:* ${data.state.geopolitical_zone}\n\n`;
    text += `💰 *Gross Statutory Allocation:* ${formatNaira(latestAllocation.gross_amount)}\n`;
    text += `📉 *Debt & Loan Deductions:* -${formatNaira(latestAllocation.deductions)}\n`;
    text += `💵 *Net Vault Revenue:* ${formatNaira(latestAllocation.net_amount)}\n\n`;

    if (data.lgas && data.lgas.length > 0) {
      text += `🏛️ *Top LGA Direct Disbursements (Supreme Court Autonomy):*\n`;
      data.lgas.slice(0, 5).forEach(lga => {
        text += `• ${lga.name}: ${lga.allocation ? formatNaira(lga.allocation) : 'Direct Statutory'}\n`;
      });
      text += `\n`;
    }

    text += `🔍 Inspect all 36 States & 774 LGAs on: ${window.location.origin}`;
    return text;
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(getFormattedFAACText());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopyFAACText = async () => {
    const text = getFormattedFAACText();
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };


  // Nigeria Revenue Inflow Breakdown Data
  const revenueSources = [
    {
      name: 'Crude Oil & Gas Royalties / PPT',
      pct: 38,
      amount: '₦536.2 Billion',
      color: '#10b981',
      icon: Fuel,
      desc: 'NNPC Ltd statutory remittances, upstream production sharing contracts (PSCs), petroleum profit tax, and gas flare penalties.'
    },
    {
      name: 'Company Income Tax (CIT)',
      pct: 26,
      amount: '₦366.8 Billion',
      color: '#3b82f6',
      icon: Building,
      desc: 'Federal Inland Revenue Service (FIRS) 30% tax on profits of registered companies in banking, telecoms, and manufacturing.'
    },
    {
      name: 'Value Added Tax (VAT - 7.5%)',
      pct: 21,
      amount: '₦296.3 Billion',
      color: '#8b5cf6',
      icon: ShoppingCart,
      desc: 'Consumption tax distributed legally: 85% to 36 States & 774 LGAs, and 15% retained by the Federal Government.'
    },
    {
      name: 'Customs Duties & Tariffs',
      pct: 9,
      amount: '₦127.0 Billion',
      color: '#f59e0b',
      icon: Anchor,
      desc: 'Nigeria Customs Service import duties, port tariffs, export levies, and excise charges.'
    },
    {
      name: 'EMTL & Foreign Exchange Gains',
      pct: 6,
      amount: '₦84.7 Billion',
      color: '#ec4899',
      icon: Smartphone,
      desc: '₦50 Electronic Money Transfer Levy on bank transfers over ₦10,000 and CBN exchange rate differential revaluation windfalls.'
    }
  ];

  // National Federation Revenue Split Data for Charts
  const nationalSplitData = [
    { name: 'Federal Govt (52.68%)', value: 743.3, color: '#10b981' },
    { name: '36 States (26.72%)', value: 377.1, color: '#3b82f6' },
    { name: '774 LGAs (20.60%)', value: 290.6, color: '#f59e0b' },
  ];

  // Prepare monthly chart data from allocations
  const monthlyChartData = data?.allocations
    ? [...data.allocations].reverse().map((a) => {
        const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return {
          month: monthNames[a.month] || `M${a.month}`,
          Gross: Number((a.gross_amount / 1e9).toFixed(2)),
          Net: Number((a.net_amount / 1e9).toFixed(2)),
          Deductions: Number((a.deductions / 1e9).toFixed(2)),
        };
      })
    : [];

  return (

    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-zinc-900 to-zinc-950 border border-emerald-800/40 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
              <Landmark className="w-4 h-4" />
              <span>OFFICIAL FEDERATION REVENUE TRACKER (FAAC)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Where Did Nigeria's Public Money Go?
            </h1>
            <p className="text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              Track Federation Account Allocation Committee (FAAC) monthly disbursements to the Federal Government, all 36 States, and 774 Local Government Councils with interactive visual charts.
            </p>
          </div>

          {/* State Selector */}
          <div className="flex-shrink-0 bg-zinc-900/90 p-3 rounded-xl border border-zinc-800">
            <label className="block text-[11px] font-bold text-zinc-400 mb-1 uppercase tracking-wider">
              Select State to Inspect:
            </label>
            <select
              value={selectedStateCode}
              onChange={(e) => loadStateData(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 text-emerald-400 text-base font-extrabold rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {states.map((st) => (
                <option key={st.code} value={st.code}>
                  {st.name} ({st.geopolitical_zone})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* National 3-Tier Summary Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-zinc-800/80 mt-6">
          <div className="bg-zinc-950/80 p-3.5 rounded-xl border border-emerald-900/40 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-black">
              FG
            </div>
            <div>
              <p className="text-[11px] text-zinc-400 font-semibold uppercase">Federal Government Share</p>
              <p className="text-base font-extrabold text-white">₦743.3 Billion (52.68%)</p>
            </div>
          </div>

          <div className="bg-zinc-950/80 p-3.5 rounded-xl border border-blue-900/40 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-black">
              ST
            </div>
            <div>
              <p className="text-[11px] text-zinc-400 font-semibold uppercase">36 State Governments</p>
              <p className="text-base font-extrabold text-white">₦377.1 Billion (26.72%)</p>
            </div>
          </div>

          <div className="bg-zinc-950/80 p-3.5 rounded-xl border border-amber-900/40 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-black">
              LG
            </div>
            <div>
              <p className="text-[11px] text-zinc-400 font-semibold uppercase">774 Local Councils</p>
              <p className="text-base font-extrabold text-white">₦290.6 Billion (20.60%)</p>
            </div>
          </div>
        </div>
      </div>

      {/* HOW NIGERIA MAKES ITS MONEY (DETAILED FEDERATION REVENUE INFLOW ENGINE) */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-0.5">
              <TrendingUp className="w-4 h-4" />
              <span>FEDERATION REVENUE INFLOW ENGINE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              How Nigeria Makes Its Public Money (Monthly Inflows)
            </h2>
            <p className="text-xs text-zinc-400 mt-1 max-w-3xl">
              Nigeria collects federation revenue through 5 primary statutory channels before the FAAC committee distributes funds each month in Abuja.
            </p>
          </div>

          <div className="bg-zinc-950 px-4 py-2 rounded-xl border border-zinc-800 flex items-center space-x-2 self-start">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-white">₦1.411 Trillion / Month Avg</span>
          </div>
        </div>

        {/* 5 Inflow Channel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {revenueSources.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-zinc-950/80 border border-zinc-800/90 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-zinc-700 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-base font-black font-mono" style={{ color: item.color }}>
                      {item.pct}% of Total
                    </span>
                  </div>

                  <h3 className="font-extrabold text-sm text-white leading-tight">{item.name}</h3>
                  <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>

                <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <span className="text-zinc-500 font-semibold">Monthly Estimated:</span>
                  <span className="font-mono font-bold text-white">{item.amount}</span>
                </div>
              </div>
            );
          })}

          {/* Statutory Deductions & 13% Derivation Guide */}
          <div className="bg-emerald-950/30 border border-emerald-800/50 rounded-xl p-4 flex flex-col justify-between space-y-3">
            <div>
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-sm text-white">Statutory First-Line Deductions</h3>
              <ul className="text-[11px] text-zinc-300 mt-2 space-y-1 leading-relaxed">
                <li>• <strong>13% Mineral Derivation:</strong> Paid directly to mineral & oil-producing states (Delta, Rivers, Akwa Ibom, Bayelsa, etc.) before general sharing.</li>
                <li>• <strong>Cost of Revenue Collection:</strong> 4% to FIRS and 7% to Nigeria Customs Service.</li>
              </ul>
            </div>

            <div className="pt-2 border-t border-emerald-900/60 text-[10px] text-emerald-300 font-mono">
              1999 Constitution (Section 162)
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="p-16 text-center text-zinc-500 font-medium animate-pulse">
          Loading allocation charts and datasets...
        </div>
      ) : data ? (
        <div className="space-y-6">
          {/* Selected State Header & Viral Share Bar */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-black text-white">{data.state.name} State FAAC Ledger</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                  {data.state.geopolitical_zone}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Monthly revenue distributed by Federal Treasury vs debt servicing deductions.
              </p>
            </div>

            <div className="flex items-center space-x-2 flex-wrap gap-2">
              <button
                onClick={handleWhatsAppShare}
                title="Share State FAAC Breakdown to WhatsApp"
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-all font-bold text-xs cursor-pointer shadow-md shadow-emerald-900/30"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Share to WhatsApp</span>
              </button>

              <button
                onClick={handleCopyFAACText}
                title="Copy FAAC Summary"
                className="flex items-center space-x-1 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-all font-bold text-xs cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
              </button>
            </div>
          </div>

          {/* Key Metric Highlights for Selected State */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
              <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Gross Statutory Allocation</span>
              <p className="text-2xl font-black text-white mt-1">
                {latestAllocation ? formatNaira(latestAllocation.gross_amount) : '₦0'}
              </p>
              <span className="text-[11px] text-zinc-500 mt-1 block">Before external debt & loan deductions</span>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
              <span className="text-xs text-rose-400 font-bold uppercase tracking-wider">Deductions & Debt Servicing</span>
              <p className="text-2xl font-black text-rose-400 mt-1">
                -{latestAllocation ? formatNaira(latestAllocation.deductions) : '₦0'}
              </p>
              <span className="text-[11px] text-zinc-500 mt-1 block">Subtracted at source by Federal Treasury</span>
            </div>

            <div className="bg-emerald-950/30 border border-emerald-800/40 p-5 rounded-xl">
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Net Amount Received in Vault</span>
              <p className="text-2xl font-black text-emerald-400 mt-1">
                {latestAllocation ? formatNaira(latestAllocation.net_amount) : '₦0'}
              </p>
              <span className="text-[11px] text-emerald-300/80 mt-1 block">Available for State infrastructure & salaries</span>
            </div>
          </div>

          {/* VISUAL CHARTS ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart 1: 12-Month Allocation Trend Bar Chart */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-base text-white flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4 text-emerald-400" />
                    <span>{data.state.name} Monthly FAAC Revenue (₦ Billions)</span>
                  </h3>
                  <p className="text-xs text-zinc-400">Comparing Gross statutory revenue vs. Net amount received</p>
                </div>
                <span className="text-xs font-mono bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-md">
                  Fiscal Year 2024
                </span>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="month" stroke="#71717a" fontSize={11} />
                    <YAxis stroke="#71717a" fontSize={11} unit="B" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                      formatter={(value: any) => [`₦${value} Billion`, '']}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Bar dataKey="Gross" fill="#3b82f6" name="Gross Allocation" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Net" fill="#10b981" name="Net Received" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: National Pie Chart Breakdown */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-white flex items-center space-x-2 mb-1">
                  <PieIcon className="w-4 h-4 text-emerald-400" />
                  <span>National Revenue Allocation Ratio</span>
                </h3>
                <p className="text-xs text-zinc-400 mb-2">Statutory FAAC distribution formula across Nigeria</p>

                <div className="h-52 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={nationalSplitData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {nationalSplitData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                        formatter={(val: any) => [`₦${val} Billion`, '']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-zinc-800 text-xs">
                {nationalSplitData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="flex items-center space-x-2 text-zinc-300">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span>{item.name}</span>
                    </span>
                    <span className="font-mono font-bold text-white">₦{item.value}B</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Local Government Spending & WhatsApp Share Strip */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LGA Breakdown List */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 lg:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base text-white flex items-center space-x-2">
                  <span>{data.state.name} Local Government Direct Allocations</span>
                  <span className="text-xs bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-800/60">
                    Supreme Court Autonomous
                  </span>
                </h3>
                <span className="text-xs text-zinc-400">{data.lgas.length} LGAs</span>
              </div>
              <p className="text-xs text-zinc-400 mb-4">
                Following direct disbursement autonomy, state governors can no longer seize or divert these LGA funds.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
                {data.lgas.map((lga) => (
                  <div key={lga.id} className="p-3 bg-zinc-950/70 border border-zinc-800/80 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm text-zinc-100">{lga.name} LGA</p>
                      <p className="text-[11px] text-zinc-500 font-mono">Status: Direct Disbursement</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono font-bold text-emerald-400">
                        {lga.allocation ? formatNaira(lga.allocation) : '₦1.2B / mo'}
                      </p>
                      <span className="text-[10px] text-zinc-500">Monthly Avg</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Viral WhatsApp Share Card */}
            <div className="bg-gradient-to-br from-emerald-950/70 via-zinc-900 to-zinc-900 border border-emerald-800/60 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <Share2 className="w-5 h-5" />
                </div>
                <h4 className="font-black text-lg text-white leading-tight">
                  Make Your Governor & LGA Chairman Accountable
                </h4>
                <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                  Share this {data.state.name} State FAAC breakdown directly into your community WhatsApp and X (Twitter) groups so citizens know exactly what public funds were received this month.
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-zinc-800">
                <button
                  onClick={() => {
                    const text = `🚨 *WHO SWEAR FOR US (WSFU) — FAAC TRACKER*\n\n📌 *${data.state.name} State* received *${latestAllocation ? formatNaira(latestAllocation.net_amount) : 'Billions'}* in latest FAAC allocation.\n\n📊 Gross: ${latestAllocation ? formatNaira(latestAllocation.gross_amount) : ''}\n🔻 Deductions: -${latestAllocation ? formatNaira(latestAllocation.deductions) : ''}\n\nTrack your state & LGA budgets on WSFU: ${window.location.origin}`;
                    if (navigator.share) {
                      navigator.share({ title: `${data.state.name} FAAC Breakdown`, text });
                    } else {
                      navigator.clipboard.writeText(text);
                      alert(`Copied ${data.state.name} FAAC WhatsApp summary card to clipboard!`);
                    }
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Breakdown on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
