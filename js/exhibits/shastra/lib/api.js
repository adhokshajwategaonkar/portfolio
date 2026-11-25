// The Shastra API client, ported from Shastra/site/assets/shastra.js.
//
// Two facts about the deployment shape drive everything here:
// 1. The API runs on a free Render instance that sleeps. The first call after
//    a sleep takes 20 to 50 seconds, so every exhibit pre-warms /health on
//    mount and shows a waiting state instead of a spinner that looks broken.
// 2. The portfolio and the API are different origins, so every call is CORS.
//    The server allows http://localhost:4173 and the GitHub Pages origin.

const warmth = new Map(); // api -> { state, promise, since }

/** Fetch /health once per page so the instance is awake before anyone presses a button. */
export function prewarm(api) {
  let w = warmth.get(api);
  if (w && w.state !== 'unreachable') return w.promise;
  w = { state: 'warming', since: Date.now(), promise: null };
  warmth.set(api, w);
  w.promise = call(api, '/health', { timeout: 70000 })
    .then((j) => { w.state = 'warm'; w.health = j; return 'warm'; })
    .catch(() => { w.state = 'unreachable'; return 'unreachable'; });
  return w.promise;
}

export function warmState(api) {
  const w = warmth.get(api);
  return w ? w.state : 'cold';
}

export function health(api) {
  return warmth.get(api)?.health || null;
}

export class ApiError extends Error {
  constructor(message, kind) { super(message); this.kind = kind; }
}

/**
 * GET or POST JSON. 60 second timeout by default: a cold instance can need
 * about 50 seconds for its very first answer, and aborting at 10 would fail
 * exactly the visitors who arrived first.
 */
export async function call(api, path, { body, timeout = 60000, signal } = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort('timeout'), timeout);
  const onAbort = () => ctrl.abort('cancelled');
  signal?.addEventListener('abort', onAbort, { once: true });
  try {
    const r = await fetch(api + path, {
      method: body ? 'POST' : 'GET',
      mode: 'cors',
      cache: 'no-store',
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal: ctrl.signal,
    });
    let data = null;
    try { data = await r.json(); } catch { throw new ApiError('the server sent something unreadable.', 'bad'); }
    if (!r.ok) {
      if (r.status === 429) throw new ApiError('too many requests this minute. try again shortly.', 'rate');
      throw new ApiError((data && data.error) || 'something went wrong.', 'bad');
    }
    return data;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (ctrl.signal.aborted) {
      throw new ApiError(ctrl.signal.reason === 'cancelled' ? 'cancelled' : 'the server took too long to answer.', ctrl.signal.reason === 'cancelled' ? 'cancelled' : 'timeout');
    }
    throw new ApiError('could not reach the server.', 'network');
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', onAbort);
  }
}

/** Search places for the autocomplete. Silent on failure: typing the name still works server side. */
export async function places(api, q, signal) {
  try {
    const d = await call(api, '/api/places?q=' + encodeURIComponent(q), { timeout: 12000, signal });
    return (d && d.results) || [];
  } catch { return []; }
}
