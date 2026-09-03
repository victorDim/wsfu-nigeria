import React, { useState } from 'react';
import { Scale, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const TakedownPortal: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [url, setUrl] = useState('');
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (name && email && url && reason) {
      setSubmitting(true);
      try {
        const { error } = await supabase.from('takedown_requests').insert({
          requester_name: name,
          requester_email: email,
          organization: org || null,
          article_url: url,
          reason: reason,
          status: 'pending'
        });
        if (error) {
          throw error;
        }
        setSubmitted(true);
      } catch (err: any) {
        setSubmitError(err?.message || 'Unable to submit dispute notice. Please verify network connection and try again.');
      } finally {
        setSubmitting(false);
      }
    }
  };


  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
          <Scale className="w-4 h-4" />
          <span>PUBLISHER RIGHTS & EDITORIAL GOVERNANCE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Content Takedown & Publisher Dispute Request</h1>
        <p className="text-xs text-zinc-400 mt-1">
          If you are an authorized representative of a news outlet or named entity objecting to aggregated excerpts, submit a formal dispute below. Requests are evaluated within 24 hours.
        </p>
      </div>

      {submitted ? (
        <div className="bg-emerald-950/40 border border-emerald-800 rounded-2xl p-8 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
          <h3 className="text-xl font-bold text-white">Takedown Request Submitted</h3>
          <p className="text-xs text-zinc-300 max-w-md mx-auto">
            Your notice has been routed directly to the internal WSFU editorial compliance queue. Our legal desk will review the cited URL and respond to {email} within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          {submitError && (
            <div className="bg-rose-950/60 border border-rose-800 rounded-xl p-3 text-xs text-rose-300 font-medium">
              ⚠️ {submitError}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Authorized Representative Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Legal Counsel / Editor"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Official Contact Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="legal@publisher.com"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">Publisher / Media Organization</label>
            <input
              type="text"
              required
              value={org}
              onChange={e => setOrg(e.target.value)}
              placeholder="e.g. Media House or Entity"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">Cited Article URL on WSFU or Original Outlet</label>
            <input
              type="url"
              required
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">Detailed Reason for Objection / Correction</label>
            <textarea
              rows={4}
              required
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="State the factual error, retraction notice, or copyright basis..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 text-xs"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
          >
            {submitting ? 'Submitting Dispute...' : 'Submit Formal Notice'}
          </button>
        </form>
      )}
    </div>
  );
};
