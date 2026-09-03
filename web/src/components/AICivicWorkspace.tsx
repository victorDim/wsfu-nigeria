import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  RefreshCw,
  Plus,
  Trash2,
  Clock,
  MessageSquare,
  Copy,
  Check,
  Compass
} from 'lucide-react';

import { callAIAsk } from '../lib/api';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

const STORAGE_KEY = 'wsfu_ai_chat_sessions_v2';

const DEFAULT_WELCOME_MESSAGE: ChatMessage = {
  id: 'msg-welcome',
  sender: 'ai',
  text: (
    "👋 **Welcome to the WSFU Research & Accountability Desk.**\n\n" +
    "This desk provides grounded analysis of Nigerian public records, statutory provisions, and fiscal disbursements. Here are key investigations you can run:\n\n" +
    "• **Monthly FAAC & Internally Generated Revenue:** Compare state revenues, debt deductions, and per-capita allocations.\n" +
    "• **Executive Manifesto & Promise Audits:** Review tracked infrastructure, education, and healthcare milestones.\n" +
    "• **Statutory & Legal Analysis:** Break down the Supreme Court LGA financial autonomy judgment, FOI Act 2011, or Tax Reform bills.\n" +
    "• **FOI Notice Drafting:** Structure statutory Section 1 Freedom of Information requests for public records.\n\n" +
    "_Inquiries can be made in English, Nigerian Pidgin, Yoruba, Hausa, or Igbo. What would you like to investigate?_"
  ),
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

export const AICivicWorkspace: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load chat sessions', e);
    }
    const initialSession: ChatSession = {
      id: 'session-' + Date.now(),
      title: 'New Governance Inquiry',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [DEFAULT_WELCOME_MESSAGE]
    };
    return [initialSession];
  });

  const [activeSessionId, setActiveSessionId] = useState<string>(() => sessions[0]?.id || 'default');
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error('Failed to persist chat sessions', e);
    }
  }, [sessions]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages, loading]);

  const handleNewChat = () => {
    const newSession: ChatSession = {
      id: 'session-' + Date.now(),
      title: 'New Governance Inquiry',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [DEFAULT_WELCOME_MESSAGE]
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
  };

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (sessions.length <= 1) {
      handleNewChat();
      return;
    }
    const filtered = sessions.filter(s => s.id !== sessionId);
    setSessions(filtered);
    if (activeSessionId === sessionId) {
      setActiveSessionId(filtered[0].id);
    }
  };

  const handleSend = async (overrideQuery?: string) => {
    const q = (overrideQuery || inputQuery).trim();
    if (!q) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const isFirstUserMsg = activeSession.messages.filter(m => m.sender === 'user').length === 0;
    const sessionTitle = isFirstUserMsg ? q.slice(0, 36) + (q.length > 36 ? '...' : '') : activeSession.title;

    setSessions(prev =>
      prev.map(s => {
        if (s.id === activeSession.id) {
          return {
            ...s,
            title: sessionTitle,
            updatedAt: new Date().toISOString(),
            messages: [...s.messages, userMsg]
          };
        }
        return s;
      })
    );

    setInputQuery('');
    setLoading(true);

    try {
      const historyContext = activeSession.messages.map(m => ({ sender: m.sender, text: m.text }));
      const res = await callAIAsk(q, historyContext);

      const aiMsg: ChatMessage = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: res.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setSessions(prev =>
        prev.map(s => {
          if (s.id === activeSession.id) {
            return {
              ...s,
              updatedAt: new Date().toISOString(),
              messages: [...s.messages, aiMsg]
            };
          }
          return s;
        })
      );
    } catch {
      // Fallback response
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string, id: string) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <div className="space-y-6">
      {/* Workspace Header */}
      <div className="bg-[#0e1017] border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>Public Records & Legal Intelligence</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-serif-editorial font-bold text-white tracking-tight">
            Governance & Fiscal Research Desk
          </h1>
          <p className="text-xs text-zinc-400 max-w-xl">
            Query Nigerian state allocations, Supreme Court legal rulings, budget execution, and official promises.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden flex items-center space-x-1 px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-semibold text-xs rounded-xl border border-zinc-800 transition-all cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Inquiries</span>
          </button>

          <button
            onClick={handleNewChat}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>New Inquiry</span>
          </button>
        </div>
      </div>

      {/* Main Workspace with Chat History Sidebar + Conversation Thread */}
      <div className="bg-[#0f1117] border border-zinc-800/80 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row h-[660px]">
        {/* Chat History Sidebar */}
        <div
          className={`${
            sidebarOpen ? 'w-full md:w-64' : 'hidden md:block md:w-0'
          } bg-[#090a0d] border-r border-zinc-800 transition-all duration-300 flex flex-col flex-shrink-0`}
        >
          <div className="p-3.5 border-b border-zinc-800/80 flex items-center justify-between">
            <span className="text-xs uppercase font-bold text-zinc-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Saved Inquiries</span>
            </span>
            <button
              onClick={handleNewChat}
              title="Start New Inquiry"
              className="p-1 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-900 rounded transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {sessions.map(s => {
              const isActive = s.id === activeSessionId;
              return (
                <div
                  key={s.id}
                  onClick={() => setActiveSessionId(s.id)}
                  className={`group flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-zinc-800 text-emerald-400 border border-zinc-700'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center space-x-2 overflow-hidden pr-2">
                    <MessageSquare className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`} />
                    <span className="truncate">{s.title}</span>
                  </div>

                  <button
                    onClick={(e) => handleDeleteSession(s.id, e)}
                    title="Delete Inquiry"
                    className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-rose-400 transition-opacity cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Conversation Area */}
        <div className="flex-1 flex flex-col h-full bg-[#0f1117] overflow-hidden">
          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {activeSession.messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-fadeIn`}
                >
                  <div
                    className={`max-w-[95%] sm:max-w-[85%] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-lg relative group ${
                      isUser
                        ? 'bg-emerald-600 text-white rounded-br-none'
                        : 'bg-[#08090c] text-zinc-200 rounded-bl-none border border-zinc-800/80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2 opacity-60 text-[10px] font-mono">
                      <span>{isUser ? 'Citizen Inquiry' : 'WSFU Public Records Desk'}</span>
                      <span>{m.timestamp}</span>
                    </div>

                    <div className="whitespace-pre-line font-sans leading-relaxed space-y-2">
                      {m.text}
                    </div>

                    <button
                      onClick={() => handleCopy(m.text, m.id)}
                      title="Copy response"
                      className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 p-1.5 bg-zinc-900 text-zinc-400 hover:text-white rounded-lg border border-zinc-700 transition-all cursor-pointer text-xs"
                    >
                      {copiedId === m.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center space-x-2 bg-[#08090c] text-zinc-300 p-3 rounded-2xl border border-zinc-800 w-52 text-xs">
                <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" />
                <span>Querying public archives...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Inquiry Suggestions */}
          <div className="bg-[#090a0d] px-4 py-2 border-t border-zinc-800 flex items-center space-x-2 overflow-x-auto text-xs">
            <span className="text-[10px] uppercase font-bold text-zinc-500 font-mono flex-shrink-0">
              Inquire:
            </span>
            {[
              'Compare Lagos vs Rivers FAAC',
              'Explain Supreme Court LGA autonomy ruling',
              'Where does FAAC VAT revenue come from?',
              'Has NELFUND student loan worked?'
            ].map((sug, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(sug)}
                className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 hover:border-zinc-700 rounded-lg whitespace-nowrap transition-colors cursor-pointer text-xs flex-shrink-0"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="bg-[#090a0d] p-3 sm:p-4 border-t border-zinc-800 flex items-center space-x-2 flex-shrink-0"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={e => setInputQuery(e.target.value)}
              placeholder="Ask anything about Nigerian budgets, FAAC allocations, official promises, or laws..."
              className="flex-1 bg-[#12141c] border border-zinc-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !inputQuery.trim()}
              className="px-4 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-500/20 flex items-center space-x-1"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Ask Desk</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
