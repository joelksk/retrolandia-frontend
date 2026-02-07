import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.NEXT_JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      if (payload.user.role !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    } catch (error) {
      console.error("JWT Verification failed:", error.message);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};