import React, { useEffect, useState } from 'react';

type Subscriber = { email: string; date: string };

const STORAGE = 'newsletter_subscriptions_v1';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [subs, setSubs] = useState<Subscriber[]>(() => {
    try { const raw = localStorage.getItem(STORAGE); return raw ? JSON.parse(raw) as Subscriber[] : []; } catch { return []; }
  });
  const [message, setMessage] = useState<string | null>(null);
  const endpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT as string | undefined;

  useEffect(() => {
    try { localStorage.setItem(STORAGE, JSON.stringify(subs)); } catch (e) { console.error(e); }
  }, [subs]);

  const subscribe = async () => {
    setMessage(null);
    const value = email.trim();
    if (!isValidEmail(value)) { setMessage('Please enter a valid email'); return; }

    // prevent duplicate
    if (subs.some(s => s.email.toLowerCase() === value.toLowerCase())) {
      setMessage('You are already subscribed.');
      setEmail('');
      return;
    }

    const newSub: Subscriber = { email: value, date: new Date().toISOString() };

    if (endpoint) {
      try {
        await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newSub) });
        setMessage('Subscribed! (sent to configured endpoint)');
        setSubs(prev => [...prev, newSub]);
        setEmail('');
        return;
      } catch (e) {
        console.error('Failed to post to newsletter endpoint', e);
        setMessage('Could not reach newsletter endpoint; saved locally.');
      }
    }

    setSubs(prev => [...prev, newSub]);
    setMessage('Subscribed locally.');
    setEmail('');
  };

  const exportSubscribers = () => {
    const blob = new Blob([JSON.stringify(subs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscribers.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-4 p-3 bg-slate-800 rounded">
      <div className="text-white font-semibold mb-2">Newsletter</div>
      <div className="flex gap-2">
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" className="flex-1 p-2 rounded bg-slate-900 text-white border border-slate-700" />
        <button onClick={subscribe} className="px-3 py-2 bg-green-600 text-white rounded">Subscribe</button>
      </div>
      {message && <div className="mt-2 text-sm text-slate-300">{message}</div>}

      <div className="mt-3">
        <div className="text-slate-300 text-sm">Subscribers (local)</div>
        <div className="max-h-28 overflow-auto mt-1 space-y-1">
          {subs.map(s => (
            <div key={s.email} className="text-sm text-slate-300">{s.email} <span className="text-xs text-slate-500">{new Date(s.date).toLocaleString()}</span></div>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <button onClick={exportSubscribers} className="px-2 py-1 text-sm bg-slate-700 rounded text-white">Export</button>
        </div>
      </div>
    </div>
  );
}
