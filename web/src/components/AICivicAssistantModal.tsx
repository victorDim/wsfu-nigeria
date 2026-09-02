import React, { useState } from 'react';
import {
  Send,
  X,
  Sparkles,
  RefreshCw,
  ExternalLink,
  BookOpen
} from 'lucide-react';

import { callAIAsk } from '../lib/api';

interface ResourceLink {
  title: string;
  url: string;
  domain?: string;
}

interface AICivicAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AICivicAssistantModal: React.FC<AICivicAssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; sources?: string[]; resource_links?: ResourceLink[] }>>([
    {
      sender: 'ai',
      text: (
        "👋 **Hello! I'm your WSFU Civic Intelligence Partner.**\n\n" +
        "Think of me as your go-to friend for understanding Nigerian governance, public money, and citizen rights. Whether you want to trace where your state's monthly FAAC allocation went, check if a Governor kept a campaign promise, or need help drafting an FOI letter — I'm right here with you.\n\n" +
        "_Feel free to chat with me in English or freely in Nigerian Pidgin, Yoruba, Hausa, or Igbo. What would you like to investigate today?_"
      )
    }
  ]);


  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (queryText?: string) => {
    const q = queryText || inputQuery;
    if (!q.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: q.trim() }]);
    setInputQuery('');
    setLoading(true);

    try {
      const historyContext = messages.map(m => ({ sender: m.sender, text: m.text }));
      const data = await callAIAsk(q.trim(), historyContext);
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: data.answer,
          sources: data.sources || ["Official Public Gazettes", "WSFU Intelligence"],
          resource_links: data.resource_links || []
        }
      ]);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };



  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-zinc-900 to-zinc-950 p-4 border-b border-zinc-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                <span>WSFU Civic Intelligence</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 font-mono px-1.5 py-0.5 rounded border border-emerald-800">
                  Verified Partner
                </span>
              </h3>
              <p className="text-xs text-zinc-400">Grounded Nigerian Governance & Fiscal Intelligence</p>
            </div>

          </div>

          <button
            onClick={onClose}
            className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Prompts Bar */}
        <div className="bg-zinc-950/80 px-4 py-2.5 border-b border-zinc-800 flex items-center space-x-2 overflow-x-auto text-xs font-semibold flex-shrink-0">
          <span className="text-[11px] text-zinc-500 font-mono uppercase pr-1">Try:</span>
          {[
            'Explain LGA autonomy ruling',
            'Compare Lagos vs Rivers FAAC',
            'Where does FAAC VAT come from?',
            'Has NELFUND student loan worked?'
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

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[90%] rounded-2xl p-4 text-xs leading-relaxed shadow-lg ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none'
                    : 'bg-zinc-950 text-zinc-200 rounded-bl-none border border-zinc-800'
                }`}
              >
                <p className="whitespace-pre-line font-sans">{m.text}</p>

                {/* Verified Clickable Resource Links */}
                {m.resource_links && m.resource_links.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-zinc-800/80 space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      <BookOpen className="w-3 h-3 text-emerald-400" />
                      <span>Verified Resources for Extensive Reading:</span>
                    </div>
                    <div className="space-y-1 pt-0.5">
                      {m.resource_links.map((link, lIdx) => (
                        <a
                          key={lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2 bg-zinc-900/90 hover:bg-emerald-950/60 border border-zinc-800 hover:border-emerald-700/60 rounded-lg text-xs text-zinc-300 hover:text-emerald-300 transition-all group/link"
                        >
                          <div className="truncate pr-2">
                            <span className="font-bold block truncate text-[11px]">{link.title}</span>
                            <span className="text-[9px] text-zinc-500 font-mono">{link.domain || link.url}</span>
                          </div>
                          <ExternalLink className="w-3 h-3 text-zinc-500 group-hover/link:text-emerald-400 flex-shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}



          {loading && (
            <div className="flex items-center space-x-2 bg-zinc-950 text-zinc-400 p-3 rounded-2xl border border-zinc-800 w-44 animate-pulse text-xs">
              <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>Analyzing records...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          className="bg-zinc-950 p-3 border-t border-zinc-800 flex items-center space-x-2 flex-shrink-0"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            placeholder="Ask anything about Nigerian budgets, laws, promises, or public contracts..."
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={loading || !inputQuery.trim()}
            className="px-4 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center space-x-1"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>
        </form>
      </div>
    </div>
  );
};
