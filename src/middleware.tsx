import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const baseUrl = req.nextUrl.origin;
  const path = req.nextUrl.pathname;
  const headers = {
    cookie: req.headers.get('cookie') || '',
  };

  let pass = false;
  if (path.startsWith('/admin')) {
    const adminCheck = await fetch(`${baseUrl}/api/admin-check`, {
      headers,
    });
    pass = adminCheck.status === 200;
  } else {
    const authCheck = await fetch(`${baseUrl}/api/auth-check`, {
      headers,
    });
    pass = authCheck.status === 200;
  }

  if (!pass) {
    return NextResponse.redirect(new URL('/not-found', req.url), req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/user/:path*', '/admin/:path*'],
};
