import React, { useState } from 'react';
import { Article } from '../types';
import { ExternalLink, Share2, Sparkles, CheckCircle2, AlertCircle, Flame, Newspaper, Shield, Landmark, MessageSquare, Copy, Check } from 'lucide-react';
import { AICrossExaminerModal } from './AICrossExaminerModal';

interface NewsCardProps {
  article: Article;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const summary = article.article_summaries;
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);


  const getFormattedShareText = () => {
    let text = `🇳🇬 *WSFU CITIZEN ACCOUNTABILITY BRIEF*\n\n`;
    if (article.is_retracted) {
      text += `🚨 *NOTICE: THIS ARTICLE HAS BEEN RETRACTED*\n`;
      text += `📌 *Reason:* ${article.correction_note || 'Factual inaccuracies identified'}\n\n`;
    } else if (article.correction_note) {
      text += `⚠️ *EDITORIAL CORRECTION:* ${article.correction_note}\n\n`;
    }

    text += `📰 *${article.title.trim()}*\n`;
    text += `📡 *Source:* ${article.sources?.name || 'Verified Media'}\n\n`;

    if (summary?.tldr_bullets && summary.tldr_bullets.length > 0) {
      text += `⚡ *KEY FACTS:*\n`;
      summary.tldr_bullets.forEach(b => {
        text += `• ${b}\n`;
      });
      text += `\n`;
    }

    if (summary?.figures_mentioned && summary.figures_mentioned.length > 0) {
      text += `💰 *FIGURES:* ${summary.figures_mentioned.map(f => f.amount).join(', ')}\n\n`;
    }

    if (summary?.civic_impact) {
      text += `🌍 *CIVIC IMPACT:*\n${summary.civic_impact}\n\n`;
    }

    text += `🔍 Track this story & government spending on: ${window.location.origin}`;
    return text;
  };

  const handleWhatsAppShare = () => {
    const shareText = encodeURIComponent(getFormattedShareText());
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
  };

  const handleCopyText = async () => {
    const text = getFormattedShareText();
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = () => {
    const text = getFormattedShareText();
    if (navigator.share) {
      navigator.share({ title: article.title, text: text, url: window.location.href }).catch(() => {});
    } else {
      handleCopyText();
    }
  };

  return (
    <article className={`bg-zinc-900/90 border ${article.is_retracted ? 'border-rose-700/80 bg-rose-950/20' : article.correction_note ? 'border-amber-600/70' : 'border-zinc-800'} rounded-2xl overflow-hidden hover:border-zinc-700 transition-all shadow-lg flex flex-col md:flex-row`}>
      {/* Editorial Category / Hero Image Visual Header */}
      <div className="md:w-56 bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950/40 p-4 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-800 flex-shrink-0">
        <div>
          {article.image_url && !imgError ? (
            <div className="mb-3 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 h-28 relative">
              <img
                src={article.image_url}
                alt={article.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] text-zinc-300 font-mono">
                {article.sources?.name || 'Media'}
              </span>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              {article.category?.includes('Spending') || article.category?.includes('FAAC') ? (
                <Landmark className="w-5 h-5" />
              ) : article.category?.includes('Anti-Corruption') ? (
                <Shield className="w-5 h-5" />
              ) : (
                <Newspaper className="w-5 h-5" />
              )}
            </div>
          )}

          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-1">
            {article.category || 'CIVIC NEWS'}
          </span>
          <span className="text-xs font-black text-white leading-tight">
            {article.sources?.name || 'Verified Outlet'}
          </span>
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-800/80">
          {article.is_breaking && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-rose-600 text-white font-black text-[10px] uppercase tracking-wider rounded-md shadow-lg shadow-rose-900/50 mb-2">
              <Flame className="w-3 h-3" />
              <span>BREAKING</span>
            </span>
          )}
          <span className="text-[11px] text-zinc-500 font-mono block">
            {new Date(article.published_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Retraction Alert Banner */}
          {article.is_retracted && (
            <div className="mb-3 p-3 bg-rose-950/80 border border-rose-600 rounded-xl text-xs text-rose-200 flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-rose-300 font-black block uppercase tracking-wider text-[11px]">
                  RETRACTION NOTICE
                </strong>
                <p className="mt-0.5 leading-relaxed text-zinc-300">
                  {article.correction_note || 'This story has been formally retracted due to inaccuracies in the original source reporting.'}
                </p>
                {article.corrected_at && (
                  <span className="text-[10px] text-rose-400/80 font-mono block mt-1">
                    Retracted on {new Date(article.corrected_at).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Editorial Correction Alert Banner */}
          {!article.is_retracted && article.correction_note && (
            <div className="mb-3 p-3 bg-amber-950/70 border border-amber-600 rounded-xl text-xs text-amber-200 flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 font-black block uppercase tracking-wider text-[11px]">
                  EDITORIAL CORRECTION
                </strong>
                <p className="mt-0.5 leading-relaxed text-zinc-300">
                  {article.correction_note}
                </p>
                {article.corrected_at && (
                  <span className="text-[10px] text-amber-400/80 font-mono block mt-1">
                    Updated on {new Date(article.corrected_at).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Top Source & Corroboration Metadata */}
          <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              {summary?.corroboration_sources && summary.corroboration_sources.length > 0 && (
                <span className="flex items-center space-x-1 text-xs px-2.5 py-0.5 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-800/80 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Corroborated by {summary.corroboration_sources.join(', ')}</span>
                </span>
              )}
            </div>
          </div>


          {/* Article Title */}
          <h2 className="text-lg font-bold text-white leading-snug mb-3 hover:text-emerald-400 transition-colors">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1.5">
              {article.title}
              <ExternalLink className="w-4 h-4 mt-1 opacity-60 flex-shrink-0" />
            </a>
          </h2>

          {/* AI Structured Summary Section */}
          {summary && (
            <div className="space-y-3 bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80">
              {/* AI Badge & Highlighted Figures */}
              <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2 flex-wrap gap-2">
                <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Citizen Fact Brief</span>
                </div>
                {summary.figures_mentioned && summary.figures_mentioned.length > 0 && (
                  <div className="flex items-center space-x-1.5 flex-wrap">
                    {summary.figures_mentioned.map((f, i) => (
                      <span key={i} className="text-xs font-black font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        {f.amount}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 3 TLDR Bullets */}
              <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-300">
                {summary.tldr_bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start space-x-2 leading-relaxed">
                    <span className="text-emerald-500 font-bold mt-0.5">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Civic Impact Note */}
              <div className="pt-2 border-t border-zinc-800/60 flex items-start space-x-2 text-xs text-zinc-400 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-900/30">
                <AlertCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="text-emerald-300 font-bold">What this means for citizens: </strong>
                  <span>{summary.civic_impact}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer / Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 text-xs text-zinc-400">
          <div className="flex items-center space-x-1.5 flex-wrap gap-1">
            {summary?.actors_entities?.map((actor, idx) => (
              <span key={idx} className="px-2 py-0.5 bg-zinc-800 text-zinc-300 rounded-md font-mono text-[11px]">
                #{actor}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsAuditOpen(true)}
              title="AI Cross-Examine & Fact-Check Claims"
              className="flex items-center space-x-1 px-2.5 py-1.5 bg-gradient-to-r from-emerald-950 to-zinc-900 hover:from-emerald-900 hover:to-zinc-850 text-emerald-400 border border-emerald-800/60 rounded-lg transition-all font-bold text-xs cursor-pointer shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Fact-Check</span>
            </button>

            <button
              onClick={handleWhatsAppShare}
              title="Share to WhatsApp Groups"
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-all font-bold text-xs cursor-pointer shadow-md shadow-emerald-900/30"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleCopyText}
              title="Copy Brief Text"
              className="flex items-center space-x-1 px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-all font-bold text-xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            <button
              onClick={handleNativeShare}
              title="Share Story"
              className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* AI Cross-Examination & Fact-Check Modal */}
      <AICrossExaminerModal
        article={article}
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
      />
    </article>
  );

};

