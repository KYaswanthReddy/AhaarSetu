/**
 * Bhashini ASR / TTS client wrapper for Indian regional languages
 */

const SUPPORTED_LANGUAGES = {
  te: 'telugu',
  kn: 'kannada',
  hi: 'hindi',
  ta: 'tamil',
  en: 'english'
};

export async function sendAudioToBhashini(audioBlob, sourceLanguage = 'te', apiKey, endpoint) {
  if (!apiKey || !endpoint) {
    console.warn('[Bhashini] Missing credentials. Falling back to browser speech recognition.');
    return null;
  }

  const formData = new FormData();
  formData.append('audio', audioBlob);
  formData.append('sourceLanguage', sourceLanguage);

  const response = await fetch(`${endpoint}/asr`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error(`Bhashini API error: ${response.statusText}`);
  }

  const result = await response.json();
  return result.pipelineResponse?.[0]?.output?.[0]?.source || '';
}

export { SUPPORTED_LANGUAGES };
