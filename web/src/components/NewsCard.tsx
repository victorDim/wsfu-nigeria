import React, { useState } from 'react';
import { Article } from '../types';
import { ExternalLink, Share2, Scale, CheckCircle2, AlertCircle, Flame, Newspaper, Shield, Landmark, MessageSquare, Copy, Check } from 'lucide-react';
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
      text += `⚡ *KEY VERIFIED FACTS:*\n`;
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
    <article className={`bg-[#0f1117] border ${article.is_retracted ? 'border-rose-800/80 bg-rose-950/20' : article.correction_note ? 'border-amber-600/70' : 'border-zinc-800/80'} rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-200 shadow-xl flex flex-col md:flex-row group`}>
      {/* Editorial Thumbnail / Visual Column */}
      <div className="md:w-60 bg-[#0a0b0f] p-4 sm:p-5 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-800/80 flex-shrink-0">
        <div>
          {article.image_url && !imgError ? (
            <div className="mb-3 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 h-32 relative shadow-inner">
              <img
                src={article.image_url}
                alt={article.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm text-[10px] text-zinc-300 font-medium">
                {article.sources?.name || 'Media'}
              </span>
            </div>
          ) : (
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              {article.category?.includes('Spending') || article.category?.includes('FAAC') ? (
                <Landmark className="w-6 h-6" />
              ) : article.category?.includes('Anti-Corruption') ? (
                <Shield className="w-6 h-6" />
              ) : (
                <Newspaper className="w-6 h-6" />
              )}
            </div>
          )}

          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-emerald-400 tracking-wider uppercase block">
              {article.category || 'CIVIC NEWS'}
            </span>
            <span className="text-xs font-bold text-white leading-tight block">
              {article.sources?.name || 'Verified Wire'}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
          {article.is_breaking && (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 bg-rose-600/90 text-white font-black text-[10px] uppercase tracking-wider rounded shadow-sm">
              <Flame className="w-3 h-3" />
              <span>Breaking</span>
            </span>
          )}
          <span className="font-mono text-zinc-500 ml-auto">
            {new Date(article.published_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Retraction Alert Banner */}
          {article.is_retracted && (
            <div className="p-3 bg-rose-950/80 border border-rose-600 rounded-xl text-xs text-rose-200 flex items-start space-x-2.5">
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
            <div className="p-3 bg-amber-950/70 border border-amber-600 rounded-xl text-xs text-amber-200 flex items-start space-x-2.5">
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

          {/* Top Corroboration Badge */}
          {summary?.corroboration_sources && summary.corroboration_sources.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1.5 text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Corroborated by {summary.corroboration_sources.join(', ')}</span>
              </span>
            </div>
          )}

          {/* Editorial Headline */}
          <h2 className="text-xl sm:text-2xl font-serif-editorial font-bold text-white leading-tight tracking-tight hover:text-emerald-300 transition-colors">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-2">
              <span>{article.title}</span>
              <ExternalLink className="w-4 h-4 mt-1.5 opacity-50 flex-shrink-0 group-hover:opacity-100" />
            </a>
          </h2>

          {/* Structured Key Findings */}
          {summary && (
            <div className="space-y-3 bg-[#0a0b0f] p-4 rounded-xl border border-zinc-800/80">
              {/* Highlighted Figures Bar */}
              {summary.figures_mentioned && summary.figures_mentioned.length > 0 && (
                <div className="flex items-center space-x-2 pb-2.5 border-b border-zinc-800/80 flex-wrap gap-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 font-mono">
                    Audited Figures:
                  </span>
                  {summary.figures_mentioned.map((f, i) => (
                    <span key={i} className="text-xs font-black font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {f.amount}
                    </span>
                  ))}
                </div>
              )}

              {/* Concise Editorial Bullets */}
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                {summary.tldr_bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5 leading-relaxed">
                    <span className="text-emerald-400 font-bold mt-1 text-xs">◆</span>
                    <span className="text-zinc-200">{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Civic Impact Callout */}
              {summary.civic_impact && (
                <div className="pt-2 border-t border-zinc-800/80 flex items-start space-x-2.5 text-xs bg-emerald-950/15 p-3 rounded-lg border border-emerald-900/30">
                  <Landmark className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong className="text-emerald-300 font-bold">Why this matters to citizens: </strong>
                    <span className="text-zinc-300">{summary.civic_impact}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer / Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80 text-xs text-zinc-400 flex-wrap gap-2">
          <div className="flex items-center space-x-1.5 flex-wrap gap-1">
            {summary?.actors_entities?.slice(0, 4).map((actor, idx) => (
              <span key={idx} className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-md font-medium text-[11px]">
                {actor}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsAuditOpen(true)}
              title="Fact-Check & Claims Audit"
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-zinc-700/80 rounded-lg transition-all font-bold text-xs cursor-pointer shadow-sm hover:border-emerald-500/50"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Fact-Check</span>
            </button>

            <button
              onClick={handleWhatsAppShare}
              title="Share Factsheet to WhatsApp"
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-all font-bold text-xs cursor-pointer shadow-md shadow-emerald-950"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleCopyText}
              title="Copy Story Summary"
              className="flex items-center space-x-1 px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded-lg transition-all font-semibold text-xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleNativeShare}
              title="Share Story"
              className="p-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded-lg transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Claims Audit Modal */}
      <AICrossExaminerModal
        article={article}
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
      />
    </article>
  );
};
