import React, { useState } from 'react';
import { Article } from '../types';
import { Landmark, ShieldCheck, Zap, MessageSquare, Copy, Check, Calendar, ExternalLink } from 'lucide-react';


interface DailyDigestViewProps {
  articles: Article[];
}

export const DailyDigestView: React.FC<DailyDigestViewProps> = ({ articles }) => {
  const [copied, setCopied] = useState(false);
  const todayStr = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Categorize stories into executive pillars
  const spendingStories = articles.filter(a => a.category?.includes('Spending') || a.category?.includes('FAAC'));
  const corruptionStories = articles.filter(a => a.category?.includes('Anti-Corruption') || a.category?.includes('Power') || a.category?.includes('Security'));
  const generalCivicStories = articles.filter(a => !spendingStories.includes(a) && !corruptionStories.includes(a));

  const topSpending = spendingStories[0] || articles[0];
  const topCorruption = corruptionStories[0] || articles[1];
  const topCivic = generalCivicStories[0] || articles[2];

  const getDigestShareText = () => {
    let text = `🇳🇬 *WSFU DAILY CITIZEN DIGEST — ${todayStr.toUpperCase()}*\n`;
    text += `_Executive 24-Hour Summary of Nigerian Public Money & Governance_\n\n`;

    if (topSpending) {
      text += `🏛️ *1. PUBLIC SPENDING & TREASURY:*\n`;
      text += `• *Headline:* ${topSpending.title}\n`;
      if (topSpending.article_summaries?.civic_impact) {
        text += `• *Impact:* ${topSpending.article_summaries.civic_impact}\n`;
      }
      text += `\n`;
    }

    if (topCorruption) {
      text += `⚖️ *2. ACCOUNTABILITY & PROBES:*\n`;
      text += `• *Headline:* ${topCorruption.title}\n`;
      if (topCorruption.article_summaries?.civic_impact) {
        text += `• *Impact:* ${topCorruption.article_summaries.civic_impact}\n`;
      }
      text += `\n`;
    }

    if (topCivic) {
      text += `⚡ *3. CRITICAL SERVICES & CITIZEN ACTION:*\n`;
      text += `• *Headline:* ${topCivic.title}\n`;
      if (topCivic.article_summaries?.civic_impact) {
        text += `• *Impact:* ${topCivic.article_summaries.civic_impact}\n`;
      }
      text += `\n`;
    }

    text += `🔍 Read full corroborated reports & track 36 state FAAC disbursements on: ${window.location.origin}`;
    return text;
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(getDigestShareText());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopyDigest = async () => {
    const text = getDigestShareText();
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Executive Daily Digest Banner */}
      <div className="bg-[#0e1017] border border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1.5">
              <Calendar className="w-4 h-4" />
              <span>EXECUTIVE 24-HOUR CIVIC DIGEST • {todayStr}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-white tracking-tight">
              What Happened in Nigeria Today
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              A curated overview of public disbursements, statutory accountability investigations, and civic developments across Nigeria.
            </p>
          </div>

          <div className="flex items-center space-x-2 flex-wrap gap-2">
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center space-x-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-md shadow-emerald-950 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Share to WhatsApp</span>
            </button>

            <button
              onClick={handleCopyDigest}
              className="flex items-center space-x-1.5 px-3 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-semibold text-xs rounded-xl border border-zinc-800 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy Summary'}</span>
            </button>
          </div>
        </div>


        {/* 3 Executive Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Pillar 1: Public Spending */}
          {topSpending && (
            <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60 uppercase">
                    Public Money
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-white leading-snug">{topSpending.title}</h3>
                {topSpending.article_summaries?.civic_impact && (
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-3">
                    {topSpending.article_summaries.civic_impact}
                  </p>
                )}
              </div>
              <a
                href={topSpending.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-xs text-emerald-400 font-bold hover:underline pt-2 border-t border-zinc-800/80"
              >
                <span>Read Full Wire</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* Pillar 2: Accountability & Probes */}
          {topCorruption && (
            <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/60 uppercase">
                    Accountability
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-white leading-snug">{topCorruption.title}</h3>
                {topCorruption.article_summaries?.civic_impact && (
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-3">
                    {topCorruption.article_summaries.civic_impact}
                  </p>
                )}
              </div>
              <a
                href={topCorruption.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-xs text-amber-400 font-bold hover:underline pt-2 border-t border-zinc-800/80"
              >
                <span>Read Full Wire</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* Pillar 3: Infrastructure & Essential Services */}
          {topCivic && (
            <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/60 uppercase">
                    Infrastructure
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-white leading-snug">{topCivic.title}</h3>
                {topCivic.article_summaries?.civic_impact && (
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-3">
                    {topCivic.article_summaries.civic_impact}
                  </p>
                )}
              </div>
              <a
                href={topCivic.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-xs text-blue-400 font-bold hover:underline pt-2 border-t border-zinc-800/80"
              >
                <span>Read Full Wire</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
