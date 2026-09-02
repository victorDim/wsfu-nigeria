import React, { useState, useEffect } from 'react';
import { Check, X, Sparkles, MapPin } from 'lucide-react';
import { ALL_NIGERIAN_STATES } from '../lib/api';


export interface UserPreferences {
  followedCategories: string[];
  selectedStateCode: string;
  hasCompletedOnboarding: boolean;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  followedCategories: [
    'Government Spending',
    'Anti-Corruption',
    'Power & Infrastructure',
    'Education & Youth',
    'National'
  ],
  selectedStateCode: 'LA',
  hasCompletedOnboarding: false
};

const ALL_CATEGORIES = [
  { id: 'Government Spending', label: 'Public Spending & FAAC', icon: '🏛️' },
  { id: 'Anti-Corruption', label: 'Anti-Corruption & EFCC/ICPC', icon: '⚖️' },
  { id: 'Power & Infrastructure', label: 'Power & Infrastructure', icon: '⚡' },
  { id: 'Education & Youth', label: 'Education & Student Loans', icon: '🎓' },
  { id: 'Agriculture & Food', label: 'Agriculture & Food Prices', icon: '🌾' },
  { id: 'Security & Defense', label: 'Security & Border Control', icon: '🛡️' },
  { id: 'National', label: 'National Governance', icon: '🇳🇬' }
];

interface UserPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (prefs: UserPreferences) => void;
  initialPreferences?: UserPreferences;
}

export const UserPreferencesModal: React.FC<UserPreferencesModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialPreferences
}) => {
  const [preferences, setPreferences] = useState<UserPreferences>(initialPreferences || DEFAULT_PREFERENCES);

  useEffect(() => {
    if (initialPreferences) {
      setPreferences(initialPreferences);
    }
  }, [initialPreferences]);

  if (!isOpen) return null;

  const toggleCategory = (catId: string) => {
    setPreferences(prev => {
      const exists = prev.followedCategories.includes(catId);
      const updated = exists
        ? prev.followedCategories.filter(c => c !== catId)
        : [...prev.followedCategories, catId];
      return { ...prev, followedCategories: updated.length > 0 ? updated : [catId] };
    });
  };

  const handleSave = () => {
    const saved = { ...preferences, hasCompletedOnboarding: true };
    localStorage.setItem('wsfu_user_preferences', JSON.stringify(saved));
    onSave(saved);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
          aria-label="Close preferences"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 font-extrabold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>PERSONALIZE YOUR CITIZEN WIRE</span>
          </div>
          <h2 className="text-2xl font-black text-white">Civic Topic Preferences</h2>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
            Select the accountability topics and home state you care about most. We will tailor your feed without harvesting private data.
          </p>
        </div>

        {/* Categories Selector */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
            Followed Topics:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {ALL_CATEGORIES.map(cat => {
              const isSelected = preferences.followedCategories.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all text-left cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/50'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* State Interest Selector */}
        <div className="space-y-2">
          <label className="flex items-center space-x-1.5 text-xs font-bold text-zinc-300 uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Primary State of Interest:</span>
          </label>
          <select
            value={preferences.selectedStateCode}
            onChange={e => setPreferences(prev => ({ ...prev, selectedStateCode: e.target.value }))}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-white font-bold focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            {ALL_NIGERIAN_STATES.filter(s => s.code !== 'NAT').map(st => (
              <option key={st.code} value={st.code}>
                {st.name} State ({st.geopolitical_zone})
              </option>
            ))}
          </select>
        </div>

        {/* Save & Apply Button */}
        <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-3">
          <span className="text-[11px] text-zinc-500">
            {preferences.followedCategories.length} topics followed
          </span>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            Save & Update My Feed
          </button>
        </div>
      </div>
    </div>
  );
};
