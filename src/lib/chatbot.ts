export const STORAGE_KEY = 'portfolio_chat_responses_v1';

export function loadMessages(): unknown[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    // ignore parse errors
    return [];
  }
}

export function saveMessages(msgs: unknown[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
  } catch (e) {
    // ignore quota errors
  }
}
