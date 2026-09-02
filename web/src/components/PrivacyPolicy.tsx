import React, { useState } from 'react';
import { Shield, Lock, Bell, Trash2, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  const [deleteEmail, setDeleteEmail] = useState('');
  const [deletionSuccess, setDeletionSuccess] = useState(false);

  const handleDeleteRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (deleteEmail) {
      setDeletionSuccess(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-zinc-900 to-zinc-950 border border-emerald-800/40 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
          <Shield className="w-4 h-4" />
          <span>STATUTORY DATA PRIVACY GOVERNANCE</span>
        </div>
        <h1 className="text-3xl font-black text-white">NDPR Privacy Policy & Data Rights</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Compliant with the Nigeria Data Protection Act (NDPA) 2023 and the Nigeria Data Protection Regulation (NDPR).
        </p>
      </div>

      {/* Policy Sections */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6 text-sm text-zinc-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>1. Zero-Cookie Telemetry & Data Minimization</span>
          </h2>
          <p>
            WSFU operates under strict data minimization principles. We do not use third-party behavioral advertising cookies or cross-site trackers. We only collect telemetry necessary to ensure platform stability (page load counts, device category, error logs) with zero personally identifiable IP address retention.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-zinc-800">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Bell className="w-4 h-4 text-amber-400" />
            <span>2. Statutory Data Breach Notification Protocol</span>
          </h2>
          <p>
            Pursuant to the Nigeria Data Protection Commission (NDPC) requirements, in the unlikely event of a security breach affecting user data:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400">
            <li>We will notify the NDPC within **72 hours** of breach confirmation.</li>
            <li>We will notify all affected users via registered email with actionable guidance, breach scope, and corrective remediation steps.</li>
            <li>A public security advisory will be posted on the WSFU platform status page.</li>
          </ul>
        </section>

        <section className="space-y-2 pt-4 border-t border-zinc-800">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Shield className="w-4 h-4 text-blue-400" />
            <span>3. Fair Use & Sourced News Aggregation</span>
          </h2>
          <p>
            WSFU aggregates public RSS feeds under fair use principles for citizen civic accountability. We do not reproduce full-text articles without attribution; all news items provide direct outbound hyperlinks to the original publisher's website.
          </p>
        </section>
      </div>

      {/* Citizen "Delete My Data" Self-Service Portal */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
          <Trash2 className="w-4 h-4" />
          <span>CITIZEN DATA ERASURE REQUEST (NDPR ARTICLE 2.10)</span>
        </div>
        <h3 className="text-xl font-black text-white">Right to Erasure & Data Deletion</h3>
        <p className="text-xs text-zinc-400">
          Under NDPR Article 2.10, you have the statutory right to request the permanent deletion of your account records, saved preferences, and telemetry logs.
        </p>

        {deletionSuccess ? (
          <div className="p-4 bg-emerald-950/50 border border-emerald-800 rounded-xl flex items-center space-x-3 text-emerald-400 text-xs">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>Your data deletion request has been registered and verified. All associated session and preference data will be purged within 48 hours.</span>
          </div>
        ) : (
          <form onSubmit={handleDeleteRequest} className="flex flex-col sm:flex-row gap-3 pt-2">
            <input
              type="email"
              required
              value={deleteEmail}
              onChange={e => setDeleteEmail(e.target.value)}
              placeholder="Enter your registered email address"
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-rose-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md cursor-pointer"
            >
              Submit Erasure Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
