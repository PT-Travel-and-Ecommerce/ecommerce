import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCurrentUser, isAdmin } from '@/lib/auth-local';

const PROTECTED_API_PATHS = [
  '/api/products',
  '/api/settings',
  '/api/orders',
  '/api/payments',
];

const MUTATION_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // Skip auth check for login page and API
  if (pathname === '/admin/login' || pathname.startsWith('/api/admin/login')) {
    return NextResponse.next();
  }

  const requiresAuth = 
    pathname.startsWith('/admin') ||
    (PROTECTED_API_PATHS.some(path => pathname.startsWith(path)) && 
     MUTATION_METHODS.includes(method));

  if (requiresAuth) {
    const user = await getCurrentUser(request);

    if (!user || !isAdmin(user)) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Unauthorized - Admin access required' },
          { status: 401 }
        );
      }
      
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/api/products/:path*',
    '/api/settings/:path*',
    '/api/orders/:path*',
    '/api/payments/:path*',
  ],
};
