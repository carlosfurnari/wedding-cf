// Simple cookie helpers
export function setCookie(name, value, days = 730) { // ~2 años
  try {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Expires=${expires}; Path=/; SameSite=Lax`;
  } catch (e) {}
}

export function getCookie(name) {
  try {
    const match = document.cookie
      .split('; ')
      .find(row => row.startsWith(encodeURIComponent(name) + '='));
    if (!match) return undefined;
    return decodeURIComponent(match.split('=')[1]);
  } catch (e) { return undefined; }
}

function uuid() {
  // RFC4122 v4-ish using crypto if available
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const toHex = (n) => n.toString(16).padStart(2, '0');
    const b = Array.from(bytes, toHex).join('');
    return `${b.slice(0,8)}-${b.slice(8,12)}-${b.slice(12,16)}-${b.slice(16,20)}-${b.slice(20)}`;
  }
  // Fallback
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getOrCreateDeviceId() {
  try {
    const fromCookie = getCookie('device_id');
    const fromLS = localStorage.getItem('device_id');
    const existing = fromCookie || fromLS;
    if (existing) return existing;
    const id = uuid();
    setCookie('device_id', id);
    localStorage.setItem('device_id', id);
    return id;
  } catch (e) {
    // Last resort
    return uuid();
  }
}

export function markRsvpSubmitted(data = {}) {
  try {
    const payload = { ...data, at: new Date().toISOString() };
    localStorage.setItem('rsvp_submitted', JSON.stringify(payload));
    setCookie('rsvp_submitted', '1');
  } catch (e) {}
}

export function getRsvpSubmitted() {
  try {
    const raw = localStorage.getItem('rsvp_submitted');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) { return null; }
}

// RSVP draft helpers
export function saveRsvpDraft(draft = {}) {
  try {
    const payload = JSON.stringify(draft);
    localStorage.setItem('rsvp_draft', payload);
  setCookie('rsvp_draft', '1', 36500); // ~100 años
  } catch (e) {}
}

export function getRsvpDraft() {
  try {
    const raw = localStorage.getItem('rsvp_draft');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Basic shape guard
    const safe = {
      guestName: parsed?.guestName || '',
      foodRestriction: parsed?.foodRestriction || 'No',
      otherRestriction: parsed?.otherRestriction || '',
      companions: Array.isArray(parsed?.companions) ? parsed.companions.map(c => ({
        name: c?.name || '',
        foodRestriction: c?.foodRestriction || 'No',
        otherRestriction: c?.otherRestriction || ''
      })) : []
    };
    return safe;
  } catch (e) { return null; }
}

export function clearRsvpDraft() {
  try {
    localStorage.removeItem('rsvp_draft');
    // Expire cookie
    setCookie('rsvp_draft', '', -1);
  } catch (e) {}
}
