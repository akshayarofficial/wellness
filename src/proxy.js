import { NextResponse } from 'next/server';

const SESSION_COOKIE = 'emw_admin_session';

// Optimistic check only: sends visitors without a session cookie to the login page.
// The Express API validates the session on every admin request.
export function proxy(request) {
  const { pathname, search } = request.nextUrl;
  const hasSession = request.cookies.has(SESSION_COOKIE);

  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  if (!hasSession) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('next', pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
