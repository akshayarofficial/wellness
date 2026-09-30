// Client helper for the admin API (proxied to Express via next.config rewrites).

export class AdminAuthError extends Error {}

export async function adminFetch(path, options = {}) {
  const res = await fetch(`/api/admin${path}`, {
    ...options,
    credentials: 'same-origin',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });

  if (res.status === 401) {
    throw new AdminAuthError('Session expired. Please sign in again.');
  }

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error(`Admin API is unavailable (HTTP ${res.status}). Is the Express server running?`);
  }

  if (!res.ok || data.success === false) {
    throw new Error(data.error || `Request failed (HTTP ${res.status}).`);
  }
  return data;
}

export function loginRedirectUrl() {
  const next = window.location.pathname + window.location.search;
  return `/admin/login?next=${encodeURIComponent(next)}`;
}
