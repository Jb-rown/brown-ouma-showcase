import React, { useCallback, useEffect, useState } from 'react';
import NewsletterSignup from './NewsletterSignup';
import { MessageSquare, X, Download } from 'lucide-react';
import { documents, type Doc } from '../lib/documents';

type Message = { id: string; from: 'bot' | 'user'; text: string };

type ProjectResponse = {
  projectId: number;
  title: string;
  role?: string;
  tech?: string;
  summary?: string;
  link?: string;
};

const STORAGE_CHAT = 'portfolio_chat_responses_v1';
const STORAGE_STRUCT = 'portfolio_chat_structured_v1';

const PROJECT_FIELDS = ['role', 'tech', 'summary', 'link'] as const;

export default function PortfolioChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  // structured responses per project
  const [responses, setResponses] = useState<ProjectResponse[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_STRUCT);
      return raw ? JSON.parse(raw) as ProjectResponse[] : [];
    } catch (e) {
      console.error('Failed to load structured responses from localStorage', e);
      return [];
    }
  });

  // guided walk state
  const [walking, setWalking] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState<number | null>(null);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CHAT);
      if (saved) setMessages(JSON.parse(saved));
    } catch (e) {
      console.error('Failed to load chat messages from localStorage', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CHAT, JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to save chat messages to localStorage', e);
    }
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_STRUCT, JSON.stringify(responses));
    } catch (e) {
      console.error('Failed to save structured responses to localStorage', e);
    }
  }, [responses]);

  const botAsk = useCallback((text: string) => {
    const msg: Message = { id: String(Date.now()), from: 'bot', text };
    setMessages(m => [...m, msg]);
  }, []);

  const userSend = useCallback((text: string) => {
    if (!text.trim()) return;
    const msg: Message = { id: String(Date.now()), from: 'user', text };
    setMessages(m => [...m, msg]);
    setInput('');

    // Provide quick feedback for free-form messages when not walking
    const lower = text.trim().toLowerCase();
    if (!walking && !['yes', 'y', 'no', 'n', 'start'].includes(lower)) {
      // try to detect if the message mentions a project title
      const docs = documents as unknown as Doc[];
      const matchedIndex = docs.findIndex(d => d.title.toLowerCase().includes(lower) || lower.includes(d.title.toLowerCase()));
      if (matchedIndex >= 0) {
        // save into structured responses as summary if empty
        setResponses(prev => {
          const clone = [...prev];
          const proj = docs[matchedIndex];
          if (!clone[matchedIndex]) clone[matchedIndex] = { projectId: proj.id as number, title: proj.title } as ProjectResponse;
          if (!clone[matchedIndex].summary) clone[matchedIndex].summary = text.trim();
          return clone;
        });
        botAsk(`Thanks — I matched that to "${docs[matchedIndex].title}" and saved it as the project's summary.`);
      } else {
        botAsk("Thanks — I've noted that. Type 'yes' to let me walk projects or click 'Walk projects'.");
      }
    }

    return msg;
  }, [botAsk, walking]);

  const exportChat = () => {
    const blob = new Blob([JSON.stringify({ messages, responses }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-chat-structured.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const startWalk = useCallback(() => {
    const docs = documents as unknown as Doc[];
    if (!docs || docs.length === 0) { botAsk('No projects found automatically. You can add them manually.'); return; }
    setResponses([]);
    setWalking(true);
    setCurrentProjectIndex(0);
    setCurrentFieldIndex(0);
    botAsk(`Great — I'll walk through ${docs.length} project(s). For each I'll ask about your role, tech used, a one-sentence summary, and a link (or type skip). Ready?`);
  }, [botAsk]);

  // handle guided flow replies
  useEffect(() => {
    if (!walking || currentProjectIndex === null) return;
    const docs = documents as unknown as Doc[];
    const last = messages[messages.length - 1];
    // when user replies to a bot prompt, save the field
    if (last && last.from === 'user') {
      const userText = last.text.trim();
      const proj = docs[currentProjectIndex];
      // ensure a response object exists
      setResponses(prev => {
        const clone = [...prev];
        if (!clone[currentProjectIndex]) {
          clone[currentProjectIndex] = { projectId: proj.id as number, title: proj.title as string } as ProjectResponse;
        }
        const target = clone[currentProjectIndex];
  const field = PROJECT_FIELDS[currentFieldIndex];
        if (userText.toLowerCase() !== 'skip') {
          (target as ProjectResponse)[field] = userText;
        }
        return clone;
      });

      // move to next field or next project
      if (currentFieldIndex < PROJECT_FIELDS.length - 1) {
        const nextField = currentFieldIndex + 1;
        setCurrentFieldIndex(nextField);
        const label = PROJECT_FIELDS[nextField];
        botAsk(`Please provide the ${label} for "${proj.title}" (or type skip).`);
      } else {
        // finished this project
        const nextProject = currentProjectIndex + 1;
        if (nextProject < docs.length) {
          setCurrentProjectIndex(nextProject);
          setCurrentFieldIndex(0);
          const nextProj = docs[nextProject];
          botAsk(`Next project: "${nextProj.title}". What was your role? (or type skip)`);
        } else {
          // done
          setWalking(false);
          setCurrentProjectIndex(null);
          setCurrentFieldIndex(0);
          botAsk('All done! You can review the collected project data in the review tab and export it.');
        }
      }
    }
  }, [messages, walking, currentProjectIndex, currentFieldIndex, botAsk]);

  // top-level control: if user says 'yes' in free chat, start the walk
  useEffect(() => {
    const last = messages[messages.length - 1];
    if (!last) return;
    if (last.from === 'user') {
      const txt = last.text.trim().toLowerCase();
      if (txt === 'yes' || txt === 'y') {
        startWalk();
      } else if (txt === 'no' || txt === 'n') {
        botAsk('Okay — you can still type project details manually.');
      } else if (txt === 'start') {
        startWalk();
      }
    }
  }, [messages, startWalk, botAsk]);

  // When chat panel opens for the first time, greet the user
  useEffect(() => {
    if (open && messages.length === 0) {
      botAsk('Hi — I can help you document your projects. Want me to ask about each project I found in your portfolio? (yes/no)');
    }
  }, [open, messages.length, botAsk]);

  // editing/review helpers
  const updateResponse = (index: number, patch: Partial<ProjectResponse>) => {
    setResponses(prev => { const c = [...prev]; c[index] = { ...c[index], ...patch }; return c; });
  };

  return (
    <div>
      <div className="fixed bottom-6 right-6 z-50">
        <button onClick={() => setOpen(o => !o)} className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg">
          <MessageSquare className="w-5 h-5" />
        </button>
      </div>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[420px] max-h-[70vh] bg-slate-900 border border-slate-700 rounded-lg shadow-lg overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              <div className="text-white font-medium">Portfolio Chat</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={exportChat} title="Export" className="text-slate-300 hover:text-white"><Download className="w-4 h-4"/></button>
              <button onClick={() => setOpen(false)} className="text-slate-300 hover:text-white"><X className="w-4 h-4"/></button>
            </div>
          </div>

          <div className="p-3 flex-1 overflow-auto space-y-2">
            {/* Chat messages */}
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.from === 'bot' ? 'justify-start' : 'justify-end'}`}>
                <div className={`${m.from === 'bot' ? 'bg-slate-800 text-slate-100' : 'bg-blue-600 text-white'} px-3 py-2 rounded-lg max-w-[80%]`}>{m.text}</div>
              </div>
            ))}

            {/* Review section when not walking and we have responses */}
            {!walking && responses.length > 0 && (
              <div className="mt-4 p-2 bg-slate-800 rounded">
                <div className="text-white font-semibold mb-2">Collected project data</div>
                <div className="space-y-2">
                  {responses.map((r, i) => (
                    <div key={r.projectId} className="p-2 bg-slate-900 rounded border border-slate-700">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-sm text-slate-300">{r.title}</div>
                          <input value={r.role || ''} onChange={e => updateResponse(i, { role: e.target.value })} placeholder="Role" className="w-full mt-1 p-1 rounded bg-slate-800 text-white border border-slate-700 text-sm" />
                          <input value={r.tech || ''} onChange={e => updateResponse(i, { tech: e.target.value })} placeholder="Technologies (comma-separated)" className="w-full mt-1 p-1 rounded bg-slate-800 text-white border border-slate-700 text-sm" />
                          <input value={r.link || ''} onChange={e => updateResponse(i, { link: e.target.value })} placeholder="Project link" className="w-full mt-1 p-1 rounded bg-slate-800 text-white border border-slate-700 text-sm" />
                          <textarea value={r.summary || ''} onChange={e => updateResponse(i, { summary: e.target.value })} placeholder="One-sentence summary" className="w-full mt-1 p-1 rounded bg-slate-800 text-white border border-slate-700 text-sm" />
                        </div>
                        <div className="ml-2 flex-shrink-0">
                          <a href={r.link || '#'} target="_blank" rel="noreferrer" className="text-slate-300 text-sm underline">Open</a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Newsletter signup */}
            <div className="mt-3">
              <NewsletterSignup />
            </div>
          </div>

          <div className="p-3 border-t border-slate-800">
            <form onSubmit={(e) => { e.preventDefault(); userSend(input); }} className="flex gap-2">
              <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a reply... (try: yes to start)" className="flex-1 px-3 py-2 rounded bg-slate-800 text-white border border-slate-700" />
              <button type="submit" className="px-3 py-2 bg-blue-600 rounded text-white">Send</button>
              <button type="button" onClick={() => startWalk()} className="px-3 py-2 bg-yellow-500 text-slate-900 rounded">Walk projects</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
