import React, { useState } from 'react';

export default function App() {
  const [lang, setLang] = useState('te');
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4">
      <header className="flex justify-between items-center py-3 border-b mb-4">
        <h1 className="text-xl font-bold text-emerald-700">AhaarSetu AI</h1>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="border rounded px-2 py-1 bg-white text-sm"
        >
          <option value="te">తెలుగు (Telugu)</option>
          <option value="kn">ಕನ್ನಡ (Kannada)</option>
          <option value="hi">हिन्दी (Hindi)</option>
          <option value="ta">தமிழ் (Tamil)</option>
          <option value="en">English</option>
        </select>
      </header>

      <main className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
          <p className="text-sm font-medium text-slate-500 mb-2">Step {activeStep} of 4</p>
          <h2 className="text-lg font-semibold mb-4">Voice Batch Intake</h2>
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2">
            <span>🎙️</span> Speak Recipe
          </button>
        </div>
      </main>
    </div>
  );
}
