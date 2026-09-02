import React, { useState } from 'react';
import { FileText, Send, Clock, Copy, Check, Printer, AlertCircle } from 'lucide-react';
import { submitFOIRequest } from '../lib/api';
import { FOIRequest } from '../types';

export const FOIGenerator: React.FC = () => {
  const [mdaName, setMdaName] = useState('');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [citizenName, setCitizenName] = useState('');
  const [citizenContact, setCitizenContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<FOIRequest | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mdaName || !subject || !details) return;

    setLoading(true);
    try {
      const res = await submitFOIRequest({
        mda_name: mdaName,
        subject,
        details
      });
      setSubmittedRequest(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generateLetterText = () => {
    if (!submittedRequest) return '';
    return `FREEDOM OF INFORMATION (FOI) APPLICATION
PURSUANT TO SECTION 1 & 4 OF THE FREEDOM OF INFORMATION ACT 2011

Date: ${submittedRequest.date_filed}
Tracking Reference: ${submittedRequest.tracking_code}

TO:
The Permanent Secretary / Head of Institution
${submittedRequest.mda_name}
Federal Republic of Nigeria

FROM:
${citizenName || '[Citizen / Applicant Name]'}
Contact: ${citizenContact || '[Phone / Email Address]'}

SUBJECT: FORMAL REQUEST FOR INFORMATION & PUBLIC RECORDS
${submittedRequest.subject}

Dear Sir/Madam,

1. Pursuant to Section 1 of the Freedom of Information Act 2011, which guarantees the right of any Nigerian citizen to request and receive public records, I hereby apply for the following records:

${submittedRequest.details}

2. STATUTORY TIMELINE:
Pursuant to Section 4 of the FOI Act 2011, your institution is legally mandated to respond and make the requested information available within 7 (SEVEN) WORKING DAYS of receipt of this notice, no later than ${submittedRequest.due_date}.

3. PUBLIC LEDGER TRACKING:
This request is publicly logged under Reference Code: ${submittedRequest.tracking_code} on the WSFU Citizen Accountability Ledger.

Yours faithfully,

_______________________
${citizenName || 'Applicant'}
`;
  };

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(generateLetterText());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-zinc-900 to-zinc-950 border border-emerald-800/40 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
          <FileText className="w-4 h-4" />
          <span>STATUTORY PUBLIC ACCOUNTABILITY TOOL</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Nigerian Freedom of Information (FOI) Act 2011 Generator
        </h1>
        <p className="text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
          Under Section 1 of the FOI Act 2011, every Nigerian citizen has a legally protected right to access public records and procurement information from any MDA. Generate your formal statutory notice and track the <strong>7-working-day compliance clock</strong>.
        </p>
      </div>

      {submittedRequest ? (
        <div className="bg-zinc-900 border border-emerald-800/60 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-4 gap-2">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                FOI NOTICE GENERATED & LOGGED
              </span>
              <h2 className="text-xl font-extrabold text-white mt-0.5">Tracking Reference: {submittedRequest.tracking_code}</h2>
            </div>
            <span className="px-3 py-1 bg-emerald-950 text-emerald-400 font-mono font-bold text-xs rounded-full border border-emerald-800 self-start sm:self-auto">
              STATUS: {submittedRequest.status.toUpperCase()}
            </span>
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2 text-xs font-mono text-zinc-300">
            <p><strong className="text-zinc-400">Target Public Institution:</strong> {submittedRequest.mda_name}</p>
            <p><strong className="text-zinc-400">Subject Matter:</strong> {submittedRequest.subject}</p>
            <p><strong className="text-zinc-400">Date Logged:</strong> {submittedRequest.date_filed}</p>
            <p className="text-amber-400"><strong className="text-zinc-400">Statutory 7-Day Deadline:</strong> {submittedRequest.due_date} (FOI Act Section 4)</p>
          </div>

          {/* Letter Output Container */}
          <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Formal Notice Template:</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyLetter}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-emerald-500 hover:text-black text-zinc-200 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Letter'}</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
              </div>
            </div>
            <pre className="text-xs text-zinc-300 font-mono whitespace-pre-wrap bg-zinc-900/80 p-4 rounded-lg border border-zinc-800/80 leading-relaxed overflow-x-auto">
              {generateLetterText()}
            </pre>
          </div>

          <div className="p-4 bg-emerald-950/40 border border-emerald-900/60 rounded-xl text-xs text-zinc-300 space-y-2">
            <p className="font-bold text-emerald-400 flex items-center space-x-1.5">
              <Clock className="w-4 h-4" />
              <span>Next Steps for Citizen Action</span>
            </p>
            <p>
              1. Copy or print the formal letter above. Deliver it to the registry of <strong>{submittedRequest.mda_name}</strong> by courier, email, or physical hand-delivery (requesting an acknowledgement stamp on your copy).
            </p>
            <p>
              2. If the MDA fails to respond by <strong>{submittedRequest.due_date}</strong>, the failure constitutes a wrongful refusal under Section 7 of the FOI Act, qualifying for Mandamus judicial enforcement.
            </p>
          </div>

          <button
            onClick={() => setSubmittedRequest(null)}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            Create Another FOI Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5 uppercase tracking-wider">
                Applicant Name (Optional)
              </label>
              <input
                type="text"
                value={citizenName}
                onChange={(e) => setCitizenName(e.target.value)}
                placeholder="e.g. Citizen Adebayo / Civic Monitor"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5 uppercase tracking-wider">
                Contact Phone or Email
              </label>
              <input
                type="text"
                value={citizenContact}
                onChange={(e) => setCitizenContact(e.target.value)}
                placeholder="e.g. applicant@email.com / +234..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1.5 uppercase tracking-wider">
              Target Ministry, Department or Agency (MDA) *
            </label>
            <input
              type="text"
              required
              value={mdaName}
              onChange={(e) => setMdaName(e.target.value)}
              placeholder="e.g. Federal Ministry of Works / Universal Basic Education Commission / Lagos State Ministry of Health"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1.5 uppercase tracking-wider">
              Subject of Information Requested *
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Request for Procurement Records and Contractor Advance Payment Trails on Project X"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1.5 uppercase tracking-wider">
              Detailed Information Description & Specific Documents *
            </label>
            <textarea
              required
              rows={5}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Specify the exact contract sums, project locations, payment dates, or official records you are requesting pursuant to Section 1 of the Freedom of Information Act 2011..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 text-xs"
            />
          </div>

          <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl flex items-start space-x-2 text-xs text-zinc-400">
            <AlertCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>
              WSFU logs your request reference in the citizen transparency ledger and generates a statutory Section 1 legal notice formatted for direct submission to the MDA.
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{loading ? 'Logging & Generating...' : 'Generate Formal Statutory Notice & Start 7-Day Clock'}</span>
          </button>
        </form>
      )}
    </div>
  );
};

