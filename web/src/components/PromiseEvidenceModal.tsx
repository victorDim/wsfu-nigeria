import React, { useState } from 'react';
import { TrackedPromise, OfficialProfile } from '../types';
import {
  Camera,
  CheckCircle2,
  X,
  Send,
  AlertCircle,
  Link,
  MapPin
} from 'lucide-react';



interface PromiseEvidenceModalProps {
  promise: TrackedPromise;
  official: OfficialProfile;
  isOpen: boolean;
  onClose: () => void;
  onSubmitEvidence: (evidence: {
    promiseId: string;
    location: string;
    statusObservation: 'ongoing' | 'completed' | 'abandoned' | 'not_started';
    description: string;
    evidenceUrl?: string;
  }) => void;
}

export const PromiseEvidenceModal: React.FC<PromiseEvidenceModalProps> = ({
  promise,
  official,
  isOpen,
  onClose,
  onSubmitEvidence
}) => {
  const [location, setLocation] = useState('');
  const [statusObservation, setStatusObservation] = useState<'ongoing' | 'completed' | 'abandoned' | 'not_started'>('ongoing');
  const [description, setDescription] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !description) return;

    onSubmitEvidence({
      promiseId: promise.id,
      location,
      statusObservation,
      description,
      evidenceUrl: evidenceUrl.trim() || undefined
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-5 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <Camera className="w-4 h-4" />
            <span>CITIZEN GROUND-TRUTH AUDIT</span>
          </div>
          <h2 className="text-xl font-black text-white">
            Verify Local Project Execution
          </h2>
          <p className="text-xs text-zinc-400">
            Submit on-the-ground observations for <strong>{official.name}</strong>'s commitment:
          </p>
          <div className="p-2.5 bg-zinc-950 rounded-lg border border-zinc-800 text-xs font-semibold text-emerald-300 mt-2">
            "{promise.title}"
          </div>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-lg font-bold text-white">Citizen Evidence Logged!</h3>
            <p className="text-xs text-zinc-300">
              Your field observation has been recorded in the WSFU transparency verification queue.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Project Site Location */}
            <div className="space-y-1">
              <label className="font-bold text-zinc-300 uppercase tracking-wider block">
                Specific Location / LGA / Community *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="e.g. Aba-Port Harcourt Expressway, Osisioma LGA"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Observed Ground Status */}
            <div className="space-y-1">
              <label className="font-bold text-zinc-300 uppercase tracking-wider block">
                What is the Actual Status on the Ground? *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'ongoing', label: '🚧 Active Construction' },
                  { id: 'completed', label: '✅ Fully Commissioned' },
                  { id: 'abandoned', label: '🛑 Abandoned / Inactive' },
                  { id: 'not_started', label: '⚠️ No Sign of Work' }
                ].map(s => (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => setStatusObservation(s.id as any)}
                    className={`p-2.5 rounded-xl border text-left font-bold transition-all cursor-pointer ${
                      statusObservation === s.id
                        ? 'bg-emerald-500 text-black border-emerald-400'
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Description */}
            <div className="space-y-1">
              <label className="font-bold text-zinc-300 uppercase tracking-wider block">
                Field Notes & Observations *
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe current activity, road condition, equipment present, or contractor presence..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Photo / Evidence URL */}
            <div className="space-y-1">
              <label className="font-bold text-zinc-300 uppercase tracking-wider block">
                Photo URL / Document Link (Optional)
              </label>
              <div className="relative">
                <Link className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                <input
                  type="url"
                  value={evidenceUrl}
                  onChange={e => setEvidenceUrl(e.target.value)}
                  placeholder="https://x.com/photo/123 or Google Drive / Cloud Link"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl flex items-start space-x-2 text-[11px] text-zinc-400">
              <AlertCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                Evidence submissions are reviewed for anti-defamation and corroborated against local government reports before publication.
              </span>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit Ground-Truth Evidence</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
