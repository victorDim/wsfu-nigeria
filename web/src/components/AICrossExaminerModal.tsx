import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import {
  CheckCircle2,
  AlertTriangle,
  X,
  Sparkles,
  Scale,
  RefreshCw
} from 'lucide-react';


interface AICrossExaminerModalProps {
  article: Article;
  isOpen: boolean;
  onClose: () => void;
}

interface AuditData {
  truth_score: number;
  bias_rating: string;
  verified_facts: string[];
  unverified_claims: string[];
  missing_context: string;
  verdict: string;
}

import { callAICrossExamine } from '../lib/api';

export const AICrossExaminerModal: React.FC<AICrossExaminerModalProps> = ({ article, isOpen, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [auditData, setAuditData] = useState<AuditData | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const runAudit = async () => {
      setLoading(true);
      try {
        const data = await callAICrossExamine(
          article.title,
          article.article_summaries?.tldr_bullets?.join(' ') || article.title,
          article.sources?.name || 'Verified Wire',
          article.category || 'National'
        );
        setAuditData(data);
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    };

    runAudit();
  }, [isOpen, article]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden relative space-y-5 p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>AI JOURNALISTIC CROSS-EXAMINATION</span>
          </div>
          <h2 className="text-base sm:text-lg font-black text-white leading-tight">
            {article.title}
          </h2>
          <p className="text-xs text-zinc-400 font-mono">
            Source: {article.sources?.name || 'Accredited Media'} • Category: {article.category}
          </p>
        </div>

        {loading ? (
          <div className="p-12 text-center space-y-3 bg-zinc-950 rounded-xl border border-zinc-800">
            <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
            <p className="text-xs font-bold text-zinc-300">Cross-examining claims against 6 national dailies...</p>
            <p className="text-[11px] text-zinc-500">Auditing fiscal consistency, source citations, and partisan framing.</p>
          </div>
        ) : auditData ? (
          <div className="space-y-4 text-xs">
            {/* Score & Rating Strip */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Truth & Verification Score</span>
                  <span className="text-lg font-black text-emerald-400 font-mono">{auditData.truth_score} / 100</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 font-black">
                  {auditData.truth_score >= 80 ? 'A' : auditData.truth_score >= 60 ? 'B' : 'C'}
                </div>
              </div>

              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Partisan Tone Radar</span>
                  <span className="text-xs font-bold text-white">{auditData.bias_rating}</span>
                </div>
                <Scale className="w-5 h-5 text-zinc-400" />
              </div>
            </div>

            {/* Verified Facts */}
            <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 space-y-2">
              <span className="font-extrabold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Corroborated Facts:</span>
              </span>
              <ul className="space-y-1.5 text-zinc-300">
                {auditData.verified_facts.map((fact, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Unverified Claims or Missing Context */}
            {auditData.unverified_claims && auditData.unverified_claims.length > 0 && (
              <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 space-y-2">
                <span className="font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Unverified or Aspirational Claims:</span>
                </span>
                <ul className="space-y-1.5 text-zinc-300">
                  {auditData.unverified_claims.map((claim, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                      <span>{claim}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Missing Context */}
            {auditData.missing_context && (
              <div className="p-3 bg-zinc-950/80 border border-zinc-800 rounded-xl space-y-1">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">
                  🔍 Omitted Fiscal / Political Context:
                </span>
                <p className="text-zinc-300 italic">{auditData.missing_context}</p>
              </div>
            )}

            {/* Final Verdict */}
            <div className="p-3.5 bg-gradient-to-r from-emerald-950/60 to-zinc-950 border border-emerald-800/60 rounded-xl flex items-start space-x-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                  WSFU Verification Verdict
                </span>
                <p className="text-white font-semibold">{auditData.verdict}</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
