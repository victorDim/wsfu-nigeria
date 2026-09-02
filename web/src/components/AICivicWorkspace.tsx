import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Send,
  RefreshCw,
  Plus,
  Trash2,
  Clock,
  MessageSquare,
  Copy,
  Check
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
    "👋 **Hello! I'm your WSFU Civic Intelligence Partner.**\n\n" +
    "Think of me as your go-to friend for understanding Nigerian governance, public money, and citizen rights. Whether you want to trace where your state's monthly FAAC allocation went, check if a Governor kept a campaign promise, or need help drafting an FOI letter — I'm right here with you.\n\n" +
    "• **Track State & LGA FAAC Allocations:** Where the money went, debt deductions, and per-capita spending power.\n" +
    "• **Audit Political Manifesto Promises:** Real-world delivery tracking for the President and Governors.\n" +
    "• **Demystify Nigerian Laws:** The Supreme Court LGA financial autonomy ruling, FOI Act 2011, Tax Reforms, and PIA in plain terms.\n" +
    "• **Draft Statutory Legal Notices:** Polished Section 1 FOI requests for official public records.\n\n" +
    "_Feel free to chat with me in English or freely in Nigerian Pidgin, Yoruba, Hausa, or Igbo. What would you like to investigate today?_"
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

  // Active Session
  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error('Failed to persist chat sessions', e);
    }
  }, [sessions]);

  // Scroll to bottom on new messages
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
    const updated = sessions.filter(s => s.id !== sessionId);
    if (updated.length === 0) {
      const fresh: ChatSession = {
        id: 'session-' + Date.now(),
        title: 'New Governance Inquiry',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [DEFAULT_WELCOME_MESSAGE]
      };
      setSessions([fresh]);
      setActiveSessionId(fresh.id);
    } else {
      setSessions(updated);
      if (activeSessionId === sessionId) {
        setActiveSessionId(updated[0].id);
      }
    }
  };

  const handleCopy = async (text: string, msgId: string) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopiedId(msgId);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleSend = async (queryText?: string) => {
    const q = queryText || inputQuery;
    if (!q.trim()) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: q.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Auto-update session title if it's the first citizen prompt
    const isFirstUserMsg = activeSession.messages.filter(m => m.sender === 'user').length === 0;
    const newTitle = isFirstUserMsg
      ? q.trim().length > 30 ? q.trim().slice(0, 30) + '...' : q.trim()
      : activeSession.title;

    const updatedMessages = [...activeSession.messages, userMsg];

    setSessions(prev =>
      prev.map(s =>
        s.id === activeSessionId
          ? { ...s, title: newTitle, updatedAt: new Date().toISOString(), messages: updatedMessages }
          : s
      )
    );

    setInputQuery('');
    setLoading(true);

    try {
      // Pass previous turns for multi-turn conversational memory
      const historyContext = activeSession.messages.map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const data = await callAIAsk(q.trim(), historyContext);

      const aiMsg: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'ai',
        text: data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };


      setSessions(prev =>
        prev.map(s =>
          s.id === activeSessionId
            ? { ...s, updatedAt: new Date().toISOString(), messages: [...s.messages, aiMsg] }
            : s
        )
      );
    } catch {
      // Fallback message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      {/* Workspace Header Strip */}
      <div className="bg-gradient-to-r from-emerald-950 via-zinc-900 to-zinc-950 border border-emerald-800/40 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>AI CIVIC INTELLIGENCE PARTNER</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Conversational Governance Brain
          </h1>
          <p className="text-xs text-zinc-400 max-w-xl">
            In-depth forensic accountability analysis, multi-turn memory, and verified statutory reference links.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden flex items-center space-x-1 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>History</span>
          </button>

          <button
            onClick={handleNewChat}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </button>
        </div>
      </div>

      {/* Main Workspace with Chat History Sidebar + Conversation Thread */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row h-[660px]">
        {/* Chat History Sidebar */}
        <div
          className={`${
            sidebarOpen ? 'w-full md:w-64' : 'hidden md:block md:w-0'
          } bg-zinc-950 border-r border-zinc-800 transition-all duration-300 flex flex-col flex-shrink-0`}
        >
          {/* Sidebar Header */}
          <div className="p-3.5 border-b border-zinc-800/80 flex items-center justify-between">
            <span className="text-xs font-mono uppercase font-bold text-zinc-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Chat History</span>
            </span>
            <button
              onClick={handleNewChat}
              title="Start New Chat"
              className="p-1 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-900 rounded transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Session List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {sessions.map(s => {
              const isActive = s.id === activeSessionId;
              return (
                <div
                  key={s.id}
                  onClick={() => setActiveSessionId(s.id)}
                  className={`group flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/50'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center space-x-2 overflow-hidden pr-2">
                    <MessageSquare className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`} />
                    <span className="truncate">{s.title}</span>
                  </div>

                  <button
                    onClick={(e) => handleDeleteSession(s.id, e)}
                    title="Delete Chat"
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
        <div className="flex-1 flex flex-col h-full bg-zinc-900 overflow-hidden">
          {/* Conversation Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            {activeSession.messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-fadeIn`}
                >
                  <div
                    className={`max-w-[95%] sm:max-w-[90%] rounded-2xl p-5 text-xs sm:text-sm leading-relaxed shadow-lg relative group ${
                      isUser
                        ? 'bg-emerald-600 text-white rounded-br-none'
                        : 'bg-zinc-950 text-zinc-200 rounded-bl-none border border-zinc-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2 opacity-60 text-[10px] font-mono">
                      <span>{isUser ? 'Citizen (You)' : 'WSFU Civic Partner'}</span>
                      <span>{m.timestamp}</span>
                    </div>

                    <div className="whitespace-pre-line font-sans leading-relaxed space-y-2">
                      {m.text}
                    </div>
                    {/* Copy Button */}
                    <button


                      onClick={() => handleCopy(m.text, m.id)}
                      title="Copy response"
                      className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 p-1.5 bg-zinc-900/90 text-zinc-400 hover:text-white rounded-lg border border-zinc-700 transition-all cursor-pointer text-xs"
                    >
                      {copiedId === m.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center space-x-2 bg-zinc-950 text-zinc-300 p-3.5 rounded-2xl border border-zinc-800 w-60 animate-pulse text-xs">
                <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" />
                <span>Compiling in-depth analysis & links...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Ideas */}
          <div className="px-4 py-2 bg-zinc-950/70 border-t border-zinc-800/80 flex items-center space-x-2 overflow-x-auto text-xs font-semibold flex-shrink-0">
            <span className="text-[11px] text-zinc-500 font-mono uppercase pr-1">Try:</span>
            {[
              'Comprehensive FAAC analysis of Lagos vs Rivers',
              'Explain Supreme Court LGA direct autonomy in Pidgin',
              'Step-by-step FOI request guide with Section 7 default penalties',
              'Audit Governor Alex Otti road infrastructure promises'
            ].map((prompt, pIdx) => (
              <button
                key={pIdx}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 bg-zinc-900 hover:bg-emerald-950 hover:text-emerald-300 text-zinc-300 border border-zinc-800 rounded-lg whitespace-nowrap transition-colors cursor-pointer text-xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="bg-zinc-950 p-3.5 border-t border-zinc-800 flex items-center space-x-2 flex-shrink-0"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={e => setInputQuery(e.target.value)}
              placeholder="Ask for an in-depth breakdown of any Nigerian budget, politician, law, or public project..."
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !inputQuery.trim()}
              className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center space-x-1.5 flex-shrink-0"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
