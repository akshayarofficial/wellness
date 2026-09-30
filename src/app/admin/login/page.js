'use client';
import React, { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Leaf, LoaderCircle, Lock, User } from 'lucide-react';

// Only allow redirects back into the admin area
function safeNext(value) {
  return value && value.startsWith('/admin') && !value.startsWith('//') ? value : '/admin/registrations';
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        throw new Error(data?.error || 'Unable to reach the admin service. Is the Express server running?');
      }
      router.replace(safeNext(searchParams.get('next')));
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <form className="adm-login-card" onSubmit={handleSubmit} noValidate>
      <div className="adm-login-brand">
        <span className="adm-brand-mark"><Leaf size={20} /></span>
        <div>
          <h1>Admin Panel</h1>
          <p>Everyday Mental Wellness</p>
        </div>
      </div>

      {error && <div className="adm-alert adm-alert-error" role="alert">{error}</div>}

      <label className="adm-field">
        <span>Username</span>
        <div className="adm-input-icon">
          <User size={16} />
          <input
            className="adm-input"
            autoComplete="username"
            autoFocus
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </label>

      <label className="adm-field">
        <span>Password</span>
        <div className="adm-input-icon">
          <Lock size={16} />
          <input
            className="adm-input"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="adm-input-toggle"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </label>

      <button type="submit" className="adm-btn adm-btn-primary adm-btn-block" disabled={submitting || !username || !password}>
        {submitting ? <><LoaderCircle size={16} className="adm-spin" /> Signing in…</> : 'Sign in'}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="adm-login-page">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
