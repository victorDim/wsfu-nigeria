import React, { useState } from 'react';
import {
  Send,
  X,
  RefreshCw,
  Compass
} from 'lucide-react';
import { callAIAsk } from '../lib/api';

interface AICivicAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AICivicAssistantModal: React.FC<AICivicAssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: (
        "👋 **Welcome to the WSFU Research & Accountability Desk.**\n\n" +
        "You can ask about state and local government FAAC revenue allocations, executive promises, the FOI Act 2011, Supreme Court rulings, or how to submit public records requests.\n\n" +
        "_Feel free to ask in English, Nigerian Pidgin, Yoruba, Hausa, or Igbo._"
      )
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (queryText?: string) => {
    const q = (queryText || inputQuery).trim();
    if (!q) return;

    setMessages(prev => [...prev, { sender: 'user', text: q }]);
    setInputQuery('');
    setLoading(true);

    try {
      const historyContext = messages.map(m => ({ sender: m.sender, text: m.text }));
      const data = await callAIAsk(q, historyContext);
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: data.answer
        }
      ]);
    } catch {
      // Fallback handled gracefully
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0f1117] border border-zinc-800 w-full max-w-2xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
        {/* Modal Header */}
        <div className="bg-[#090a0d] p-4 border-b border-zinc-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                <span>WSFU Accountability Desk</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 font-mono px-1.5 py-0.5 rounded border border-emerald-800/60">
                  Public Records
                </span>
              </h3>
              <p className="text-xs text-zinc-400">Direct Civic & Fiscal Intelligence</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer border border-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Prompts Bar */}
        <div className="bg-[#090a0d] px-4 py-2 border-b border-zinc-800 flex items-center space-x-2 overflow-x-auto text-xs flex-shrink-0">
          <span className="text-[10px] text-zinc-500 font-mono uppercase pr-1">Inquire:</span>
          {[
            'Explain LGA autonomy ruling',
            'Compare Lagos vs Rivers FAAC',
            'Where does FAAC VAT come from?',
            'Has NELFUND student loan worked?'
          ].map((prompt, pIdx) => (
            <button
              key={pIdx}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 hover:border-zinc-700 rounded-lg whitespace-nowrap transition-colors cursor-pointer text-xs"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[90%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-lg ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none'
                    : 'bg-[#08090c] text-zinc-200 rounded-bl-none border border-zinc-800/80'
                }`}
              >
                <p className="whitespace-pre-line font-sans">{m.text}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 bg-[#08090c] text-zinc-300 p-3 rounded-2xl border border-zinc-800 w-48 text-xs">
              <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>Querying archives...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          className="bg-[#090a0d] p-3 border-t border-zinc-800 flex items-center space-x-2 flex-shrink-0"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            placeholder="Ask about Nigerian budgets, laws, promises, or public contracts..."
            className="flex-1 bg-[#12141c] border border-zinc-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
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
  );
};
