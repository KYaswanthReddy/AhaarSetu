import React, { useState } from 'react';

export default function VoiceRecorder({ onTranscript }) {
  const [listening, setListening] = useState(false);

  const toggleListen = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please use Chrome on Android.');
      return;
    }
    setListening(!listening);
  };

  return (
    <button
      onClick={toggleListen}
      type="button"
      className={`w-full py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-3 shadow-md transition-all ${
        listening
          ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
      }`}
    >
      <span className="text-2xl">{listening ? '⏹️' : '🎙️'}</span>
      <span>{listening ? 'Listening... Tap to Stop' : 'Speak Batch Details'}</span>
    </button>
  );
}
