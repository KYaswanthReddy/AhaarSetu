import React from 'react';

const LANGUAGES = [
  { code: 'te', label: 'తెలుగు (Telugu)' },
  { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'ta', label: 'தமிழ் (Tamil)' },
  { code: 'en', label: 'English' }
];

export default function LanguageSelector({ currentLang, onSelect }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-500 font-medium">🌐</span>
      <select
        value={currentLang}
        onChange={(e) => onSelect(e.target.value)}
        className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-1 px-2 rounded-md border-0 focus:ring-2 focus:ring-emerald-500 transition"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>{l.label}</option>
        ))}
      </select>
    </div>
  );
}
