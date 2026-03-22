import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildSystemPrompt } from '../src/knowledgeBase.js';

// Fallback chain uses lightweight dev models first to save quota
const MODELS = ['gemini-2.0-flash-lite', 'gemini-2.5-flash-lite', 'gemini-2.0-flash'];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { messages, mode } = req.body;
  
  // Use Vercel's secure server-side environment variable (or VITE_ fallback if still named that)
  const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(401).json({ error: 'API key not configured on server.' });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const chatHistory = messages.slice(0, -1).map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }],
  }));
  const lastMessage = messages[messages.length - 1].content;

  const errors = [];
  for (const modelName of MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: buildSystemPrompt(mode),
      });
      const chat = model.startChat({ history: chatHistory });
      const result = await chat.sendMessage(lastMessage);
      
      return res.status(200).json({ text: result.response.text() });
    } catch (err) {
      const errStr = String(err?.message || err);
      errors.push({ model: modelName, msg: errStr });
      console.warn(`[Server ${modelName}] failed:`, errStr.slice(0, 120));
      await new Promise(r => setTimeout(r, 1000));
      continue;
    }
  }

  // Handle errors if all models failed
  const hasRateLimit = errors.some(e => e.msg.includes('429') || e.msg.includes('quota') || e.msg.includes('RESOURCE_EXHAUSTED'));
  const hasAuthError = errors.some(e => e.msg.includes('403') || e.msg.includes('PERMISSION_DENIED'));

  if (hasRateLimit) {
    return res.status(429).json({ error: 'API quota exhausted on all models.' });
  }
  if (hasAuthError) {
    return res.status(403).json({ error: 'Invalid API key on Vercel deployment.' });
  }
  
  return res.status(500).json({ error: 'All AI models are currently unavailable.', details: errors });
}
