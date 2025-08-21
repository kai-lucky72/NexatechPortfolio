/* Minimal Gemini client using fetch. Requires VITE_GEMINI_API_KEY in env. */
export type ChatMessage = { role: 'user' | 'model' | 'system'; content: string };

const GEMINI_MODEL = 'gemini-1.5-flash';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
// Fallback API key embedded per user's request. Env var overrides in production.
const HARDCODED_GEMINI_KEY = 'AIzaSyBRRpvc7VK2cYprQCON8RuBTRmoIR2Zi7A';
const API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || HARDCODED_GEMINI_KEY;

export async function generateFromGemini(
  systemPrompt: string,
  userText: string
): Promise<string> {
  if (!API_KEY) throw new Error('Missing Gemini API key.');

  const payload = {
    contents: [
      {
        role: 'user',
        parts: [{ text: `${systemPrompt}\n\nUser question: ${userText}` }],
      },
    ],
    generationConfig: {
      temperature: 0.3,
      topP: 0.9,
      maxOutputTokens: 512,
    },
  };

  const res = await fetch(`${API_URL}?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  return text.trim();
}
