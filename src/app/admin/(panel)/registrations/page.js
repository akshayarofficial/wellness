'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, Download, Inbox,
  LoaderCircle, MessageCircle, RefreshCw, Search, X,
} from 'lucide-react';
import { AdminAuthError, adminFetch, loginRedirectUrl } from '../../../../lib/adminApi';

const PAGE_SIZES = [10, 25, 50, 100];
const EMPTY_FILTERS = { q: '', groupId: '', timeSlot: '', from: '', to: '' };

const dateTimeFormat = new Intl.DateTimeFormat(undefined, {
  day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
});

function formatDate(iso) {
  return iso ? dateTimeFormat.format(new Date(iso)) : '—';
}

function useDebounced(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function toQueryString(params) {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== '' && v !== null && v !== undefined) qs.set(k, String(v));
  }
  return qs.toString();
}

function SortHeader({ label, field, sort, onSort }) {
  const active = sort.field === field;
  const Icon = !active ? ArrowUpDown : sort.order === 'asc' ? ArrowUp : ArrowDown;
  return (
    <th aria-sort={active ? (sort.order === 'asc' ? 'ascending' : 'descending') : 'none'}>
      <button className={`adm-sort-btn ${active ? 'is-active' : ''}`} onClick={() => onSort(field)}>
        {label} <Icon size={13} />
      </button>
    </th>
  );
}

function DetailRow({ label, children }) {
  return (
    <div className="adm-detail-row">
      <dt>{label}</dt>
      <dd>{children || <span className="adm-muted">—</span>}</dd>
    </div>
  );
}

function RegistrationDrawer({ registration, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const r = registration;
  return (
    <>
      <div className="adm-backdrop adm-backdrop-drawer" onClick={onClose} />
      <aside className="adm-drawer" role="dialog" aria-modal="true" aria-labelledby="adm-drawer-title">
        <header className="adm-drawer-header">
          <div>
            <span className="adm-mono adm-muted">{r.registrationNumber}</span>
            <h2 id="adm-drawer-title">{r.fullName}</h2>
          </div>
          <button className="adm-icon-btn" onClick={onClose} aria-label="Close details"><X size={18} /></button>
        </header>
        <div className="adm-drawer-body">
          <section>
            <h3>Contact</h3>
            <dl>
              <DetailRow label="Email"><a href={`mailto:${r.email}`}>{r.email}</a></DetailRow>
              <DetailRow label="Phone">{r.phone}</DetailRow>
              <DetailRow label="WhatsApp reminders">{r.whatsAppOptIn ? 'Opted in' : 'Not opted in'}</DetailRow>
            </dl>
          </section>
          <section>
            <h3>Program</h3>
            <dl>
              <DetailRow label="Group">Group {r.groupNumber} · {r.groupName}</DetailRow>
              <DetailRow label="Track">{r.groupTitle}</DetailRow>
              <DetailRow label="Time slot">{r.timeSlotLabel}</DetailRow>
              <DetailRow label="Cohort">{r.cohortCode} · Seat {r.seatNumber} of {r.maxRoomCapacity}</DetailRow>
              <DetailRow label="Participation">{r.participationStyleLabel}</DetailRow>
            </dl>
          </section>
          <section>
            <h3>About them</h3>
            <dl>
              <DetailRow label="Primary goal">{r.primaryGoal}</DetailRow>
              <DetailRow label="Notes">{r.notes && <span className="adm-prewrap">{r.notes}</span>}</DetailRow>
            </dl>
          </section>
          <section>
            <h3>Record</h3>
            <dl>
              <DetailRow label="Status"><span className="adm-badge adm-badge-success">{r.status}</span></DetailRow>
              <DetailRow label="Registered">{formatDate(r.registeredAt)}</DetailRow>
              <DetailRow label="Age confirmed">18+ confirmed</DetailRow>
            </dl>
          </section>
        </div>
      </aside>
    </>
  );
}

export default function RegistrationsPage() {
  const router = useRouter();
  const [meta, setMeta] = useState({ groups: [], timeSlots: [] });
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [sort, setSort] = useState({ field: 'registeredAt', order: 'desc' });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [result, setResult] = useState(null);
  const [settledKey, setSettledKey] = useState(null);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const debouncedQ = useDebounced(filters.q.trim(), 300);

  const handleError = useCallback((err) => {
    if (err instanceof AdminAuthError) router.replace(loginRedirectUrl());
    else setError(err.message);
  }, [router]);

  const query = useMemo(() => ({
    q: debouncedQ,
    groupId: filters.groupId,
    timeSlot: filters.timeSlot,
    from: filters.from,
    to: filters.to,
  }), [debouncedQ, filters.groupId, filters.timeSlot, filters.from, filters.to]);

  useEffect(() => {
    adminFetch('/meta').then(setMeta).catch(handleError);
  }, [handleError]);

  useEffect(() => {
    adminFetch('/registrations/stats').then((d) => setStats(d.stats)).catch(handleError);
  }, [handleError, reloadKey]);

  const listQs = toQueryString({ ...query, page, pageSize, sort: sort.field, order: sort.order });
  const requestKey = `${listQs}#${reloadKey}`;
  // Loading until the response for the current request key has settled
  const loading = settledKey !== requestKey;

  useEffect(() => {
    let cancelled = false;
    adminFetch(`/registrations?${listQs}`)
      .then((data) => {
        if (cancelled) return;
        setResult(data);
        setError('');
      })
      .catch((err) => !cancelled && handleError(err))
      .finally(() => !cancelled && setSettledKey(requestKey));
    return () => { cancelled = true; };
  }, [listQs, requestKey, handleError]);

  const updateFilter = (key, value) => {
    setFilters((f) => ({ ...f, [key]: value }));
    setPage(1);
  };

  const handleSort = (field) => {
    setSort((s) => (s.field === field
      ? { field, order: s.order === 'asc' ? 'desc' : 'asc' }
      : { field, order: field === 'registeredAt' ? 'desc' : 'asc' }));
    setPage(1);
  };

  const hasFilters = Object.values(filters).some(Boolean);
  const exportHref = `/api/admin/registrations/export?${toQueryString(query)}`;
  const pagination = result?.pagination;
  const rows = result?.registrations || [];
  const firstRow = pagination ? (pagination.page - 1) * pagination.pageSize + 1 : 0;
  const lastRow = pagination ? firstRow + rows.length - 1 : 0;

  return (
    <div className="adm-page">
      <div className="adm-page-header">
        <div>
          <h1>Registrations</h1>
          <p className="adm-muted">Everyone who has signed up through the public registration form.</p>
        </div>
        <div className="adm-page-actions">
          <button className="adm-btn adm-btn-ghost" onClick={() => setReloadKey((k) => k + 1)} disabled={loading}>
            <RefreshCw size={15} className={loading ? 'adm-spin' : ''} /> Refresh
          </button>
          <a className="adm-btn adm-btn-primary" href={exportHref} download>
            <Download size={15} /> Export CSV
          </a>
        </div>
      </div>

      {stats && (
        <div className="adm-stats">
          <div className="adm-stat adm-stat-primary">
            <span>Total registrations</span>
            <strong>{stats.total}</strong>
          </div>
          <div className="adm-stat">
            <span>Last 7 days</span>
            <strong>{stats.last7Days}</strong>
          </div>
          <div className="adm-stat">
            <span>WhatsApp opt-ins</span>
            <strong>{stats.whatsAppOptIns}</strong>
          </div>
          <div className="adm-stat adm-stat-groups">
            <span>By group</span>
            <ul>
              {stats.byGroup.map((g) => (
                <li key={g.groupId}>
                  <button
                    className={filters.groupId === g.groupId ? 'is-active' : ''}
                    onClick={() => updateFilter('groupId', filters.groupId === g.groupId ? '' : g.groupId)}
                    title={`Filter by ${g.name}`}
                  >
                    <span>{g.name}</span>
                    <b>{g.count}</b>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="adm-card">
        <div className="adm-toolbar">
          <div className="adm-input-icon adm-search">
            <Search size={16} />
            <input
              className="adm-input"
              type="search"
              placeholder="Search name, email, phone, reg. no. or cohort"
              value={filters.q}
              onChange={(e) => updateFilter('q', e.target.value)}
            />
          </div>
          <select className="adm-input" value={filters.groupId} onChange={(e) => updateFilter('groupId', e.target.value)} aria-label="Group">
            <option value="">All groups</option>
            {meta.groups.map((g) => <option key={g.id} value={g.id}>Group {g.number} · {g.name}</option>)}
          </select>
          <select className="adm-input" value={filters.timeSlot} onChange={(e) => updateFilter('timeSlot', e.target.value)} aria-label="Time slot">
            <option value="">All time slots</option>
            {meta.timeSlots.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
          <label className="adm-date">
            <span>From</span>
            <input className="adm-input" type="date" value={filters.from} max={filters.to || undefined} onChange={(e) => updateFilter('from', e.target.value)} />
          </label>
          <label className="adm-date">
            <span>To</span>
            <input className="adm-input" type="date" value={filters.to} min={filters.from || undefined} onChange={(e) => updateFilter('to', e.target.value)} />
          </label>
          {hasFilters && (
            <button className="adm-btn adm-btn-ghost" onClick={() => { setFilters(EMPTY_FILTERS); setPage(1); }}>
              <X size={15} /> Clear
            </button>
          )}
        </div>

        {error && <div className="adm-alert adm-alert-error adm-card-alert" role="alert">{error}</div>}

        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <SortHeader label="Registered" field="registeredAt" sort={sort} onSort={handleSort} />
                <SortHeader label="Name" field="fullName" sort={sort} onSort={handleSort} />
                <SortHeader label="Contact" field="email" sort={sort} onSort={handleSort} />
                <SortHeader label="Group" field="groupId" sort={sort} onSort={handleSort} />
                <th>Time slot</th>
                <SortHeader label="Cohort" field="cohortCode" sort={sort} onSort={handleSort} />
              </tr>
            </thead>
            <tbody className={loading && result ? 'is-loading' : ''}>
              {!result && loading && (
                <tr><td colSpan={6} className="adm-table-empty"><LoaderCircle size={22} className="adm-spin adm-muted" /></td></tr>
              )}
              {result && rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="adm-table-empty">
                    <Inbox size={28} className="adm-muted" />
                    <p>{hasFilters ? 'No registrations match these filters.' : 'No registrations yet.'}</p>
                  </td>
                </tr>
              )}
              {rows.map((r) => (
                <tr
                  key={r.id}
                  className="adm-row-clickable"
                  tabIndex={0}
                  onClick={() => setSelected(r)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setSelected(r))}
                >
                  <td className="adm-nowrap">
                    {formatDate(r.registeredAt)}
                    <div className="adm-mono adm-muted adm-small">{r.registrationNumber}</div>
                  </td>
                  <td className="adm-strong">{r.fullName}</td>
                  <td>
                    <div>{r.email}</div>
                    {r.phone && (
                      <div className="adm-muted adm-small adm-nowrap">
                        {r.phone}
                        {r.whatsAppOptIn && <MessageCircle size={12} className="adm-wa" aria-label="WhatsApp opt-in" />}
                      </div>
                    )}
                  </td>
                  <td>
                    <span className={`adm-badge adm-badge-${r.groupId}`}>G{r.groupNumber}</span> {r.groupName}
                  </td>
                  <td className="adm-small">{r.timeSlotLabel}</td>
                  <td className="adm-nowrap">
                    <span className="adm-mono">{r.cohortCode}</span>
                    <div className="adm-muted adm-small">Seat {r.seatNumber}/{r.maxRoomCapacity}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pagination && pagination.total > 0 && (
          <div className="adm-pagination">
            <span className="adm-muted">
              Showing {firstRow}–{lastRow} of {pagination.total}
            </span>
            <div className="adm-pagination-controls">
              <label className="adm-muted">
                Rows
                <select className="adm-input adm-input-sm" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}>
                  {PAGE_SIZES.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </label>
              <button className="adm-icon-btn" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} aria-label="Previous page">
                <ChevronLeft size={18} />
              </button>
              <span>Page {pagination.page} of {pagination.totalPages}</span>
              <button className="adm-icon-btn" disabled={page >= pagination.totalPages} onClick={() => setPage((p) => p + 1)} aria-label="Next page">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {selected && <RegistrationDrawer registration={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
