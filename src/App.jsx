import { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';
import { buildSystemPrompt } from './knowledgeBase';

// ─── MODE CONFIGURATION ──────────────────────────────────────
const MODES = {
  'lead-scorer': {
    id: 'lead-scorer',
    label: 'Lead Scorer',
    icon: '🎯',
    color: 'from-emerald-500 to-teal-600',
    badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    description: 'Paste lead details and get an instant score out of 10 with clear reasoning and fit analysis.',
    placeholder: 'Paste lead info here...\n\nExample:\nCompany: GrowthLoop\nIndustry: B2B SaaS\nEmployees: 30\nSales Team: 3 people\nTools: Slack, HubSpot, ClickUp\nDecision Maker: Founder\nPain Points: Manual outreach, no automation',
    example: 'Company: DataPulse, B2B SaaS, 80 employees, 6-person sales team using Slack + HubSpot + Notion. VP Sales is the decision maker. They struggle with repetitive outreach and manual reporting.',
  },
  'outreach': {
    id: 'outreach',
    label: 'Outreach Email',
    icon: '✉️',
    color: 'from-blue-500 to-indigo-600',
    badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    description: 'Generate personalized cold emails with subject line, body, and CTA — optimized from real performance data.',
    placeholder: 'Enter prospect details...\n\nExample:\nProspect: Sarah Chen, Head of Growth\nCompany: CloudSync (B2B SaaS, 45 employees)\nPain Point: Spending 10+ hours/week on manual lead follow-ups\nContext: Just raised Series A',
    example: 'Prospect: Alex Rivera, VP Sales at InsightLayer. They\'re a 40-person B2B SaaS company that just hit $1M ARR. Pain point: transitioning from inbound-only to outbound, no outreach automation.',
  },
  'brief': {
    id: 'brief',
    label: 'Sales Brief',
    icon: '📋',
    color: 'from-violet-500 to-purple-600',
    badge: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
    description: 'Auto-generate a comprehensive sales brief with pain points, positioning, and talking points.',
    placeholder: 'Enter company name and any context...\n\nExample:\nCompany: BrightFunnel\nContext: Series A in progress, 55 employees, B2B SaaS. Need to 3x pipeline with same team size.',
    example: 'Generate a sales brief for PropelCRM — a 60-person B2B SaaS company that just acquired a competitor and needs to merge two sales processes.',
  },
  'icp-matcher': {
    id: 'icp-matcher',
    label: 'ICP Matcher',
    icon: '🔍',
    color: 'from-amber-500 to-orange-600',
    badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    description: 'Describe a lead and get a match percentage against the IdealCustomer Profile with detailed dimension breakdown.',
    placeholder: 'Describe the lead...\n\nExample:\nCompany: MediaBlitz\nIndustry: AdTech\nSize: 90 employees\nSales Team: 7 people\nTools: Slack, Notion, HubSpot\nDecision Maker: VP Marketing\nPain: Campaign tracking, outreach automation',
    example: 'Check ICP match for SaaSMetrics: 25 employees, B2B SaaS, pre-seed. Founder-led, using Slack + HubSpot + ClickUp + Notion. Pain points: no CRM automation, manual lead scoring.',
  },
};

const MODE_LIST = Object.values(MODES);

// ─── GEMINI AI CLIENT ────────────────────────────────────────
// Fallback chain uses lightweight dev models first to save quota
const MODELS = ['gemini-2.0-flash-lite', 'gemini-2.5-flash-lite', 'gemini-2.0-flash'];

async function callGemini(messages, mode) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('API key not configured. Add VITE_GEMINI_API_KEY to your .env file.');
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
      return result.response.text();
    } catch (err) {
      const errStr = String(err?.message || err);
      errors.push({ model: modelName, msg: errStr });
      console.warn(`[OutreachIQ] ${modelName} failed:`, errStr.slice(0, 120));
      // Small delay before trying next model
      await new Promise(r => setTimeout(r, 1000));
      continue;
    }
  }

  // All models failed — pick the best error message
  const hasRateLimit = errors.some(e => e.msg.includes('429') || e.msg.includes('quota') || e.msg.includes('RESOURCE_EXHAUSTED'));
  const hasAuthError = errors.some(e => e.msg.includes('403') || e.msg.includes('PERMISSION_DENIED'));
  const hasNetworkError = errors.some(e => e.msg.includes('fetch') || e.msg.includes('network'));

  if (hasRateLimit) {
    throw new Error('API quota exhausted on all models. The free tier resets daily — please wait and try again, or upgrade your API plan at ai.google.dev.');
  }
  if (hasAuthError) {
    throw new Error('Invalid API key. Check your VITE_GEMINI_API_KEY in the .env file and get a valid key from ai.google.dev/aistudio.');
  }
  if (hasNetworkError) {
    throw new Error('Network error. Check your internet connection and try again.');
  }
  throw new Error('All AI models are currently unavailable. Please try again in a few minutes.');
}

// ─── APP COMPONENT ───────────────────────────────────────────
export default function App() {
  const [activeMode, setActiveMode] = useState('lead-scorer');
  const [chatHistories, setChatHistories] = useState({
    'lead-scorer': [],
    'outreach': [],
    'brief': [],
    'icp-matcher': [],
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const inputRef = useRef(null);
  const chatEndRef = useRef(null);
  const lastSentRef = useRef(null);

  const currentMessages = chatHistories[activeMode];
  const mode = MODES[activeMode];

  // Auto-focus input on mode switch
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeMode]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages, isLoading]);

  // Switch mode
  const switchMode = useCallback((modeId) => {
    setActiveMode(modeId);
    setError(null);
    setSidebarOpen(false);
  }, []);

  // Send message
  const sendMessage = useCallback(async (messageText) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setChatHistories(prev => ({
      ...prev,
      [activeMode]: [...prev[activeMode], userMessage],
    }));
    setInput('');
    setIsLoading(true);
    setError(null);
    lastSentRef.current = { text, mode: activeMode };

    try {
      const allMessages = [...chatHistories[activeMode], userMessage];
      const response = await callGemini(allMessages, activeMode);

      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setChatHistories(prev => ({
        ...prev,
        [activeMode]: [...prev[activeMode], userMessage, aiMessage].filter(
          (msg, idx, arr) => arr.findIndex(m => m.id === msg.id) === idx
        ),
      }));
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, activeMode, chatHistories]);

  // Retry
  const retry = useCallback(() => {
    if (lastSentRef.current) {
      setError(null);
      setChatHistories(prev => {
        const msgs = prev[lastSentRef.current.mode];
        const lastUserIdx = msgs.findLastIndex(m => m.role === 'user');
        return {
          ...prev,
          [lastSentRef.current.mode]: msgs.slice(0, lastUserIdx),
        };
      });
      setTimeout(() => sendMessage(lastSentRef.current.text), 100);
    }
  }, [sendMessage]);

  // Clear chat
  const clearChat = useCallback(() => {
    setChatHistories(prev => ({ ...prev, [activeMode]: [] }));
    setError(null);
  }, [activeMode]);

  // Copy to clipboard
  const copyToClipboard = useCallback((text, msgId) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }, [sendMessage]);

  // Format timestamp
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-screen flex bg-surface-900 text-gray-100 overflow-hidden">
      {/* ─── MOBILE OVERLAY ─────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ─── SIDEBAR ────────────────────────────────────── */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-72 bg-surface-800 border-r border-white/5
        flex flex-col transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-electric-500 to-electric-700 flex items-center justify-center text-lg font-bold shadow-lg shadow-electric-500/20">
              ⚡
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight">OutreachIQ</h1>
              <p className="text-[11px] text-gray-500 font-medium tracking-wide uppercase">by ThinklyLabs</p>
            </div>
          </div>
        </div>

        {/* Mode buttons */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          <p className="px-3 pt-2 pb-3 text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Agents</p>
          {MODE_LIST.map((m) => {
            const isActive = m.id === activeMode;
            const msgCount = chatHistories[m.id].length;
            return (
              <button
                key={m.id}
                onClick={() => switchMode(m.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-all duration-200 group relative
                  ${isActive
                    ? 'bg-electric-500/15 text-electric-400 shadow-sm'
                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                  }
                `}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-electric-500 rounded-r" />
                )}
                <span className="text-lg">{m.icon}</span>
                <span className="flex-1 text-left">{m.label}</span>
                {msgCount > 0 && (
                  <span className={`
                    text-[10px] px-1.5 py-0.5 rounded-full font-semibold
                    ${isActive ? 'bg-electric-500/20 text-electric-400' : 'bg-white/5 text-gray-500'}
                  `}>
                    {msgCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/5">
          <div className="text-[10px] text-gray-600 text-center">
            Powered by Gemini AI
          </div>
        </div>
      </aside>

      {/* ─── MAIN AREA ──────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between px-4 lg:px-6 py-3 border-b border-white/5 bg-surface-800/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-white/5 text-gray-400"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Mode badge */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${mode.badge}`}>
              <span>{mode.icon}</span>
              <span>{mode.label}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentMessages.length > 0 && (
              <button
                onClick={clearChat}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear
              </button>
            )}
          </div>
        </header>

        {/* ─── CHAT AREA ────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-4 lg:px-6 py-6">
          {currentMessages.length === 0 && !isLoading ? (
            /* Empty state */
            <div className="h-full flex items-center justify-center">
              <div className="max-w-md text-center animate-fade-in">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${mode.color} flex items-center justify-center text-3xl shadow-xl`}>
                  {mode.icon}
                </div>
                <h2 className="text-xl font-bold text-gray-100 mb-2">{mode.label}</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">{mode.description}</p>
                <button
                  onClick={() => sendMessage(mode.example)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-electric-500/10 hover:border-electric-500/30 hover:text-electric-400 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Try an example
                </button>
              </div>
            </div>
          ) : (
            /* Messages */
            <div className="max-w-3xl mx-auto space-y-5">
              {currentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex animate-fade-in ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-1' : 'order-0'}`}>
                    <div className={`
                      rounded-2xl px-4 py-3 text-sm leading-relaxed
                      ${msg.role === 'user'
                        ? 'bg-electric-500 text-white rounded-br-md'
                        : 'bg-surface-600 text-gray-200 rounded-bl-md border border-white/5'
                      }
                    `}>
                      {msg.role === 'assistant' ? (
                        <div className="prose prose-invert prose-sm max-w-none prose-headings:text-gray-100 prose-strong:text-gray-100 prose-p:text-gray-300 prose-li:text-gray-300 prose-code:text-electric-400 prose-code:bg-surface-800 prose-code:px-1 prose-code:rounded">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      )}
                    </div>

                    {/* Message footer */}
                    <div className={`flex items-center gap-2 mt-1.5 px-1 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-[10px] text-gray-600">{formatTime(msg.timestamp)}</span>
                      {msg.role === 'assistant' && (
                        <button
                          onClick={() => copyToClipboard(msg.content, msg.id)}
                          className="flex items-center gap-1 text-[10px] text-gray-600 hover:text-electric-400 transition-colors"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Copied
                            </>
                          ) : (
                            <>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              Copy
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-surface-600 rounded-2xl rounded-bl-md px-5 py-4 border border-white/5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-electric-500 rounded-full animate-bounce-dot dot-1" />
                      <div className="w-2 h-2 bg-electric-500 rounded-full animate-bounce-dot dot-2" />
                      <div className="w-2 h-2 bg-electric-500 rounded-full animate-bounce-dot dot-3" />
                    </div>
                  </div>
                </div>
              )}

              {/* Error banner */}
              {error && (
                <div className="animate-fade-in bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-red-300">{error}</span>
                  </div>
                  <button
                    onClick={retry}
                    className="text-xs font-semibold text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* ─── INPUT AREA ───────────────────────────────── */}
        <div className="border-t border-white/5 bg-surface-800/50 backdrop-blur-sm px-4 lg:px-6 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-end gap-2 bg-surface-700 rounded-2xl border border-white/5 focus-within:border-electric-500/40 transition-colors">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={mode.placeholder}
                rows={3}
                className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-600 px-4 py-3 outline-none min-h-[80px] max-h-[200px]"
              />
              <div className="flex flex-col items-center gap-1 pr-3 pb-3">
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  className={`
                    p-2.5 rounded-xl transition-all duration-200
                    ${input.trim() && !isLoading
                      ? 'bg-electric-500 text-white hover:bg-electric-600 shadow-lg shadow-electric-500/25'
                      : 'bg-white/5 text-gray-600 cursor-not-allowed'
                    }
                  `}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Input footer */}
            <div className="flex items-center justify-between mt-2 px-1">
              <span className="text-[10px] text-gray-600">
                <kbd className="px-1 py-0.5 rounded bg-white/5 font-mono text-[9px]">Enter</kbd> to send · <kbd className="px-1 py-0.5 rounded bg-white/5 font-mono text-[9px]">Shift+Enter</kbd> for new line
              </span>
              <span className={`text-[10px] font-mono ${input.length > 2000 ? 'text-red-400' : 'text-gray-600'}`}>
                {input.length.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
