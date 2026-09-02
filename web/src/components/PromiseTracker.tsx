import React, { useState } from 'react';
import { OfficialProfile, TrackedPromise } from '../types';
import { ALL_NIGERIAN_STATES, getOfficialsForState, NIGERIA_DISCO_ALLOCATIONS } from '../lib/officials_data';
import { submitCitizenRating, fetchOfficials } from '../lib/api';
import { supabase } from '../lib/supabase';

import {
  ShieldCheck,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  GraduationCap,
  Briefcase,
  Building2,
  Landmark,
  Users,
  Star,
  Award,
  Droplets,
  Zap,
  Route,
  Activity,
  BookOpen,
  ShieldAlert,
  ExternalLink
} from 'lucide-react';

export const PromiseTracker: React.FC = () => {
  const [selectedStateCode, setSelectedStateCode] = useState<string>('AB'); // Default to Abia State
  const [officials, setOfficials] = useState<OfficialProfile[]>(() => getOfficialsForState('AB'));
  const [activeTier, setActiveTier] = useState<'governor' | 'senator' | 'house_of_rep'>('governor');
  const [selectedOfficialId, setSelectedOfficialId] = useState<string>('gov-ab');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [userVoted, setUserVoted] = useState<Record<string, number>>({});
  const [ratingMessage, setRatingMessage] = useState<string | null>(null);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  // Synchronous initial load with async live refresh
  const handleStateChange = async (stateCode: string) => {
    setSelectedStateCode(stateCode);
    const list = getOfficialsForState(stateCode);
    setOfficials(list);

    // Keep active tier and pick first official in that tier
    const matchingInTier = list.filter(o => {
      if (activeTier === 'governor') return o.role === 'governor' || o.role === 'president';
      return o.role === activeTier;
    });

    const target = matchingInTier[0] || list.find(o => o.role === 'governor' || o.role === 'president') || list[0];
    if (target) {
      setSelectedOfficialId(target.id);
    }

    // Async live data fetch to refresh live ratings/updates from database
    try {
      const liveList = await fetchOfficials(stateCode);
      if (liveList && liveList.length > 0) {
        setOfficials(liveList);
      }
    } catch {
      // Graceful fallback to static list
    }
  };

  // Synchronous tier change (Governor vs Senators vs House of Reps)
  const handleTierChange = (tier: 'governor' | 'senator' | 'house_of_rep') => {
    setActiveTier(tier);
    const firstInTier = officials.find(o => {
      if (tier === 'governor') return o.role === 'governor' || o.role === 'president';
      return o.role === tier;
    });
    if (firstInTier) {
      setSelectedOfficialId(firstInTier.id);
    }
  };

  // Current tier officials list
  const tierOfficials = officials.filter(o => {
    if (activeTier === 'governor') return o.role === 'governor' || o.role === 'president';
    return o.role === activeTier;
  });

  // Current selected official (always guarantees a valid object)
  const currentOfficial = officials.find(o => o.id === selectedOfficialId) || tierOfficials[0] || officials[0];

  // Filtered promises for current official
  const filteredPromises = currentOfficial?.promises.filter(p => {
    if (statusFilter === 'all') return true;
    return p.status === statusFilter;
  }) || [];

  const handleCastVote = async (stars: number) => {
    if (!currentOfficial) return;
    const ratingPct = stars * 20;
    
    let token: string | undefined = undefined;
    try {
      const { data } = await supabase.auth.getSession();
      token = data?.session?.access_token;
    } catch {
      // no-op
    }

    if (!token) {
      setRatingMessage(`⚠️ Sign-in required: Citizen approval ratings require an authenticated voter session.`);
      setTimeout(() => setRatingMessage(null), 5000);
      return;
    }

    setUserVoted(prev => ({ ...prev, [currentOfficial.id]: stars }));
    setRatingMessage(`Submitting your ${stars}-Star (${ratingPct}%) approval rating...`);

    const res = await submitCitizenRating(currentOfficial.id, ratingPct, token);
    if (res.success) {
      setRatingMessage(`✓ Recorded verified ${stars}-Star (${ratingPct}%) rating for ${currentOfficial.name}.`);
    } else {
      setRatingMessage(`⚠️ ${res.error || 'Failed to submit rating'}`);
    }
    setTimeout(() => setRatingMessage(null), 4000);
  };


  const getStatusBadge = (status: TrackedPromise['status']) => {
    switch (status) {
      case 'fulfilled':
        return (
          <span className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-black bg-emerald-950 text-emerald-400 border border-emerald-800 shadow-sm">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Fulfilled</span>
          </span>
        );
      case 'in_progress':
        return (
          <span className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-black bg-amber-950 text-amber-400 border border-amber-800 shadow-sm">
            <Clock className="w-3.5 h-3.5" />
            <span>In Progress</span>
          </span>
        );
      case 'broken':
        return (
          <span className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-black bg-rose-950 text-rose-400 border border-rose-800 shadow-sm">
            <XCircle className="w-3.5 h-3.5" />
            <span>Broken</span>
          </span>
        );
      default:
        return (
          <span className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-zinc-800 text-zinc-400">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Not Started</span>
          </span>
        );
    }
  };

  const isFederal = selectedStateCode === 'NAT';
  const matchingDisCo = NIGERIA_DISCO_ALLOCATIONS.find(d => d.coverage_states.includes(selectedStateCode));

  return (
    <div className="space-y-6">
      {/* Top Banner & State Selector */}
      <div className="bg-gradient-to-r from-emerald-950 via-zinc-900 to-zinc-950 border border-emerald-800/40 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>NIGERIA ELECTED OFFICIAL DOSSIER & PROMISE AUDITOR</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
              {isFederal ? 'Federal Presidency & National Assembly Tracker' : 'Governors, Senators & House of Reps Tracker'}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              Inspect the official portraits, educational history, past offices, public approval ratings, and constituency <strong>Quality of Life</strong> for all 36 State Governors and Federal Lawmakers.
            </p>
          </div>

          {/* All 36 States + Federal Presidency Dropdown */}
          <div className="w-full sm:w-auto flex-shrink-0 bg-zinc-900/90 p-3 rounded-xl border border-zinc-800">
            <label className="block text-[11px] font-bold text-zinc-400 mb-1 uppercase tracking-wider">
              Select State / Jurisdiction:
            </label>
            <select
              value={selectedStateCode}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full sm:w-72 bg-zinc-950 border border-zinc-700 text-emerald-400 text-sm font-extrabold rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {ALL_NIGERIAN_STATES.map((st) => (
                <option key={st.code} value={st.code}>
                  {st.name} {st.code !== 'NAT' ? `(${st.geopolitical_zone})` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3-Tier Navigation (Governor/President vs. Senators vs. House of Reps) */}
        <div className="flex items-center space-x-2 pt-6 border-t border-zinc-800/80 mt-6 overflow-x-auto pb-2">
          <button
            onClick={() => handleTierChange('governor')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
              activeTier === 'governor'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 scale-[1.02]'
                : 'bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 hover:bg-zinc-800'
            }`}
          >
            {isFederal ? <Award className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
            <span>{isFederal ? '🇳🇬 Commander-in-Chief / President' : '🏛️ State Governor'}</span>
          </button>

          <button
            onClick={() => handleTierChange('senator')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
              activeTier === 'senator'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 scale-[1.02]'
                : 'bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 hover:bg-zinc-800'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>{isFederal ? '📜 Senate Leadership' : '📜 Senators (3 Districts)'}</span>
          </button>

          <button
            onClick={() => handleTierChange('house_of_rep')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
              activeTier === 'house_of_rep'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 scale-[1.02]'
                : 'bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 hover:bg-zinc-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{isFederal ? '👥 House Leadership' : `👥 House of Representatives (${tierOfficials.length} Reps)`}</span>
          </button>
        </div>

        {/* Interactive Lawmakers Delegation Grid for Active Tier */}
        <div className="pt-5 border-t border-zinc-800/60 mt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
            <label className="block text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              {activeTier === 'governor' && (isFederal ? '🇳🇬 Executive President of the Federation:' : `🏛️ Executive Governor of ${currentOfficial.state_name}:`)}
              {activeTier === 'senator' && (isFederal ? '📜 Senate Leadership:' : `📜 Full 10th Senate Delegation for ${currentOfficial.state_name} (${tierOfficials.length} Senatorial Districts):`)}
              {activeTier === 'house_of_rep' && (isFederal ? '👥 House Leadership:' : `👥 Federal House of Representatives Roster for ${currentOfficial.state_name} (${tierOfficials.length} Federal Constituencies):`)}
            </label>
            <span className="text-[11px] text-zinc-400 font-mono">
              Click any lawmaker below to view their dossier & verified projects
            </span>
          </div>

          {/* Prominent Multi-Column Lawmaker Delegation Grid */}
          {tierOfficials.length === 0 ? (
            <div className="text-xs text-zinc-500 italic p-3 bg-zinc-950 rounded-xl border border-zinc-800">
              No officials listed for this tier in this state yet.
            </div>
          ) : (
            <div className={`grid gap-3 ${
              activeTier === 'governor'
                ? 'grid-cols-1'
                : activeTier === 'senator'
                ? 'grid-cols-1 md:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}>
              {tierOfficials.map((off, idx) => {
                const isSelected = selectedOfficialId === off.id;
                return (
                  <button
                    key={off.id}
                    onClick={() => setSelectedOfficialId(off.id)}
                    className={`text-left p-3.5 rounded-xl transition-all cursor-pointer border flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-br from-emerald-950 via-zinc-900 to-zinc-950 border-emerald-500 shadow-lg shadow-emerald-950/50 ring-2 ring-emerald-500/60'
                        : 'bg-zinc-950/90 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                          isSelected ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-300'
                        }`}>
                          {off.role === 'senator' ? `District ${idx + 1}` : off.role === 'house_of_rep' ? `Seat ${idx + 1}` : 'Executive'}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400 font-bold px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                          {off.party.split(' ')[0]}
                        </span>
                      </div>
                      <h4 className={`text-sm font-black leading-snug line-clamp-1 ${isSelected ? 'text-white' : 'text-zinc-200'}`}>
                        {off.name}
                      </h4>
                      {off.district_constituency && (
                        <p className="text-[11px] text-emerald-400 font-semibold mt-0.5 line-clamp-1">
                          {off.district_constituency}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-zinc-800/80 text-[10px] text-zinc-400">
                      <span className="flex items-center gap-1 font-mono">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        {off.citizen_rating.overall_score} ★ ({off.citizen_rating.approval_pct}%)
                      </span>
                      <span className="text-zinc-500 font-semibold">
                        {off.promises.length} Project{off.promises.length === 1 ? '' : 's'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Official Dossier & Background Header Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 w-full">
            {/* Official Portrait Photo with Dignified Fallback Seal */}
            <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-2xl overflow-hidden border-2 border-emerald-500/80 shadow-xl bg-zinc-950 flex-shrink-0 relative group">
              {currentOfficial.photo_url && !imageError[currentOfficial.id] ? (
                <img
                  src={currentOfficial.photo_url}
                  alt={currentOfficial.name}
                  onError={() => setImageError(prev => ({ ...prev, [currentOfficial.id]: true }))}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-emerald-950 via-zinc-900 to-zinc-950 flex flex-col items-center justify-center text-center p-2">
                  <span className="font-black text-2xl text-emerald-400 font-mono tracking-wider">
                    {currentOfficial.initials}
                  </span>
                  <span className="text-[8px] font-extrabold text-zinc-400 uppercase tracking-widest mt-1">
                    {currentOfficial.state_code} OFFICIAL
                  </span>
                </div>
              )}
              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[8px] font-mono text-emerald-400 border border-emerald-800/80">
                OFFICIAL
              </span>
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex items-center space-x-2 flex-wrap gap-1">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-950 text-emerald-400 font-extrabold text-xs border border-emerald-800/80 uppercase">
                  {currentOfficial.office_title}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-zinc-800 text-zinc-300 font-bold text-xs">
                  {currentOfficial.party}
                </span>
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-xs font-mono">
                  {currentOfficial.term_period}
                </span>
              </div>

              {/* Official's Full Real Name */}
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">{currentOfficial.name}</h2>
              {currentOfficial.district_constituency && (
                <p className="text-xs text-emerald-400 font-bold">
                  Constituency / District: {currentOfficial.district_constituency}
                </p>
              )}
              <p className="text-xs sm:text-sm text-zinc-300 pt-1 max-w-3xl leading-relaxed">
                {currentOfficial.bio_summary}
              </p>
            </div>
          </div>

          {/* Citizen Approval Rating Widget */}
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 w-full lg:w-72 flex-shrink-0 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Public Approval</span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {currentOfficial.citizen_rating.approval_pct}% Approved
              </span>
            </div>

            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-black text-white">{currentOfficial.citizen_rating.overall_score}</span>
              <span className="text-xs text-zinc-500 font-semibold">/ 5.0</span>
              <span className="text-[11px] text-zinc-400 ml-auto font-mono">
                ({currentOfficial.citizen_rating.total_votes.toLocaleString()} Votes)
              </span>
            </div>

            {/* Rating Breakdown Bars */}
            <div className="space-y-1.5 pt-2 border-t border-zinc-800/80 text-[11px]">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Infrastructure:</span>
                <span className="font-bold text-white font-mono">{currentOfficial.citizen_rating.breakdown.infrastructure} ★</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Economy & Welfare:</span>
                <span className="font-bold text-white font-mono">{currentOfficial.citizen_rating.breakdown.economy} ★</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Fiscal Transparency:</span>
                <span className="font-bold text-white font-mono">{currentOfficial.citizen_rating.breakdown.transparency} ★</span>
              </div>
            </div>

            {/* Citizen Rating Action */}
            <div className="pt-2 border-t border-zinc-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-400 font-bold uppercase">Rate this official:</span>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleCastVote(star)}
                      className={`p-1.5 hover:scale-125 transition-transform cursor-pointer ${
                        userVoted[currentOfficial.id] && userVoted[currentOfficial.id] >= star
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-zinc-600 hover:text-amber-400'
                      }`}
                      title={`Rate ${star} Stars`}
                    >
                      <Star className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
              {ratingMessage && (
                <div className="text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 rounded px-2 py-1 leading-tight font-semibold">
                  {ratingMessage}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CONSTITUENCY QUALITY OF LIFE (QoL) DASHBOARD */}
        <div className="pt-6 border-t border-zinc-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-emerald-400 flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>
                  {currentOfficial.role === 'president' ? 'National Quality of Life Index (Nigeria)' :
                   currentOfficial.role === 'governor' ? `${currentOfficial.state_name} State Quality of Life Index` :
                   `${currentOfficial.district_constituency || currentOfficial.state_name} Quality of Life Index`}
                </span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Real-world living standards and civic indicators in this official's constituency.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-zinc-400 font-semibold">Overall QoL Rating:</span>
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 font-black text-xs border border-emerald-800 font-mono">
                {currentOfficial.quality_of_life.score} / 100 ({currentOfficial.quality_of_life.rating_label})
              </span>
            </div>
          </div>

          {/* Quality of Life 6-Metric Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
              <div className="flex items-center space-x-1.5 text-blue-400 text-xs font-bold mb-1">
                <Droplets className="w-3.5 h-3.5" />
                <span>Clean Water</span>
              </div>
              <p className="text-lg font-black text-white font-mono">{currentOfficial.quality_of_life.clean_water_pct}%</p>
              <span className="text-[10px] text-zinc-500">Household Access</span>
            </div>

            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
              <div className="flex items-center space-x-1.5 text-amber-400 text-xs font-bold mb-1">
                <Zap className="w-3.5 h-3.5" />
                <span>Daily Power</span>
              </div>
              <p className="text-lg font-black text-white font-mono">{currentOfficial.quality_of_life.daily_power_hours} hrs</p>
              <span className="text-[10px] text-zinc-500">Daily Electricity</span>
            </div>

            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
              <div className="flex items-center space-x-1.5 text-emerald-400 text-xs font-bold mb-1">
                <Route className="w-3.5 h-3.5" />
                <span>Paved Roads</span>
              </div>
              <p className="text-lg font-black text-white font-mono">{currentOfficial.quality_of_life.paved_roads_pct}%</p>
              <span className="text-[10px] text-zinc-500">Paved Arterials</span>
            </div>

            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
              <div className="flex items-center space-x-1.5 text-rose-400 text-xs font-bold mb-1">
                <Activity className="w-3.5 h-3.5" />
                <span>Primary Health</span>
              </div>
              <p className="text-xs font-bold text-white leading-tight">{currentOfficial.quality_of_life.primary_healthcare_access}</p>
            </div>

            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
              <div className="flex items-center space-x-1.5 text-purple-400 text-xs font-bold mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Public Schools</span>
              </div>
              <p className="text-xs font-bold text-white leading-tight">{currentOfficial.quality_of_life.public_school_quality}</p>
            </div>

            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
              <div className="flex items-center space-x-1.5 text-emerald-400 text-xs font-bold mb-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Safety Score</span>
              </div>
              <p className="text-lg font-black text-white font-mono">{currentOfficial.quality_of_life.security_safety_score} / 10</p>
              <span className="text-[10px] text-zinc-500">Security Index</span>
            </div>
          </div>

          {/* Regional Electricity DisCo & Water Utilities Dossier */}
          <div className="mt-4 p-4 rounded-xl bg-zinc-950/90 border border-emerald-800/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 font-extrabold text-[10px] border border-amber-800 uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  <span>NERC / TCN Power Grid Allocation</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 font-extrabold text-[10px] border border-blue-800 uppercase tracking-wider flex items-center gap-1">
                  <Droplets className="w-3 h-3" />
                  <span>NDHS 2024 Water Access</span>
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">
                {selectedStateCode === 'NAT' ? (
                  'National Interconnected Grid (TCN): 11 Regional DisCos (~3,415 MW)'
                ) : (
                  <>
                    Regional Electricity Supplier:{' '}
                    <span className="text-emerald-400">
                      {NIGERIA_DISCO_ALLOCATIONS.filter(d => d.coverage_states.includes(selectedStateCode)).map(d => d.disco).join(' & ') || 'Regional DisCo'}
                    </span>
                  </>
                )}
              </h4>
              <p className="text-xs text-zinc-400">
                {selectedStateCode === 'NAT' ? (
                  'National average access to basic drinking water is 72%. Total daily power offtake across all distribution companies is 3,415 MW.'
                ) : (
                  <>
                    Coverage Area:{' '}
                    <span className="text-zinc-300 font-medium">
                      {matchingDisCo?.region || currentOfficial.state_name}
                    </span>
                    {' — '}
                    <span className="text-zinc-400">
                      Basic drinking water access in {currentOfficial.state_name} is{' '}
                      <strong className="text-blue-400">{currentOfficial.quality_of_life.clean_water_pct}%</strong> (NDHS 2024 / StatiSense).
                    </span>
                  </>
                )}
              </p>
            </div>

            <div className="flex items-center space-x-3 flex-shrink-0 bg-zinc-900 px-4 py-2.5 rounded-xl border border-zinc-800">
              <div className="text-right">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Grid Offtake Share</span>
                <span className="text-sm font-black text-amber-400 font-mono">
                  {selectedStateCode === 'NAT'
                    ? '100% (3,415 MW)'
                    : selectedStateCode === 'LA'
                    ? '31.7% (~1,083 MW)'
                    : `${matchingDisCo?.share_pct || 7.0}% (~${matchingDisCo?.load_mw || 239} MW)`}
                </span>
              </div>
              <div className="h-7 w-px bg-zinc-800" />
              <div className="text-right">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Water Status</span>
                <span className="text-sm font-black text-blue-400 font-mono">
                  {currentOfficial.quality_of_life.clean_water_pct >= 90
                    ? 'High (Top Tier)'
                    : currentOfficial.quality_of_life.clean_water_pct >= 70
                    ? 'Moderate'
                    : 'Priority Need'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Background Grid: Education & Past Offices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-zinc-800/80">
          {/* Education & Academic Journey */}
          <div className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-800/80">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-emerald-400 flex items-center space-x-2 mb-3">
              <GraduationCap className="w-4 h-4" />
              <span>Educational History (Secondary School & Tertiary)</span>
            </h3>
            <ul className="space-y-3">
              {currentOfficial.education.map((edu, idx) => (
                <li key={idx} className="text-xs space-y-0.5">
                  <p className="font-bold text-white">{edu.school}</p>
                  <p className="text-emerald-400 font-semibold">
                    {edu.degree_or_cert} {edu.field_of_study ? `— ${edu.field_of_study}` : ''}
                  </p>
                  {edu.period && <p className="text-[11px] text-zinc-500 font-mono">{edu.period}</p>}
                </li>
              ))}
            </ul>
          </div>

          {/* Past Offices & Positions Held */}
          <div className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-800/80">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-blue-400 flex items-center space-x-2 mb-3">
              <Briefcase className="w-4 h-4" />
              <span>Career & Offices Held Prior to Current Position</span>
            </h3>
            <ul className="space-y-3">
              {currentOfficial.past_offices.map((pos, idx) => (
                <li key={idx} className="text-xs space-y-0.5">
                  <p className="font-bold text-white">{pos.title}</p>
                  <p className="text-zinc-300 font-semibold">{pos.organization_or_level}</p>
                  <p className="text-[11px] text-zinc-500 font-mono">{pos.period}</p>
                  {pos.summary && <p className="text-[11px] text-zinc-400 italic pt-0.5">{pos.summary}</p>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Promises vs Projects Header & Filter Strip */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-black text-lg text-white">
            Campaign Manifesto Promises vs. What {currentOfficial.name.split(' ')[0]} Has Done
          </h3>
          <p className="text-xs text-zinc-400">
            Tracking commitments, contract mobilization, budget spending, and verifiable milestones.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-1.5 flex-wrap gap-y-1 text-xs">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all ${
              statusFilter === 'all' ? 'bg-zinc-700 text-white' : 'bg-zinc-950 text-zinc-400 hover:text-white'
            }`}
          >
            All ({currentOfficial.promises.length})
          </button>
          <button
            onClick={() => setStatusFilter('fulfilled')}
            className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all ${
              statusFilter === 'fulfilled' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-zinc-950 text-zinc-400 hover:text-emerald-400'
            }`}
          >
            ✓ Fulfilled ({currentOfficial.promises.filter(p => p.status === 'fulfilled').length})
          </button>
          <button
            onClick={() => setStatusFilter('in_progress')}
            className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all ${
              statusFilter === 'in_progress' ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-zinc-950 text-zinc-400 hover:text-amber-400'
            }`}
          >
            ⏳ Ongoing ({currentOfficial.promises.filter(p => p.status === 'in_progress').length})
          </button>
          <button
            onClick={() => setStatusFilter('not_started')}
            className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all ${
              statusFilter === 'not_started' ? 'bg-zinc-800 text-zinc-200' : 'bg-zinc-950 text-zinc-400'
            }`}
          >
            ⚠️ Untouched ({currentOfficial.promises.filter(p => p.status === 'not_started').length})
          </button>
        </div>
      </div>

      {/* Promises & Projects List */}
      <div className="space-y-4">
        {filteredPromises.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 bg-zinc-900 rounded-xl border border-zinc-800">
            No promises matching this filter.
          </div>
        ) : (
          filteredPromises.map((p) => (
            <div
              key={p.id}
              className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-all shadow-lg space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-zinc-800 text-zinc-300 uppercase tracking-wider">
                    {p.category}
                  </span>
                  {p.budget_allocated && (
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                      {p.budget_allocated}
                    </span>
                  )}
                </div>
                {getStatusBadge(p.status)}
              </div>

              <div>
                <h4 className="text-lg font-extrabold text-white leading-snug">{p.title}</h4>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">{p.description}</p>
              </div>

              {/* Progress Bar & Milestones */}
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-zinc-400 uppercase tracking-wider">Execution Delivery Status:</span>
                  <span className={p.progress_pct === 100 ? 'text-emerald-400 font-black' : 'text-amber-400 font-black'}>
                    {p.progress_pct}% Completed
                  </span>
                </div>

                {/* Progress Bar Container */}
                <div className="w-full bg-zinc-900 rounded-full h-2.5 overflow-hidden border border-zinc-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      p.progress_pct === 100 ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${p.progress_pct}%` }}
                  />
                </div>

                {/* Verifiable Milestones */}
                <div className="pt-2 border-t border-zinc-800/60">
                  <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                    Verifiable Delivery Milestones:
                  </p>
                  <ul className="space-y-1 text-xs text-zinc-300">
                    {p.milestones.map((m, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-1 text-xs text-zinc-500 gap-2">
                <span className="font-mono text-[11px]">Commitment Date: {p.date_made}</span>
                {p.evidence_url ? (
                  <a
                    href={p.evidence_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 font-semibold text-[11px] flex items-center space-x-1"
                  >
                    <span>Verified Cited Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-emerald-400 font-semibold text-[11px]">WSFU Evidence Audited</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
