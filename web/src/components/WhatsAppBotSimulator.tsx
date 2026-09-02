import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  X,
  Bot
} from 'lucide-react';


export const WhatsAppBotSimulator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: (
        "🇳🇬 *WHO SWEAR FOR US (WSFU) — CITIZEN BOT*\n" +
        "━━━━━━━━━━━━━━━━━━━━\n" +
        "Welcome to the WSFU Citizen Transparency WhatsApp Desk! Type any command to query public records:\n\n" +
        "• `FAAC Lagos` — Monthly FAAC allocation & per-capita spending\n" +
        "• `PROMISE Tinubu` — Presidential & Gubernatorial commitments\n" +
        "• `FOI Works` — 7-day Freedom of Information compliance clock\n" +
        "• `NEWS Economy` — Top corroborated AI briefs"
      ),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const handleSend = async (queryText?: string) => {
    const q = queryText || inputQuery;
    if (!q.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text: q.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const res = await fetch(`/api/v1/whatsapp/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q.trim() })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            text: data.reply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        throw new Error('API offline');
      }
    } catch {
      // Local fallback simulation
      setTimeout(() => {
        let fallbackReply = "🇳🇬 *WSFU CITIZEN DESK*\n";
        const upper = q.toUpperCase();
        if (upper.includes('FAAC')) {
          fallbackReply += "💰 *FAAC DISBURSEMENT AUDIT*\n• Gross Statutory: ₦39.50 Billion\n• Debt Deductions: -₦9.20 Billion\n• Net Revenue: ₦30.30 Billion\n• Per Capita: ₦23,887/citizen/yr\n• Autonomous LGAs: 20 Councils";
        } else if (upper.includes('PROMISE')) {
          fallbackReply += "📋 *PROMISE METER AUDIT*\n• Official: Bola Ahmed Tinubu\n• Approval: 68% (3.4 / 5.0)\n• NELFUND Student Loans: 100% Fulfilled\n• Coastal Highway: 50% Active Works";
        } else if (upper.includes('FOI')) {
          fallbackReply += "⚖️ *FOI COMPLIANCE STATUS*\n• Ref: FOI-2024-CW789A\n• Target: Federal Ministry of Works\n• Status: 🚨 SECTION 7 STATUTORY DEFAULT\n• Notice served on Attorney-General";
        } else {
          fallbackReply += "📰 *CORROBORATED WIRE*\n1. FAAC Disburses ₦1.41 Trillion for July 2024\n2. NERC Imposes ₦350M Fines Over Feeders Deficit\n3. Supreme Court Direct LGA Financial Autonomy";
        }
        fallbackReply += "\n\n🔍 Track live on https://wsfu.ng";

        setMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            text: fallbackReply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center space-x-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-full shadow-2xl shadow-emerald-950/80 border border-emerald-400/40 transition-all hover:scale-105 cursor-pointer"
      >
        <MessageSquare className="w-5 h-5 animate-pulse" />
        <span className="hidden sm:inline">WhatsApp Citizen Bot</span>
        <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
      </button>

      {/* Simulator Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0b141a] border border-zinc-800 w-full max-w-md h-[90vh] sm:h-[620px] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">
            {/* WhatsApp Header */}
            <div className="bg-[#202c33] p-3.5 border-b border-zinc-800 flex items-center justify-between text-white flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-black text-sm">
                  🇳🇬
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                    <span>WSFU Citizen Accountability</span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-800">
                      Verified
                    </span>
                  </h3>
                  <p className="text-[10px] text-emerald-400 font-mono">online • WhatsApp Bot</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Prompt Chips */}
            <div className="bg-[#111b21] px-3 py-2 border-b border-zinc-800/80 flex items-center space-x-1.5 overflow-x-auto text-[11px] font-bold flex-shrink-0">
              <span className="text-zinc-500 text-[10px] uppercase font-mono pr-1">Try:</span>
              {[
                'FAAC Lagos',
                'FAAC Kano',
                'PROMISE Tinubu',
                'PROMISE Otti',
                'FOI Works',
                'NEWS Economy'
              ].map(chip => (
                <button
                  key={chip}
                  onClick={() => handleSend(chip)}
                  className="px-2.5 py-1 bg-[#202c33] hover:bg-emerald-950 hover:text-emerald-300 text-zinc-300 rounded-lg whitespace-nowrap transition-colors cursor-pointer border border-zinc-700/60"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Message Feed Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[radial-gradient(#1f2c34_1px,transparent_1px)] [background-size:16px_16px]">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-md ${
                      m.sender === 'user'
                        ? 'bg-[#005c4b] text-white rounded-br-none'
                        : 'bg-[#202c33] text-zinc-100 rounded-bl-none border border-zinc-800'
                    }`}
                  >
                    <p className="whitespace-pre-line font-sans">{m.text}</p>
                    <span className="text-[9px] text-zinc-400 font-mono block text-right mt-1">
                      {m.time}
                    </span>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center space-x-2 bg-[#202c33] text-zinc-400 p-2.5 rounded-xl text-xs w-28 animate-pulse border border-zinc-800">
                  <Bot className="w-4 h-4 text-emerald-400 animate-spin" />
                  <span>typing...</span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSend();
              }}
              className="bg-[#202c33] p-2.5 border-t border-zinc-800 flex items-center space-x-2 flex-shrink-0"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={e => setInputQuery(e.target.value)}
                placeholder="Type 'FAAC Lagos' or 'PROMISE Tinubu'..."
                className="flex-1 bg-[#2a3942] border border-zinc-700/60 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={loading || !inputQuery.trim()}
                className="p-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
