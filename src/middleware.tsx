import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const response = NextResponse.next();
  const accessToken = req.cookies.get('accessToken')?.value;
  console.log('cookies', response.cookies.getAll());

  if (!accessToken)
    return NextResponse.redirect(new URL('/unauthorized', req.url), req);

  const authUser = req.cookies.get('auth_user');

  if (!authUser)
    return NextResponse.redirect(new URL('/unauthorized', req.url), req);

  const user = authUser.value;
  if (!user)
    return NextResponse.redirect(new URL('/unauthorized', req.url), req);

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*'],
};
